"use client";

import { useState } from "react";
import { useDropzone } from "react-dropzone";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Download, X, RefreshCw, FolderOpen, AlertCircle } from "lucide-react";
import { PDFDocument } from "pdf-lib";

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
    <div className="w-full min-h-screen overflow-hidden relative bg-background mb-6">
      <div className="flex flex-col justify-center items-center pt-16 sm:pt-24 md:pt-32 px-4">
        <h1 className="text-3xl sm:text-4xl md:text-5xl text-foreground font-bold mb-2 sm:mb-4 text-center">
          Merge PDF Files
        </h1>
        <p className="text-gray-600 text-base sm:text-lg md:text-xl mb-8 sm:mb-12 text-center">
          Combine multiple PDF files into a single PDF
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
                Upload PDF Files
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
                  ? "Drop the PDF files here"
                  : "or Drag PDF files here"}
              </p>
              <p className="text-sm text-gray-400 mt-2">
                Only PDF files are supported (max 10MB each)
              </p>
            </div>

            {pdfs.length > 0 && (
              <div className="w-full">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 w-full">
                  {pdfs.map((pdf, index) => (
                    <div
                      key={index}
                      className="relative bg-gray-50 rounded-lg p-4 flex flex-col gap-3"
                    >
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <FolderOpen className="h-5 w-5 text-gray-500" />
                          <span className="text-sm font-medium text-gray-700 truncate">
                            {pdf.name}
                          </span>
                        </div>
                        <button
                          onClick={() => removePdf(index)}
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
                    </div>
                  ))}
                </div>

                {isMerging && (
                  <div className="mt-4">
                    <div className="w-full bg-gray-200 rounded-full h-2.5">
                      <div
                        className="bg-[#0095FF] h-2.5 rounded-full transition-all duration-300"
                        style={{ width: `${progress}%` }}
                      ></div>
                    </div>
                    <p className="text-center text-sm text-gray-600 mt-2">
                      Merging PDFs... {Math.round(progress)}%
                    </p>
                  </div>
                )}

                <div className="mt-4 flex justify-center gap-4">
                  <Button
                    onClick={mergePdfs}
                    disabled={isMerging}
                    className={`bg-[#1E90FF] hover:bg-[#1873CC] ${
                      isMerging ? "opacity-50 cursor-not-allowed" : ""
                    }`}
                  >
                    {isMerging ? "Merging..." : "Merge PDFs"}
                  </Button>
                  <Button
                    onClick={resetState}
                    variant="outline"
                    disabled={isMerging}
                    className={`text-red-500 hover:text-red-600 hover:bg-red-50 ${
                      isMerging ? "opacity-50 cursor-not-allowed" : ""
                    }`}
                  >
                    <RefreshCw className="mr-2 h-4 w-4" />
                    Reset
                  </Button>
                </div>
              </div>
            )}
          </div>

          {mergedPdfUrl && (
            <div className="mt-6 flex justify-center gap-4">
              <Button
                onClick={downloadMergedPdf}
                className="bg-green-500 hover:bg-green-600"
              >
                <Download className="mr-2 h-4 w-4" />
                Download Merged PDF
              </Button>
            </div>
          )}
        </Card>
      </div>
    </div>
  );
}
