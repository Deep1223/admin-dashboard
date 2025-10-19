'use client';

import { IoIosClose } from "react-icons/io";
import { useAppSelector } from "@/store/hooks";
import IISMethods from "@/utils/IISMethods";
import { getCurrentState, setProps } from "@/utils/reduxUtils";

const FilteredDataBadge = (props) => {
    const oldfilterdata = useAppSelector(state => state.oldfilterdata);
    const rightSidebarData = useAppSelector(state => state.rightsidebarformdata);

    const handleRemoveFilter = (item) => {
        const currentState = getCurrentState();
        const filterData = { ...currentState.filterdata };
        filterData[item.field] = '';
        setProps({ filterdata: IISMethods.getcopy(filterData) })
        setProps({ oldfilterdata: IISMethods.getcopy(filterData) })

        props.getlist() 
    }

    try {
        return (
            <>
                <div className="filter-display d-flex flex-wrap gap-2">
                    {IISMethods.getFilteredData(oldfilterdata, rightSidebarData).length > 0 &&
                        IISMethods.getFilteredData(oldfilterdata, rightSidebarData).map((item, index) => (
                            <div className="filter-badge" key={index}>
                                <span className="filter-label">{item.text}:</span>
                                <span className="filter-value">{item.value}</span>
                                <span
                                    className="filter-remove"
                                    onClick={() => handleRemoveFilter(item)}
                                >
                                    <IoIosClose />
                                </span>
                            </div>
                        ))}
                </div>

            </>
        )
    }
    catch (error) {
        console.log('error', error);
        return <></>;
    }
}
export default FilteredDataBadge;