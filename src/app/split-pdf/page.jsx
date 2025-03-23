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
  Split,
} from "lucide-react";
import { PDFDocument } from "pdf-lib";
import JSZip from "jszip";

export default function SplitPdf() {
  const [pdf, setPdf] = useState(null);
  const [pagesPerPdf, setPagesPerPdf] = useState(1);
  const [progress, setProgress] = useState(0);
  const [isSplitting, setIsSplitting] = useState(false);
  const [error, setError] = useState("");
  const [zipUrl, setZipUrl] = useState(null);

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
        });
        setZipUrl(null);
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
    if (zipUrl) {
      URL.revokeObjectURL(zipUrl);
    }
    setPdf(null);
    setZipUrl(null);
    setProgress(0);
    setIsSplitting(false);
    setPagesPerPdf(1);
  };

  const splitPdf = async () => {
    if (!pdf || pagesPerPdf < 1) return;
    setIsSplitting(true);
    setProgress(0);

    try {
      const arrayBuffer = await pdf.file.arrayBuffer();
      const pdfDoc = await PDFDocument.load(arrayBuffer);
      const totalPages = pdfDoc.getPageCount();
      const numPdfs = Math.ceil(totalPages / pagesPerPdf);
      const zip = new JSZip();

      for (let i = 0; i < numPdfs; i++) {
        const newPdf = await PDFDocument.create();
        const startPage = i * pagesPerPdf;
        const endPage = Math.min(startPage + pagesPerPdf, totalPages);

        for (let j = startPage; j < endPage; j++) {
          const [copiedPage] = await newPdf.copyPages(pdfDoc, [j]);
          newPdf.addPage(copiedPage);
        }

        const pdfBytes = await newPdf.save();
        zip.file(`split_${i + 1}.pdf`, pdfBytes);
        setProgress(((i + 1) / numPdfs) * 100);
      }

      const zipContent = await zip.generateAsync({ type: "blob" });
      const zipUrl = URL.createObjectURL(zipContent);
      setZipUrl(zipUrl);
      setIsSplitting(false);
    } catch (error) {
      setError("Error splitting PDF. Please try again.");
      setIsSplitting(false);
      setTimeout(() => setError(""), 5000);
    }
  };

  const downloadZip = () => {
    if (!zipUrl) return;
    const link = document.createElement("a");
    link.href = zipUrl;
    link.download = "split_pdfs.zip";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="w-full min-h-screen overflow-hidden relative bg-background mb-6">
      <div className="flex flex-col justify-center items-center pt-16 sm:pt-24 md:pt-32 px-4">
        <h1 className="text-3xl sm:text-4xl md:text-5xl text-foreground font-bold mb-2 sm:mb-4 text-center">
          Split PDF Files
        </h1>
        <p className="text-gray-600 text-base sm:text-lg md:text-xl mb-8 sm:mb-12 text-center">
          Split your PDF into multiple PDFs with specified pages
        </p>

        <Card className="w-full max-w-xl p-4 sm:p-6">
          <div className="flex flex-col items-center justify-center space-y-4 sm:space-y-6">
            <div className="flex flex-col sm:flex-row gap-4 w-full max-w-md">
              <Button
                onClick={() =>
                  document.querySelector('input[type="file"]').click()
                }
                variant="outline"
                className="bg-background border-[#1E90FF] text-[#1E90FF] hover:bg-[#1E90FF] hover:text-white h-12 rounded-lg px-4 sm:px-6 font-medium w-full"
              >
                <FolderOpen className="mr-2 h-5 w-5" />
                Upload PDF File
              </Button>

              <Button
                variant="outline"
                className="bg-background border-[#1E90FF] text-[#1E90FF] hover:bg-[#1E90FF] hover:text-white h-12 rounded-lg px-4 sm:px-6 font-medium w-full sm:w-auto"
              >
                <FolderOpen className="mr-2 h-5 w-5" />
                My Files
              </Button>
            </div>

            {error && (
              <div className="w-full bg-red-50 text-red-500 p-3 rounded-lg flex items-center gap-2">
                <AlertCircle className="h-5 w-5" />
                <p className="text-sm">{error}</p>
              </div>
            )}

            <div
              {...getRootProps()}
              className={`w-full border-2 border-dashed rounded-lg p-4 sm:p-8 text-center cursor-pointer transition-colors
                ${
                  isDragActive
                    ? "border-[#1E90FF] bg-blue-50"
                    : "border-gray-300 hover:border-[#1E90FF]"
                }
                ${error ? "border-red-300" : ""}`}
            >
              <input {...getInputProps()} />
              <p className="text-gray-500 text-lg">
                {isDragActive
                  ? "Drop the PDF file here"
                  : "or Drag PDF file here"}
              </p>
              <p className="text-sm text-gray-400 mt-2">
                Only PDF files are supported (max 10MB)
              </p>
            </div>

            {pdf && (
              <div className="w-full">
                <div className="bg-gray-50 rounded-lg p-4 flex flex-col gap-3">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <FolderOpen className="h-5 w-5 text-gray-500" />
                      <span className="text-sm font-medium text-gray-700 truncate">
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
                    <div className="relative w-full h-[200px] bg-white rounded-lg overflow-hidden border border-gray-200">
                      <iframe
                        src={pdf.preview}
                        className="w-full h-full"
                        title={`Preview of ${pdf.name}`}
                      />
                    </div>
                  )}
                  <div className="flex items-center gap-4 mt-2">
                    <div className="flex-1">
                      <label className="text-sm font-medium text-gray-700 mb-1 block">
                        Pages per PDF
                      </label>
                      <Input
                        type="number"
                        min="1"
                        max={pdf.pageCount}
                        value={pagesPerPdf}
                        onChange={(e) =>
                          setPagesPerPdf(
                            Math.min(
                              Math.max(1, parseInt(e.target.value) || 1),
                              pdf.pageCount
                            )
                          )
                        }
                        className="w-full"
                      />
                    </div>
                    <div className="text-sm text-gray-500 mt-6">
                      Total pages: {pdf.pageCount}
                    </div>
                  </div>
                </div>

                {isSplitting && (
                  <div className="mt-4">
                    <div className="w-full bg-gray-200 rounded-full h-2.5">
                      <div
                        className="bg-[#0095FF] h-2.5 rounded-full transition-all duration-300"
                        style={{ width: `${progress}%` }}
                      ></div>
                    </div>
                    <p className="text-center text-sm text-gray-600 mt-2">
                      Splitting PDF... {Math.round(progress)}%
                    </p>
                  </div>
                )}

                <div className="mt-4 flex justify-center gap-4">
                  <Button
                    onClick={splitPdf}
                    disabled={isSplitting}
                    className={`bg-[#1E90FF] hover:bg-[#1873CC] ${
                      isSplitting ? "opacity-50 cursor-not-allowed" : ""
                    }`}
                  >
                    <Split className="mr-2 h-4 w-4" />
                    {isSplitting ? "Splitting..." : "Split PDF"}
                  </Button>
                </div>
              </div>
            )}
          </div>

          {zipUrl && (
            <div className="mt-6 flex justify-center gap-4">
              <Button
                onClick={downloadZip}
                className="bg-green-500 hover:bg-green-600"
              >
                <Download className="mr-2 h-4 w-4" />
                Download Split PDFs
              </Button>
            </div>
          )}
        </Card>
      </div>
    </div>
  );
}
