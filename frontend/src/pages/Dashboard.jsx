import React from "react";

const Dashboard = () => {
  // Temporary mock data for UI building
  const mockLinks = [
    {
      id: 1,
      original: "https://github.com/hridik-suresh/nanolink",
      short: "nano.link/repo",
      clicks: 124,
      date: "2024-03-20",
    },
    {
      id: 2,
      original: "https://linkedin.com/in/hridiksuresh",
      short: "nano.link/me",
      clicks: 89,
      date: "2024-03-21",
    },
  ];

  return (
    <div className="pt-8 animate-in fade-in duration-700">
      {/* Welcome Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-10">
        <div>
          <h1 className="text-4xl font-black text-dark tracking-tight">
            Dashboard
          </h1>
          <p className="text-secondary font-medium">
            Welcome back, <span className="text-primary">hridik_</span>
          </p>
        </div>
        <button className="bg-primary hover:bg-primary-dark text-white font-bold py-3 px-6 rounded-xl transition-all shadow-lg shadow-primary/20 cursor-pointer text-sm">
          + Create New Link
        </button>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
        {[
          { label: "Total Links", value: "12", color: "text-primary" },
          { label: "Total Clicks", value: "1,240", color: "text-emerald-500" },
          {
            label: "Top Performer",
            value: "/portfolio",
            color: "text-amber-500",
          },
        ].map((stat, i) => (
          <div
            key={i}
            className="bg-white p-6 rounded-3xl border border-slate-100 shadow-xl shadow-slate-200/50"
          >
            <p className="text-xs font-bold uppercase tracking-widest text-secondary mb-1">
              {stat.label}
            </p>
            <p className={`text-3xl font-black ${stat.color}`}>{stat.value}</p>
          </div>
        ))}
      </div>

      {/* Links List Section */}
      <div className="space-y-4">
        <h3 className="text-xl font-black text-dark mb-6">Recent Links</h3>

        {/* Mobile-Friendly Link Cards */}
        <div className="grid gap-4">
          {mockLinks.map((link) => (
            <div
              key={link.id}
              className="bg-white border border-slate-100 rounded-3xl p-5 md:p-6 shadow-sm hover:shadow-md transition-shadow flex flex-col md:flex-row md:items-center justify-between gap-4"
            >
              <div className="space-y-1 grow">
                <div className="flex items-center gap-2">
                  <span className="text-lg font-bold text-dark truncate max-w-50 md:max-w-md">
                    {link.short}
                  </span>
                  <button className="p-1.5 hover:bg-slate-100 rounded-md text-slate-400 transition-colors">
                    <svg
                      className="w-4 h-4"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M8 5H6a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2v-1M8 5a2 2 0 002 2h2a2 2 0 002-2M8 5a2 2 0 012-2h2a2 2 0 012 2m0 0h2a2 2 0 012 2v3m2 4H10m0 0l3-3m-3 3l3 3"
                      />
                    </svg>
                  </button>
                </div>
                <p className="text-sm text-secondary truncate max-w-62.5 md:max-w-xl font-medium">
                  {link.original}
                </p>
              </div>

              <div className="flex items-center justify-between md:justify-end gap-6 border-t md:border-t-0 pt-4 md:pt-0">
                <div className="text-center md:text-right">
                  <p className="text-xs font-bold text-secondary uppercase tracking-tighter leading-none">
                    Clicks
                  </p>
                  <p className="text-xl font-black text-dark">{link.clicks}</p>
                </div>

                <div className="flex gap-2">
                  <button className="p-3 bg-slate-50 hover:bg-indigo-50 text-secondary hover:text-primary rounded-xl transition-all border border-slate-100 cursor-pointer">
                    <svg
                      className="w-5 h-5"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M11 5H6a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2v-5M18.364 5.636l-3.536 3.536m0 0L14.828 8.172m.708.708L11 13H9v-2l3.121-3.121m0 0l3.536-3.536"
                      />
                    </svg>
                  </button>
                  <button className="p-3 bg-slate-50 hover:bg-accent/10 text-secondary hover:text-accent rounded-xl transition-all border border-slate-100 cursor-pointer">
                    <svg
                      className="w-5 h-5"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                      />
                    </svg>
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
