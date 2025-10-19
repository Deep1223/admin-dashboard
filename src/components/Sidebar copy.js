'use client';

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation"; // ✅ Correct Hook
import { FaHome, FaCog, FaUser, FaBars, FaChevronDown, FaChevronUp } from "react-icons/fa";
import { FiSidebar } from "react-icons/fi";

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

                    {/* Configuration Menu with Dropdown */}
                    {/* <li className="relative">
                        <div
                            className={`flex items-center gap-3 py-2 px-2 rounded-md cursor-pointer transition ${isActive("/settings") || isActive("/configuration/field") ? "bg-gray-300 text-black" : "hover:bg-gray-200"
                                }`}
                            onClick={() => setIsConfigOpen(!isConfigOpen)}
                        >
                            <span className="w-6 flex justify-center"><FaCog /></span>
                            <span className={`transition-all whitespace-nowrap ${isOpen || props.isFixed ? "opacity-100 translate-x-0 w-auto" : "opacity-0 -translate-x-5 w-0"
                                }`}>
                                Configuration
                            </span>
                            {isConfigOpen ? <FaChevronUp className="ml-auto" /> : <FaChevronDown className="ml-auto" />}
                        </div>

                        {isConfigOpen && (
                            <ul className={`pl-6 transition-all ${isOpen || props.isFixed ? "block" : "hidden"}`}>
                                <li>
                                    <Link href="/settings"
                                        className={`block py-2 px-2 rounded-md transition ${isActive("/settings") ? "bg-gray-300 text-black" : "hover:bg-gray-200"
                                            }`}
                                    >
                                        Settings
                                    </Link>
                                </li>
                                <li>
                                    <Link href="/configuration/field"
                                        className={`block py-2 px-2 rounded-md transition ${isActive("/configuration/field") ? "bg-gray-300 text-black" : "hover:bg-gray-200"
                                            }`}
                                    >
                                        Fields
                                    </Link>
                                </li>
                            </ul>
                        )}
                    </li> */}

                    {userRole === "Administrator" && (
                        <li className="mb-2">
                            <Link href="/users"
                                className={`d-flex align-items-center py-2 px-2 rounded text-decoration-none transition ${isOpen || props.isFixed ? "gap-3" : "justify-content-center"} ${isActive("/users") ? "" : ""
                                    }`}
                                style={{
                                    backgroundColor: isActive("/users") ? 'rgba(59, 130, 246, 0.2)' : 'transparent',
                                    color: isActive("/users") ? '#ffffff' : '#cbd5e1',
                                    borderLeft: isActive("/users") ? '3px solid #3b82f6' : 'none'
                                }}
                                onMouseEnter={(e) => {
                                    if (!isActive("/users")) {
                                        e.target.style.backgroundColor = 'rgba(255, 255, 255, 0.1)';
                                    }
                                }}
                                onMouseLeave={(e) => {
                                    if (!isActive("/users")) {
                                        e.target.style.backgroundColor = 'transparent';
                                    }
                                }}
                            >
                                <span className="w-6 d-flex justify-content-center" style={{ color: isActive("/users") ? '#ffffff' : '#cbd5e1' }}><FaUser /></span>
                                {
                                    isOpen || props.isFixed ?
                                        <span className={`transition-all text-nowrap ${isOpen || props.isFixed ? "opacity-100 translate-x-0 " : "opacity-0 translate-x-n5 w-0"
                                            }`}>
                                            Users
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
