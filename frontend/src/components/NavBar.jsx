import React, { useState } from "react";
import { Link } from "react-router-dom";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  // Temporary hardcoded auth state for UI building
  const isLoggedIn = false;

  return (
    <nav className="bg-white shadow-md sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <Link to="/" className="text-2xl font-bold text-indigo-600">
              NanoLink
            </Link>
          </div>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center space-x-8">
            <Link
              to="/"
              className="text-gray-700 hover:text-indigo-600 font-medium"
            >
              Home
            </Link>
            {isLoggedIn ? (
              <>
                <Link
                  to="/dashboard"
                  className="text-gray-700 hover:text-indigo-600 font-medium"
                >
                  My Links
                </Link>
                <button className="bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700 transition">
                  Logout
                </button>
              </>
            ) : (
              <>
                <Link
                  to="/login"
                  className="text-gray-700 hover:text-indigo-600 font-medium"
                >
                  Login
                </Link>
                <Link
                  to="/register"
                  className="bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700 transition"
                >
                  Register
                </Link>
              </>
            )}
          </div>

          {/* Mobile Button */}
          <div className="md:hidden flex items-center">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="text-gray-700 focus:outline-none"
            >
              <svg
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                {isOpen ? (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                ) : (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                )}
              </svg>
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu Content */}
      {isOpen && (
        <div className="md:hidden bg-white border-t border-gray-100 pb-4 space-y-2 px-4 pt-2 shadow-inner">
          <Link to="/" className="block py-2 text-gray-700 font-medium">
            Home
          </Link>
          {isLoggedIn ? (
            <>
              <Link
                to="/dashboard"
                className="block py-2 text-gray-700 font-medium"
              >
                My Links
              </Link>
              <button className="w-full text-left py-2 text-red-600 font-medium">
                Logout
              </button>
            </>
          ) : (
            <>
              <Link
                to="/login"
                className="block py-2 text-gray-700 font-medium"
              >
                Login
              </Link>
              <Link
                to="/register"
                className="block py-2 text-indigo-600 font-medium"
              >
                Register
              </Link>
            </>
          )}
        </div>
      )}
    </nav>
  );
};

export default Navbar;
