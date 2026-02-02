import React from "react";

const Footer = () => {
  return (
    <footer className="w-full bg-white border-t border-slate-100 py-10 mt-auto">
      <div className="max-w-7xl mx-auto px-4 flex flex-col items-center gap-4">
        {/* Social Links */}
        <div className="flex items-center gap-6 text-slate-500 font-medium text-sm sm:text-base">
          <a
            href="https://github.com/hridik-suresh"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-indigo-600 transition-all duration-300 hover:-translate-y-0.5"
          >
            Github
          </a>
          <span className="text-slate-300 select-none">•</span>
          <a
            href="https://www.linkedin.com/in/hridiksuresh/"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-indigo-600 transition-all duration-300 hover:-translate-y-0.5"
          >
            LinkedIn
          </a>
        </div>

        {/* Copyright Section */}
        <div className="flex flex-col items-center gap-1 text-center">
          <p className="text-slate-400 text-xs sm:text-sm tracking-wide">
            © {new Date().getFullYear()}{" "}
            <span className="text-slate-800 font-bold tracking-tight">
              NanoLink
            </span>
          </p>

          <p className="text-slate-500 text-[10px] sm:text-xs italic">
            Crafted with <span className="text-red-400 animate-pulse">❤️</span>{" "}
            by{" "}
            <span className="text-indigo-600 not-italic font-bold hover:underline cursor-default">
              hridik_
            </span>
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
