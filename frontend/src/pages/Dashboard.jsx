import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  LayoutDashboard,
  Link as LinkIcon,
  BarChart3,
  Settings,
  LogOut,
  Menu,
  X,
  Plus,
} from "lucide-react";
import { logout } from "../store/slices/authSlice";
import { Link, useNavigate } from "react-router-dom";

const Dashboard = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const { user } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = () => {
    dispatch(logout());
    navigate("/login");
  };

  const menuItems = [
    {
      icon: <LayoutDashboard size={20} />,
      label: "Overview",
      path: "/dashboard",
    },
    {
      icon: <LinkIcon size={20} />,
      label: "My Links",
      path: "/dashboard/links",
    },
    {
      icon: <BarChart3 size={20} />,
      label: "Analytics",
      path: "/dashboard/analytics",
    },
    {
      icon: <Settings size={20} />,
      label: "Settings",
      path: "/dashboard/settings",
    },
  ];

  return (
    <div className="flex h-screen bg-bg-main overflow-hidden">
      {/* 1. Mobile Sidebar Overlay */}
      {isSidebarOpen && (
        <div
          className="fixed inset-0 bg-text-main/50 z-40 md:hidden backdrop-blur-sm"
          onClick={() => setIsSidebarOpen(false)}
        />
      )}

      {/* 2. Sidebar */}
      <aside
        className={`
        fixed inset-y-0 left-0 z-50 w-64 bg-white border-r border-border transform transition-transform duration-300 ease-in-out
        md:relative md:translate-x-0 ${isSidebarOpen ? "translate-x-0" : "-translate-x-full"}
      `}
      >
        <div className="flex flex-col h-full">
          {/* Sidebar Header */}
          <div className="p-6 flex items-center gap-3 border-b border-border">
            <div className="bg-primary p-2 rounded-lg">
              <LinkIcon className="text-white w-5 h-5" />
            </div>
            <span className="text-xl font-bold tracking-tighter">NanoLink</span>
          </div>

          {/* Navigation Links */}
          <nav className="flex-1 p-4 space-y-1">
            {menuItems.map((item) => (
              <Link
                key={item.label}
                to={item.path}
                className="flex items-center gap-3 px-4 py-3 rounded-xl text-text-muted hover:bg-primary/5 hover:text-primary transition-all font-medium"
              >
                {item.icon}
                {item.label}
              </Link>
            ))}
          </nav>

          {/* User Profile & Logout */}
          <div className="p-4 border-t border-border">
            <div className="flex items-center gap-3 px-4 py-3 mb-2">
              <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center text-primary font-bold">
                {user?.name?.charAt(0) || "U"}
              </div>
              <div className="overflow-hidden">
                <p className="text-sm font-bold truncate">
                  {user?.name || "User"}
                </p>
                <p className="text-xs text-text-muted truncate">
                  {user?.email}
                </p>
              </div>
            </div>
            <button
              onClick={handleLogout}
              className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-danger hover:bg-red-50 transition-all font-medium"
            >
              <LogOut size={20} /> Logout
            </button>
          </div>
        </div>
      </aside>

      {/* 3. Main Content Area */}
      <main className="flex-1 flex flex-col overflow-hidden">
        {/* Top Header */}
        <header className="h-16 bg-white border-b border-border flex items-center justify-between px-6 shrink-0">
          <button
            className="md:hidden p-2 text-text-muted"
            onClick={() => setIsSidebarOpen(true)}
          >
            <Menu size={24} />
          </button>

          <h2 className="text-lg font-bold text-text-main hidden md:block">
            Dashboard
          </h2>

          <button className="bg-primary hover:bg-primary-dark text-white px-4 py-2 rounded-lg font-bold text-sm flex items-center gap-2 transition-all">
            <Plus size={18} /> New Link
          </button>
        </header>

        {/* Dynamic Content */}
        <section className="flex-1 overflow-y-auto p-6 md:p-8">
          <div className="max-w-5xl mx-auto">
            <h1 className="text-2xl font-bold mb-6">
              Welcome back, {user?.name?.split(" ")[0]}! 👋
            </h1>

            {/* We will build the Stats Cards and Link Table here next */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="bg-white p-6 rounded-2xl border border-border shadow-sm">
                <p className="text-text-muted text-sm font-medium">
                  Total Links
                </p>
                <h3 className="text-3xl font-bold mt-1">12</h3>
              </div>
              <div className="bg-white p-6 rounded-2xl border border-border shadow-sm">
                <p className="text-text-muted text-sm font-medium">
                  Total Clicks
                </p>
                <h3 className="text-3xl font-bold mt-1">1,284</h3>
              </div>
              <div className="bg-white p-6 rounded-2xl border border-border shadow-sm">
                <p className="text-text-muted text-sm font-medium">Avg. CTR</p>
                <h3 className="text-3xl font-bold mt-1">24.8%</h3>
              </div>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
};

export default Dashboard;
