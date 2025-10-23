/**
 * ApiService - Universal API service that works with both localStorage and database
 * Supports seamless switching between storage modes with proper data structure
 */

import IISMethods from './IISMethods';
import Config from '@/config/config';
import {
    userStorage,
    leadsStorage,
    masterDataStorage,
    sessionStorage
} from './localStorage';

class ApiService {
    constructor() {
        this.storageMode = 'localStorage'; // 'localStorage' or 'api'
        this.baseUrl = Config.apiBaseUrl;
        this.timeout = 30000; // 30 seconds
    }

    /**
     * Set storage mode
     * @param {string} mode - 'localStorage' or 'api'
     */
    setStorageMode(mode) {
        if (mode === 'localStorage' || mode === 'api') {
            this.storageMode = mode;
        } else {
            throw new Error('Invalid storage mode. Use "localStorage" or "api"');
        }
    }

    /**
     * Get current storage mode
     * @returns {string} Current storage mode
     */
    getStorageMode() {
        return this.storageMode;
    }

    /**
     * Generate unique ID
     * @param {string} prefix - Prefix for the ID
     * @returns {string} Unique ID
     */
    generateId(prefix = 'id') {
        return `${prefix}_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
    }

    /**
     * Get current user info from session
     * @returns {object} Current user info
     */
    getCurrentUser() {
        const session = sessionStorage.getSession();
        return {
            userId: session.userId,
            userEmail: session.userEmail,
            userRole: session.userRole
        };
    }

    /**
     * Create record info metadata
     * @param {string} action - 'create' or 'update'
     * @returns {object} Record info object
     */
    createRecordInfo(action = 'create') {
        const currentUser = this.getCurrentUser();
        const now = new Date().toISOString();

        if (action === 'create') {
            return {
                entryBy: currentUser.userId || 'system',
                entryTime: now,
                updateBy: null,
                updateTime: null
            };
        } else {
            return {
                updateBy: currentUser.userId || 'system',
                updateTime: now
            };
        }
    }

    /**
     * Add record info to data object
     * @param {object} data - Data object
     * @param {string} action - 'create' or 'update'
     * @returns {object} Data with record info
     */
    addRecordInfo(data, action = 'create') {
        const recordInfo = this.createRecordInfo(action);

        if (action === 'create') {
            return {
                _id: this.generateId(),
                ...data,
                recordinfo: recordInfo
            };
        } else {
            return {
                ...data,
                recordinfo: {
                    ...data.recordinfo,
                    ...recordInfo
                }
            };
        }
    }

    /**
     * Make API request
     * @param {string} url - API URL
     * @param {object} options - Fetch options
     * @returns {Promise} API response
     */
    async makeApiRequest(url, options = {}) {
        const controller = new AbortController();
        const timeoutId = setTimeout(() => controller.abort(), this.timeout);

        try {
            // Prepare headers
            const headers = {
                'Authorization': `Bearer ${sessionStorage.getSession().token}`,
                ...options.headers
            };

            // Only set Content-Type for JSON, not for FormData
            if (!(options.body instanceof FormData)) {
                headers['Content-Type'] = 'application/json';
            }

            const response = await fetch(url, {
                headers,
                signal: controller.signal,
                ...options
            });

            clearTimeout(timeoutId);

            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }

            return await response.json();
        } catch (error) {
            clearTimeout(timeoutId);

            if (error.name === 'AbortError') {
                throw new Error('Request timeout');
            }

            throw error;
        }
    }

    /**
     * Generic CRUD operations
     */

    /**
     * Create new record
     * @param {string} entity - Entity type (users, leads, categories, etc.)
     * @param {object} data - Data to create
     * @param {boolean} includeData - Whether to include data in response (default: true)
     * @returns {Promise<object>} Response with status and optional data
     */
    async create(entity, data, includeData = true) {
        try {
            const recordData = this.addRecordInfo(data, 'create');

            if (this.storageMode === 'localStorage') {
                return this.createLocal(entity, recordData, includeData);
            } else {
                return await this.createApi(entity, recordData, includeData);
            }
        } catch (error) {
            console.error(`Error creating ${entity}:`, error);
            return {
                status: 500,
                success: false,
                ...(includeData && { data: null }),
                message: `Failed to create ${entity}`
            };
        }
    }

    /**
     * Read records
     * @param {string} entity - Entity type
     * @param {object} options - Query options (filters, pagination, etc.)
     * @returns {Promise<object>} Records and metadata
     */
    async read(entity, options = {}) {
        try {
            // Special handling for articles entity
            if (entity === 'articles') {
                return await this.getArticles(options);
            }
            
            if (this.storageMode === 'localStorage') {
                return this.readLocal(entity, options);
            } else {
                return this.readApi(entity, options);
            }
        } catch (error) {
            console.error(`Error reading ${entity}:`, error);
            IISMethods.errormsg(`Failed to fetch ${entity}`, 1);
            throw error;
        }
    }

    /**
     * Update record
     * @param {string} entity - Entity type
     * @param {string} id - Record ID
     * @param {object} data - Data to update
     * @param {boolean} includeData - Whether to include data in response (default: true)
     * @returns {Promise<object>} Response with status and optional data
     */
    async update(entity, id, data, includeData = true) {
        try {
            // Special handling for articles entity
            if (entity === 'articles') {
                return await this.updateArticle(id, data);
            }
            
            const recordData = this.addRecordInfo(data, 'update');

            if (this.storageMode === 'localStorage') {
                return this.updateLocal(entity, id, recordData, includeData);
            } else {
                return await this.updateApi(entity, id, recordData, includeData);
            }
        } catch (error) {
            console.error(`Error updating ${entity}:`, error);
            return {
                status: 500,
                success: false,
                ...(includeData && { data: null }),
                message: `Failed to update ${entity}`
            };
        }
    }

    /**
     * Delete record
     * @param {string} entity - Entity type
     * @param {string} id - Record ID
     * @param {boolean} includeData - Whether to include data in response (default: false)
     * @returns {Promise<object>} Response with status
     */
    async delete(entity, id, includeData = false) {
        try {
            // Special handling for articles entity
            if (entity === 'articles') {
                return await this.deleteArticle(id);
            }
            
            if (this.storageMode === 'localStorage') {
                return this.deleteLocal(entity, id, includeData);
            } else {
                return await this.deleteApi(entity, id, includeData);
            }
        } catch (error) {
            console.error(`Error deleting ${entity}:`, error);
            return {
                status: 500,
                success: false,
                ...(includeData && { data: null }),
                message: `Failed to delete ${entity}`
            };
        }
    }

    /**
     * Find record by ID
     * @param {string} entity - Entity type
     * @param {string} id - Record ID
     * @returns {Promise<object|null>} Found record or null
     */
    async findById(entity, id) {
        try {
            if (this.storageMode === 'localStorage') {
                return this.findByIdLocal(entity, id);
            } else {
                return this.findByIdApi(entity, id);
            }
        } catch (error) {
            console.error(`Error finding ${entity} by ID:`, error);
            throw error;
        }
    }

    /**
     * LOCAL STORAGE OPERATIONS
     */

    /**
     * Create record in localStorage
     * @param {string} entity - Entity type
     * @param {object} data - Data to create
     * @param {boolean} includeData - Whether to include data in response
     * @returns {object} Response with status and optional data
     */
    createLocal(entity, data, includeData = true) {
        try {
            const storageKey = entity;
            const existingData = IISMethods.getLocalStorage(storageKey, []);

            existingData.push(data);
            IISMethods.setLocalStorage(storageKey, existingData);

            return {
                status: 200,
                success: true,
                ...(includeData && { data: data }),
                message: `${entity} created successfully`
            };
        } catch (error) {
            return {
                status: 500,
                success: false,
                ...(includeData && { data: null }),
                message: `Failed to create ${entity}`
            };
        }
    }

    /**
     * Read records from localStorage
     * @param {string} entity - Entity type
     * @param {object} options - Query options
     * @returns {object} Records and metadata
     */
    readLocal(entity, options = {}) {
        try {

            console.log('### options', options, 'entity', entity)
            const storageKey = entity;
            let data = IISMethods.getLocalStorage(storageKey, []);

            // Apply filters
            if (options.filters) {
                data = this.applyFilters(data, options.filters);
            }

            // Apply search
            if (options.search) {
                data = this.applySearch(data, options.search);
            }

            // Apply sorting
            if (options.sort) {
                data = this.applySorting(data, options.sort);
            }

            // Apply projection
            if (options.projection) {
                data = this.applyProjection(data, options.projection);
            }

            // Apply pagination
            const totalCount = data.length;

            if (options.pagination) {
                const { page = 1, limit = 20 } = options.pagination;
                const startIndex = (page - 1) * limit;
                const endIndex = startIndex + limit;
                data = data.slice(startIndex, endIndex);
            }

            return {
                status: 200,
                success: true,
                data,
                totalCount,
                page: options.pagination?.page || 1,
                limit: options.pagination?.limit || 20,
                hasNextPage: (options.pagination?.page || 1) * (options.pagination?.limit || 20) < totalCount
            };
        }
        catch (error) {
            console.error(`Error reading ${entity}:`, error);
            return {
                status: 500,
                success: false,
                message: `Failed to read ${entity}`
            };
        }
    }

    /**
     * Update record in localStorage
     * @param {string} entity - Entity type
     * @param {string} id - Record ID
     * @param {object} data - Data to update
     * @param {boolean} includeData - Whether to include data in response
     * @returns {object} Response with status and optional data
     */
    updateLocal(entity, id, data, includeData = true) {
        try {
            const storageKey = entity;
            const existingData = IISMethods.getLocalStorage(storageKey, []);
            const index = existingData.findIndex(item => item._id === id);

            if (index === -1) {
                return {
                    status: 404,
                    success: false,
                    ...(includeData && { data: null }),
                    message: `${entity} not found`
                };
            }

            const updatedRecord = {
                ...existingData[index],
                ...data,
                recordinfo: {
                    ...existingData[index].recordinfo,
                    ...data.recordinfo
                }
            };

            existingData[index] = updatedRecord;
            IISMethods.setLocalStorage(storageKey, existingData);

            return {
                status: 200,
                success: true,
                ...(includeData && { data: updatedRecord }),
                message: `${entity} updated successfully`
            };
        } catch (error) {
            return {
                status: 500,
                success: false,
                ...(includeData && { data: null }),
                message: `Failed to update ${entity}`
            };
        }
    }

    /**
     * Delete record from localStorage
     * @param {string} entity - Entity type
     * @param {string} id - Record ID
     * @param {boolean} includeData - Whether to include data in response
     * @returns {object} Response with status
     */
    deleteLocal(entity, id, includeData = false) {
        try {
            const storageKey = entity;
            const existingData = IISMethods.getLocalStorage(storageKey, []);
            const filteredData = existingData.filter(item => item._id !== id);

            if (filteredData.length === existingData.length) {
                return {
                    status: 404,
                    success: false,
                    ...(includeData && { data: null }),
                    message: `${entity} not found`
                };
            }

            IISMethods.setLocalStorage(storageKey, filteredData);

            return {
                status: 200,
                success: true,
                ...(includeData && { data: null }),
                message: `${entity} deleted successfully`
            };
        } catch (error) {
            return {
                status: 500,
                success: false,
                ...(includeData && { data: null }),
                message: `Failed to delete ${entity}`
            };
        }
    }

    /**
     * Find record by ID in localStorage
     * @param {string} entity - Entity type
     * @param {string} id - Record ID
     * @returns {object|null} Found record or null
     */
    findByIdLocal(entity, id) {
        const storageKey = entity;
        const data = IISMethods.getLocalStorage(storageKey, []);
        return data.find(item => item._id === id) || null;
    }

    /**
     * API OPERATIONS
     */

    /**
     * Create record via API
     * @param {string} entity - Entity type
     * @param {object} data - Data to create
     * @param {boolean} includeData - Whether to include data in response
     * @returns {object} Response with status and optional data
     */
    async createApi(entity, data, includeData = true) {
        try {
            const url = `${this.baseUrl}/${entity}`;
            const response = await this.makeApiRequest(url, {
                method: 'POST',
                body: JSON.stringify(data)
            });

            return {
                status: response.success ? 200 : 500,
                success: response.success,
                ...(includeData && { data: response.data }),
                message: response.message || `${entity} created successfully`
            };
        } catch (error) {
            return {
                status: 500,
                success: false,
                ...(includeData && { data: null }),
                message: error.message || `Failed to create ${entity}`
            };
        }
    }

    /**
     * Read records via API
     * @param {string} entity - Entity type
     * @param {object} options - Query options
     * @returns {object} Records and metadata
     */
    async readApi(entity, options = {}) {
        const queryParams = new URLSearchParams();

        if (options.filters) {
            queryParams.append('filters', JSON.stringify(options.filters));
        }
        if (options.search) {
            queryParams.append('search', options.search);
        }
        if (options.sort) {
            queryParams.append('sort', JSON.stringify(options.sort));
        }
        if (options.pagination) {
            queryParams.append('page', options.pagination.page || 1);
            queryParams.append('limit', options.pagination.limit || 20);
        }

        const url = `${this.baseUrl}/${entity}?${queryParams.toString()}`;
        const response = await this.makeApiRequest(url);

        if (response.success) {
            return response.data;
        } else {
            throw new Error(response.message || `Failed to fetch ${entity}`);
        }
    }

    /**
     * Update record via API
     * @param {string} entity - Entity type
     * @param {string} id - Record ID
     * @param {object} data - Data to update
     * @param {boolean} includeData - Whether to include data in response
     * @returns {object} Response with status and optional data
     */
    async updateApi(entity, id, data, includeData = true) {
        try {
            const url = `${this.baseUrl}/${entity}/${id}`;
            const response = await this.makeApiRequest(url, {
                method: 'PUT',
                body: JSON.stringify(data)
            });

            return {
                status: response.success ? 200 : 500,
                success: response.success,
                ...(includeData && { data: response.data }),
                message: response.message || `${entity} updated successfully`
            };
        } catch (error) {
            return {
                status: 500,
                success: false,
                ...(includeData && { data: null }),
                message: error.message || `Failed to update ${entity}`
            };
        }
    }

    /**
     * Delete record via API
     * @param {string} entity - Entity type
     * @param {string} id - Record ID
     * @param {boolean} includeData - Whether to include data in response
     * @returns {object} Response with status
     */
    async deleteApi(entity, id, includeData = false) {
        try {
            const url = `${this.baseUrl}/${entity}/${id}`;
            const response = await this.makeApiRequest(url, {
                method: 'DELETE'
            });

            return {
                status: response.success ? 200 : 500,
                success: response.success,
                ...(includeData && { data: null }),
                message: response.message || `${entity} deleted successfully`
            };
        } catch (error) {
            return {
                status: 500,
                success: false,
                ...(includeData && { data: null }),
                message: error.message || `Failed to delete ${entity}`
            };
        }
    }

    /**
     * Find record by ID via API
     * @param {string} entity - Entity type
     * @param {string} id - Record ID
     * @returns {object|null} Found record or null
     */
    async findByIdApi(entity, id) {
        const url = `${this.baseUrl}/${entity}/${id}`;
        const response = await this.makeApiRequest(url);

        if (response.success) {
            return response.data;
        } else {
            throw new Error(response.message || `Failed to fetch ${entity}`);
        }
    }

    /**
     * UTILITY FUNCTIONS
     */

    /**
     * Apply filters to data
     * @param {Array} data - Data array
     * @param {object} filters - Filter object
     * @returns {Array} Filtered data
     */
    applyFilters(data, filters) {
        return data.filter(item => {
            return Object.keys(filters).every(key => {
                const filterValue = filters[key];
                const itemValue = item[key];

                if (filterValue === null || filterValue === undefined || filterValue === '') {
                    return true;
                }

                if (typeof filterValue === 'string') {
                    return itemValue && itemValue.toString().toLowerCase().includes(filterValue.toLowerCase());
                }

                if (typeof filterValue === 'object' && filterValue.operator) {
                    switch (filterValue.operator) {
                        case 'eq':
                            return itemValue === filterValue.value;
                        case 'ne':
                            return itemValue !== filterValue.value;
                        case 'gt':
                            return itemValue > filterValue.value;
                        case 'gte':
                            return itemValue >= filterValue.value;
                        case 'lt':
                            return itemValue < filterValue.value;
                        case 'lte':
                            return itemValue <= filterValue.value;
                        case 'in':
                            return filterValue.value.includes(itemValue);
                        case 'nin':
                            return !filterValue.value.includes(itemValue);
                        default:
                            return true;
                    }
                }

                return itemValue === filterValue;
            });
        });
    }

    /**
     * Apply search to data
     * @param {Array} data - Data array
     * @param {string} searchTerm - Search term
     * @returns {Array} Filtered data
     */
    applySearch(data, searchTerm) {
        if (!searchTerm) return data;

        const term = searchTerm.toLowerCase();
        return data.filter(item => {
            return Object.values(item).some(value => {
                if (typeof value === 'string') {
                    return value.toLowerCase().includes(term);
                }
                if (typeof value === 'number') {
                    return value.toString().includes(term);
                }
                return false;
            });
        });
    }

    /**
     * Apply sorting to data
     * @param {Array} data - Data array
     * @param {object} sort - Sort configuration
     * @returns {Array} Sorted data
     */
    applySorting(data, sort) {
        if (!sort.field) return data;

        return data.sort((a, b) => {
            const aValue = a[sort.field];
            const bValue = b[sort.field];

            if (aValue < bValue) return sort.order === 'asc' ? -1 : 1;
            if (aValue > bValue) return sort.order === 'asc' ? 1 : -1;
            return 0;
        });
    }

    /**
     * Apply projection to data (filter fields based on projection object)
     * @param {Array} data - Data array
     * @param {object} projection - Projection configuration (fields with value 1 are included)
     * @returns {Array} Data with projected fields
     */
    applyProjection(data, projection) {
        if (!projection || Object.keys(projection).length === 0) return data;

        return data.map(item => {
            const projectedItem = {};
            Object.keys(projection).forEach(key => {
                if (projection[key] === 1 && item.hasOwnProperty(key)) {
                    projectedItem[key] = item[key];
                }
            });
            return projectedItem;
        });
    }

    /**
     * Migrate data from localStorage to API
     * @param {string} entity - Entity type
     * @returns {Promise<boolean>} Success status
     */
    async migrateToApi(entity) {
        try {
            const storageKey = entity;
            const localData = IISMethods.getLocalStorage(storageKey, []);

            if (localData.length === 0) {
                IISMethods.infomsg(`No ${entity} data to migrate`, 4);
                return true;
            }

            // Switch to API mode
            const originalMode = this.storageMode;
            this.setStorageMode('api');

            // Migrate each record
            for (const record of localData) {
                await this.createApi(entity, record);
            }

            // Clear localStorage data
            IISMethods.removeLocalStorage(storageKey);

            IISMethods.successmsg(`Successfully migrated ${localData.length} ${entity} records to API`, 2);
            return true;
        } catch (error) {
            console.error(`Error migrating ${entity} to API:`, error);
            IISMethods.errormsg(`Failed to migrate ${entity} to API`, 1);
            return false;
        }
    }

    /**
     * Export data to JSON
     * @param {string} entity - Entity type
     * @returns {string} JSON string
     */
    exportData(entity) {
        const storageKey = entity;
        const data = IISMethods.getLocalStorage(storageKey, []);
        return JSON.stringify(data, null, 2);
    }

    /**
     * Import data from JSON
     * @param {string} entity - Entity type
     * @param {string} jsonData - JSON string
     * @returns {boolean} Success status
     */
    importData(entity, jsonData) {
        try {
            const data = JSON.parse(jsonData);
            if (!Array.isArray(data)) {
                throw new Error('Invalid data format');
            }

            const storageKey = entity;
            IISMethods.setLocalStorage(storageKey, data);

            IISMethods.successmsg(`Successfully imported ${data.length} ${entity} records`, 2);
            return true;
        } catch (error) {
            console.error(`Error importing ${entity}:`, error);
            IISMethods.errormsg(`Failed to import ${entity} data`, 1);
            return false;
        }
    }

    /**
     * ADMIN AUTHENTICATION METHODS
     */

    /**
     * Register admin user
     * @param {object} adminData - Admin registration data
     * @returns {Promise<object>} Registration response
     */
    async registerAdmin(adminData) {
        try {
            const url = `${this.baseUrl}${Config.adminRegisterEndpoint}`;
            const response = await this.makeApiRequest(url, {
                method: 'POST',
                body: JSON.stringify(adminData)
            });

            return {
                status: response.success ? 200 : 400,
                success: response.success,
                data: response.data,
                message: response.message || 'Admin registration completed'
            };
        } catch (error) {
            console.error('Admin registration error:', error);
            return {
                status: 500,
                success: false,
                data: null,
                message: error.message || 'Admin registration failed'
            };
        }
    }

    /**
     * Login admin user
     * @param {object} loginData - Login credentials
     * @returns {Promise<object>} Login response
     */
    async loginAdmin(loginData) {
        try {
            const url = `${this.baseUrl}${Config.adminLoginEndpoint}`;
            const response = await this.makeApiRequest(url, {
                method: 'POST',
                body: JSON.stringify(loginData)
            });

            if (response.success && response.data) {
                // Store admin session data
                const sessionData = {
                    adminId: response.data.admin._id,
                    username: response.data.admin.username,
                    email: response.data.admin.email,
                    role: response.data.admin.role,
                    token: response.data.token,
                    lastLogin: response.data.admin.lastLogin
                };
                
                sessionStorage.setSession(sessionData, response.data.token);
            }

            return {
                status: response.success ? 200 : 401,
                success: response.success,
                data: response.data,
                message: response.message || 'Login completed'
            };
        } catch (error) {
            console.error('Admin login error:', error);
            return {
                status: 500,
                success: false,
                data: null,
                message: error.message || 'Admin login failed'
            };
        }
    }

    /**
     * ARTICLE MANAGEMENT METHODS
     */

    /**
     * Get all articles with pagination and filters
     * @param {object} params - Query parameters
     * @returns {Promise<object>} Articles response
     */
    async getArticles(options = {}) {
        try {
            console.log('getArticles called with options:', options);
            const queryParams = new URLSearchParams();
            
            // Handle pagination from options
            const pagination = options.pagination || {};
            if (pagination.page) queryParams.append('page', pagination.page);
            if (pagination.limit) queryParams.append('limit', pagination.limit);
            
            // Handle search from options
            if (options.search) {
                console.log('Adding search parameter:', options.search);
                queryParams.append('search', options.search);
            }
            
            // Handle filters from options - dynamic handling for all filter fields
            const filters = options.filters || {};
            console.log('Processing filters:', filters);
            Object.keys(filters).forEach(key => {
                if (filters[key] && filters[key] !== '') {
                    console.log(`Adding filter parameter: ${key} = ${filters[key]}`);
                    queryParams.append(key, filters[key]);
                }
            });

            const url = `${this.baseUrl}${Config.articlesEndpoint}${queryParams.toString() ? '?' + queryParams.toString() : ''}`;
            const response = await this.makeApiRequest(url, {
                method: 'GET'
            });

            return {
                status: response.success ? 200 : 400,
                success: response.success,
                data: response.data?.articles || [],
                pagination: response.data?.pagination || {},
                totalCount: response.data?.pagination?.total || 0,
                totalcount: response.data?.pagination?.total || 0, // For backward compatibility
                hasNextPage: response.data?.pagination?.current < response.data?.pagination?.pages,
                message: response.message || 'Articles fetched successfully'
            };
        } catch (error) {
            console.error('Get articles error:', error);
            return {
                status: 500,
                success: false,
                data: [],
                pagination: {},
                totalCount: 0,
                totalcount: 0, // For backward compatibility
                hasNextPage: false,
                message: error.message || 'Failed to fetch articles'
            };
        }
    }

    /**
     * Update article
     * @param {string} id - Article ID
     * @param {object} data - Article data
     * @returns {Promise<object>} Update response
     */
    async updateArticle(id, data) {
        try {
            const url = `${this.baseUrl}${Config.articleByIdEndpoint}/${id}`;
            
            // Create FormData for multipart/form-data
            const formData = new FormData();
            
            // Add text fields - handle fields that might have "0" as valid value
            if (data.title) formData.append('title', data.title);
            if (data.content) formData.append('content', data.content);
            
            // Handle status field properly - "0" is a valid status value
            if (data.status !== undefined && data.status !== null && data.status !== '') {
                formData.append('status', data.status);
            }
            
            if (data.journal) formData.append('journal', data.journal);
            if (data.journalCode) formData.append('journalCode', data.journalCode);
            if (data.articleType) formData.append('articleType', data.articleType);
            
            // Add other fields that might have "0" as valid value
            if (data.badgeType !== undefined && data.badgeType !== null && data.badgeType !== '') {
                formData.append('badgeType', data.badgeType);
            }
            if (data.excerpt !== undefined && data.excerpt !== null && data.excerpt !== '') {
                formData.append('excerpt', data.excerpt);
            }
            if (data.keywords && Array.isArray(data.keywords)) {
                formData.append('keywords', JSON.stringify(data.keywords));
            }
            if (data.authors && Array.isArray(data.authors)) {
                formData.append('authors', JSON.stringify(data.authors));
            }
            if (data.date) {
                formData.append('date', data.date);
            }
            
            // Add image file if provided
            if (data.image && data.image instanceof File) {
                formData.append('image', data.image);
            }

            // Debug: Log what's being sent in FormData
            console.log('FormData contents:');
            for (let [key, value] of formData.entries()) {
                console.log(`${key}:`, value);
            }

            const response = await this.makeApiRequest(url, {
                method: 'PUT',
                body: formData
                // Don't set headers, let makeApiRequest handle Authorization and Content-Type
            });

            // Handle different response structures including string status values
            const isSuccess = response.success !== false && response.data;
            const responseStatus = response.status;
            
            // Handle string status values ("0" = success, "1" = error) or boolean/numeric values
            let finalStatus;
            if (typeof responseStatus === 'string') {
                finalStatus = responseStatus === "0" ? 200 : 400; // "0" means success
            } else {
                finalStatus = isSuccess ? 200 : 400;
            }
            
            return {
                status: finalStatus,
                success: finalStatus === 200,
                data: response.data || response,
                message: response.message || 'Article updated successfully'
            };
        } catch (error) {
            console.error('Update article error:', error);
            return {
                status: 500,
                success: false,
                data: null,
                message: error.message || 'Failed to update article'
            };
        }
    }

    /**
     * Delete article
     * @param {string} id - Article ID
     * @returns {Promise<object>} Delete response
     */
    async deleteArticle(id) {
        try {
            const url = `${this.baseUrl}${Config.articleByIdEndpoint}/${id}`;
            const response = await this.makeApiRequest(url, {
                method: 'DELETE'
            });

            return {
                status: response.success ? 200 : 400,
                success: response.success,
                message: response.message || 'Article deleted successfully'
            };
        } catch (error) {
            console.error('Delete article error:', error);
            return {
                status: 500,
                success: false,
                message: error.message || 'Failed to delete article'
            };
        }
    }
}

// Create singleton instance
const apiService = new ApiService();

export default apiService;
