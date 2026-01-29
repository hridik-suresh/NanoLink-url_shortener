import { Link } from "react-router-dom";
import { Link as LinkIcon, BarChart3 } from "lucide-react";

const Navbar = () => {
  return (
    <nav className="fixed top-0 w-full bg-[#1e293b]/80 backdrop-blur-md border-b border-slate-700 z-50">
      <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
        <Link to="/" className="flex items-center gap-2 group">
          <LinkIcon className="text-blue-500 w-6 h-6 group-hover:rotate-12 transition-transform" />
          <span className="text-xl font-bold text-white tracking-tight">
            NanoLink
          </span>
        </Link>

        <div className="flex items-center gap-6">
          <Link
            to="/"
            className="text-slate-300 hover:text-blue-400 transition-colors font-medium"
          >
            Home
          </Link>
          <Link
            to="/stats"
            className="flex items-center gap-1 text-slate-300 hover:text-blue-400 transition-colors font-medium"
          >
            <BarChart3 size={18} />
            <span>Stats</span>
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
