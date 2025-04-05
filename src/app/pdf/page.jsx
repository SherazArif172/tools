"use client";

import { useState, useEffect } from "react";
import {
  FileText,
  Scissors,
  Layers,
  RefreshCw,
  FileOutput,
  Edit,
  Lock,
  Image,
  FileSpreadsheet,
  FileIcon as FilePresentation,
  Type,
  Globe,
  Stamp,
  RotateCw,
  ScanLine,
  FilePlus,
  FileType,
  BookOpen,
  FileImage,
  FileCode,
  Search,
} from "lucide-react";
import HeaderSection from "./_components/Header-section";
import Link from "next/link";
import { motion } from "framer-motion";

// Complete data array that matches all items in the image
const pdfTools = [
  {
    id: "jpg-to-pdf",
    title: "JPG to PDF",
    description: "Convert JPG/JPEG images to PDF",
    color: "bg-purple-100",
    iconColor: "text-purple-500",
    icon: <Image className="h-6 w-6" />,
    path: "/jpg-to-pdf", // Set path to "/"
  },
  {
    id: "png-to-pdf",
    title: "PNG to PDF",
    description: "Convert PNG images to PDF",
    color: "bg-green-100",
    iconColor: "text-green-500",
    icon: <Image className="h-6 w-6" />,
    path: "/png-to-pdf", // Set path to "/"
  },
  {
    id: "image-to-pdf",
    title: "IMAGE to PDF",
    description: "Convert images to PDF files",
    color: "bg-pink-100",
    iconColor: "text-pink-500",
    icon: <Image className="h-6 w-6" />,
    path: "/image-to-pdf", // Set path to "/"
  },
  {
    id: "merge-pdf",
    title: "Merge PDF",
    description: "Combine PDF files into a single PDF file",
    color: "bg-amber-100",
    iconColor: "text-amber-500",
    icon: <Layers className="h-6 w-6" />,
    path: "/merge-pdf", // Set path to "/"
  },
  {
    id: "split-pdf",
    title: "Split PDF",
    description: "Separate one PDF into multiple PDF files",
    color: "bg-indigo-100",
    iconColor: "text-indigo-500",
    icon: <Scissors className="h-6 w-6" />,
    path: "/split-pdf", // Set path to "/"
  },
  {
    id: "compress-pdf",
    title: "Compress PDF",
    description: "Reduce file size while optimizing for quality",
    color: "bg-rose-100",
    iconColor: "text-rose-500",
    icon: <FileOutput className="h-6 w-6" />,
    path: "/compress-pdf", // Set path to "/"
  },
  // {
  //   id: "pdf-to-word",
  //   title: "PDF to Word",
  //   description: "Convert PDF to Word documents",
  //   color: "bg-blue-100",
  //   iconColor: "text-blue-500",
  //   icon: <FileText className="h-6 w-6" />,
  //   path: "/", // Set path to "/"
  // },
  // {
  //   id: "word-to-pdf",
  //   title: "Word to PDF",
  //   description: "Convert Word documents to PDF",
  //   color: "bg-green-100",
  //   iconColor: "text-green-500",
  //   icon: <FileText className="h-6 w-6" />,
  //   path: "/word-to-pdf", // Set path to "/"
  // },
  // {
  //   id: "html-to-pdf",
  //   title: "HTML to PDF",
  //   description: "Convert HTML pages to PDF files",
  //   color: "bg-cyan-100",
  //   iconColor: "text-cyan-500",
  //   icon: <FileCode className="h-6 w-6" />,
  //   path: "/", // Set path to "/"
  // },
  // {
  //   id: "pdf-to-jpg",
  //   title: "PDF to JPG",
  //   description: "Convert PDF to JPG/JPEG images",
  //   color: "bg-emerald-100",
  //   iconColor: "text-emerald-500",
  //   icon: <FileImage className="h-6 w-6" />,
  //   path: "/", // Set path to "/"
  // },
  // {
  //   id: "pdf-translator",
  //   title: "PDF Translator",
  //   description: "Translate PDF documents",
  //   color: "bg-green-100",
  //   iconColor: "text-green-500",
  //   icon: <RefreshCw className="h-6 w-6" />,
  //   path: "/", // Set path to "/"
  // },
  // {
  //   id: "url-to-pdf",
  //   title: "URL to PDF",
  //   description: "Convert webpages to PDF files",
  //   color: "bg-red-100",
  //   iconColor: "text-red-500",
  //   icon: <Globe className="h-6 w-6" />,
  //   path: "/", // Set path to "/"
  // },
  // {
  //   id: "rotate-pdf",
  //   title: "Rotate PDF",
  //   description: "Rotate pages in a PDF file",
  //   color: "bg-blue-100",
  //   iconColor: "text-blue-500",
  //   icon: <RotateCw className="h-6 w-6" />,
  //   path: "/", // Set path to "/"
  // },
  // {
  //   id: "scan-to-image-pdf",
  //   title: "Scan to Image PDF",
  //   description: "Convert scanned images to PDF",
  //   color: "bg-yellow-100",
  //   iconColor: "text-yellow-500",
  //   icon: <ScanLine className="h-6 w-6" />,
  //   path: "/", // Set path to "/"
  // },
  // {
  //   id: "create-pdf",
  //   title: "Create PDF",
  //   description: "Create a PDF from scratch",
  //   color: "bg-blue-100",
  //   iconColor: "text-blue-500",
  //   icon: <FilePlus className="h-6 w-6" />,
  //   path: "/", // Set path to "/"
  // },
  // {
  //   id: "edit-pdf",
  //   title: "Edit PDF",
  //   description: "Edit content in your PDF files",
  //   color: "bg-amber-100",
  //   iconColor: "text-amber-500",
  //   icon: <Edit className="h-6 w-6" />,
  //   path: "/", // Set path to "/"
  // },
  // {
  //   id: "pdf-to-ppt",
  //   title: "PDF to PPT",
  //   description: "Convert PDF to PowerPoint presentations",
  //   color: "bg-orange-100",
  //   iconColor: "text-orange-500",
  //   icon: <FilePresentation className="h-6 w-6" />,
  //   path: "/", // Set path to "/"
  // },
  // {
  //   id: "ppt-to-pdf",
  //   title: "PPT to PDF",
  //   description: "Convert PowerPoint presentations to PDF",
  //   color: "bg-orange-100",
  //   iconColor: "text-orange-500",
  //   icon: <FilePresentation className="h-6 w-6" />,
  //   path: "/", // Set path to "/"
  // },
  // {
  //   id: "pdf-to-excel",
  //   title: "PDF to Excel",
  //   description: "Convert PDF to Excel spreadsheets",
  //   color: "bg-green-100",
  //   iconColor: "text-green-500",
  //   icon: <FileSpreadsheet className="h-6 w-6" />,
  //   path: "/", // Set path to "/"
  // },
  {
    id: "excel-to-pdf",
    title: "Excel to PDF",
    description: "Convert Excel spreadsheets to PDF",
    color: "bg-green-100",
    iconColor: "text-green-500",
    icon: <FileSpreadsheet className="h-6 w-6" />,
    path: "/excel-to-pdf", // Set path to "/"
  },
  // {
  //   id: "pdf-page-number",
  //   title: "PDF Page Number",
  //   description: "Add page numbers to your PDF",
  //   color: "bg-purple-100",
  //   iconColor: "text-purple-500",
  //   icon: <Type className="h-6 w-6" />,
  //   path: "/", // Set path to "/"
  // },
  // {
  //   id: "pdf-to-epub",
  //   title: "PDF to EPUB",
  //   description: "Convert PDF to EPUB files",
  //   color: "bg-blue-100",
  //   iconColor: "text-blue-500",
  //   icon: <BookOpen className="h-6 w-6" />,
  //   path: "/", // Set path to "/"
  // },
  // {
  //   id: "epub-to-pdf",
  //   title: "EPUB to PDF",
  //   description: "Convert EPUB files to PDF",
  //   color: "bg-blue-100",
  //   iconColor: "text-blue-500",
  //   icon: <BookOpen className="h-6 w-6" />,
  //   path: "/", // Set path to "/"
  // },
  // {
  //   id: "pdf-watermark",
  //   title: "PDF Watermark",
  //   description: "Add watermarks to your PDF",
  //   color: "bg-purple-100",
  //   iconColor: "text-purple-500",
  //   icon: <Stamp className="h-6 w-6" />,
  //   path: "/", // Set path to "/"
  // },
  // {
  //   id: "protect-pdf",
  //   title: "Protect PDF",
  //   description: "Add password protection to PDF files",
  //   color: "bg-amber-100",
  //   iconColor: "text-amber-500",
  //   icon: <Lock className="h-6 w-6" />,
  //   path: "/", // Set path to "/"
  // },
  // {
  //   id: "pdf-to-text",
  //   title: "PDF to Text",
  //   description: "Extract text from PDF documents",
  //   color: "bg-cyan-100",
  //   iconColor: "text-cyan-500",
  //   icon: <Type className="h-6 w-6" />,
  //   path: "/", // Set path to "/"
  // },
  // {
  //   id: "text-to-pdf",
  //   title: "Text to PDF",
  //   description: "Convert text files to PDF",
  //   color: "bg-cyan-100",
  //   iconColor: "text-cyan-500",
  //   icon: <FileType className="h-6 w-6" />,
  //   path: "/", // Set path to "/"
  // },
  // {
  //   id: "add-watermark",
  //   title: "Add Watermark",
  //   description: "Add watermarks to your PDF",
  //   color: "bg-purple-100",
  //   iconColor: "text-purple-500",
  //   icon: <Stamp className="h-6 w-6" />,
  //   path: "/", // Set path to "/"
  // },
  // {
  //   id: "heic-to-pdf",
  //   title: "HEIC to PDF",
  //   description: "Convert HEIC images to PDF",
  //   color: "bg-blue-100",
  //   iconColor: "text-blue-500",
  //   icon: <Image className="h-6 w-6" />,
  //   path: "/", // Set path to "/"
  // },
  // {
  //   id: "svg-to-pdf",
  //   title: "SVG to PDF",
  //   description: "Convert SVG files to PDF",
  //   color: "bg-green-100",
  //   iconColor: "text-green-500",
  //   icon: <FileCode className="h-6 w-6" />,
  //   path: "/", // Set path to "/"
  // },
  // {
  //   id: "pdf-to-svg",
  //   title: "PDF to SVG",
  //   description: "Convert PDF to SVG files",
  //   color: "bg-green-100",
  //   iconColor: "text-green-500",
  //   icon: <FileCode className="h-6 w-6" />,
  //   path: "/", // Set path to "/"
  // },
  // {
  //   id: "webp-to-pdf",
  //   title: "WEBP to PDF",
  //   description: "Convert WEBP images to PDF",
  //   color: "bg-cyan-100",
  //   iconColor: "text-cyan-500",
  //   icon: <Image className="h-6 w-6" />,
  //   path: "/", // Set path to "/"
  // },
  // {
  //   id: "pdf-to-webp",
  //   title: "PDF to WEBP",
  //   description: "Convert PDF to WEBP images",
  //   color: "bg-cyan-100",
  //   iconColor: "text-cyan-500",
  //   icon: <FileImage className="h-6 w-6" />,
  //   path: "/", // Set path to "/"
  // },
  // {
  //   id: "gif-to-pdf",
  //   title: "GIF to PDF",
  //   description: "Convert GIF images to PDF",
  //   color: "bg-purple-100",
  //   iconColor: "text-purple-500",
  //   icon: <Image className="h-6 w-6" />,
  //   path: "/", // Set path to "/"
  // },
  // {
  //   id: "bitmap-to-pdf",
  //   title: "Bitmap to PDF",
  //   description: "Convert bitmap images to PDF",
  //   color: "bg-blue-100",
  //   iconColor: "text-blue-500",
  //   icon: <Image className="h-6 w-6" />,
  //   path: "/", // Set path to "/"
  // },
  // {
  //   id: "eps-to-pdf",
  //   title: "EPS to PDF",
  //   description: "Convert EPS files to PDF",
  //   color: "bg-amber-100",
  //   iconColor: "text-amber-500",
  //   icon: <FileCode className="h-6 w-6" />,
  //   path: "/", // Set path to "/"
  // },
];

