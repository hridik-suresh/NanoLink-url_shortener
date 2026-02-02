import React, { useState } from "react";
import { Link, NavLink } from "react-router-dom";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  // Temporary: we'll replace this with Redux state later
  const isLoggedIn = false;

  const navLinkClass = ({ isActive }) =>
    `text-sm font-semibold transition-colors hover:text-primary ${isActive ? "text-primary" : "text-secondary"}`;

  return (
    <nav className="sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b border-slate-100">
      <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
        {/* Logo */}
        <Link
          to="/"
          className="text-2xl font-black text-dark tracking-tighter flex items-center gap-2"
        >
          <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center text-white text-xl">
            N
          </div>
          NanoLink
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center gap-8">
          <NavLink to="/" className={navLinkClass}>
            Home
          </NavLink>
          {isLoggedIn ? (
            <>
              <NavLink to="/dashboard" className={navLinkClass}>
                My Links
              </NavLink>
              <button className="bg-dark text-white px-6 py-2.5 rounded-xl font-bold text-sm hover:bg-primary transition-all cursor-pointer">
                Logout
              </button>
            </>
          ) : (
            <>
              <NavLink to="/login" className={navLinkClass}>
                Login
              </NavLink>
              <NavLink
                to="/register"
                className="bg-primary text-white px-6 py-2.5 rounded-xl font-bold text-sm hover:bg-primary-dark shadow-lg shadow-primary/20 transition-all cursor-pointer"
              >
                Get Started
              </NavLink>
            </>
          )}
        </div>

        {/* Mobile Toggle */}
        <button
          className="md:hidden text-dark p-2"
          onClick={() => setIsOpen(!isOpen)}
        >
          <svg
            className="w-6 h-6"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            {isOpen ? (
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2.5}
                d="M6 18L18 6M6 6l12 12"
              />
            ) : (
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2.5}
                d="M4 6h16M4 12h16m-7 6h7"
              />
            )}
          </svg>
        </button>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden bg-white border-b border-slate-100 p-6 flex flex-col gap-4 animate-in slide-in-from-top duration-300">
          <NavLink
            to="/"
            onClick={() => setIsOpen(false)}
            className={navLinkClass}
          >
            Home
          </NavLink>
          {isLoggedIn ? (
            <>
              <NavLink
                to="/dashboard"
                onClick={() => setIsOpen(false)}
                className={navLinkClass}
              >
                My Links
              </NavLink>
              <button className="text-left text-sm font-bold text-accent">
                Logout
              </button>
            </>
          ) : (
            <>
              <NavLink
                to="/login"
                onClick={() => setIsOpen(false)}
                className={navLinkClass}
              >
                Login
              </NavLink>
              <NavLink
                to="/register"
                onClick={() => setIsOpen(false)}
                className="text-primary font-bold"
              >
                Get Started
              </NavLink>
            </>
          )}
        </div>
      )}
    </nav>
  );
};

export default Navbar;
