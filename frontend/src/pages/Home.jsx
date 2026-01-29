import { useState } from "react";
import axios from "axios";
import { Link as LinkIcon } from "lucide-react";
import ResultCard from "../components/ResultCard";

const Home = () => {
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
      const response = await axios.post(
        `${import.meta.env.VITE_BACKEND_URL}/api/create`,
        { url },
      );
      setShortUrl(response.data.shortUrl);
    } catch (err) {
      setError(err.response?.data?.message || "Cannot connect to server.");
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
    <div className="w-full max-w-2xl bg-[#1e293b] rounded-2xl shadow-2xl border border-slate-700 p-8 sm:p-12">
      <div className="flex items-center gap-3 mb-2 justify-center">
        <LinkIcon className="text-blue-500 w-8 h-8" />
        <h1 className="text-4xl font-extrabold text-white tracking-tight">
          NanoLink
        </h1>
      </div>
      <p className="text-slate-400 text-center mb-10">
        Paste your long, messy URL below.
      </p>

      <form onSubmit={handleShorten} className="space-y-4">
        <div className="relative">
          <input
            type="text"
            className="w-full bg-[#0f172a] border border-slate-700 rounded-xl px-4 py-4 text-white focus:ring-2 focus:ring-blue-500 outline-none pr-32"
            value={url}
            onChange={(e) => setUrl(e.target.value)}
            required
            placeholder="https://example.com"
          />
          <button
            type="submit"
            disabled={loading}
            className="absolute right-2 top-2 bottom-2 bg-blue-600 text-white px-6 rounded-lg font-bold disabled:opacity-50"
          >
            {loading ? "..." : "Shorten"}
          </button>
        </div>
        {error && <p className="text-red-400 text-sm ml-2">{error}</p>}
      </form>

      {shortUrl && (
        <ResultCard
          shortUrl={shortUrl}
          copied={copied}
          onCopy={copyToClipboard}
        />
      )}
    </div>
  );
};

export default Home;
