const Footer = () => {
  return (
    <footer className="mt-12 flex flex-col items-center gap-2">
      <div className="flex items-center gap-4 text-slate-500">
        <a
          href="https://github.com/hridik-suresh"
          target="_blank"
          className="hover:text-blue-400 transition-colors"
        >
          Github
        </a>
        <span className="text-slate-700">•</span>
        <a
          href="https://www.linkedin.com/in/hridiksuresh/"
          target="_blank"
          className="hover:text-blue-400 transition-colors"
        >
          LinkedIn
        </a>
      </div>
      <p className="text-slate-500 text-sm">
        © {new Date().getFullYear()}{" "}
        <span className="text-slate-300 font-medium">NanoLink</span>
      </p>
      <p className="text-slate-600 text-xs italic">
        Crafted with ❤️ by{" "}
        <span className="text-blue-500/80 not-italic font-semibold">
          hridik_
        </span>
      </p>
    </footer>
  );
};

export default Footer;
