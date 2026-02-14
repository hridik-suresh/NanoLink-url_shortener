const Footer = () => {
  return (
    <footer className="w-full py-12 border-t border-border bg-white mt-auto">
      <div className="max-w-7xl mx-auto px-6 flex flex-col items-center gap-6">
        {/* Social Links */}
        <div className="flex items-center gap-8">
          <a
            href="https://github.com/hridik-suresh"
            target="_blank"
            rel="noopener noreferrer"
            className="text-text-muted hover:text-primary font-semibold text-sm transition-all hover:-translate-y-1"
          >
            Github
          </a>

          {/* Decorative Dot */}
          <div className="w-1.5 h-1.5 rounded-full bg-border" />

          <a
            href="https://www.linkedin.com/in/hridiksuresh/"
            target="_blank"
            rel="noopener noreferrer"
            className="text-text-muted hover:text-primary font-semibold text-sm transition-all hover:-translate-y-1"
          >
            LinkedIn
          </a>
        </div>

        {/* Branding & Attribution */}
        <div className="flex flex-col items-center gap-2 text-center">
          <p className="text-text-muted text-sm font-medium">
            © {new Date().getFullYear()}{" "}
            <span className="text-text-main font-black tracking-tight">
              NanoLink
            </span>
          </p>

          <p className="text-text-muted/60 text-xs italic">
            Crafted with{" "}
            <span className="text-danger animate-pulse not-italic">❤️</span> by{" "}
            <span className="text-primary not-italic font-bold hover:underline decoration-2 underline-offset-4 cursor-pointer">
              hridik_
            </span>
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
