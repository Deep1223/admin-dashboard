'use static'

import { useState, useEffect, useRef } from "react";
import { BsThreeDotsVertical } from "react-icons/bs";
import { FaRegEdit } from "react-icons/fa";
import { RiDeleteBin6Line } from "react-icons/ri";
import { IoEyeOutline } from "react-icons/io5";
import { TbGridDots } from "react-icons/tb";
import { FaSortAmountDown, FaSortAmountDownAlt, FaInfoCircle } from "react-icons/fa";
import { AiOutlineFileAdd } from "react-icons/ai";
import { FaAngleDown, FaAngleUp, FaX, FaRegRectangleList } from 'react-icons/fa6';
import NoDataFound from "@/components/NoDataFound";
import { useAppSelector } from "@/store/hooks";
import IISMethods from "@/utils/IISMethods";
import { getCurrentState, getSortData } from "@/utils/reduxUtils";
import { FiEye } from "react-icons/fi";
import ModalRsuite from "@/components/modalrsuite";

const ThreeDotMenu = (props) => {
    return (
        <>
            <div
                ref={props.dropdownRef}
                className="dropdown-menu show position-absolute shadow-lg border rounded-3 border-radius-4 top-32 w-200p"
                onMouseEnter={(e) => e.stopPropagation()}
                onMouseLeave={(e) => e.stopPropagation()}
            >
                <button className="dropdown-item d-flex align-items-center gap-2 py-2 border-bottom" onClick={async () => {
                    await props.setFormData(props.data._id);
                    props.setDropdownOpen(null);
                }}>
                    <FaRegEdit /> Edit
                </button>

                <button
                    className="dropdown-item d-flex align-items-center gap-2 py-2 border-bottom"
                    onClick={async () => {
                        props.setDeleteDetails(props.data);
                        IISMethods.handleGrid(true, 'deletemodal', 1);
                        // props.handleDeleteData(props.data._id);
                        props.setDropdownOpen(null);
                    }}
                >
                    <RiDeleteBin6Line /> Delete
                </button>

                <button
                    className="dropdown-item d-flex align-items-center gap-2 py-2 border-bottom"
                    onClick={async () => {
                        props.setViewDetails(props.data);
                        props.setDropdownOpen(null);
                        IISMethods.handleGrid(true, 'viewdetails', 1);
                    }}
                >
                    <IoEyeOutline /> View Details
                </button>

                <button
                    className="dropdown-item d-flex align-items-center gap-2 py-2"
                    onClick={async () => {
                        props.setViewInfoData(props.data);
                        props.setDropdownOpen(null);
                        IISMethods.handleGrid(true, 'viewInfodatamodal', 1);
                    }}
                >
                    <FaInfoCircle /> Info
                </button>
            </div>
        </>
    );
};

