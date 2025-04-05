"use client";

import { Search, X } from "lucide-react";
import { motion } from "framer-motion";
import { useState, useEffect } from "react";

export default function HeaderSection({ searchTerm, setSearchTerm }) {
  const [isFocused, setIsFocused] = useState(false);

  const handleClearSearch = () => {
    setSearchTerm("");
  };

  return (
    <div className="relative py-16 px-4 text-center">
      {/* Decorative elements */}
      <div className="absolute inset-0 overflow-hidden">
        {/* Animated background elements */}
        <div className="absolute top-0 right-12 w-16 h-16 bg-gradient-to-br from-purple-500 to-pink-500 rounded-lg transform rotate-12 opacity-20 animate-pulse" />
        <div className="absolute top-12 left-12 w-4 h-4 bg-blue-400 rounded-full animate-bounce" />
        <div className="absolute bottom-12 right-24 w-4 h-4 bg-indigo-400 rounded-full animate-bounce animation-delay-1000" />
        <div
          className="absolute top-0 left-24 w-16 h-16 bg-gradient-to-br from-blue-500 to-cyan-500 transform -rotate-12 opacity-20 animate-pulse animation-delay-1000"
          style={{ clipPath: "polygon(50% 0%, 0% 100%, 100% 100%)" }}
        />
        <div className="absolute bottom-0 left-1/4 w-12 h-12 bg-gradient-to-tr from-pink-500 to-rose-500 transform rotate-45 opacity-20 animate-pulse animation-delay-1500" />
        <div className="absolute bottom-12 right-8 w-8 h-8 bg-gradient-to-br from-indigo-500 to-purple-500 rounded-sm transform rotate-12 opacity-20 animate-pulse animation-delay-2000" />
      </div>

      {/* Title and subtitle */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="relative z-10"
      >
        <h1 className="text-5xl sm:text-6xl md:text-7xl font-bold mb-4">
          <span className="bg-clip-text text-transparent bg-gradient-to-r from-purple-600 via-pink-600 to-blue-600 animate-gradient-x">
            PDF Tools
          </span>
        </h1>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="text-xl sm:text-2xl text-gray-600 dark:text-gray-300 mb-8"
        >
          <span className="bg-clip-text text-transparent bg-gradient-to-r from-gray-600 to-gray-400 dark:from-gray-300 dark:to-gray-500">
            Free Online PDF Tools
          </span>
        </motion.p>
      </motion.div>

      {/* Search bar */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.4 }}
        className="flex items-center justify-center max-w-md mx-auto"
      >
        <div className="relative flex w-full">
          <div className="absolute inset-y-0 left-3 flex items-center pointer-events-none">
            <Search
              className={`h-5 w-5 transition-colors duration-300 ${
                isFocused ? "text-purple-500" : "text-gray-400"
              }`}
            />
          </div>
          <input
            type="text"
            placeholder="Search PDF tools..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            onFocus={() => setIsFocused(true)}
            onBlur={() => setIsFocused(false)}
            className="pl-10 pr-10 py-3 w-full rounded-full border border-gray-200 dark:border-gray-700 bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-300"
          />
          {searchTerm && (
            <motion.button
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.8 }}
              onClick={handleClearSearch}
              className="absolute inset-y-0 right-3 flex items-center justify-center w-8 h-8 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors duration-200"
            >
              <X className="h-4 w-4 text-gray-400" />
            </motion.button>
          )}
        </div>
      </motion.div>
    </div>
  );
}
