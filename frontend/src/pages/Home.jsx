import { useState } from "react";
import {
  Scissors,
  Copy,
  Check,
  ExternalLink,
  Zap,
  Shield,
  BarChart3,
} from "lucide-react";
import api from "../utils/api";

const Home = () => {
  const [url, setUrl] = useState("");
  const [shortUrl, setShortUrl] = useState("");
  const [loading, setLoading] = useState(false);
  const [copied, setCopied] = useState(false);

  const handleShorten = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const { data } = await api.post("/url/shorten", { originalUrl: url });
      // Construct the full short URL
      setShortUrl(`${import.meta.env.VITE_BACKEND_URL}/${data.data.shortCode}`);
    } catch (err) {
      console.error(err);
      alert("Failed to shorten URL. Check if it's a valid link!");
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
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="pt-20 pb-32 px-4 text-center">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight mb-6">
            Shorten your links,{" "}
            <span className="text-primary">expand your reach.</span>
          </h1>
          <p className="text-xl text-text-muted mb-10 max-w-2xl mx-auto">
            NanoLink is the professional way to shorten and track your URLs.
            Clean, fast, and free for everyone.
          </p>

          {/* Shortener Box */}
          <div className="max-w-2xl mx-auto bg-white p-2 rounded-2xl shadow-2xl border border-border">
            <form
              onSubmit={handleShorten}
              className="flex flex-col md:flex-row gap-2"
            >
              <input
                type="url"
                placeholder="Paste a long URL here..."
                required
                value={url}
                onChange={(e) => setUrl(e.target.value)}
                className="flex-1 border-none focus:ring-0 text-lg py-4 px-6"
              />
              <button
                disabled={loading}
                className="bg-primary hover:bg-primary-dark text-white px-8 py-4 rounded-xl font-bold transition-all flex items-center justify-center gap-2 whitespace-nowrap disabled:opacity-70"
              >
                {loading ? (
                  "Processing..."
                ) : (
                  <>
                    <Scissors className="w-5 h-5" /> Shorten Now
                  </>
                )}
              </button>
            </form>
          </div>

          {/* Result Area */}
          {shortUrl && (
            <div className="mt-8 space-y-4 animate-in zoom-in-95 duration-300">
              {/* The Link Card */}
              <div className="p-6 bg-emerald-50 border border-emerald-100 rounded-2xl max-w-2xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
                <div className="flex items-center gap-3 overflow-hidden w-full">
                  <div className="bg-accent/20 p-2 rounded-lg shrink-0">
                    <Check className="text-accent w-5 h-5" />
                  </div>
                  <span className="font-bold text-accent truncate text-sm sm:text-base">
                    {shortUrl}
                  </span>
                </div>
                <button
                  onClick={copyToClipboard}
                  className="w-full sm:w-auto flex items-center justify-center gap-2 bg-white px-6 py-2.5 rounded-xl border border-emerald-200 text-accent font-bold hover:bg-emerald-100 transition-colors shadow-sm"
                >
                  {copied ? (
                    "Copied!"
                  ) : (
                    <>
                      <Copy className="w-4 h-4" /> Copy
                    </>
                  )}
                </button>
              </div>

              {/* The Guest "Upsell" Message */}
              <div className="max-w-2xl mx-auto bg-primary/5 border border-primary/10 rounded-2xl p-6 flex flex-col md:flex-row items-center gap-4 text-left">
                <div className="bg-primary/10 p-3 rounded-full shrink-0">
                  <BarChart3 className="text-primary w-6 h-6" />
                </div>
                <div className="flex-1 text-center md:text-left">
                  <h4 className="font-bold text-text-main text-lg">
                    Want more control?
                  </h4>
                  <p className="text-text-muted text-sm">
                    Create a free account to{" "}
                    <strong>customize your URLs</strong>, manage your links, and{" "}
                    <strong>track real-time analytics</strong>.
                  </p>
                </div>
                <Link
                  to="/register"
                  className="whitespace-nowrap bg-primary text-white px-6 py-2.5 rounded-xl font-bold text-sm hover:bg-primary-dark transition-all shadow-md shadow-primary/20"
                >
                  Sign Up Free
                </Link>
              </div>
            </div>
          )}
        </div>
      </section>

      {/* Features Section */}
      <section className="bg-white py-20 px-4 border-t border-border">
        <div className="max-w-7xl mx-auto grid md:grid-cols-3 gap-12">
          <FeatureCard
            icon={<Zap />}
            title="Lightning Fast"
            desc="Redirects happen in milliseconds globally."
          />
          <FeatureCard
            icon={<BarChart3 />}
            title="Detailed Analytics"
            desc="Track clicks, devices, and locations in real-time."
          />
          <FeatureCard
            icon={<Shield />}
            title="Secure & Private"
            desc="Your data is encrypted and links are scanned for safety."
          />
        </div>
      </section>
    </div>
  );
};

// Small helper component for features--------------------------------------------
const FeatureCard = ({ icon, title, desc }) => (
  <div className="text-center group">
    <div className="w-14 h-14 bg-bg-main text-primary rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:bg-primary group-hover:text-white transition-all duration-300">
      {icon}
    </div>
    <h3 className="text-xl font-bold mb-2">{title}</h3>
    <p className="text-text-muted leading-relaxed">{desc}</p>
  </div>
);

export default Home;
