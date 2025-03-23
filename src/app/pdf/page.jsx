"use client";

import { useState } from "react";
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
  {
    id: "pdf-to-word",
    title: "PDF to Word",
    description: "Convert PDF to Word documents",
    color: "bg-blue-100",
    iconColor: "text-blue-500",
    icon: <FileText className="h-6 w-6" />,
    path: "/", // Set path to "/"
  },
  {
    id: "word-to-pdf",
    title: "Word to PDF",
    description: "Convert Word documents to PDF",
    color: "bg-green-100",
    iconColor: "text-green-500",
    icon: <FileText className="h-6 w-6" />,
    path: "/", // Set path to "/"
  },
  {
    id: "html-to-pdf",
    title: "HTML to PDF",
    description: "Convert HTML pages to PDF files",
    color: "bg-cyan-100",
    iconColor: "text-cyan-500",
    icon: <FileCode className="h-6 w-6" />,
    path: "/", // Set path to "/"
  },
  {
    id: "pdf-to-jpg",
    title: "PDF to JPG",
    description: "Convert PDF to JPG/JPEG images",
    color: "bg-emerald-100",
    iconColor: "text-emerald-500",
    icon: <FileImage className="h-6 w-6" />,
    path: "/", // Set path to "/"
  },
  {
    id: "pdf-translator",
    title: "PDF Translator",
    description: "Translate PDF documents",
    color: "bg-green-100",
    iconColor: "text-green-500",
    icon: <RefreshCw className="h-6 w-6" />,
    path: "/", // Set path to "/"
  },
  {
    id: "url-to-pdf",
    title: "URL to PDF",
    description: "Convert webpages to PDF files",
    color: "bg-red-100",
    iconColor: "text-red-500",
    icon: <Globe className="h-6 w-6" />,
    path: "/", // Set path to "/"
  },
  {
    id: "rotate-pdf",
    title: "Rotate PDF",
    description: "Rotate pages in a PDF file",
    color: "bg-blue-100",
    iconColor: "text-blue-500",
    icon: <RotateCw className="h-6 w-6" />,
    path: "/", // Set path to "/"
  },
  {
    id: "scan-to-image-pdf",
    title: "Scan to Image PDF",
    description: "Convert scanned images to PDF",
    color: "bg-yellow-100",
    iconColor: "text-yellow-500",
    icon: <ScanLine className="h-6 w-6" />,
    path: "/", // Set path to "/"
  },
  {
    id: "create-pdf",
    title: "Create PDF",
    description: "Create a PDF from scratch",
    color: "bg-blue-100",
    iconColor: "text-blue-500",
    icon: <FilePlus className="h-6 w-6" />,
    path: "/", // Set path to "/"
  },
  {
    id: "edit-pdf",
    title: "Edit PDF",
    description: "Edit content in your PDF files",
    color: "bg-amber-100",
    iconColor: "text-amber-500",
    icon: <Edit className="h-6 w-6" />,
    path: "/", // Set path to "/"
  },
  {
    id: "pdf-to-ppt",
    title: "PDF to PPT",
    description: "Convert PDF to PowerPoint presentations",
    color: "bg-orange-100",
    iconColor: "text-orange-500",
    icon: <FilePresentation className="h-6 w-6" />,
    path: "/", // Set path to "/"
  },
  {
    id: "ppt-to-pdf",
    title: "PPT to PDF",
    description: "Convert PowerPoint presentations to PDF",
    color: "bg-orange-100",
    iconColor: "text-orange-500",
    icon: <FilePresentation className="h-6 w-6" />,
    path: "/", // Set path to "/"
  },
  {
    id: "pdf-to-excel",
    title: "PDF to Excel",
    description: "Convert PDF to Excel spreadsheets",
    color: "bg-green-100",
    iconColor: "text-green-500",
    icon: <FileSpreadsheet className="h-6 w-6" />,
    path: "/", // Set path to "/"
  },
  {
    id: "excel-to-pdf",
    title: "Excel to PDF",
    description: "Convert Excel spreadsheets to PDF",
    color: "bg-green-100",
    iconColor: "text-green-500",
    icon: <FileSpreadsheet className="h-6 w-6" />,
    path: "/", // Set path to "/"
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
  {
    id: "pdf-to-epub",
    title: "PDF to EPUB",
    description: "Convert PDF to EPUB files",
    color: "bg-blue-100",
    iconColor: "text-blue-500",
    icon: <BookOpen className="h-6 w-6" />,
    path: "/", // Set path to "/"
  },
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
  {
    id: "protect-pdf",
    title: "Protect PDF",
    description: "Add password protection to PDF files",
    color: "bg-amber-100",
    iconColor: "text-amber-500",
    icon: <Lock className="h-6 w-6" />,
    path: "/", // Set path to "/"
  },
  {
    id: "pdf-to-text",
    title: "PDF to Text",
    description: "Extract text from PDF documents",
    color: "bg-cyan-100",
    iconColor: "text-cyan-500",
    icon: <Type className="h-6 w-6" />,
    path: "/", // Set path to "/"
  },
  {
    id: "text-to-pdf",
    title: "Text to PDF",
    description: "Convert text files to PDF",
    color: "bg-cyan-100",
    iconColor: "text-cyan-500",
    icon: <FileType className="h-6 w-6" />,
    path: "/", // Set path to "/"
  },
  {
    id: "add-watermark",
    title: "Add Watermark",
    description: "Add watermarks to your PDF",
    color: "bg-purple-100",
    iconColor: "text-purple-500",
    icon: <Stamp className="h-6 w-6" />,
    path: "/", // Set path to "/"
  },

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
  {
    id: "pdf-to-svg",
    title: "PDF to SVG",
    description: "Convert PDF to SVG files",
    color: "bg-green-100",
    iconColor: "text-green-500",
    icon: <FileCode className="h-6 w-6" />,
    path: "/", // Set path to "/"
  },
  {
    id: "webp-to-pdf",
    title: "WEBP to PDF",
    description: "Convert WEBP images to PDF",
    color: "bg-cyan-100",
    iconColor: "text-cyan-500",
    icon: <Image className="h-6 w-6" />,
    path: "/", // Set path to "/"
  },
  {
    id: "pdf-to-webp",
    title: "PDF to WEBP",
    description: "Convert PDF to WEBP images",
    color: "bg-cyan-100",
    iconColor: "text-cyan-500",
    icon: <FileImage className="h-6 w-6" />,
    path: "/", // Set path to "/"
  },
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

  // Filter tools based on search term
  const filteredTools = pdfTools.filter(
    (tool) =>
      tool.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      tool.description.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="container mx-auto px-4 py-8">
      <HeaderSection searchTerm={searchTerm} setSearchTerm={setSearchTerm} />

      {searchTerm && (
        <div className="text-center mb-8">
          <p className="text-sm text-gray-600">
            Found {filteredTools.length}{" "}
            {filteredTools.length === 1 ? "tool" : "tools"}
          </p>
        </div>
      )}

      {/* Tools Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {filteredTools.map((tool) => (
          <div
            key={tool.id}
            className="border rounded-lg p-4 transition-all hover:shadow-md hover:border-blue-500"
          >
            <Link href={tool.path}>
              <div
                className={`rounded-full w-12 h-12 flex items-center justify-center ${tool.color} ${tool.iconColor} mb-3`}
              >
                {tool.icon}
              </div>
              <h3 className="font-semibold text-lg mb-1">{tool.title}</h3>
              <p className="text-xs text-blue-600 font-medium mb-2">
                PDF Tools
              </p>
              <p className="text-sm text-gray-600">{tool.description}</p>
            </Link>
          </div>
        ))}
        {filteredTools.length === 0 && (
          <div className="col-span-full text-center py-8">
            <p className="text-gray-500 text-lg">
              No tools found matching "{searchTerm}"
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
