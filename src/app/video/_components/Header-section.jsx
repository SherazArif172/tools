"use client";

import { Video, Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import { motion } from "framer-motion";

export default function HeaderSection({ searchTerm, setSearchTerm }) {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16 lg:py-20">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="text-center"
      >
        <div className="inline-flex items-center justify-center px-4 py-2 rounded-full bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 mb-6">
          <Video className="h-5 w-5 mr-2" />
          <span className="text-sm font-medium">Downloaders</span>
        </div>

        <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-gray-900 dark:text-white mb-6">
          <span className="bg-gradient-to-r from-blue-600 via-cyan-500 to-blue-600 dark:from-cyan-400 dark:via-blue-400 dark:to-purple-400 bg-clip-text text-transparent">
            Video Downloader Tools
          </span>
          <br />
          <span className="text-gray-600 dark:text-gray-300">
            for All Your Needs
          </span>
        </h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="mt-3 max-w-md mx-auto text-base text-gray-500 dark:text-gray-400 sm:text-lg md:mt-5 md:text-xl md:max-w-3xl mb-3"
        >
          Download high-quality videos from YouTube, Instagram, TikTok,
          Facebook, Twitter, and more
        </motion.p>

        <div className="max-w-xl mx-auto relative">
          <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
          <input
            type="text"
            placeholder="Search video tools..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            onFocus={() => setIsFocused(true)}
            onBlur={() => setIsFocused(false)}
            className="pl-10 pr-10 py-3 w-full rounded-full border border-gray-200 dark:border-gray-700 bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-300"
          />
        </div>
      </motion.div>
    </div>
  );
}
