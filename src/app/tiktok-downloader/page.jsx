"use client";

import { useState } from "react";
import { Music, Download, Loader2 } from "lucide-react";
import { motion } from "framer-motion";

export default function TikTokDownloader() {
  const [url, setUrl] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  const handleDownload = async (e) => {
    e.preventDefault();
    if (!url) {
      setError("Please enter a TikTok URL");
      return;
    }

    setIsLoading(true);
    setError("");

    try {
      // TODO: Implement TikTok download logic
      console.log("Downloading:", url);
    } catch (err) {
      setError("Failed to download video. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="relative min-h-screen w-full overflow-hidden">
      {/* Background Design */}
      <div className="absolute inset-0 -z-10 bg-[#0F172A]">
        {/* Gradient background */}
        <div className="absolute inset-0 bg-gradient-to-br from-[#1a237e] via-[#311b92] to-[#4a148c]" />

        {/* Pattern overlay */}
        <div className="absolute inset-0 opacity-30 bg-grid-slate-800/30" />

        {/* Glowing orbs */}
        <div className="absolute top-1/4 -left-20 w-72 h-72 bg-blue-500/20 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-1/4 -right-20 w-72 h-72 bg-purple-500/20 rounded-full blur-3xl animate-pulse" />
      </div>

      {/* Content */}
      <div className="relative z-10">
        {/* Header */}
        <div className="relative py-16 px-4 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="relative z-10 max-w-4xl mx-auto"
          >
            <h1 className="text-5xl sm:text-6xl md:text-7xl font-bold mb-6 tracking-tight">
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400">
                TikTok Downloader
              </span>
            </h1>
            <p className="text-xl sm:text-2xl text-gray-300 mb-12">
              Download TikTok videos without watermark
            </p>

            {/* Main Content */}
            <div className="max-w-2xl mx-auto">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.4 }}
                className="bg-[#1C2537]/50 backdrop-blur-xl rounded-2xl border border-gray-800/50 p-8"
              >
                <form onSubmit={handleDownload} className="space-y-6">
                  <div className="space-y-6">
                    <div className="relative">
                      <div className="absolute inset-y-0 left-5 flex items-center pointer-events-none">
                        <Music className="h-7 w-7 text-gray-400" />
                      </div>
                      <input
                        type="text"
                        id="url"
                        value={url}
                        onChange={(e) => setUrl(e.target.value)}
                        placeholder="Paste TikTok URL here..."
                        className="w-full pl-16 pr-6 py-6 bg-[#1C2537]/80 border border-gray-700 rounded-2xl text-lg text-gray-200 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-300"
                      />
                    </div>

                    <button
                      type="submit"
                      disabled={isLoading}
                      className="w-full flex items-center justify-center gap-3 px-8 py-6 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 hover:from-blue-600 hover:via-purple-600 hover:to-pink-600 text-white rounded-2xl transition-all duration-300 font-medium text-lg disabled:opacity-50 disabled:cursor-not-allowed shadow-lg"
                    >
                      {isLoading ? (
                        <>
                          <Loader2 className="h-6 w-6 animate-spin" />
                          <span>Processing...</span>
                        </>
                      ) : (
                        <>
                          <Download className="h-6 w-6" />
                          <span>Download</span>
                        </>
                      )}
                    </button>

                    {error && (
                      <p className="text-sm text-red-400 text-center">
                        {error}
                      </p>
                    )}
                  </div>

                  <div className="text-center text-gray-400 text-sm">
                    Download TikTok videos without watermark
                  </div>
                </form>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
