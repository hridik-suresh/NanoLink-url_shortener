import { useState } from "react";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { Menu, X, Link2, LogOut, LayoutDashboard } from "lucide-react";
import { logout } from "../store/slices/authSlice";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { token } = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  const handleLogout = () => {
    dispatch(logout());
    setIsOpen(false);
  };

  return (
    <nav className="bg-white/80 backdrop-blur-md sticky top-0 z-50 border-b border-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2 group">
            <div className="bg-primary p-2 rounded-lg group-hover:rotate-12 transition-transform">
              <Link2 className="text-white w-6 h-6" />
            </div>
            <span className="text-xl font-bold tracking-tighter text-text-main">
              NanoLink
            </span>
          </Link>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center gap-8">
            <Link
              to="/"
              className="text-text-muted hover:text-primary font-medium transition-colors"
            >
              Home
            </Link>
            {token ? (
              <>
                <Link
                  to="/dashboard"
                  className="flex items-center gap-2 text-text-muted hover:text-primary font-medium"
                >
                  <LayoutDashboard className="w-4 h-4" /> Dashboard
                </Link>
                <button
                  onClick={handleLogout}
                  className="flex items-center gap-2 text-danger font-medium hover:opacity-80"
                >
                  <LogOut className="w-4 h-4" /> Logout
                </button>
              </>
            ) : (
              <>
                <Link
                  to="/login"
                  className="text-text-muted hover:text-primary font-medium"
                >
                  Login
                </Link>
                <Link
                  to="/register"
                  className="bg-primary text-white px-5 py-2.5 rounded-xl font-bold hover:bg-primary-dark transition-all shadow-lg shadow-primary/20"
                >
                  Get Started
                </Link>
              </>
            )}
          </div>

          {/* Mobile Button */}
          <div className="md:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="p-2 text-text-muted"
            >
              {isOpen ? <X /> : <Menu />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden bg-white border-b border-border p-4 space-y-4 animate-in slide-in-from-top-2">
          <Link
            to="/"
            onClick={() => setIsOpen(false)}
            className="block text-text-muted font-medium"
          >
            Home
          </Link>
          {token ? (
            <>
              <Link
                to="/dashboard"
                onClick={() => setIsOpen(false)}
                className="block text-text-muted font-medium"
              >
                Dashboard
              </Link>
              <button
                onClick={handleLogout}
                className="block text-danger font-medium"
              >
                Logout
              </button>
            </>
          ) : (
            <>
              <Link
                to="/login"
                onClick={() => setIsOpen(false)}
                className="block text-text-muted font-medium"
              >
                Login
              </Link>
              <Link
                to="/register"
                onClick={() => setIsOpen(false)}
                className="block bg-primary text-white p-3 rounded-xl text-center font-bold"
              >
                Get Started
              </Link>
            </>
          )}
        </div>
      )}
    </nav>
  );
};

export default Navbar;