export default function PdfToolsComplete() {
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
  const filteredTools = pdfTools.filter((tool) => {
    const searchLower = debouncedSearchTerm.toLowerCase();
    return (
      tool.title.toLowerCase().includes(searchLower) ||
      tool.description.toLowerCase().includes(searchLower) ||
      tool.featuredTool?.toLowerCase().includes(searchLower)
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
              <div className="relative flex flex-col h-full rounded-xl bg-white/80 dark:bg-[#1C2537]/50 backdrop-blur-xl border border-gray-200/50 dark:border-gray-800/50 p-6 transition-all duration-700 group-hover:bg-white/90 dark:group-hover:bg-[#1C2537]/70 group-hover:border-blue-500/50 dark:group-hover:border-cyan-500/50 hover:shadow-[0_0_2rem_-0.5rem_#3b82f6] dark:hover:shadow-[0_0_2rem_-0.5rem_#fff8] group-hover:scale-[1.02]">
                <Link href={tool.path} className="flex flex-col h-full">
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

                  {/* Footer with enhanced arrow animation */}
                  <div className="flex items-center justify-end mt-auto pt-4 border-t border-gray-200/50 dark:border-gray-800/50 group-hover:border-blue-500/30 dark:group-hover:border-cyan-500/30 transition-all duration-700">
                    <svg
                      className="w-5 h-5 text-gray-400 dark:text-gray-500 group-hover:text-blue-500 dark:group-hover:text-cyan-400 transform translate-x-0 group-hover:translate-x-3 transition-all duration-700 ease-out"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M17 8l4 4m0 0l-4 4m4-4H3"
                      />
                    </svg>
                  </div>
                </Link>
              </div>
            </motion.div>
          ))}
          {filteredTools.length === 0 && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="col-span-full text-center py-8"
            >
              <p className="text-gray-600 dark:text-gray-400 text-lg">
                No tools found matching "
                <span className="font-medium text-blue-600 dark:text-purple-400">
                  {debouncedSearchTerm}
                </span>
                "
              </p>
            </motion.div>
          )}
        </div>
      </div>
    </div>
  );
}
