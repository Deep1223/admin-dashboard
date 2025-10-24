'use client';

import { useState, useEffect } from 'react';
import { useAppSelector } from '@/store/hooks';
import SearchBar from '@/components/SearchBar';
import DeleteModal from '@/components/DeleteModal';
import { BiFilterAlt } from "react-icons/bi";
import IISMethods from '@/utils/IISMethods';
import FilterRightSidebar from '@/components/FilterRightSidebar';
import InfoModal from '@/components/InfoModal';
import FilteredDataBadge from '@/components/FilteredDataBadge';
import GridList from '@/app/common/GridList';
import RightSidebar from '@/components/RightSIdebar';

const ResearchView = (props) => {
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
    }, [filterData?.searchbar]);

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

                <RightSidebar
                    viewDetails={viewDetails}
                />

                {/* Table Component */}
                <GridList
                    setViewDetails={setViewDetails}
                    handleSortChange={props.handleSortChange}
                    setFormData={props.setFormData}
                    handleDeleteData={props.handleDeleteData}
                    setDeleteDetails={setDeleteDetails}
                    setViewInfoData={setViewInfoData}
                    handleFormData={props.handleFormData}
                    updateData={props.updateData}
                    filtereddata={filterData}
                    noneditable={true}
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

export default ResearchView;
