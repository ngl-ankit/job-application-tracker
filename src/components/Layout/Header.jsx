import React, { useState } from "react";
import { signOut } from "firebase/auth";
import { auth } from "../Firebase/firebase";
import { useNavigate, Link, useMatch } from "react-router-dom";
import {
  FaTachometerAlt,
  FaListAlt,
  FaPlus,
  FaSignOutAlt,
  FaBars,
  FaTimes,
  FaChartBar,
  FaBriefcase,
} from "react-icons/fa";
import NotificationCenter from "../Functions/NotificationCenter";

const Header = ({ title }) => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [showLogoutDialog, setShowLogoutDialog] = useState(false); // State for showing logout confirmation dialog
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await signOut(auth);
      navigate("/login"); // Redirect to login page after logout
    } catch (error) {
      console.error("Error logging out: ", error);
    }
  };

  const NavItem = ({ to, children, Icon }) => {
    const match = useMatch(to);

    return (
      <li>
        <Link
          to={to}
          className={`flex items-center px-3 py-2 rounded transition-colors duration-300 ${match
            ? "bg-gray-700 text-white"
            : "text-gray-300 hover:bg-gray-700 hover:text-white"
            }`}
        >
          <Icon className="mr-2" />
          {children}
        </Link>
      </li>
    );
  };

  return (
    <nav className="bg-gradient-to-r from-purple-900 via-black to-blue-900 text-white shadow-lg mb-1">
      <div className="max-w-7xl mx-auto px-4 py-3 flex justify-between items-center">
        {/* Logo or Branding (if applicable) */}
        <div className="flex items-center space-x-2">
          <svg
            className="h-10 w-10 text-blue-400 transform rotate-45 transition-transform duration-300 hover:rotate-0 cursor-pointer"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 20 20"
            fill="currentColor"
            onClick={() => navigate("/dashboard")} // Navigate to dashboard on logo click
          >

            <path
              fillRule="evenodd"
              d="M2 5a1 1 0 011-1h5a1 1 0 110 2H3a1 1 0 01-1-1zm1 4a1 1 0 100 2h3a1 1 0 100-2H3zm0 5a1 1 0 011-1h3a1 1 0 110 2h-3a1 1 0 01-1-1zm10-8a1 1 0 011-1h5a1 1 0 110 2h-5a1 1 0 01-1-1zm1 4a1 1 0 100 2h3a1 1 0 100-2h-3zm0 5a1 1 0 011-1h3a1 1 0 110 2h-3a1 1 0 01-1-1z"
              clipRule="evenodd"
            />
          </svg>
          <span
            className="text-2xl font-bold cursor-pointer"
            onClick={() => navigate("/dashboard")} // Navigate to dashboard on title click
          >
            {title}
          </span>
        </div>

        {/* Hamburger menu for mobile */}
        <div className="md:hidden">
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="text-white focus:outline-none mr-10 mt-3"
          >
            {menuOpen ? (
              <FaTimes className="text-2xl" />
            ) : (
              <FaBars className="text-2xl" />
            )}
          </button>
        </div>

        {/* Navigation Links for desktop */}
        <ul className="hidden md:flex space-x-2">
          <NavItem to="/dashboard" Icon={FaTachometerAlt}>
            Dashboard
          </NavItem>
          <NavItem to="/applications/all" Icon={FaListAlt}>
            All Applications
          </NavItem>
          <NavItem to="/applications/new" Icon={FaPlus}>
            New Application
          </NavItem>
          <NavItem to="/job-listings" Icon={FaBriefcase}>
            Job Listings
          </NavItem>
          <NavItem to="/statistics" Icon={FaChartBar}>
            Statistics
          </NavItem>
        </ul>

        {/* Sign Out Button for desktop */}
        <button
          onClick={() => setShowLogoutDialog(true)}
          className="hidden md:flex items-center bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded-full transition-colors duration-300 border border-purple-600 hover:border-purple-700"
        >
          <FaSignOutAlt className="mr-2" />
          <span className="hidden md:inline">Logout</span>
        </button>
      </div>

      {/* Mobile Navigation Links */}
      {menuOpen && (
        <ul className="md:hidden flex flex-col space-y-2 mt-2">
          <NavItem to="/dashboard" Icon={FaTachometerAlt}>
            Dashboard
          </NavItem>
          <NavItem to="/applications/all" Icon={FaListAlt}>
            All Applications
          </NavItem>
          <NavItem to="/applications/new" Icon={FaPlus}>
            New Application
          </NavItem>
          <NavItem to="/job-listings" Icon={FaBriefcase}>
            Job Listings
          </NavItem>
          <NavItem to="/statistics" Icon={FaChartBar}>
            Statistics
          </NavItem>
        </ul>
      )}

      {/* Sign Out Button for mobile */}
      {menuOpen && (
        <button
          onClick={() => setShowLogoutDialog(true)}
          className="md:hidden items-center bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded-full transition-colors duration-300 border border-purple-600 hover:border-purple-700 mt-2"
        >
          <FaSignOutAlt className="mr-2" />
          <span>Logout</span>
        </button>
      )}

      {/* Logout Confirmation Dialog */}
      {showLogoutDialog && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
          <div className="bg-gray-800 p-4 rounded-lg shadow-xl max-w-sm text-center">
            <h2 className="text-2xl font-bold text-white mb-4">Logout</h2>
            <p className="text-gray-300 mb-4">
              Are you sure you want to logout?
            </p>
            <div className="flex justify-center space-x-4">
              <button
                onClick={() => setShowLogoutDialog(false)}
                className="bg-gray-600 hover:bg-gray-700 text-white px-4 py-2 rounded-full transition-colors duration-300"
              >
                Cancel
              </button>
              <button
                onClick={handleLogout}
                className="bg-red-600 hover:bg-red-700 text-white px-6 py-2  rounded-full transition-colors duration-300"
              >
                Logout
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Notification Center */}
      <NotificationCenter />
    </nav>
  );
};

export default Header;
