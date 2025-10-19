"use client";
import { useState, useRef, useEffect } from "react";
import { FaUserCircle, FaUser, FaCog, FaQuestionCircle, FaSignOutAlt } from "react-icons/fa";

import { useRouter } from "next/navigation";
const Header = () => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);
  const router = useRouter();
  // Close dropdown when clicking outside
  useEffect(() => {
    function handleClickOutside(event) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    }

    // Only add event listener on client side
    if (typeof window !== 'undefined') {
      document.addEventListener("mousedown", handleClickOutside);
      return () => document.removeEventListener("mousedown", handleClickOutside);
    }
  }, []);

  try {
    return (
      <header className="bg-white shadow p-3 d-flex justify-content-between align-items-center">
        <h1 className="h5 fw-semibold">DEMO</h1>
        <div className="position-relative" ref={dropdownRef}>
          {/* Click only on the user icon to open dropdown */}
          <div className="d-flex align-items-center gap-2 cursor-pointer" onClick={() => setIsOpen(!isOpen)}>
            <FaUserCircle className="text-secondary" style={{fontSize: '28px'}} />
            <span className="text-secondary fw-medium">Account</span>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className={`text-secondary transform transition-transform duration-300 ${isOpen ? "rotate-180" : ""}`}
              style={{width: '16px', height: '16px'}}
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
            </svg>
          </div>

          {isOpen && (
            <div className="position-absolute end-0 mt-2 account-dropdown">
              {/* Arrow Indicator */}
              <div className="dropdown-arrow"></div>

              {/* User Info */}
              <div className="dropdown-user-info">
                <p className="user-name">Hi, Guest</p>
                <p className="user-role">User</p>
              </div>

              {/* Menu Items */}
              <ul className="py-2 list-unstyled mb-0">
                <li className="dropdown-menu-item">
                  <FaUser className="icon" />
                  <span className="text">My Profile</span>
                </li>
                <li className="dropdown-menu-item">
                  <FaCog className="icon" />
                  <span className="text">Account Settings</span>
                </li>
                <li className="dropdown-menu-item">
                  <FaQuestionCircle className="icon" />
                  <span className="text">Need Help?</span>
                </li>
              </ul>

              {/* Sign Out Section */}
              <div className="dropdown-signout">
                <div 
                  onClick={() => {
                    localStorage.removeItem("token");
                    localStorage.removeItem("userid");
                    localStorage.removeItem("userrole");
                    router.push("/login");
                  }} 
                  className="dropdown-menu-item"
                >
                  <FaSignOutAlt className="icon" />
                  <span className="text">Sign Out</span>
                </div>
              </div>
            </div>
          )}
        </div>
      </header>
    );
  }
  catch (e) {
    console.log(e);
    return <></>
  }
}

export default Header;