const ResearchStudyGridList = (props) => {

    const rightSidebarData = useAppSelector(state => state.rightsidebarformdata);
    const oldfilterdata = useAppSelector(state => state.oldfilterdata);
    const data = useAppSelector(state => state.data);
    const loading = useAppSelector(state => state.loading);

    const fieldOrder = IISMethods.getGridFieldOrder(rightSidebarData);
    const [dropdownOpen, setDropdownOpen] = useState(null);
    const dropdownRef = useRef(null);

    const [sortState, setSortState] = useState({});
    const [sortedData, setSortedData] = useState([]);
    const [textareaValue, setTextareaValue] = useState('');
    const [htmlEditorValue, setHtmlEditorValue] = useState('');

    useEffect(() => {
        // Only add event listener on client side
        if (typeof window !== 'undefined') {
            document.addEventListener("mousedown", handleClickOutside);
            return () => document.removeEventListener("mousedown", handleClickOutside);
        }
    }, []);

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
                setDropdownOpen(null);
            }
        };
        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    const handleClickOutside = (event) => {
        if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
            setDropdownOpen(null);
        }
    };
    // Initialize sortedData from Redux data and apply client-side sorting as fallback
    useEffect(() => {
        let updatedData = [];

        // Check for filtered data first (if provided)
        if (props.filtereddata && Array.isArray(props.filtereddata) && props.filtereddata.length > 0) {
            // Case 1: filtereddata is already an array
            updatedData = [...props.filtereddata];
        } else if (props.filtereddata && Array.isArray(props.filtereddata.data) && props.filtereddata.data.length > 0) {
            // Case 2: filtereddata is an object with a 'data' array inside
            updatedData = [...props.filtereddata.data];
        } else if (Array.isArray(data) && data.length > 0) {
            // Case 3: Use Redux data directly (primary data source)
            updatedData = [...data];
        } else {
            // Case 4: No data available yet, set empty array
            updatedData = [];
            if (!loading) {
                console.log('No data available yet, waiting for data to load...');
            }
        }

        // Apply client-side sorting as fallback to ensure proper order
        const currentSortData = getSortData();

        if (updatedData.length > 0 && currentSortData.field) {

            updatedData.sort((a, b) => {
                const field = currentSortData.field;
                const order = currentSortData.order;

                // Handle different data types
                let valA = a[field];
                let valB = b[field];

                // Handle null/undefined values
                if (valA == null && valB == null) return 0;
                if (valA == null) return order === 1 ? 1 : -1;
                if (valB == null) return order === 1 ? -1 : 1;

                // Handle date fields
                if (field === 'createdAt' || field === 'updatedAt') {
                    valA = new Date(valA);
                    valB = new Date(valB);
                } else if (typeof valA === 'string') {
                    valA = valA.toLowerCase();
                    valB = valB.toLowerCase();
                }

                if (valA < valB) return order === 1 ? -1 : 1;
                if (valA > valB) return order === 1 ? 1 : -1;
                return 0;
            });
        }

        setSortedData(updatedData);
    }, [props.filtereddata, data, loading]);

    // Sync local sort state with Redux sort state
    useEffect(() => {
        const currentSortData = getSortData();
        setSortState((prev) => ({
            ...prev,
            [currentSortData.field]: currentSortData.order === 1 ? "asc" : "desc",
        }));
    }, []);


    const toggleDropdown = (index) => {
        setDropdownOpen(dropdownOpen === index ? null : index);
    };

    const toggleSort = (fieldName) => {
        const currentSortData = getSortData();
        let newOrder;

        // Determine new sort order based on current state
        if (currentSortData.field === fieldName) {
            // If same field, toggle between asc (1) and desc (-1)
            newOrder = currentSortData.order === 1 ? -1 : 1;
        } else {
            // If different field, start with ascending (1)
            newOrder = 1;
        }

        // Update local sort state for UI display
        setSortState((prev) => ({
            ...prev,
            [fieldName]: newOrder === 1 ? "asc" : "desc",
        }));

        // Call server-side sort through parent component
        if (props.handleSortChange) {
            props.handleSortChange(fieldName, newOrder);
        }
    };


    useEffect(() => {
        const handleClickOutside = (event) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
                setDropdownOpen(null)
            }
        }
        // Only add event listener on client side
        if (typeof window !== 'undefined') {
            document.addEventListener("mousedown", handleClickOutside)
            return () => {
                document.removeEventListener("mousedown", handleClickOutside)
            }
        }
    }, [])

    const onChangeCheckbox = (type, field, value, id, data) => {
        props.handleFormData(type, field, value)
        const updatedData = { ...data, [field]: value }
        props.updateData(id, updatedData)
    }

    try {
        return (
            <>
                <section>
                    <div className="bg-white position-relative shadow table-custom overflow-hidden mt-2">
                        <div className="overflow-x-auto flex-grow-1">
                            <div className={`overflow-x-auto overflow-y-auto table-content bg-white shadow table-custom border ${IISMethods.getFilteredData(oldfilterdata, rightSidebarData).length > 0 ? 'calc-h-265p' : 'calc-h-235p'}`}>
                                <table className="table table-striped table-hover w-100">
                                    <thead className="table-light border-bottom position-sticky top-0 z-index-2">
                                        <tr>
                                            <th className="px-3 py-2 min-w-0">
                                                <div className="d-flex justify-content-center align-items-center">
                                                    <TbGridDots className="text-secondary fs-5" />
                                                </div>
                                            </th>
                                            {fieldOrder.map((field, index) => (
                                                <th
                                                    key={index}
                                                    className={`px-4 pt-12p pb-12p ${field.tablesize} cursor-pointer`}
                                                    onClick={field.sorting ? () => toggleSort(field.field) : undefined}
                                                >
                                                    <div className="d-flex justify-content-between align-items-center w-100">
                                                        <span className="text-14p">{field.text}</span>
                                                        {field.sorting && (
                                                            <>
                                                                {sortState[field.field] === "asc" ? (
                                                                    <FaSortAmountDown />
                                                                ) : (
                                                                    <FaSortAmountDownAlt />
                                                                )}
                                                            </>
                                                        )}
                                                    </div>
                                                </th>
                                            ))}
                                        </tr>
                                    </thead>
                                    <tbody className="position-relative z-index-1">
                                        {loading ? (
                                            <tr>
                                                <td colSpan={fieldOrder.length + 1} className="text-center">
                                                    <div className="d-flex justify-content-center align-items-center w-100" style={{ minHeight: '200px' }}>
                                                        <div className="spinner-border text-primary" role="status">
                                                            <span className="visually-hidden">Loading...</span>
                                                        </div>
                                                    </div>
                                                </td>
                                            </tr>
                                        ) : sortedData.length > 0 ? (
                                            sortedData.map((data, index) => (
                                                <tr
                                                    key={index}
                                                    className="border-bottom position-relative"
                                                    style={{ height: 'auto' }}
                                                >
                                                    <td className="px-3 py-1 text-center position-relative">
                                                        <button
                                                            onClick={() => toggleDropdown(index)}
                                                            className="btn btn-outline-secondary btn-sm p-1 d-flex align-items-center justify-content-center h-30p w-30p"
                                                        >
                                                            <BsThreeDotsVertical />
                                                        </button>

                                                        {dropdownOpen === index && (
                                                            <ThreeDotMenu
                                                                dropdownRef={dropdownRef}
                                                                setDropdownOpen={setDropdownOpen}
                                                                setModalDeleteOpen={props.setModalDeleteOpen}
                                                                setModalViewOpen={props.setModalViewOpen}
                                                                setViewDetails={props.setViewDetails}
                                                                handleDeleteData={props.handleDeleteData}
                                                                setFormData={props.setFormData}
                                                                data={data}
                                                                setDeleteDetails={props.setDeleteDetails}
                                                                setViewInfoData={props.setViewInfoData}
                                                            />

                                                        )}
                                                    </td>

                                                    {fieldOrder.map((field, index) => (
                                                        <td key={index} className={`px-3 py-1 ${field.size}`}>
                                                            {
                                                                field.type === "text" ?
                                                                    <span className="text-14p">{data[field.field] ? data[field.field] : '-'}</span>
                                                                    :
                                                                    field.type === "checkbox" ?
                                                                        <div className="form-check form-switch">
                                                                            <input className="form-check-input" type="checkbox" role="switch" id="switchCheckDefault"
                                                                                checked={data[field.field] ? data[field.field] === 1 : 0} onChange={(e) => { onChangeCheckbox(field.type, field.field, e.target.checked ? 1 : 0, data._id, { ...data }) }} />
                                                                        </div>
                                                                        :
                                                                        field.type === 'textarea' ?
                                                                            <span className="text-14p">{data[field.field] ?
                                                                                <span className="w-fit-content text-primary cursor-pointer" onClick={() => { setTextareaValue(data[field.field]); IISMethods.handleGrid(true, 'viewtextareamodal', 1) }}>
                                                                                    <FiEye />
                                                                                </span>
                                                                                : '-'}</span>
                                                                            :
                                                                            field.type === 'datepicker' ?
                                                                                <span className="text-14p">
                                                                                    {data[field.field] ? IISMethods.getDateFormate(data[field.field]) : '-'}
                                                                                </span>
                                                                                :
                                                                                field.type === 'dropdown' ?
                                                                                    <span className="text-14p">{data[field.field] ? data[field.formdatafield] : '-'}</span>
                                                                                    :
                                                                                    field.type === 'html-editor' ?
                                                                                        <span className="text-14p">{data[field.field] ?
                                                                                            <span className="w-fit-content text-primary cursor-pointer" onClick={() => { setHtmlEditorValue(data[field.field]); IISMethods.handleGrid(true, 'viewhtmleditormodal', 1) }}>
                                                                                                <FiEye />
                                                                                            </span>
                                                                                            : '-'}</span>
                                                                                        :
                                                                                        <></>
                                                            }
                                                        </td>
                                                    ))}
                                                </tr>
                                            ))
                                        ) : (
                                            <tr>
                                                <td colSpan={fieldOrder.length + 1} className="text-center">
                                                    <div className="d-flex justify-content-center align-items-center w-100" style={{ minHeight: '200px' }}>
                                                        <NoDataFound />
                                                    </div>
                                                </td>
                                            </tr>
                                        )}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                    <nav
                        className="d-flex flex-column flex-md-row justify-content-between align-items-start align-items-md-center pt-2"
                        aria-label="Table navigation"
                    >
                        <span className="small text-secondary">
                            {loading ? (
                                "Loading..."
                            ) : (
                                <>
                                    Showing
                                    <span className="fw-semibold text-dark"> {sortedData.length} </span>
                                    Entries
                                </>
                            )}
                        </span>
                    </nav>
                </section>

                <ModalRsuite
                    open={getCurrentState().modal.viewtextareamodal}
                    onClose={() => { IISMethods.handleGrid(false, 'viewtextareamodal', 0); setTextareaValue(''); }}
                    title="View Textarea"
                    body={
                        <div className="col-12">
                            {textareaValue}
                        </div>
                    }
                    footer={
                        <div className="d-flex justify-content-end">
                            <button className="btn btn-secondary" onClick={() => { IISMethods.handleGrid(false, 'viewtextareamodal', 0); setTextareaValue(''); }}>Close</button>
                        </div>
                    }
                />

                <ModalRsuite
                    open={getCurrentState().modal.viewhtmleditormodal}
                    onClose={() => { IISMethods.handleGrid(false, 'viewhtmleditormodal', 0); setHtmlEditorValue(''); }}
                    title="View HTML Editor"
                    body={
                        <div className="col-12">
                            <div 
                                dangerouslySetInnerHTML={{ 
                                    __html: htmlEditorValue 
                                }}
                            />
                        </div>
                    }
                />
            </>
        );
    }
    catch (e) {
        console.log(e);
        return <></>;
    }
};

export default ResearchStudyGridList;
