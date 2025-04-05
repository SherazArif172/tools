"use client";

import { useState } from "react";
import { useDropzone } from "react-dropzone";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import {
  Download,
  X,
  RefreshCw,
  FolderOpen,
  AlertCircle,
  Merge,
} from "lucide-react";
import { PDFDocument } from "pdf-lib";
import JSZip from "jszip";
import { motion } from "framer-motion";
import Background from "@/app/_components/Background";

export default function MergePdf() {
  const [pdfs, setPdfs] = useState([]);
  const [mergedPdfUrl, setMergedPdfUrl] = useState(null);
  const [progress, setProgress] = useState(0);
  const [isMerging, setIsMerging] = useState(false);
  const [error, setError] = useState("");

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

      return pdfUrl;
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
      const newPdfs = await Promise.all(
        acceptedFiles.map(async (file) => {
          const preview = await getPdfPreview(file);
          return {
            name: file.name,
            file: file,
            preview: preview,
          };
        })
      );
      setPdfs((prev) => [...prev, ...newPdfs]);
      setMergedPdfUrl(null);
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

  const removePdf = (index) => {
    setPdfs((prev) => {
      const newPdfs = [...prev];
      if (newPdfs[index].preview) {
        URL.revokeObjectURL(newPdfs[index].preview);
      }
      newPdfs.splice(index, 1);
      return newPdfs;
    });
  };

  const resetState = () => {
    if (mergedPdfUrl) {
      URL.revokeObjectURL(mergedPdfUrl);
    }
    pdfs.forEach((pdf) => {
      if (pdf.preview) {
        URL.revokeObjectURL(pdf.preview);
      }
    });
    setPdfs([]);
    setMergedPdfUrl(null);
    setProgress(0);
    setIsMerging(false);
  };

  const mergePdfs = async () => {
    if (pdfs.length === 0) return;
    setIsMerging(true);
    setProgress(0);

    try {
      // Create a new PDF document
      const mergedPdf = await PDFDocument.create();
      let totalPages = 0;

      // First, count total pages
      for (const pdf of pdfs) {
        const pdfBytes = await pdf.file.arrayBuffer();
        const pdfDoc = await PDFDocument.load(pdfBytes);
        totalPages += pdfDoc.getPageCount();
      }

      // Now merge the PDFs
      let currentPage = 0;
      for (const pdf of pdfs) {
        const pdfBytes = await pdf.file.arrayBuffer();
        const pdfDoc = await PDFDocument.load(pdfBytes);
        const pages = await mergedPdf.copyPages(
          pdfDoc,
          pdfDoc.getPageIndices()
        );
        pages.forEach((page) => mergedPdf.addPage(page));

        currentPage += pdfDoc.getPageCount();
        setProgress((currentPage / totalPages) * 100);
      }

      // Save the merged PDF
      const mergedPdfBytes = await mergedPdf.save();
      const mergedPdfBlob = new Blob([mergedPdfBytes], {
        type: "application/pdf",
      });
      const mergedPdfUrl = URL.createObjectURL(mergedPdfBlob);

      setProgress(100);
      setMergedPdfUrl(mergedPdfUrl);
      setIsMerging(false);
    } catch (error) {
      setError("Error merging PDFs. Please try again.");
      setIsMerging(false);
      setTimeout(() => setError(""), 5000);
    }
  };

  const downloadMergedPdf = () => {
    if (!mergedPdfUrl) return;
    const link = document.createElement("a");
    link.href = mergedPdfUrl;
    link.download = "merged.pdf";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
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
            Merge PDF Files
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-lg sm:text-xl text-gray-600 dark:text-gray-300 mb-8 sm:mb-12 text-center"
          >
            Combine multiple PDF files into a single document
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
                      Upload PDF Files
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
                        ? "Drop your PDFs here"
                        : "Drag & drop your PDF files here"}
                    </p>
                    <p className="text-sm text-gray-500 dark:text-gray-400">
                      or click to browse files (max 10MB each)
                    </p>
                  </div>
                </div>

                {pdfs.length > 0 && (
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="w-full space-y-6"
                  >
                    <div className="bg-gray-50 dark:bg-gray-800 rounded-lg p-4 flex flex-col gap-3 shadow-lg">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <FolderOpen className="h-5 w-5 text-gray-500 dark:text-gray-300" />
                          <span className="text-sm font-medium text-gray-700 dark:text-gray-200">
                            {pdfs.length} PDFs selected
                          </span>
                        </div>
                        <button
                          onClick={resetState}
                          className="bg-red-500 text-white rounded-full p-1.5 hover:bg-red-600 transition-colors"
                        >
                          <X className="h-3 w-3" />
                        </button>
                      </div>
                      <div className="space-y-4">
                        {pdfs.map((pdf, index) => (
                          <div
                            key={index}
                            className="flex items-center justify-between p-3 bg-white dark:bg-gray-700 rounded-lg border border-gray-200 dark:border-gray-600"
                          >
                            <div className="flex items-center gap-2">
                              <FolderOpen className="h-4 w-4 text-gray-500 dark:text-gray-300" />
                              <span className="text-sm text-gray-700 dark:text-gray-200 truncate">
                                {pdf.name}
                              </span>
                            </div>
                            <button
                              onClick={() => removePdf(index)}
                              className="text-gray-500 dark:text-gray-300 hover:text-red-500 dark:hover:text-red-400"
                            >
                              <X className="h-4 w-4" />
                            </button>
                          </div>
                        ))}
                      </div>
                    </div>

                    {isMerging && (
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
                          Merging PDFs... {Math.round(progress)}%
                        </p>
                      </motion.div>
                    )}

                    <div className="flex justify-center gap-4">
                      <Button
                        onClick={mergePdfs}
                        disabled={isMerging}
                        className={`group relative overflow-hidden bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white h-12 rounded-lg px-6 font-medium transition-all duration-300 ${
                          isMerging ? "opacity-50 cursor-not-allowed" : ""
                        }`}
                      >
                        <span className="relative z-10 flex items-center justify-center">
                          <Merge className="mr-2 h-4 w-4" />
                          {isMerging ? "Merging..." : "Merge PDFs"}
                        </span>
                        <div className="absolute inset-0 bg-gradient-to-r from-purple-600 to-pink-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                      </Button>
                    </div>
                  </motion.div>
                )}
              </div>

              {mergedPdfUrl && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="mt-6 flex justify-center gap-4"
                >
                  <Button
                    onClick={downloadMergedPdf}
                    className="group relative overflow-hidden bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 text-white h-12 rounded-lg px-6 font-medium transition-all duration-300"
                  >
                    <span className="relative z-10 flex items-center justify-center">
                      <Download className="mr-2 h-4 w-4" />
                      Download Merged PDF
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
