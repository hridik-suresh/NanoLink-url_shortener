import { useState } from "react";
import axios from "axios";
import { Copy, Check, ExternalLink, Link as LinkIcon } from "lucide-react";

function App() {
  const [url, setUrl] = useState("");
  const [shortUrl, setShortUrl] = useState("");
  const [loading, setLoading] = useState(false);
  const [copied, setCopied] = useState(false);
  const [error, setError] = useState("");

  const handleShorten = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      // Connecting to your modular backend
      const response = await axios.post(
        `${import.meta.env.VITE_BACKEND_URL}/api/create`,
        {
          url,
        },
      );
      setShortUrl(response.data.shortUrl);
    } catch (err) {
      setError(
        err.response?.data?.message ||
          "Something went wrong. Check if server is running!",
      );
    } finally {
      setLoading(false);
    }
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(shortUrl);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="min-h-screen bg-[#0f172a] text-slate-200 flex flex-col items-center justify-center p-6 font-sans">
      <div className="w-full max-w-2xl bg-[#1e293b] rounded-2xl shadow-2xl border border-slate-700 p-8 sm:p-12">
        {/* Header */}
        <div className="flex items-center gap-3 mb-2 justify-center">
          <LinkIcon className="text-blue-500 w-8 h-8" />
          <h1 className="text-4xl font-extrabold text-white tracking-tight">
            NanoLink
          </h1>
        </div>
        <p className="text-slate-400 text-center mb-10">
          Paste your long, messy URL below to get a clean, trackable short link.
        </p>

        {/* Input Form */}
        <form onSubmit={handleShorten} className="space-y-4">
          <div className="relative">
            <input
              type="text"
              placeholder="https://example.com/very/long/path/to/something"
              className="w-full bg-[#0f172a] border border-slate-700 rounded-xl px-4 py-4 text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all pr-32"
              value={url}
              onChange={(e) => setUrl(e.target.value)}
              required
            />
            <button
              type="submit"
              disabled={loading}
              className="absolute right-2 top-2 bottom-2 bg-blue-600 hover:bg-blue-500 text-white px-6 rounded-lg font-bold transition-colors disabled:opacity-50"
            >
              {loading ? "..." : "Shorten"}
            </button>
          </div>
          {error && <p className="text-red-400 text-sm ml-2">{error}</p>}
        </form>

        {/* Result Card */}
        {shortUrl && (
          <div className="mt-10 p-6 bg-[#0f172a]/50 border border-blue-500/20 rounded-xl animate-in fade-in slide-in-from-bottom-4 duration-500">
            <label className="text-xs font-bold text-blue-500 uppercase tracking-widest block mb-2">
              Generated Link
            </label>
            <div className="flex flex-col sm:flex-row items-center gap-4">
              <div className="flex-1 font-mono text-lg text-blue-400 truncate w-full p-2 bg-[#1e293b] rounded border border-slate-700">
                {shortUrl}
              </div>
              <div className="flex gap-2 w-full sm:w-auto">
                <button
                  onClick={copyToClipboard}
                  className="flex-1 sm:flex-none flex items-center justify-center gap-2 bg-slate-700 hover:bg-slate-600 px-4 py-3 rounded-lg font-medium transition-all"
                >
                  {copied ? (
                    <Check size={18} className="text-green-400" />
                  ) : (
                    <Copy size={18} />
                  )}
                  <span>{copied ? "Copied!" : "Copy"}</span>
                </button>
                <a
                  href={shortUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="flex items-center justify-center bg-blue-600/10 hover:bg-blue-600/20 text-blue-400 px-4 py-3 rounded-lg transition-all"
                >
                  <ExternalLink size={18} />
                </a>
              </div>
            </div>
          </div>
        )}
      </div>

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
    </div>
  );
}

export default App;
