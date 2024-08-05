import React from "react";
import { Link, useNavigate } from "react-router-dom";

const Header = ({ email }) => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token"); // Remove token from localStorage
    navigate("/login"); // Redirect to login page
  };

  return (
    <header className="bg-gradient-to-r from-purple-600 via-indigo-600 to-blue-600 text-white p-4 flex flex-wrap items-center justify-between shadow-xl">
      <h1 className="text-3xl font-extrabold tracking-tight">EC Store</h1>
      <div className="flex flex-wrap items-center space-x-6 mt-2 sm:mt-0">
        {email ? (
          <>
            <span className="text-lg font-medium">Logged in as: {email}</span>
            <button
              onClick={handleLogout}
              className="bg-white text-blue-600 font-semibold hover:bg-gray-200 py-1 px-4 rounded transition-colors duration-300"
            >
              Logout
            </button>
          </>
        ) : (
          <Link
            to="/login"
            className="bg-white text-blue-600 font-semibold hover:bg-gray-200 py-1 px-4 rounded transition-colors duration-300"
          >
            Login
          </Link>
        )}
      </div>
    </header>
  );
};

export default Header;
