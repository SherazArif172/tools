"use client";

import { useState } from "react";
import { useDropzone } from "react-dropzone";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import {
  Download,
  X,
  RefreshCw,
  FolderOpen,
  AlertCircle,
  Shrink,
} from "lucide-react";
import { PDFDocument } from "pdf-lib";
import { motion } from "framer-motion";
import Background from "@/app/_components/Background";

export default function CompressPdf() {
  const [pdf, setPdf] = useState(null);
  const [compressionLevel, setCompressionLevel] = useState(0.5); // 0.5 is medium compression
  const [progress, setProgress] = useState(0);
  const [isCompressing, setIsCompressing] = useState(false);
  const [error, setError] = useState("");
  const [compressedPdfUrl, setCompressedPdfUrl] = useState(null);

  const getPdfPreview = async (file) => {
    try {
      const arrayBuffer = await file.arrayBuffer();
      const pdfDoc = await PDFDocument.load(arrayBuffer);
      const firstPage = pdfDoc.getPage(0);

      // Create a canvas to render the PDF page
      const canvas = document.createElement("canvas");
      const context = canvas.getContext("2d");

      // Set canvas size to match PDF page dimensions
      const { width, height } = firstPage.getSize();
      const scale = 200 / width; // Scale to 200px width
      canvas.width = width * scale;
      canvas.height = height * scale;

      // Render the PDF page to canvas
      const pdfBytes = await pdfDoc.save();
      const pdfBlob = new Blob([pdfBytes], { type: "application/pdf" });
      const pdfUrl = URL.createObjectURL(pdfBlob);

      return {
        url: pdfUrl,
        pageCount: pdfDoc.getPageCount(),
        originalSize: file.size,
      };
    } catch (error) {
      console.error("Error generating PDF preview:", error);
      return null;
    }
  };

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    accept: {
      "application/pdf": [".pdf"],
    },
    maxSize: 10485760, // 10MB
    onDrop: async (acceptedFiles, rejectedFiles) => {
      if (rejectedFiles.length > 0) {
        const fileTypes = rejectedFiles
          .map((file) => file.file.type)
          .join(", ");
        setError(`Only PDF files are allowed. Rejected files: ${fileTypes}`);
        setTimeout(() => setError(""), 5000);
        return;
      }

      setError("");
      const file = acceptedFiles[0];
      const preview = await getPdfPreview(file);
      if (preview) {
        setPdf({
          name: file.name,
          file: file,
          preview: preview.url,
          pageCount: preview.pageCount,
          originalSize: preview.originalSize,
        });
        setCompressedPdfUrl(null);
      }
    },
    onDropRejected: (rejectedFiles) => {
      const errors = rejectedFiles.map((file) => {
        if (file.errors[0].code === "file-invalid-type") {
          return `${file.file.name} is not a PDF file`;
        }
        if (file.errors[0].code === "file-too-large") {
          return `${file.file.name} is larger than 10MB`;
        }
        return file.errors[0].message;
      });
      setError(errors.join(", "));
      setTimeout(() => setError(""), 5000);
    },
  });

  const resetState = () => {
    if (pdf?.preview) {
      URL.revokeObjectURL(pdf.preview);
    }
    if (compressedPdfUrl) {
      URL.revokeObjectURL(compressedPdfUrl);
    }
    setPdf(null);
    setCompressedPdfUrl(null);
    setProgress(0);
    setIsCompressing(false);
    setCompressionLevel(0.5);
  };

  const compressPdf = async () => {
    if (!pdf) return;
    setIsCompressing(true);
    setProgress(0);

    try {
      const arrayBuffer = await pdf.file.arrayBuffer();
      const pdfDoc = await PDFDocument.load(arrayBuffer);
      const totalPages = pdfDoc.getPageCount();

      // Compress each page
      for (let i = 0; i < totalPages; i++) {
        const page = pdfDoc.getPage(i);

        // Get the page dimensions
        const { width, height } = page.getSize();

        // Calculate new dimensions based on compression level
        const newWidth = width * compressionLevel;
        const newHeight = height * compressionLevel;

        // Scale the page
        page.scale(newWidth / width, newHeight / height);

        setProgress(((i + 1) / totalPages) * 100);
      }

      // Save the compressed PDF
      const compressedPdfBytes = await pdfDoc.save({
        useObjectStreams: true,
        addDefaultPage: false,
        objectsPerTick: 50,
      });

      const compressedPdfBlob = new Blob([compressedPdfBytes], {
        type: "application/pdf",
      });
      const compressedPdfUrl = URL.createObjectURL(compressedPdfBlob);

      setProgress(100);
      setCompressedPdfUrl(compressedPdfUrl);
      setIsCompressing(false);
    } catch (error) {
      setError("Error compressing PDF. Please try again.");
      setIsCompressing(false);
      setTimeout(() => setError(""), 5000);
    }
  };

  const downloadCompressedPdf = () => {
    if (!compressedPdfUrl) return;
    const link = document.createElement("a");
    link.href = compressedPdfUrl;
    link.download = `compressed_${pdf.name}`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const formatFileSize = (bytes) => {
    if (bytes === 0) return "0 Bytes";
    const k = 1024;
    const sizes = ["Bytes", "KB", "MB", "GB"];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + " " + sizes[i];
  };

  return (
    <div className="w-full min-h-screen overflow-hidden relative">
      <Background />
      <div className="relative z-10">
        <div className="flex flex-col justify-center items-center pt-16 sm:pt-24 md:pt-32 px-4">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-4xl sm:text-5xl md:text-6xl font-bold mb-4 text-center bg-clip-text text-transparent bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 dark:from-blue-400 dark:via-purple-400 dark:to-pink-400"
          >
            Compress PDF Files
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-lg sm:text-xl text-gray-600 dark:text-gray-300 mb-8 sm:mb-12 text-center"
          >
            Reduce the size of your PDF files while maintaining quality
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="w-full max-w-2xl"
          >
            <Card className="w-full p-6 sm:p-8 backdrop-blur-sm bg-white/80 dark:bg-gray-800/80 border border-gray-200/50 dark:border-gray-700/50 shadow-xl">
              <div className="flex flex-col items-center justify-center space-y-6">
                <div className="flex flex-col sm:flex-row gap-4 w-full">
                  <Button
                    onClick={() =>
                      document.querySelector('input[type="file"]').click()
                    }
                    className="group relative overflow-hidden bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white h-12 rounded-lg px-6 font-medium w-full transition-all duration-300"
                  >
                    <span className="relative z-10 flex items-center justify-center">
                      <FolderOpen className="mr-2 h-5 w-5" />
                      Upload PDF File
                    </span>
                    <div className="absolute inset-0 bg-gradient-to-r from-purple-600 to-pink-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  </Button>

                  <Button className="group relative overflow-hidden bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white h-12 rounded-lg px-6 font-medium w-full sm:w-auto transition-all duration-300">
                    <span className="relative z-10 flex items-center justify-center">
                      <FolderOpen className="mr-2 h-5 w-5" />
                      My Files
                    </span>
                    <div className="absolute inset-0 bg-gradient-to-r from-pink-600 to-blue-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  </Button>
                </div>

                {error && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="w-full bg-red-50 dark:bg-red-900/20 text-red-500 dark:text-red-400 p-4 rounded-lg flex items-center gap-3"
                  >
                    <AlertCircle className="h-5 w-5 flex-shrink-0" />
                    <p className="text-sm">{error}</p>
                  </motion.div>
                )}

                <div
                  {...getRootProps()}
                  className={`w-full border-2 border-dashed rounded-xl p-8 text-center cursor-pointer transition-all duration-300
                    ${
                      isDragActive
                        ? "border-blue-500 bg-blue-50/50 dark:bg-blue-900/20"
                        : "border-gray-300 dark:border-gray-600 hover:border-blue-500 dark:hover:border-blue-400"
                    }
                    ${error ? "border-red-300 dark:border-red-500" : ""}`}
                >
                  <input {...getInputProps()} />
                  <div className="space-y-2">
                    <p className="text-gray-600 dark:text-gray-300 text-lg font-medium">
                      {isDragActive
                        ? "Drop your PDF here"
                        : "Drag & drop your PDF file here"}
                    </p>
                    <p className="text-sm text-gray-500 dark:text-gray-400">
                      or click to browse files (max 10MB)
                    </p>
                  </div>
                </div>

                {pdf && (
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="w-full space-y-6"
                  >
                    <div className="bg-gray-50 dark:bg-gray-800 rounded-lg p-4 flex flex-col gap-3 shadow-lg">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <FolderOpen className="h-5 w-5 text-gray-500 dark:text-gray-300" />
                          <span className="text-sm font-medium text-gray-700 dark:text-gray-200 truncate">
                            {pdf.name}
                          </span>
                        </div>
                        <button
                          onClick={resetState}
                          className="bg-red-500 text-white rounded-full p-1.5 hover:bg-red-600 transition-colors"
                        >
                          <X className="h-3 w-3" />
                        </button>
                      </div>
                      {pdf.preview && (
                        <div className="relative w-full h-[200px] bg-white dark:bg-gray-800 rounded-lg overflow-hidden border border-gray-200 dark:border-gray-600">
                          <iframe
                            src={pdf.preview}
                            className="w-full h-full"
                            title={`Preview of ${pdf.name}`}
                          />
                        </div>
                      )}
                      <div className="flex flex-col gap-4 mt-2">
                        <div>
                          <label className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-1 block">
                            Compression Level
                          </label>
                          <div className="flex items-center gap-4">
                            <Input
                              type="range"
                              min="0.1"
                              max="1"
                              step="0.05"
                              value={compressionLevel}
                              onChange={(e) =>
                                setCompressionLevel(parseFloat(e.target.value))
                              }
                              className="flex-1 bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-600"
                            />
                            <span className="text-sm text-gray-500 dark:text-gray-300 min-w-[60px]">
                              {Math.round(compressionLevel * 100)}%
                            </span>
                          </div>
                          <div className="flex justify-between text-xs text-gray-500 dark:text-gray-400 mt-1">
                            <span>Maximum compression</span>
                            <span>Original quality</span>
                          </div>
                        </div>
                        <div className="flex flex-col gap-2">
                          <div className="flex justify-between items-center text-sm">
                            <span className="text-gray-500 dark:text-gray-400">
                              Original size:
                            </span>
                            <span className="font-medium text-gray-700 dark:text-gray-200">
                              {formatFileSize(pdf.originalSize)}
                            </span>
                          </div>
                          <div className="flex justify-between items-center text-sm">
                            <span className="text-gray-500 dark:text-gray-400">
                              Estimated size:
                            </span>
                            <span className="font-medium text-blue-500 dark:text-blue-400">
                              {formatFileSize(
                                pdf.originalSize * compressionLevel
                              )}
                            </span>
                          </div>
                          <div className="flex justify-between items-center text-sm">
                            <span className="text-gray-500 dark:text-gray-400">
                              Size reduction:
                            </span>
                            <span className="font-medium text-green-500 dark:text-green-400">
                              {Math.round((1 - compressionLevel) * 100)}%
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>

                    {isCompressing && (
                      <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="space-y-2"
                      >
                        <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2.5 overflow-hidden">
                          <motion.div
                            initial={{ width: 0 }}
                            animate={{ width: `${progress}%` }}
                            transition={{ duration: 0.3 }}
                            className="h-full bg-gradient-to-r from-blue-600 to-purple-600 rounded-full"
                          />
                        </div>
                        <p className="text-center text-sm text-gray-600 dark:text-gray-400">
                          Compressing PDF... {Math.round(progress)}%
                        </p>
                      </motion.div>
                    )}

                    <div className="flex justify-center gap-4">
                      <Button
                        onClick={compressPdf}
                        disabled={isCompressing}
                        className={`group relative overflow-hidden bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white h-12 rounded-lg px-6 font-medium transition-all duration-300 ${
                          isCompressing ? "opacity-50 cursor-not-allowed" : ""
                        }`}
                      >
                        <span className="relative z-10 flex items-center justify-center">
                          <Shrink className="mr-2 h-4 w-4" />
                          {isCompressing ? "Compressing..." : "Compress PDF"}
                        </span>
                        <div className="absolute inset-0 bg-gradient-to-r from-purple-600 to-pink-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                      </Button>
                    </div>
                  </motion.div>
                )}
              </div>

              {compressedPdfUrl && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="mt-6 flex justify-center gap-4"
                >
                  <Button
                    onClick={downloadCompressedPdf}
                    className="group relative overflow-hidden bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 text-white h-12 rounded-lg px-6 font-medium transition-all duration-300"
                  >
                    <span className="relative z-10 flex items-center justify-center">
                      <Download className="mr-2 h-4 w-4" />
                      Download Compressed PDF
                    </span>
                    <div className="absolute inset-0 bg-gradient-to-r from-emerald-600 to-green-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  </Button>
                </motion.div>
              )}
            </Card>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
