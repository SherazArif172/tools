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
  {
    id: "ppt-to-pdf",
    title: "PPT to PDF",
    description: "Convert PowerPoint presentations to PDF",
    color: "bg-orange-100",
    iconColor: "text-orange-500",
    icon: <FilePresentation className="h-6 w-6" />,
    path: "/", // Set path to "/"
  },
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
  {
    id: "pdf-page-number",
    title: "PDF Page Number",
    description: "Add page numbers to your PDF",
    color: "bg-purple-100",
    iconColor: "text-purple-500",
    icon: <Type className="h-6 w-6" />,
    path: "/", // Set path to "/"
  },
  // {
  //   id: "pdf-to-epub",
  //   title: "PDF to EPUB",
  //   description: "Convert PDF to EPUB files",
  //   color: "bg-blue-100",
  //   iconColor: "text-blue-500",
  //   icon: <BookOpen className="h-6 w-6" />,
  //   path: "/", // Set path to "/"
  // },
  {
    id: "epub-to-pdf",
    title: "EPUB to PDF",
    description: "Convert EPUB files to PDF",
    color: "bg-blue-100",
    iconColor: "text-blue-500",
    icon: <BookOpen className="h-6 w-6" />,
    path: "/", // Set path to "/"
  },
  {
    id: "pdf-watermark",
    title: "PDF Watermark",
    description: "Add watermarks to your PDF",
    color: "bg-purple-100",
    iconColor: "text-purple-500",
    icon: <Stamp className="h-6 w-6" />,
    path: "/", // Set path to "/"
  },
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
  {
    id: "text-to-pdf",
    title: "Text to PDF",
    description: "Convert text files to PDF",
    color: "bg-cyan-100",
    iconColor: "text-cyan-500",
    icon: <FileType className="h-6 w-6" />,
    path: "/", // Set path to "/"
  },
  // {
  //   id: "add-watermark",
  //   title: "Add Watermark",
  //   description: "Add watermarks to your PDF",
  //   color: "bg-purple-100",
  //   iconColor: "text-purple-500",
  //   icon: <Stamp className="h-6 w-6" />,
  //   path: "/", // Set path to "/"
  // },
  {
    id: "heic-to-pdf",
    title: "HEIC to PDF",
    description: "Convert HEIC images to PDF",
    color: "bg-blue-100",
    iconColor: "text-blue-500",
    icon: <Image className="h-6 w-6" />,
    path: "/", // Set path to "/"
  },
  {
    id: "svg-to-pdf",
    title: "SVG to PDF",
    description: "Convert SVG files to PDF",
    color: "bg-green-100",
    iconColor: "text-green-500",
    icon: <FileCode className="h-6 w-6" />,
    path: "/", // Set path to "/"
  },
  // {
  //   id: "pdf-to-svg",
  //   title: "PDF to SVG",
  //   description: "Convert PDF to SVG files",
  //   color: "bg-green-100",
  //   iconColor: "text-green-500",
  //   icon: <FileCode className="h-6 w-6" />,
  //   path: "/", // Set path to "/"
  // },
  {
    id: "webp-to-pdf",
    title: "WEBP to PDF",
    description: "Convert WEBP images to PDF",
    color: "bg-cyan-100",
    iconColor: "text-cyan-500",
    icon: <Image className="h-6 w-6" />,
    path: "/", // Set path to "/"
  },
  // {
  //   id: "pdf-to-webp",
  //   title: "PDF to WEBP",
  //   description: "Convert PDF to WEBP images",
  //   color: "bg-cyan-100",
  //   iconColor: "text-cyan-500",
  //   icon: <FileImage className="h-6 w-6" />,
  //   path: "/", // Set path to "/"
  // },
  {
    id: "gif-to-pdf",
    title: "GIF to PDF",
    description: "Convert GIF images to PDF",
    color: "bg-purple-100",
    iconColor: "text-purple-500",
    icon: <Image className="h-6 w-6" />,
    path: "/", // Set path to "/"
  },
  {
    id: "bitmap-to-pdf",
    title: "Bitmap to PDF",
    description: "Convert bitmap images to PDF",
    color: "bg-blue-100",
    iconColor: "text-blue-500",
    icon: <Image className="h-6 w-6" />,
    path: "/", // Set path to "/"
  },
  {
    id: "eps-to-pdf",
    title: "EPS to PDF",
    description: "Convert EPS files to PDF",
    color: "bg-amber-100",
    iconColor: "text-amber-500",
    icon: <FileCode className="h-6 w-6" />,
    path: "/", // Set path to "/"
  },
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
        <div className="absolute inset-0 bg-gradient-to-br from-indigo-50 via-purple-50 to-pink-50 dark:from-slate-900 dark:via-slate-800 dark:to-slate-900" />

        {/* Animated grid pattern */}
        <div className="absolute inset-0 opacity-[0.15] dark:opacity-[0.1]">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(99,102,241,0.1)_1px,transparent_1px)] dark:bg-[radial-gradient(circle_at_50%_50%,rgba(255,255,255,0.1)_1px,transparent_1px)] bg-[size:20px_20px]" />
          <div className="absolute inset-0 bg-[linear-gradient(45deg,rgba(99,102,241,0.05)_1px,transparent_1px)] dark:bg-[linear-gradient(45deg,rgba(255,255,255,0.05)_1px,transparent_1px)] bg-[size:20px_20px]" />
        </div>

        {/* Floating elements */}
        <div className="absolute inset-0 overflow-hidden">
          {[...Array(20)].map((_, i) => (
            <div
              key={i}
              className="absolute w-1 h-1 bg-indigo-400/30 dark:bg-indigo-400/20 rounded-full animate-particle"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                animationDelay: `${Math.random() * 5}s`,
              }}
            />
          ))}
        </div>

        {/* Glowing orbs */}
        <div className="absolute inset-0">
          <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-indigo-300/30 dark:bg-indigo-500/20 rounded-full mix-blend-multiply dark:mix-blend-screen filter blur-3xl animate-pulse" />
          <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-purple-300/30 dark:bg-purple-500/20 rounded-full mix-blend-multiply dark:mix-blend-screen filter blur-3xl animate-pulse animation-delay-2000" />
          <div className="absolute top-3/4 left-3/4 w-64 h-64 bg-pink-300/30 dark:bg-pink-500/20 rounded-full mix-blend-multiply dark:mix-blend-screen filter blur-3xl animate-pulse animation-delay-3000" />
        </div>

        {/* Shimmer effect */}
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-indigo-100/50 to-transparent dark:via-white/5 animate-shimmer" />

        {/* Decorative elements */}
        <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-indigo-500/20 to-purple-500/20 rounded-full filter blur-3xl" />
        <div className="absolute bottom-0 left-0 w-32 h-32 bg-gradient-to-tr from-pink-500/20 to-rose-500/20 rounded-full filter blur-3xl" />
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
              <span className="font-medium text-purple-600 dark:text-purple-400">
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
              className="group relative overflow-hidden rounded-xl bg-gradient-to-br from-white/80 to-gray-50/80 dark:from-gray-800/80 dark:to-gray-900/80 p-1 transition-all duration-300 hover:scale-[1.02] hover:shadow-2xl backdrop-blur-sm"
            >
              {/* Gradient border */}
              <div className="absolute inset-0 bg-gradient-to-r from-purple-500 via-pink-500 to-red-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

              {/* Card content */}
              <div className="relative h-full bg-white/90 dark:bg-gray-800/90 rounded-lg p-6 transition-all duration-300 group-hover:bg-opacity-90 backdrop-blur-sm">
                <Link href={tool.path} className="block h-full">
                  {/* Icon container with gradient background */}
                  <div
                    className={`relative w-14 h-14 rounded-xl mb-4 overflow-hidden ${tool.color}`}
                  >
                    <div className="absolute inset-0 bg-gradient-to-br from-white/20 to-transparent" />
                    <div className="absolute inset-0 flex items-center justify-center">
                      {tool.icon}
                    </div>
                  </div>

                  {/* Tool title with gradient text */}
                  <h3 className="font-semibold text-lg mb-2 bg-gradient-to-r from-gray-900 to-gray-700 dark:from-white dark:to-gray-300 bg-clip-text text-transparent">
                    {tool.title}
                  </h3>

                  {/* Category badge */}
                  <p className="text-xs font-medium mb-3 bg-gradient-to-r from-blue-500 to-cyan-500 text-white px-2 py-1 rounded-full inline-block">
                    PDF Tools
                  </p>

                  {/* Description */}
                  <p className="text-sm text-gray-600 dark:text-gray-300 mb-4">
                    {tool.description}
                  </p>

                  {/* Hover arrow */}
                  <div className="absolute bottom-4 right-4 transform translate-x-2 opacity-0 group-hover:translate-x-0 group-hover:opacity-100 transition-all duration-300">
                    <svg
                      className="w-6 h-6 text-gray-400 group-hover:text-blue-500"
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
              <p className="text-gray-500 dark:text-gray-400 text-lg">
                No tools found matching "
                <span className="font-medium text-purple-600 dark:text-purple-400">
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
