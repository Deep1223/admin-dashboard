'use client';

import { useEffect } from 'react';
import IISMethods from '@/utils/IISMethods';
import { setProps, getCurrentState, getSortData } from '@/utils/reduxUtils';
import ResearchStudyView from '@/app/view/researchstudy/ResearchStudyView';
import { useAppSelector } from '@/store/hooks';
import JsCall from '@/utils/JsCall';
import Config from '@/config/config';
import ApiService from '@/utils/ApiService';

const ResearchStudyController = (props) => {
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

        // Load research study on component mount
        getlist();
    }, []);

    useEffect(() => {
        const currentPageName = getCurrentState().rightsidebarformdata?.[0]?.pagename || '';
        setProps({
            pagename: currentPageName,
        });
    }, [rightSidebarData]);

    const printSelectPicker = (item, fields) => {
        return item[fields.masterdatafield]
    }

    const getMasterData = async (page, fields) => {
        const staticfilter = fields.staticfilter || {};
        
        // Filter projection to only include fields with value 1
        let projection = {};
        if (fields.projection) {
            Object.keys(fields.projection).forEach(key => {
                if (fields.projection[key] === 1) {
                    projection[key] = 1;
                }
            })
        }
        
        const result = await ApiService.read(fields.masterdata, {
            pagination: {
                page: page,
                limit: Number.MAX_SAFE_INTEGER
            },
            sort: {},
            filters: { ...staticfilter },
            projection: projection,
        })

        if (result.status === 200) {
            const data = result.data.map(item => ({
                label: printSelectPicker(item, fields),
                value: item._id
            }));
            
            const masterdata = {
                [fields.masterdata]: data
            }

            const masterdatalist = {
                [fields.masterdata]: result.data
            }

            console.log('### masterdata', masterdata, '### masterdatalist', masterdatalist);
            setProps({ masterdatalist: IISMethods.getcopy(masterdatalist), masterdata: IISMethods.getcopy(masterdata) })
        }
        else {
            IISMethods.errormsg(result.message || Config.dataaddedfailed, 1)
        }
    }

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

        getCurrentState().rightsidebarformdata?.map(item => {
            if (item.fields && Array.isArray(item.fields)) {
                item.fields.forEach(fields => {
                    if (fields.type === 'dropdown') {
                        if (fields.masterdata && !fields.masterdataarray) {
                            getMasterData(1, fields);
                        }
                        else if (fields.masterdataarray && fields.masterdata) {
                            console.log('### fields.masterdatalist', fields.masterdataarray);
                            setProps({ masterdata: { [fields.masterdata]: IISMethods.getcopy(fields.masterdataarray) } })
                        }
                    }
                })
            }
        })

        IISMethods.handleGrid(true, 'rightsidebar', 1)
    }

    const handleAddButtonClick = () => {
        const validateForm = JsCall.ValidateForm(getCurrentState().formdata, rightSidebarData)
        if (validateForm.hasErrors && Object.keys(validateForm.errors).length > 1) {
            IISMethods.errormsg(Config.fillallfieldserror, 1)
        }
        else if (validateForm.hasErrors && Object.keys(validateForm.errors).length === 1) {
            IISMethods.errormsg(Object.values(validateForm.errors)[0], 1)
        }
        else {
            rightSidebarData.forEach(item => {
                if (item.fields && Array.isArray(item.fields)) {
                    item.fields.forEach(field => {
                        const element = document.getElementById(`form-${field.field}`);

                        // 🔹 Only proceed if element exists (i.e., not hidden)
                        if (!element) {
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

            if (getCurrentState().formdata._id) {
                updateData(getCurrentState().formdata._id, getCurrentState().formdata)
            }
            else {
                addData(getCurrentState().formdata)
            }
        }
    }

    const handleFormData = (type, key, value) => {
        const currentState = getCurrentState();
        const formData = { ...currentState.formdata };
        if (type === 'checkbox') {
            formData[key] = value ? 1 : 0;
        }
        else if (type === 'dropdown') {
            const fieldObj = IISMethods.getObjectfromArray(IISMethods.createRightSidebarDataWithoutFields(rightSidebarData), 'field', key);
            if (fieldObj) {
                if (fieldObj.masterdata) {
                    formData[fieldObj.field] = value ? value : '';
                    formData[fieldObj.formdatafield] = value ? IISMethods.getObjectfromArray(currentState.masterdata[fieldObj.masterdata], 'value', value)?.label : '';
                }
                else if (fieldObj.masterdataarray) {
                    formData[fieldObj.field] = value ? value : '';
                    formData[fieldObj.formdatafield] = value ? IISMethods.getObjectfromArray(currentState.masterdata[fieldObj.masterdataarray], 'value', value)?.label : '';
                }
            }
        }
        else if (type === 'datepicker') {
            try {
                formData[key] = value ? new Date(value).toISOString() : '';
            } catch (error) {
                console.error('Error handling date form data:', error);
                IISMethods.errormsg('Invalid date selected', 1);
                formData[key] = '';
            }
        }
        else {
            formData[key] = value;
        }

        setProps({ formdata: IISMethods.getcopy(formData) })

        const newRightSidebarFormData = IISMethods.createRightSidebarData(key, rightSidebarData)
        const newFormData = IISMethods.createFormData(key, formData[key]) // Use the processed formData value, not the original value
        JsCall.ValidateForm(newFormData, newRightSidebarFormData)
    }

    const updateData = async (id, formData) => {
        try {
            // Use ApiService to update data
            const responseData = await ApiService.update('researchstudy', id, formData);

            if (responseData.status === 200) {
                IISMethods.successmsg(Config.dataupdated, 2);
                IISMethods.handleGrid(false, 'rightsidebar', 0)
                // Refresh the data list
                getlist();
            } else {
                IISMethods.errormsg(responseData.message || Config.dataaddedfailed, 1);
            }

        } catch (error) {
            console.error('Error updating research study:', error);
        }
    }

    const addData = async (reqData) => {
        try {
            // Use ApiService to create data
            const responseData = await ApiService.create('researchstudy', reqData);

            if (responseData.status === 200) {
                IISMethods.successmsg(Config.dataaddedsuccessfully, 1)
                IISMethods.handleGrid(false, 'rightsidebar', 0)
                getlist()
            }
            else {
                IISMethods.errormsg(Config.dataaddedfailed, 1)
            }

        } catch (error) {
            console.error('Error adding research study:', error);
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

            // Set loading state
            setProps({ loading: true });

            // Call ApiService with clean filters and separate search
            const result = await ApiService.read('researchstudy', {
                pagination: {
                    page: getCurrentState().pageno,
                    limit: getCurrentState().pagelimit
                },
                sort: sortData,
                filters: filter,  // Clean filters WITHOUT searchbar
                search: searchTerm  // Search term separately
            });

            // Update Redux state with the response data
            if (result && result.data) {
                setProps({
                    data: result.data,
                    totalcount: result.totalCount || result.totalcount || 0,
                    nextpage: result.hasNextPage ? 1 : 0,
                    loading: false
                })
            } else {
                // Handle case where no data is returned
                setProps({
                    data: [],
                    totalcount: 0,
                    nextpage: 0,
                    loading: false
                })
            }

        } catch (error) {
            console.error('Error loading research study:', error);

            // Update state to show error and stop loading
            setProps({
                data: [],
                totalcount: 0,
                nextpage: 0,
                loading: false,
                error: error.message || 'Failed to load research study'
            });

            // Show error message to user
            IISMethods.errormsg('Failed to load research study. Please try again.', 1);
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
            const result = await ApiService.delete('researchstudy', id)
            if (result.status === 200) {
                IISMethods.successmsg(Config.datadeleted, 1)
                IISMethods.handleGrid(false, 'deletemodal', 0)
                getlist();
            }
            else {
                IISMethods.errormsg(Config.dataaddedfailed, 1)
            }
        } catch (error) {
            console.error('Error deleting research study:', error);
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
                    <ResearchStudyView
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

export default ResearchStudyController;
