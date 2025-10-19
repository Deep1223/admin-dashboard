import { useState, useEffect, useRef } from "react";
import { BsThreeDotsVertical } from "react-icons/bs";
import { FaRegEdit } from "react-icons/fa";
import { RiDeleteBin6Line } from "react-icons/ri";
import { IoEyeOutline } from "react-icons/io5";
import { TbGridDots } from "react-icons/tb";
import { FaSortAmountDown, FaSortAmountDownAlt } from "react-icons/fa";
import { AiOutlineFileAdd } from "react-icons/ai";
import { FaAngleDown, FaAngleUp, FaX, FaRegRectangleList } from 'react-icons/fa6';
import NoDataFound from "@/components/NoDataFound";

const Table = (props) => {
    const [dropdownOpen, setDropdownOpen] = useState(null);
    const dropdownRef = useRef(null);

    const [sortState, setSortState] = useState({});
    const [sortedData, setSortedData] = useState([]);
    const [isOpen, setIsOpen] = useState(false);

    useEffect(() => {
        // Only add event listener on client side
        if (typeof window !== 'undefined') {
            document.addEventListener("mousedown", handleClickOutside);
            return () => document.removeEventListener("mousedown", handleClickOutside);
        }
    }, []);

    const handleClickOutside = (event) => {
        if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
            setDropdownOpen(null);
        }
    };
    // Initialize sortedData from filtereddata
    useEffect(() => {
        let updatedData = [];

        if (Array.isArray(props.filtereddata)) {
            // Case 1: filtereddata is already an array
            updatedData = [...props.filtereddata];
        } else if (props.filtereddata && Array.isArray(props.filtereddata.data)) {
            // Case 2: filtereddata is an object with a 'data' array inside
            updatedData = [...props.filtereddata.data];
        } else {
            console.error("Filtered data is not in a valid format:", props.filtereddata);
        }

        setSortedData(updatedData);
    }, [props.filtereddata]);


    const toggleDropdown = (index) => {
        setDropdownOpen(dropdownOpen === index ? null : index);
    };

    const toggleSort = (fieldName) => {
        // Toggle sorting state for the given field
        setSortState((prev) => ({
            ...prev,
            [fieldName]: prev[fieldName] === "asc" ? "desc" : "asc",
        }));

        // Create a copy and sort it based on the fieldName.
        const sorted = [...sortedData].sort((a, b) => {
            // Convert values to lowercase for case-insensitive sorting
            const valA = a[fieldName].toLowerCase();
            const valB = b[fieldName].toLowerCase();

            if (valA < valB) return sortState[fieldName] === "asc" ? -1 : 1;
            if (valA > valB) return sortState[fieldName] === "asc" ? 1 : -1;
            return 0;
        });

        setSortedData(sorted);
    };


    useEffect(() => {
        const handleClickOutside = (event) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
                setDropdownOpen(null);
            }
        };
        // Only add event listener on client side
        if (typeof window !== 'undefined') {
            document.addEventListener("mousedown", handleClickOutside);
            return () => {
                document.removeEventListener("mousedown", handleClickOutside);
            };
        }
    }, []);

    try {
        return (
            <section>
                <div className="bg-white position-relative shadow table-custom overflow-hidden">
                    <div className="overflow-x-auto flex-grow-1">
                        <div className="overflow-x-auto overflow-y-auto table-content bg-white shadow table-custom border calc-h-235p">
                            <table className="table table-hover w-100">
                                <thead className="table-light border-bottom position-sticky top-0 z-index-2">
                                    <tr>
                                        <th className="px-3 py-2">
                                            <div className="d-flex justify-content-center align-items-center">
                                                <TbGridDots className="text-secondary fs-5" />
                                            </div>
                                        </th>
                                        {props.fieldOrder.map((field, index) => (
                                            <th
                                                key={index}
                                                className={`px-4 pt-12p pb-12p ${field.size} cursor-pointer`}
                                                onClick={field.sorting ? () => toggleSort(field.field) : undefined}
                                            >
                                                <div className="d-flex justify-content-between align-items-center w-100">
                                                    <span className="text-14p">{field.label}</span>
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
                                    {sortedData.length > 0 ? (
                                        sortedData.map((formData, index) => (
                                            <tr
                                                key={index}
                                                className="border-bottom position-relative"
                                            >
                                                <td className="px-3 py-2 text-center position-relative" style={{ width: '30px' }}>
                                                    <button
                                                        onClick={() => toggleDropdown(index)}
                                                        className="btn btn-outline-secondary btn-sm p-1"
                                                    >
                                                        <BsThreeDotsVertical className="d-flex align-items-center justify-content-center" />
                                                    </button>
                                                    {dropdownOpen === index && (
                                                        <div
                                                            ref={dropdownRef}
                                                            className="position-absolute end-0 top-0 bg-white shadow-custom-lg rounded dropdown-custom z-3"
                                                            style={{ right: '-120px', top: '32px', width: '150px' }}
                                                        >
                                                            <ul className="py-2 small text-secondary list-unstyled">
                                                                {!props.invisibleEdit && (
                                                                    <li className="px-4 py-2 hover-bg-light cursor-pointer d-flex align-items-center gap-2">
                                                                        <FaRegEdit /> Edit
                                                                    </li>
                                                                )}
                                                                {!props.invisibleDelete && (
                                                                    <li
                                                                        className="px-4 py-2 hover-bg-light cursor-pointer d-flex align-items-center gap-2"
                                                                        onClick={async () => {
                                                                            await props.setDeleteDetails(formData.id);
                                                                            setDropdownOpen(null);
                                                                            await props.setModalDeleteOpen(true);
                                                                        }}
                                                                    >
                                                                        <RiDeleteBin6Line /> Delete
                                                                    </li>
                                                                )}
                                                                {!props.invisibleView && (
                                                                    <li
                                                                        className="px-4 py-2 hover-bg-light cursor-pointer d-flex align-items-center gap-2"
                                                                        onClick={async () => {
                                                                            await props.setViewDetails(formData);
                                                                            setDropdownOpen(null);
                                                                            await props.setModalViewOpen(true);
                                                                        }}
                                                                    >
                                                                        <IoEyeOutline /> View
                                                                    </li>
                                                                )}
                                                                {props.showleads && (
                                                                    <li
                                                                        className="px-4 py-2 hover-bg-light cursor-pointer d-flex align-items-center gap-2"
                                                                        onClick={async () => {
                                                                            props.handleleads(formData.leadId);
                                                                            setDropdownOpen(null);
                                                                        }}
                                                                    >
                                                                        <AiOutlineFileAdd /> Show Leads
                                                                    </li>
                                                                )}
                                                                {props.showdetails && (
                                                                    <li
                                                                        className="px-4 py-2 hover-bg-light cursor-pointer d-flex align-items-center gap-2"
                                                                        onClick={async () => {
                                                                            await props.handleUserDetails(formData);
                                                                            setDropdownOpen(null);
                                                                        }}
                                                                    >
                                                                        <FaRegRectangleList /> User Details
                                                                    </li>
                                                                )}
                                                            </ul>
                                                        </div>
                                                    )}
                                                </td>
                                                {props.fieldOrder.map((field, index) => (
                                                    <td key={index} className={`px-3 py-2 ${field.size}`}>
                                                        {
                                                            field.type === "text" ? (
                                                                field.field === "price" ? (
                                                                    <span className="text-14p">{formData[field.field] ? `$${formData[field.field]}` : '-'}</span>
                                                                ) : (
                                                                    <span className="text-14p">{formData[field.field] ? formData[field.field] : '-'}</span>
                                                                )
                                                            )
                                                                : field.type === "select" ? (
                                                                    <div className="position-relative w-100">
                                                                        <select
                                                                            value={formData[field.field] || ""}
                                                                            onChange={(e) => props.handleleadstatusChange(e, field.field)}
                                                                            className="form-select w-100"
                                                                            onFocus={() => setIsOpen(true)}
                                                                            onBlur={() => setIsOpen(false)}
                                                                        >
                                                                            <option value="">Select Brand</option>
                                                                            {props.brandOptions.map((option, idx) => (
                                                                                <option key={idx} value={option.value}>
                                                                                    {option.label}
                                                                                </option>
                                                                            ))}
                                                                        </select>
                                                                        <span className="position-absolute top-50 end-0 translate-middle-y me-3">
                                                                            {isOpen ? <FaAngleUp /> : <FaAngleDown />}
                                                                        </span>
                                                                    </div>
                                                                )
                                                                    : (
                                                                        <></>
                                                                    )}
                                                    </td>
                                                ))}
                                            </tr>
                                        ))
                                    ) : (
                                        <tr>
                                            <td colSpan={50} className="text-center">
                                                <div className="d-flex justify-content-center align-items-center w-100 h-100" style={{ minHeight: '300px' }}>
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
                        Showing
                        <span className="fw-semibold text-dark"> {sortedData.length} </span>
                        Entries
                    </span>
                </nav>
            </section>
        );
    }
    catch (e) {
        console.log(e);
        return <></>;
    }
};

export default Table;
