'use client';

import { useAppSelector } from "@/store/hooks";
import DrawerRsuite from "./DrawerRsuite";
import IISMethods from "@/utils/IISMethods";
import { getCurrentState, setProps } from "@/utils/reduxUtils";
import { DatePicker } from "rsuite";

const FilterRightSidebar = (props) => {
    const pagename = useAppSelector(state => state.pagename);
    const filterdata = useAppSelector(state => state.filterdata);
    const oldfilterdata = useAppSelector(state => state.oldfilterdata);
    
    const FilterRightSidebarData = useAppSelector(state => state.rightsidebarformdata);
    const FilterFormData = IISMethods.getFilterFormData(FilterRightSidebarData);

    const handleFilterData = (type, field, value) => {
        const currentState = getCurrentState();
        const filterData = { ...currentState.filterdata };
        
        // Handle DatePicker values with error handling
        if (type === 'datepicker') {
            try {
                filterData[field] = value ? new Date(value).toISOString() : '';
            } catch (error) {
                console.error('Error handling date filter:', error);
                IISMethods.errormsg('Invalid date selected for filter', 1);
                filterData[field] = '';
            }
        } else {
            filterData[field] = value;
        }
        
        setProps({ filterdata: IISMethods.getcopy(filterData) })
    }

    const handleApplyFilter = () => {
        setProps({ oldfilterdata: IISMethods.getcopy(getCurrentState().filterdata) })
        props.getlist()

        IISMethods.handleGrid(false, 'filterdrawer', 0)
    }

    try {
        return (
            <DrawerRsuite
                title={`Filter ${pagename}`}
                body={
                    <form onSubmit={(e) => e.preventDefault()} className="d-flex flex-column h-100 overflow-hidden gap-15">
                        <div className="border border-radius-4 px-12 mt-12 h-100 overflow-auto mb-12 p-16p">
                            <div className="row">
                                {FilterFormData.map((item, index) => (
                                    item.filtertype === 'text' ? (
                                        <div className="col-12" key={index}>
                                            <div className="form-group validate-input">
                                                <label className="label-form-control">{item.label}</label>
                                                <div className="form-control p-0 rs-auto-complete">
                                                    <input
                                                        name={item.field}
                                                        id={`filter-${item.field}`}
                                                        type="text"
                                                        className="rs-input"
                                                        placeholder={item.placeholder}
                                                        defaultValue={filterdata[item.field]}
                                                        onBlur={(e) => handleFilterData('text', item.field, e.target.value)}
                                                        autoComplete="on"
                                                    />
                                                </div>
                                            </div>
                                        </div>
                                    ) : item.filtertype === 'datepicker' ? (
                                        <div className="col-12" key={index}>
                                            <div className="form-group validate-input">
                                                <label className="label-form-control">{item.label}</label>
                                                <DatePicker
                                                    defaultValue={filterdata[item.field] ? new Date(filterdata[item.field]) : null}
                                                    onChange={(value) => handleFilterData('datepicker', item.field, value)}
                                                    id={`filter-${item.field}`}
                                                    name={item.field}
                                                    placeholder={item.filterplaceholder || `Select ${item.label}`}
                                                    style={{ width: '100%' }}
                                                    size="md"
                                                    format="yyyy-MM-dd"
                                                    cleanable={true}
                                                />
                                            </div>
                                        </div>
                                    ) : (
                                        <div className="col-12" key={index}>
                                            <div className="form-group validate-input">
                                                <label className="label-form-control">{item.label}</label>
                                                <div className="form-control p-0 rs-auto-complete">
                                                    <input
                                                        name={item.field}
                                                        id={`filter-${item.field}`}
                                                        type="text"
                                                        className="rs-input"
                                                        placeholder={item.placeholder}
                                                        autoComplete="off"
                                                    />
                                                </div>
                                            </div>
                                        </div>
                                    )
                                ))}
                            </div>
                        </div>

                        <div className="d-flex gap-10 justify-content-end">
                            <button type="button" className="btn btn-primary" onClick={() => {handleApplyFilter()}}>Apply</button>
                            <button type="button" className="btn btn-secondary" onClick={() => IISMethods.handleGrid(false, 'filterdrawer', 0)}>Close</button>
                        </div>
                    </form>
                }
            />
        )
    }
    catch (error) {
        console.log('error', error);
    }
}

export default FilterRightSidebar;