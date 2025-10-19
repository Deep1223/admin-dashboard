'use client';

import { useState, useEffect } from 'react';
import { setProps, getCurrentState } from '@/utils/reduxUtils';
import { useAppSelector } from '@/store/hooks';
import SearchBar from '@/components/SearchBar';
import Config from '@/config/config';
import CategoryGridList from './categorygridlist';
import RightSidebar from '@/components/RightSIdebar';
import DeleteModal from '@/components/DeleteModal';
import { BiFilterAlt } from "react-icons/bi";
import DrawerRsuite from '@/components/DrawerRsuite';
import IISMethods from '@/utils/IISMethods';
import FilterRightSidebar from '@/components/FilterRightSidebar';
import InfoModal from '@/components/InfoModal';
import FilteredDataBadge from '@/components/FilteredDataBadge';

const CategoryView = (props) => {
    // Redux hook at the top of component
    const rightSidebarData = useAppSelector(state => state.rightsidebarformdata);
    const filterData = useAppSelector(state => state.filterdata);

    const [viewDetails, setViewDetails] = useState({})
    const [deleteDetails, setDeleteDetails] = useState({})
    const [viewInfoData, setViewInfoData] = useState({})
    const [searchTerm, setSearchTerm] = useState(filterData?.searchbar || "")

    // Sync searchTerm with filterdata from Redux
    useEffect(() => {
        setSearchTerm(filterData?.searchbar || "");
        console.log('CategoryView - filterdata changed:', filterData);
    }, [filterData?.searchbar]);

    // Log filterdata changes for debugging
    useEffect(() => {
        console.log('CategoryView - filterdata updated:', filterData);
    }, [filterData]);

    const handleSearch = (term) => {
        setSearchTerm(term);
        props.handleSearch(term);
    }

    const handleSetSearchTerm = (term) => {
        setSearchTerm(term);
    }

    try {
        return (
            <>
                {/* Page Header */}
                <div className="d-flex align-items-center justify-content-between pb-2">
                    <h1 className="h4 fw-medium text-dark">{rightSidebarData?.[0]?.pagename}</h1>
                    <div className="d-flex align-items-center gap-2">
                        <SearchBar
                            handleSearch={handleSearch}
                            searchTerm={searchTerm}
                            setSearchTerm={handleSetSearchTerm}
                        />
                        <button
                            className="btn btn-primary"
                            onClick={async() => {await props.setFormData()}}
                        >
                            {Config.createbtn}
                        </button>
                        <div>
                            <button className="btn btn-primary py-4p px-9p d-flex align-items-center" onClick={() => IISMethods.handleGrid(true, 'filterdrawer', 1)}>
                                <BiFilterAlt className="text-white text-20" />
                            </button>
                        </div>
                    </div>
                </div>

                <FilteredDataBadge 
                    getlist={props.getlist}
                />

                {/* Table Component */}
                <CategoryGridList
                    setViewDetails={setViewDetails}
                    handleSortChange={props.handleSortChange}
                    setFormData={props.setFormData}
                    handleDeleteData={props.handleDeleteData}
                    setDeleteDetails={setDeleteDetails}
                    setViewInfoData={setViewInfoData}
                    handleFormData={props.handleFormData}
                    updateData={props.updateData}
                />

                <RightSidebar
                    handleAddButtonClick={props.handleAddButtonClick}
                    handleFormData={props.handleFormData}
                    viewDetails={viewDetails}
                />

                <DeleteModal
                    handleDeleteData={props.handleDeleteData}
                    deleteDetails={deleteDetails}
                />

                <FilterRightSidebar
                    getlist={props.getlist}
                />

                <InfoModal
                    viewInfoData={viewInfoData}
                />
            </>
        );
    }
    catch (e) {
        console.log('error', e);
        return <></>;
    }
};

export default CategoryView;
