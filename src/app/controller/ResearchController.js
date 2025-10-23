'use client';

import { useState, useEffect } from 'react';
import MasterJson from '@/config/masterJSON';
import IISMethods from '@/utils/IISMethods';
import { setProps, getCurrentState, getSortData } from '@/utils/reduxUtils';
import ResearchView from '@/app/view/research/ResearchView';
import { useAppSelector } from '@/store/hooks';
import JsCall from '@/utils/JsCall';
import Config from '@/config/config';
import ApiService from '@/utils/ApiService';

const ResearchController = (props) => {
    const rightSidebarData = useAppSelector(state => state.rightsidebarformdata);
    const formData = useAppSelector(state => state.formdata);
    const filterData = useAppSelector(state => state.filterdata);
    const pagelimit = useAppSelector(state => state.pagelimit);
    const pageno = useAppSelector(state => state.pageno);
    const nextpage = useAppSelector(state => state.nextpage);
    const totalcount = useAppSelector(state => state.totalcount);

    useEffect(() => {
        setProps({
            data: [],
            formData: {},
            filterData: {},
            masterdata: [],
            masterdatalist: [],
            modal: [],
            pageno: 1,
            pagename: '',
            nextpage: 0,
            totalcount: 0,
            pagelimit: 20,
            sortdata: { field: 'createdAt', order: -1 }, // Default: last added first
        });

        // Load category on component mount
        getlist();
    }, []);

    useEffect(() => {
        setProps({
            pagename: getCurrentState().rightsidebarformdata?.[0]?.pagename || '',
        });
    }, [getCurrentState().rightsidebarformdata?.[0]?.pagename]);

    const setFormData = async (id) => {

        if (id) {
            const data = IISMethods.getObjectfromArray(getCurrentState().data, '_id', id)

            setProps({ formdata: IISMethods.getcopy(data) })
        }
        else {
            const currentState = getCurrentState();
            const formData = { ...currentState.formdata };

            currentState.rightsidebarformdata?.map(item => {
                if (item.fields && Array.isArray(item.fields)) {
                    item.fields.forEach(fields => {
                        if (fields.type === 'checkbox') {
                            formData[fields.field] = fields.defaultvalue ? 1 : 0;
                        }
                        else {
                            formData[fields.field] = fields.defaultvalue;
                        }
                    })
                }
            })

            setProps({ formdata: IISMethods.getcopy(formData) })
        }

        IISMethods.handleGrid(true, 'rightsidebar', 1)
    }

    const handleAddButtonClick = () => {
        console.log('formData', getCurrentState().formdata)
        console.log('rightSidebarData', rightSidebarData)

        console.log('JsCall.ValidateForm(formData, rightSidebarData)', JsCall.ValidateForm(getCurrentState().formdata, rightSidebarData))
        const validateForm = JsCall.ValidateForm(getCurrentState().formdata, rightSidebarData)
        if (validateForm.hasErrors && Object.keys(validateForm.errors).length > 1) {
            console.log('formData has errors')
            IISMethods.errormsg(Config.fillallfieldserror, 1)
        }
        else if (validateForm.hasErrors && Object.keys(validateForm.errors).length === 1) {
            console.log('formData is valid')
            IISMethods.errormsg(Object.values(validateForm.errors)[0], 1)
        }
        else {
            rightSidebarData.forEach(item => {
                if (item.fields && Array.isArray(item.fields)) {
                    item.fields.forEach(field => {
                        const element = document.getElementById(`form-${field.field}`);

                        // 🔹 Only proceed if element exists (i.e., not hidden)
                        if (!element) {
                            console.log('Visible field:', field.field, 'Value:', element.value);
                            if (field.type === 'checkbox') {
                                getCurrentState().formdata[field.field] = 0;
                            }
                            else {
                                getCurrentState().formdata[field.field] = ''
                            }
                        }
                    })
                }
            })

            setProps({ formdata: IISMethods.getcopy(getCurrentState().formdata) })

            console.log('Filtered Form Data:');

            if (getCurrentState().formdata._id) {
                updateData(getCurrentState().formdata._id, getCurrentState().formdata)
            }
            else {
                addData(getCurrentState().formdata)
            }
        }
    }

    const handleFormData = (type, key, value) => {
        console.log('handleFormData', type, key, value)
        const currentState = getCurrentState();
        const formData = { ...currentState.formdata };
        if (type === 'checkbox') {
            formData[key] = value ? 1 : 0;
        }
        else {
            formData[key] = value;
        }
        setProps({ formdata: IISMethods.getcopy(formData) })

        const newRightSidebarFormData = IISMethods.createRightSidebarData(key, rightSidebarData)
        const newFormData = IISMethods.createFormData(key, value)
        console.log('newRightSidebarFormData', newRightSidebarFormData)
        console.log('newFormData', newFormData)
        JsCall.ValidateForm(newFormData, newRightSidebarFormData)
    }

    const updateData = async (id, formData) => {
        try {
            console.log('updateData', id, formData);

            // Use ApiService to update data
            const responseData = await ApiService.update('articles', id, formData);
            console.log('Updated record:', responseData);

            if (responseData.status === 200) {
                IISMethods.successmsg(Config.dataupdated, 2);
                IISMethods.handleGrid(false, 'rightsidebar', 0)
                // Refresh the data list
                getlist();
            } else {
                IISMethods.errormsg(responseData.message || Config.dataaddedfailed, 1);
            }

        } catch (error) {
            console.error('Error updating category:', error);
        }
    }

    const addData = async (reqData) => {
        try {
            console.log('addData', reqData);

            // Use ApiService to create data
            const responseData = await ApiService.create('submit-research', reqData);
            console.log('Created record:', responseData);

            if (responseData.status === 200) {
                IISMethods.successmsg(Config.dataaddedsuccessfully, 1)
                IISMethods.handleGrid(false, 'rightsidebar', 0)
                getlist()
            }
            else {
                IISMethods.errormsg(Config.dataaddedfailed, 1)
            }

        } catch (error) {
            console.error('Error adding category:', error);
        }
    }

    const getlist = async () => {
        try {
            let filter = IISMethods.getcopy(getCurrentState().filterdata) || {};
            let sortData = getSortData();

            // Extract searchbar BEFORE passing to ApiService
            const searchTerm = filter?.searchbar || '';

            // Remove searchbar from filters IMMEDIATELY
            if (filter.hasOwnProperty('searchbar')) {
                delete filter.searchbar;
            }

            // Clean up empty filter values
            Object.keys(filter).forEach(key => {
                if (filter[key] === '' || filter[key] === null || filter[key] === undefined) {
                    delete filter[key];
                }
            })

            console.log('filter 23445', filter)
            console.log('searchTerm:', searchTerm)
            console.log('pagination:', { page: getCurrentState().pageno, limit: getCurrentState().pagelimit })

            // Set loading state
            setProps({ loading: true });
            // Call ApiService with clean filters and separate search
            const result = await ApiService.read('articles', {
                pagination: {
                    page: getCurrentState().pageno,
                    limit: getCurrentState().pagelimit
                },
                sort: sortData,
                filters: filter,  // Clean filters WITHOUT searchbar
                search: searchTerm  // Search term separately
            });

            console.log('result result', result)
            // Update Redux state with the response data
            if (result && result.data) {
                setProps({
                    data: result.data,
                    totalcount: result.totalCount || result.totalcount || 0,
                    nextpage: result.hasNextPage ? 1 : 0,
                    loading: false
                });

                console.log('Updated state with:', {
                    dataCount: result.data.length,
                    totalCount: result.totalCount || result.totalcount,
                    hasNextPage: result.hasNextPage
                });
            } else {
                // Handle case where no data is returned
                setProps({
                    data: [],
                    totalcount: 0,
                    nextpage: 0,
                    loading: false
                });
                console.log('No data returned from API');
            }

        } catch (error) {
            console.error('Error loading category:', error);

            // Update state to show error and stop loading
            setProps({
                data: [],
                totalcount: 0,
                nextpage: 0,
                loading: false,
                error: error.message || 'Failed to load category'
            });

            // Show error message to user
            IISMethods.errormsg('Failed to load category. Please try again.', 1);
        }
    }

    // Handle page change
    const handlePageChange = (newPage) => {
        setProps({ pageno: newPage });
        getlist(); // Reload data with new page
    }

    // Handle page size change
    const handlePageSizeChange = (newPageSize) => {
        setProps({
            pagelimit: newPageSize,
            pageno: 1 // Reset to first page when changing page size
        });
        getlist(); // Reload data with new page size
    }

    // Handle filter change
    const handleFilterChange = (newFilters) => {
        setProps({
            filterdata: newFilters,
            pageno: 1 // Reset to first page when filtering
        });
        getlist(); // Reload data with new filters
    }

    // Handle sort change
    const handleSortChange = (field, order) => {
        setProps({
            sortdata: { field, order },
            pageno: 1 // Reset to first page when sorting
        });
        getlist(); // Reload data with new sort
    }

    const handleDeleteData = async (id) => {
        try {
            const result = await ApiService.delete('articles', id);
            console.log('result', result);
            if (result.status === 200) {
                IISMethods.successmsg(Config.datadeleted, 1)
                IISMethods.handleGrid(false, 'deletemodal', 0)
                getlist();
            }
            else {
                IISMethods.errormsg(Config.dataaddedfailed, 1)
            }
        } catch (error) {
            console.error('Error deleting category:', error);
        }
    }

    const handleSearch = (searchTerm) => {
        setProps({ filterdata: { ...getCurrentState().filterdata, searchbar: searchTerm }, pageno: 1 })

        setProps({ oldfilterdata: { ...getCurrentState().filterdata, searchbar: searchTerm } })
        getlist()
    }

    try {
        return (
            <>
                <div>
                    <ResearchView
                        setFormData={setFormData}
                        handleAddButtonClick={handleAddButtonClick}
                        handleFormData={handleFormData}
                        handlePageChange={handlePageChange}
                        handlePageSizeChange={handlePageSizeChange}
                        handleFilterChange={handleFilterChange}
                        handleSortChange={handleSortChange}
                        getlist={getlist}
                        handleDeleteData={handleDeleteData}
                        handleSearch={handleSearch}
                        updateData={updateData}
                    />
                </div>
            </>
        );
    }
    catch (e) {
        console.log('error', e);
        return <></>;
    }
};

export default ResearchController;
