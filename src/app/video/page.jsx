"use client";

import { useState, useEffect } from "react";
import {
  Youtube,
  Instagram,
  Facebook,
  Twitter,
  Globe,
  Music,
  Play,
  Search,
  Video,
} from "lucide-react";
import HeaderSection from "./_components/Header-section";
import Link from "next/link";
import { motion } from "framer-motion";

// Video downloading tools data array
const videoTools = [
  {
    id: "youtube-downloader",
    title: "YouTube Downloader",
    description: "Download YouTube videos in 4K, 1080p, 720p, MP4, MP3",
    color: "bg-purple-100",
    iconColor: "text-purple-500",
    icon: <Youtube className="h-6 w-6" />,
    path: "/youtube-downloader",
  },
  {
    id: "instagram-downloader",
    title: "Instagram Downloader",
    description: "Download Instagram videos, reels, stories, and IGTV",
    color: "bg-pink-100",
    iconColor: "text-pink-500",
    icon: <Instagram className="h-6 w-6" />,
    path: "/instagram-downloader",
  },
  {
    id: "facebook-downloader",
    title: "Facebook Downloader",
    description: "Download Facebook videos, reels, and stories in HD",
    color: "bg-blue-100",
    iconColor: "text-blue-500",
    icon: <Facebook className="h-6 w-6" />,
    path: "/facebook-downloader",
  },
  {
    id: "tiktok-downloader",
    title: "TikTok Downloader",
    description: "Download TikTok videos without watermark in HD",
    color: "bg-indigo-100",
    iconColor: "text-indigo-500",
    icon: <Video className="h-6 w-6" />,
    path: "/tiktok-downloader",
  },
  {
    id: "twitter-downloader",
    title: "Twitter Downloader",
    description: "Download Twitter/X videos in highest quality",
    color: "bg-cyan-100",
    iconColor: "text-cyan-500",
    icon: <Twitter className="h-6 w-6" />,
    path: "/twitter-downloader",
  },
  {
    id: "video-downloader",
    title: "Video Downloader",
    description: "Download videos from any website or social media",
    color: "bg-amber-100",
    iconColor: "text-amber-500",
    icon: <Globe className="h-6 w-6" />,
    path: "/video-downloader",
  },
  {
    id: "audio-extractor",
    title: "Audio Extractor",
    description: "Extract MP3 audio from any video in high quality",
    color: "bg-green-100",
    iconColor: "text-green-500",
    icon: <Music className="h-6 w-6" />,
    path: "/audio-extractor",
  },
  {
    id: "playlist-downloader",
    title: "Playlist Downloader",
    description: "Download entire YouTube playlists in one click",
    color: "bg-rose-100",
    iconColor: "text-rose-500",
    icon: <Play className="h-6 w-6" />,
    path: "/playlist-downloader",
  },
];

