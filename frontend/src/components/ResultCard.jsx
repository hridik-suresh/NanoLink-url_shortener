import { Copy, Check, ExternalLink } from "lucide-react";

const ResultCard = ({ shortUrl, copied, onCopy }) => {
  return (
    <div className="mt-10 p-6 bg-[#0f172a]/50 border border-blue-500/20 rounded-xl animate-in fade-in slide-in-from-bottom-4 duration-500">
      <label className="text-xs font-bold text-blue-500 uppercase tracking-widest block mb-2">
        Generated Link
      </label>
      <div className="flex flex-col sm:flex-row items-center gap-4">
        {/* The URL display */}
        <div className="flex-1 font-mono text-lg text-blue-400 truncate w-full p-2 bg-[#1e293b] rounded border border-slate-700">
          {shortUrl}
        </div>

        {/* Action Buttons */}
        <div className="flex gap-2 w-full sm:w-auto">
          <button
            onClick={onCopy}
            className="flex-1 sm:flex-none flex items-center justify-center gap-2 bg-slate-700 hover:bg-slate-600 px-4 py-3 rounded-lg font-medium transition-all active:scale-95"
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
  );
};

export default ResultCard;
