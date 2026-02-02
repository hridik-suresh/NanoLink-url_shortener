import React from "react";

const Footer = () => {
  return (
    <footer className="w-full py-12 border-t border-slate-100 bg-white">
      <div className="max-w-7xl mx-auto px-6 flex flex-col items-center gap-6">
        {/* Social Links */}
        <div className="flex items-center gap-8">
          <a
            href="https://github.com/hridik-suresh"
            target="_blank"
            rel="noopener noreferrer"
            className="text-secondary hover:text-primary font-semibold text-sm transition-all hover:-translate-y-1"
          >
            Github
          </a>
          <div className="w-1 h-1 rounded-full bg-slate-300" />
          <a
            href="https://www.linkedin.com/in/hridiksuresh/"
            target="_blank"
            rel="noopener noreferrer"
            className="text-secondary hover:text-primary font-semibold text-sm transition-all hover:-translate-y-1"
          >
            LinkedIn
          </a>
        </div>

        {/* Branding & Attribution */}
        <div className="flex flex-col items-center gap-2 text-center">
          <p className="text-secondary text-sm font-medium">
            © {new Date().getFullYear()}{" "}
            <span className="text-dark font-black tracking-tight">
              NanoLink
            </span>
          </p>

          <p className="text-slate-400 text-xs italic">
            Crafted with{" "}
            <span className="text-accent animate-pulse not-italic">❤️</span> by{" "}
            <span className="text-primary not-italic font-bold hover:underline decoration-2 underline-offset-4">
              hridik_
            </span>
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