export default function VideoToolsPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [debouncedSearchTerm, setDebouncedSearchTerm] = useState("");

  // Debounce search term to prevent too many re-renders
  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedSearchTerm(searchTerm);
    }, 300);

    return () => clearTimeout(timer);
  }, [searchTerm]);

  // Filter tools based on search term
  const filteredTools = videoTools.filter((tool) => {
    const searchLower = debouncedSearchTerm.toLowerCase();
    return (
      tool.title.toLowerCase().includes(searchLower) ||
      tool.description.toLowerCase().includes(searchLower)
    );
  });

  return (
    <div className="relative min-h-screen w-full overflow-hidden">
      {/* Background Design */}
      <div className="absolute inset-0 -z-10">
        {/* Base gradient */}
        <div className="absolute inset-0 bg-gradient-to-br from-gray-50 via-gray-100 to-gray-50 dark:from-[#0F172A] dark:via-[#131B2E] dark:to-[#0F172A]" />

        {/* Pattern overlay */}
        <div className="absolute inset-0 opacity-30 bg-grid-gray-200/50 dark:bg-grid-slate-800/30" />

        {/* Floating elements */}
        {[...Array(15)].map((_, i) => (
          <div
            key={i}
            className="absolute w-2 h-2 bg-blue-500/20 dark:bg-purple-500/20 rounded-full animate-float"
            style={{
              top: `${Math.random() * 100}%`,
              left: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 5}s`,
            }}
          />
        ))}

        {/* Glowing orbs */}
        <div className="absolute top-1/4 -left-20 w-72 h-72 bg-blue-500/20 dark:bg-purple-500/30 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-1/4 -right-20 w-72 h-72 bg-cyan-500/20 dark:bg-indigo-500/30 rounded-full blur-3xl animate-pulse" />

        {/* Shimmer effect */}
        <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-blue-500/5 dark:via-purple-500/10 to-transparent opacity-0 animate-shimmer" />
      </div>

      {/* Content */}
      <div className="relative z-10">
        <HeaderSection searchTerm={searchTerm} setSearchTerm={setSearchTerm} />

        {/* Search results count */}
        {debouncedSearchTerm && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center mb-8"
          >
            <p className="text-sm text-gray-600 dark:text-gray-300">
              Found {filteredTools.length}{" "}
              {filteredTools.length === 1 ? "tool" : "tools"} matching "
              <span className="font-medium text-blue-600 dark:text-purple-400">
                {debouncedSearchTerm}
              </span>
              "
            </p>
          </motion.div>
        )}

        {/* Tools Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 px-4 pb-12">
          {filteredTools.map((tool) => (
            <motion.div
              key={tool.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
              className="group relative"
            >
              {/* Glow effect */}
              <div className="absolute -inset-0.5 bg-gradient-to-r from-blue-600 via-cyan-500 to-blue-600 dark:from-cyan-600 dark:via-blue-500 dark:to-purple-600 rounded-xl blur opacity-0 group-hover:opacity-75 transition-all duration-700 animate-gradient-xy group-hover:animate-gradient-xy" />

              {/* Card */}
              <Link href={tool.path}>
                <div className="relative flex flex-col h-full rounded-xl bg-white/80 dark:bg-[#1C2537]/50 backdrop-blur-xl border border-gray-200/50 dark:border-gray-800/50 p-6 transition-all duration-700 group-hover:bg-white/90 dark:group-hover:bg-[#1C2537]/70 group-hover:border-blue-500/50 dark:group-hover:border-cyan-500/50 hover:shadow-[0_0_2rem_-0.5rem_#3b82f6] dark:hover:shadow-[0_0_2rem_-0.5rem_#fff8] group-hover:scale-[1.02]">
                  {/* Icon container with enhanced animations */}
                  <div className="relative w-16 h-16 mb-6 transform group-hover:scale-110 transition-all duration-700">
                    <div className="absolute inset-0 bg-gradient-to-br from-blue-600/30 via-cyan-500/30 to-blue-600/30 dark:from-cyan-600/30 dark:via-blue-500/30 dark:to-purple-600/30 rounded-xl transform rotate-6 group-hover:rotate-180 transition-all duration-1000 ease-out animate-gradient-xy" />
                    <div className="relative flex items-center justify-center w-full h-full bg-gray-100/80 dark:bg-gray-800/50 rounded-xl group-hover:bg-gray-100/90 dark:group-hover:bg-gray-800/90 transition-all duration-700">
                      <div className="text-blue-600 dark:text-cyan-400 group-hover:text-blue-500 dark:group-hover:text-cyan-300 transform group-hover:scale-125 group-hover:rotate-12 transition-all duration-700">
                        {tool.icon}
                      </div>
                    </div>
                  </div>

                  {/* Content with enhanced animations */}
                  <div className="flex-grow">
                    <h3 className="text-xl font-semibold bg-gradient-to-r from-gray-900 via-blue-800 to-gray-900 dark:from-gray-100 dark:via-cyan-200 dark:to-gray-300 bg-clip-text text-transparent group-hover:from-blue-600 group-hover:via-cyan-600 group-hover:to-blue-600 dark:group-hover:from-cyan-400 dark:group-hover:via-blue-400 dark:group-hover:to-purple-400 transition-all duration-700 mb-2 transform group-hover:translate-x-2">
                      {tool.title}
                    </h3>

                    <p className="text-sm text-gray-600 dark:text-gray-400 group-hover:text-blue-600 dark:group-hover:text-cyan-300 transition-all duration-700 transform group-hover:translate-x-2">
                      {tool.description}
                    </p>
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}
