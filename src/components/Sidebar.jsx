import React, { useState, useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { useNavigate, useLocation } from "react-router-dom";
import { FaTachometerAlt, FaTools, FaSignOutAlt, FaBookOpen } from "react-icons/fa";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function Sidebar({ children }) {
  const { logout } = useContext(AuthContext);
  const [isOpen, setIsOpen] = useState(false);
  const [showLogoutModal, setShowLogoutModal] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  const toggleSidebar = () => setIsOpen(!isOpen);
  const closeSidebar = () => setIsOpen(false);

  const menuItems = [
    { name: "Dashboard", icon: <FaTachometerAlt />, path: "/dashboard" },
    { name: "Tools", icon: <FaTools />, path: "/tools" },
    { name: "Learning Hub", icon: <FaBookOpen />, path: "/learning-hub" }, // ✅ Added
  ];

  const handleNavigation = (path) => {
    navigate(path);
    closeSidebar();
  };

  const confirmLogout = () => {
    logout();
    setShowLogoutModal(false);
    navigate("/");
    toast.success("You have been logged out!", {
      position: "top-right",
      autoClose: 3000,
      hideProgressBar: false,
      pauseOnHover: true,
      draggable: true,
    });
  };

  return (
    <div className="relative">
      {/* Menu Button */}
      <button
        onClick={toggleSidebar}
        className="absolute top-4 left-4 z-50 bg-gray-800 text-white p-2 rounded-lg hover:bg-gray-700 transition-all duration-200"
      >
        ☰
      </button>

      {/* Sidebar */}
      <div
        className={`fixed top-0 left-0 h-full w-64 bg-gray-900 text-white transform 
        ${isOpen ? "translate-x-0" : "-translate-x-full"} 
        transition-transform duration-300 ease-in-out z-40`}
      >
        <div className="flex justify-between items-center p-4 border-b border-gray-700">
          <h2 className="text-lg font-bold"></h2>
          <button onClick={closeSidebar} className="text-xl">✖</button>
        </div>

        <nav className="flex flex-col p-4 space-y-4">
          {menuItems.map((item) => (
            <button
              key={item.name}
              onClick={() => handleNavigation(item.path)}
              className={`flex items-center space-x-3 text-left px-2 py-2 rounded-lg transition-all duration-200
                ${location.pathname === item.path ? "bg-gray-800" : "hover:bg-gray-800"}`}
            >
              {item.icon}
              <span>{item.name}</span>
            </button>
          ))}

          {/* Logout Button */}
          <button
            onClick={() => setShowLogoutModal(true)}
            className="flex items-center space-x-3 text-left px-2 py-2 rounded-lg hover:bg-red-700 transition-all duration-200"
          >
            <FaSignOutAlt />
            <span>Logout</span>
          </button>
        </nav>
      </div>

      {/* Overlay Blur */}
      {isOpen && (
        <div
          onClick={closeSidebar}
          className="fixed inset-0 bg-black bg-opacity-40 backdrop-blur-sm z-30"
        />
      )}

      {/* Logout Confirmation Modal */}
      {showLogoutModal && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50 animate-fadeIn">
          <div className="logout-modal animate-scaleIn">
            <h2 className="text-xl font-bold mb-4">Confirm Logout</h2>
            <p className="mb-6">Are you sure you want to log out?</p>
            <div className="flex justify-end space-x-3">
              <button
                onClick={() => setShowLogoutModal(false)}
                className="px-4 py-2 bg-gray-600 rounded hover:bg-gray-500 transition"
              >
                Cancel
              </button>
              <button
                onClick={confirmLogout}
                className="px-4 py-2 bg-red-600 rounded hover:bg-red-500 transition"
              >
                Logout
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Main Content */}
      <div className={`${isOpen ? "filter blur-sm lg:blur-none" : ""} transition-all`}>
        {children}
      </div>
    </div>
  );
}
