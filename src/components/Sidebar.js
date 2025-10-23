'use client';

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation"; // ✅ Correct Hook
import { FaHome, FaCog, FaUser, FaBars, FaChevronDown, FaChevronUp } from "react-icons/fa";
import { FiSidebar } from "react-icons/fi";
import { GiArchiveResearch } from "react-icons/gi";

const Sidebar = (props) => {
    const [isOpen, setIsOpen] = useState(false);
    const [isConfigOpen, setIsConfigOpen] = useState(false); // Dropdown state for Configuration
    const pathname = usePathname(); // ✅ Get Current Path
    const [token, setToken] = useState(null);
    const [userId, setUserId] = useState(null);
    const [userRole, setUserRole] = useState(null);
    const [users, setUsers] = useState([]);
    useEffect(() => {
        if (typeof window !== "undefined") { // Ensure it's running on the client
            setToken(localStorage.getItem('token'));
            setUserId(localStorage.getItem('userid'));
            setUserRole(localStorage.getItem('userrole'));
        }
    }, []);
    // Active Route Function
    const isActive = (path) => pathname === path;

    return (
        <aside
            className={`p-2 shadow position-fixed vh-100 d-flex flex-column ${props.isFixed ? "sidebar-expanded" : isOpen ? "sidebar-expanded" : "sidebar-collapsed"
                }`}
            style={{ zIndex: 1000 }}
            onMouseEnter={() => {
                if (!props.isFixed) {
                    setIsOpen(true);
                }
            }}
            onMouseLeave={() => {
                if (!props.isFixed) {
                    setIsOpen(false);
                    setIsConfigOpen(false); // Close dropdown when sidebar collapses
                }
            }}
        >
            {/* Sidebar Header */}
            <div className={`d-flex align-items-center mb-3 py-3 border-bottom border-dark ${isOpen || props.isFixed ? "justify-content-between" : "justify-content-center"}`}>
                <div className={`d-flex align-items-center ${isOpen || props.isFixed ? "gap-2" : "justify-content-center"}`}>
                    <FaBars size={24} className="cursor-pointer p-1 rounded" style={{ color: '#cbd5e1' }} />
                    {
                        isOpen || props.isFixed ?
                            <h2
                                className={`h5 fw-bold transition-all overflow-hidden text-nowrap ${isOpen || props.isFixed ? "opacity-100 translate-x-0 w-auto" : "opacity-0 translate-x-n5 w-0"} mb-0`}
                                style={{ color: '#f1f5f9' }}
                            >
                                DEMO
                            </h2>
                            :
                            <></>
                    }
                </div>
                {(isOpen || props.isFixed) && (
                    <FiSidebar size={24} className="cursor-pointer p-1 rounded ms-auto"
                        style={{ color: '#cbd5e1' }}
                        onClick={() => props.setIsFixed(!props.isFixed)}
                    />
                )}
            </div>

            {/* Sidebar Navigation with Links */}
            <nav className="flex-grow-1">
                <ul className="list-unstyled">
                    <li className="mb-2">
                        <Link href="/dashboard"
                            className={`d-flex align-items-center py-2 px-2 rounded text-decoration-none transition ${isOpen || props.isFixed ? "gap-3" : "justify-content-center"} ${isActive("/dashboard") ? "" : ""
                                }`}
                            style={{
                                backgroundColor: isActive("/dashboard") ? 'rgba(59, 130, 246, 0.2)' : 'transparent',
                                color: isActive("/dashboard") ? '#ffffff' : '#cbd5e1',
                                borderLeft: isActive("/dashboard") ? '3px solid #3b82f6' : 'none'
                            }}
                            onMouseEnter={(e) => {
                                if (!isActive("/dashboard")) {
                                    e.target.style.backgroundColor = 'rgba(255, 255, 255, 0.1)';
                                }
                            }}
                            onMouseLeave={(e) => {
                                if (!isActive("/dashboard")) {
                                    e.target.style.backgroundColor = 'transparent';
                                }
                            }}
                        >
                            <span className="w-6 d-flex justify-content-center" style={{ color: isActive("/dashboard") ? '#ffffff' : '#cbd5e1' }}><FaHome /></span>
                            {
                                isOpen || props.isFixed ?
                                    <span className={`transition-all text-nowrap ${isOpen || props.isFixed ? "opacity-100 translate-x-0 w-auto" : "opacity-0 translate-x-n5 w-0"
                                        }`}>
                                        Home
                                    </span>
                                    :
                                    <></>
                            }
                        </Link>
                    </li>

                    {/* {userRole === "Administrator" && (
                        <li className="mb-2">
                            <Link href="/category"
                                className={`d-flex align-items-center py-2 px-2 rounded text-decoration-none transition ${isOpen || props.isFixed ? "gap-3" : "justify-content-center"} ${isActive("/category") ? "" : ""
                                    }`}
                                style={{
                                    backgroundColor: isActive("/category") ? 'rgba(59, 130, 246, 0.2)' : 'transparent',
                                    color: isActive("/category") ? '#ffffff' : '#cbd5e1',
                                    borderLeft: isActive("/category") ? '3px solid #3b82f6' : 'none'
                                }}
                                onMouseEnter={(e) => {
                                    if (!isActive("/category")) {
                                        e.target.style.backgroundColor = 'rgba(255, 255, 255, 0.1)';
                                    }
                                }}
                                onMouseLeave={(e) => {
                                    if (!isActive("/category")) {
                                        e.target.style.backgroundColor = 'transparent';
                                    }
                                }}
                            >
                                <span className="w-6 d-flex justify-content-center" style={{ color: isActive("/category") ? '#ffffff' : '#cbd5e1' }}><FaUser /></span>
                                {
                                    isOpen || props.isFixed ?
                                        <span className={`transition-all text-nowrap ${isOpen || props.isFixed ? "opacity-100 translate-x-0 " : "opacity-0 translate-x-n5 w-0"} d-block`}>
                                            Category
                                        </span>
                                        :
                                        <></>
                                }
                            </Link>
                        </li>
                    )}

                    {userRole === "Administrator" && (
                        <li className="mb-2">
                            <Link href="/researchstudy"
                                className={`d-flex align-items-center py-2 px-2 rounded text-decoration-none transition ${isOpen || props.isFixed ? "gap-3" : "justify-content-center"} ${isActive("/researchstudy") ? "" : ""
                                    }`}
                                style={{
                                    backgroundColor: isActive("/researchstudy") ? 'rgba(59, 130, 246, 0.2)' : 'transparent',
                                    color: isActive("/researchstudy") ? '#ffffff' : '#cbd5e1',
                                    borderLeft: isActive("/researchstudy") ? '3px solid #3b82f6' : 'none'
                                }}
                                onMouseEnter={(e) => {
                                    if (!isActive("/researchstudy")) {
                                        e.target.style.backgroundColor = 'rgba(255, 255, 255, 0.1)';
                                    }
                                }}
                                onMouseLeave={(e) => {
                                    if (!isActive("/researchstudy")) {
                                        e.target.style.backgroundColor = 'transparent';
                                    }
                                }}
                            >
                                <span className="w-6 d-flex justify-content-center" style={{ color: isActive("/researchstudy") ? '#ffffff' : '#cbd5e1' }}><GiArchiveResearch /></span>
                                {
                                    isOpen || props.isFixed ?
                                        <span className={`transition-all text-nowrap ${isOpen || props.isFixed ? "opacity-100 translate-x-0 " : "opacity-0 translate-x-n5 w-0"} d-block`}>
                                            Research Study Master
                                        </span>
                                        :
                                        <></>
                                }
                            </Link>
                        </li>
                    )}

                    {userRole === "Administrator" && (
                        <li className="mb-2">
                            <Link href="/researchtype"
                                className={`d-flex align-items-center py-2 px-2 rounded text-decoration-none transition ${isOpen || props.isFixed ? "gap-3" : "justify-content-center"} ${isActive("/researchtype") ? "" : ""
                                    }`}
                                style={{
                                    backgroundColor: isActive("/researchtype") ? 'rgba(59, 130, 246, 0.2)' : 'transparent',
                                    color: isActive("/researchtype") ? '#ffffff' : '#cbd5e1',
                                    borderLeft: isActive("/researchtype") ? '3px solid #3b82f6' : 'none'
                                }}
                                onMouseEnter={(e) => {
                                    if (!isActive("/researchtype")) {
                                        e.target.style.backgroundColor = 'rgba(255, 255, 255, 0.1)';
                                    }
                                }}
                                onMouseLeave={(e) => {
                                    if (!isActive("/researchtype")) {
                                        e.target.style.backgroundColor = 'transparent';
                                    }
                                }}
                            >
                                <span className="w-6 d-flex justify-content-center" style={{ color: isActive("/researchtype") ? '#ffffff' : '#cbd5e1' }}><GiArchiveResearch /></span>
                                {
                                    isOpen || props.isFixed ?
                                        <span className={`transition-all text-nowrap ${isOpen || props.isFixed ? "opacity-100 translate-x-0 " : "opacity-0 translate-x-n5 w-0"} d-block`}>
                                            Research Type Master
                                        </span>
                                        :
                                        <></>
                                }
                            </Link>
                        </li>
                    )}

                    {userRole === "Administrator" && (
                        <li className="mb-2">
                            <Link href="/author"
                                className={`d-flex align-items-center py-2 px-2 rounded text-decoration-none transition ${isOpen || props.isFixed ? "gap-3" : "justify-content-center"} ${isActive("/author") ? "" : ""
                                    }`}
                                style={{
                                    backgroundColor: isActive("/author") ? 'rgba(59, 130, 246, 0.2)' : 'transparent',
                                    color: isActive("/author") ? '#ffffff' : '#cbd5e1',
                                    borderLeft: isActive("/author") ? '3px solid #3b82f6' : 'none'
                                }}
                                onMouseEnter={(e) => {
                                    if (!isActive("/author")) {
                                        e.target.style.backgroundColor = 'rgba(255, 255, 255, 0.1)';
                                    }
                                }}
                                onMouseLeave={(e) => {
                                    if (!isActive("/author")) {
                                        e.target.style.backgroundColor = 'transparent';
                                    }
                                }}
                            >
                                <span className="w-6 d-flex justify-content-center" style={{ color: isActive("/author") ? '#ffffff' : '#cbd5e1' }}><GiArchiveResearch /></span>
                                {
                                    isOpen || props.isFixed ?
                                        <span className={`transition-all text-nowrap ${isOpen || props.isFixed ? "opacity-100 translate-x-0 " : "opacity-0 translate-x-n5 w-0"} d-block`}>
                                            Author Master
                                        </span>
                                        :
                                        <></>
                                }
                            </Link>
                        </li>
                    )}

                    {userRole === "Administrator" && (
                        <li className="mb-2">
                            <Link href="/tag"
                                className={`d-flex align-items-center py-2 px-2 rounded text-decoration-none transition ${isOpen || props.isFixed ? "gap-3" : "justify-content-center"} ${isActive("/tag") ? "" : ""
                                    }`}
                                style={{
                                    backgroundColor: isActive("/tag") ? 'rgba(59, 130, 246, 0.2)' : 'transparent',
                                    color: isActive("/tag") ? '#ffffff' : '#cbd5e1',
                                    borderLeft: isActive("/tag") ? '3px solid #3b82f6' : 'none'
                                }}
                                onMouseEnter={(e) => {
                                    if (!isActive("/tag")) {
                                        e.target.style.backgroundColor = 'rgba(255, 255, 255, 0.1)';
                                    }
                                }}
                                onMouseLeave={(e) => {
                                    if (!isActive("/tag")) {
                                        e.target.style.backgroundColor = 'transparent';
                                    }
                                }}
                            >
                                <span className="w-6 d-flex justify-content-center" style={{ color: isActive("/tag") ? '#ffffff' : '#cbd5e1' }}><GiArchiveResearch /></span>
                                {
                                    isOpen || props.isFixed ?
                                        <span className={`transition-all text-nowrap ${isOpen || props.isFixed ? "opacity-100 translate-x-0 " : "opacity-0 translate-x-n5 w-0"} d-block`}>
                                            Tag Master
                                        </span>
                                        :
                                        <></>
                                }
                            </Link>
                        </li>
                    )}

                    {userRole === "Administrator" && (
                        <li className="mb-2">
                            <Link href="/laymansummary"
                                className={`d-flex align-items-center py-2 px-2 rounded text-decoration-none transition ${isOpen || props.isFixed ? "gap-3" : "justify-content-center"} ${isActive("/laymansummary") ? "" : ""
                                    }`}
                                style={{
                                    backgroundColor: isActive("/laymansummary") ? 'rgba(59, 130, 246, 0.2)' : 'transparent',
                                    color: isActive("/laymansummary") ? '#ffffff' : '#cbd5e1',
                                    borderLeft: isActive("/laymansummary") ? '3px solid #3b82f6' : 'none'
                                }}
                                onMouseEnter={(e) => {
                                    if (!isActive("/laymansummary")) {
                                        e.target.style.backgroundColor = 'rgba(255, 255, 255, 0.1)';
                                    }
                                }}
                                onMouseLeave={(e) => {
                                    if (!isActive("/laymansummary")) {
                                        e.target.style.backgroundColor = 'transparent';
                                    }
                                }}
                            >
                                <span className="w-6 d-flex justify-content-center" style={{ color: isActive("/laymansummary") ? '#ffffff' : '#cbd5e1' }}><GiArchiveResearch /></span>
                                {
                                    isOpen || props.isFixed ?
                                        <span className={`transition-all text-nowrap ${isOpen || props.isFixed ? "opacity-100 translate-x-0 " : "opacity-0 translate-x-n5 w-0"} d-block`}>
                                            Layman Summary Master
                                        </span>
                                        :
                                        <></>
                                }
                            </Link>
                        </li>
                    )} */}

                    {userRole === "Administrator" && (
                        <li className="mb-2">
                            <Link href="/research"
                                className={`d-flex align-items-center py-2 px-2 rounded text-decoration-none transition ${isOpen || props.isFixed ? "gap-3" : "justify-content-center"} ${isActive("/research") ? "" : ""
                                    }`}
                                style={{
                                    backgroundColor: isActive("/research") ? 'rgba(59, 130, 246, 0.2)' : 'transparent',
                                    color: isActive("/research") ? '#ffffff' : '#cbd5e1',
                                    borderLeft: isActive("/research") ? '3px solid #3b82f6' : 'none'
                                }}
                                onMouseEnter={(e) => {
                                    if (!isActive("/research")) {
                                        e.target.style.backgroundColor = 'rgba(255, 255, 255, 0.1)';
                                    }
                                }}
                                onMouseLeave={(e) => {
                                    if (!isActive("/research")) {
                                        e.target.style.backgroundColor = 'transparent';
                                    }
                                }}
                            >
                                <span className="w-6 d-flex justify-content-center" style={{ color: isActive("/research") ? '#ffffff' : '#cbd5e1' }}><GiArchiveResearch /></span>
                                {
                                    isOpen || props.isFixed ?
                                        <span className={`transition-all text-nowrap ${isOpen || props.isFixed ? "opacity-100 translate-x-0 " : "opacity-0 translate-x-n5 w-0"} d-block`}>
                                            Research Master
                                        </span>
                                        :
                                        <></>
                                }
                            </Link>
                        </li>
                    )}

                </ul>
            </nav>
        </aside>
    );
};

export default Sidebar;
