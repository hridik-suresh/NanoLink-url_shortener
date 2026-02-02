import React, { useState } from "react";
import { Link } from "react-router-dom";

const Home = () => {
  const [url, setUrl] = useState("");
  const [alias, setAlias] = useState("");
  const [shortenedUrl, setShortenedUrl] = useState(""); // New state for result

  const handleSubmit = (e) => {
    e.preventDefault();
    // For now, we'll just simulate a result for the UI
    setShortenedUrl(`nano.link/${alias || "xK3j9L1"}`);
  };

  return (
    <div className="flex flex-col items-center justify-center pt-12 md:pt-24 animate-in fade-in duration-700">
      {/* Hero Section */}
      <div className="text-center mb-12 px-6">
        <h1 className="text-5xl md:text-7xl font-black text-dark mb-6 tracking-tight">
          Link shortening <br />
          <span className="text-primary inline-block hover:scale-105 transition-transform cursor-default">
            reimagined.
          </span>
        </h1>
        <p className="text-secondary text-lg md:text-2xl max-w-2xl mx-auto font-medium">
          The professional way to manage, track, and brand your short links.
        </p>
      </div>

      {/* Input Section */}
      <div className="w-full max-w-3xl bg-white rounded-3xl shadow-2xl shadow-primary/10 p-2 md:p-3 border border-slate-100">
        <form
          onSubmit={handleSubmit}
          className="bg-slate-50 rounded-[1.4rem] p-6 md:p-8 flex flex-col gap-5"
        >
          <div className="space-y-2">
            <label className="text-xs font-bold uppercase tracking-widest text-secondary ml-1 text-left block">
              Destination URL
            </label>
            <input
              type="url"
              placeholder="https://your-very-long-link.com/path"
              className="w-full px-6 py-4 rounded-2xl bg-white border border-slate-200 focus:outline-none focus:ring-4 focus:ring-primary/10 focus:border-primary transition-all text-dark text-lg shadow-sm"
              value={url}
              onChange={(e) => setUrl(e.target.value)}
              required
            />
          </div>

          <div className="flex flex-col md:flex-row gap-5">
            <div className="flex-grow space-y-2 text-left">
              <label className="text-xs font-bold uppercase tracking-widest text-secondary ml-1 flex justify-between">
                Custom Alias (Optional)
                <span className="text-[10px] lowercase text-primary/60 italic font-normal">
                  Login to customize
                </span>
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-6 flex items-center pointer-events-none text-secondary/50 font-medium">
                  nano.link/
                </div>
                <input
                  type="text"
                  placeholder="my-link"
                  className="w-full pl-28 pr-6 py-4 rounded-2xl bg-white border border-slate-200 focus:outline-none focus:ring-4 focus:ring-primary/10 focus:border-primary transition-all text-dark shadow-sm"
                  value={alias}
                  onChange={(e) => setAlias(e.target.value)}
                />
              </div>
            </div>

            <div className="flex flex-col justify-end">
              <button
                type="submit"
                className="bg-primary hover:bg-primary-dark text-white font-bold h-[60px] md:h-[58px] px-10 rounded-2xl transition-all shadow-lg shadow-primary/25 active:scale-95 cursor-pointer flex items-center justify-center"
              >
                Shorten Link
              </button>
            </div>
          </div>
        </form>
      </div>

      {/* RESULT SECTION */}
      {shortenedUrl && (
        <div className="mt-8 w-full max-w-3xl animate-in zoom-in duration-300">
          <div className="bg-primary/5 border-2 border-dashed border-primary/20 rounded-2xl p-6 flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="text-left">
              <p className="text-xs font-bold text-primary uppercase tracking-wider mb-1">
                Your shortened link is ready!
              </p>
              <p className="text-xl font-bold text-dark">{shortenedUrl}</p>
            </div>
            <button
              onClick={() => navigator.clipboard.writeText(shortenedUrl)}
              className="bg-white text-primary border border-primary/20 hover:bg-primary hover:text-white px-6 py-3 rounded-xl font-bold transition-all shadow-sm active:scale-95"
            >
              Copy Link
            </button>
          </div>
        </div>
      )}

      {/* Quick Stats Section */}
      <div className="mt-16 grid grid-cols-2 md:grid-cols-3 gap-8 md:gap-16 text-center">
        <div>
          <p className="text-3xl font-bold text-dark tracking-tight">10k+</p>
          <p className="text-secondary text-sm font-semibold uppercase tracking-tighter">
            Links Created
          </p>
        </div>
        <div>
          <p className="text-3xl font-bold text-dark tracking-tight">50k+</p>
          <p className="text-secondary text-sm font-semibold uppercase tracking-tighter">
            Total Clicks
          </p>
        </div>
        <div className="col-span-2 md:col-span-1 border-t md:border-t-0 pt-8 md:pt-0">
          <p className="text-3xl font-bold text-dark tracking-tight">99.9%</p>
          <p className="text-secondary text-sm font-semibold uppercase tracking-tighter">
            Uptime
          </p>
        </div>
      </div>
    </div>
  );
};

export default Home;
