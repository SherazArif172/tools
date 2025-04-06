"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";

export default function NotFound() {
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
        <div className="relative py-16 px-4 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="relative z-10 max-w-4xl mx-auto"
          >
            <h1 className="text-7xl sm:text-8xl font-bold mb-4 tracking-tight">
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400">
                404
              </span>
            </h1>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-6 tracking-tight">
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400">
                Page Not Found
              </span>
            </h2>
            <p className="text-lg sm:text-xl text-gray-300 mb-12">
              Oops! The page you're looking for doesn't exist.
            </p>

            {/* Main Content */}
            <div className="max-w-2xl mx-auto">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.4 }}
                className="bg-[#1C2537]/50 backdrop-blur-xl rounded-2xl border border-gray-800/50 p-8"
              >
                <div className="space-y-6">
                  <p className="text-base sm:text-lg text-gray-300">
                    The page you are looking for might have been removed, had
                    its name changed, or is temporarily unavailable.
                  </p>

                  <Link
                    href="/"
                    className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 hover:from-blue-600 hover:via-purple-600 hover:to-pink-600 text-white rounded-2xl transition-all duration-300 font-medium text-base shadow-lg"
                  >
                    <ArrowLeft className="h-4 w-4" />
                    <span>Go Back Home</span>
                  </Link>
                </div>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
