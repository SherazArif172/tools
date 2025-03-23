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
  FileText,
} from "lucide-react";
import mammoth from "mammoth";
import { jsPDF } from "jspdf";
import html2canvas from "html2canvas";

export default function WordToPdf() {
  const [wordFile, setWordFile] = useState(null);
  const [progress, setProgress] = useState(0);
  const [isConverting, setIsConverting] = useState(false);
  const [error, setError] = useState("");
  const [pdfUrl, setPdfUrl] = useState(null);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    accept: {
      "application/vnd.openxmlformats-officedocument.wordprocessingml.document":
        [".docx"],
      "application/msword": [".doc"],
    },
    maxSize: 10485760, // 10MB
    onDrop: async (acceptedFiles, rejectedFiles) => {
      if (rejectedFiles.length > 0) {
        const fileTypes = rejectedFiles
          .map((file) => file.file.type)
          .join(", ");
        setError(
          `Only Word files (.doc, .docx) are allowed. Rejected files: ${fileTypes}`
        );
        setTimeout(() => setError(""), 5000);
        return;
      }

      setError("");
      const file = acceptedFiles[0];
      setWordFile({
        name: file.name,
        file: file,
      });
      setPdfUrl(null);
    },
    onDropRejected: (rejectedFiles) => {
      const errors = rejectedFiles.map((file) => {
        if (file.errors[0].code === "file-invalid-type") {
          return `${file.file.name} is not a Word file`;
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
    if (pdfUrl) {
      URL.revokeObjectURL(pdfUrl);
    }
    setWordFile(null);
    setPdfUrl(null);
    setProgress(0);
    setIsConverting(false);
  };

  const convertToPdf = async () => {
    if (!wordFile) return;
    setIsConverting(true);
    setProgress(0);

    try {
      // Read the Word file
      const arrayBuffer = await wordFile.file.arrayBuffer();
      setProgress(20);

      // Convert Word to HTML
      const result = await mammoth.convertToHtml({ arrayBuffer });
      setProgress(40);

      // Create a temporary div to parse the HTML content
      const tempDiv = document.createElement("div");
      tempDiv.innerHTML = result.value;

      // Extract text content and basic formatting
      const textContent = tempDiv.innerText;
      const paragraphs = textContent.split("\n\n");

      // Create PDF
      const pdf = new jsPDF({
        orientation: "portrait",
        unit: "mm",
        format: "a4",
      });

      // Set initial position
      let yPos = 20;
      const pageWidth = 210;
      const pageHeight = 297;
      const margin = 20;
      const maxWidth = pageWidth - 2 * margin;

      // Configure text settings
      pdf.setFont("helvetica", "normal");
      pdf.setFontSize(12);
      pdf.setTextColor(0, 0, 0);

      // Process each paragraph
      for (let i = 0; i < paragraphs.length; i++) {
        const paragraph = paragraphs[i].trim();
        if (!paragraph) continue;

        // Split text into lines that fit the page width
        const lines = pdf.splitTextToSize(paragraph, maxWidth);

        // Check if we need a new page
        if (yPos + lines.length * 7 > pageHeight - margin) {
          pdf.addPage();
          yPos = margin;
        }

        // Add the lines to the PDF
        pdf.text(lines, margin, yPos);
        yPos += lines.length * 7 + 5; // 7mm per line, 5mm spacing between paragraphs
      }

      // Save PDF
      const pdfBlob = pdf.output("blob");
      const pdfUrl = URL.createObjectURL(pdfBlob);
      setPdfUrl(pdfUrl);
      setProgress(100);

      // Clean up
      setIsConverting(false);
    } catch (error) {
      console.error("Conversion error:", error);
      setError("Error converting Word to PDF. Please try again.");
      setIsConverting(false);
      setTimeout(() => setError(""), 5000);
    }
  };

  const downloadPdf = () => {
    if (!pdfUrl) return;
    const link = document.createElement("a");
    link.href = pdfUrl;
    link.download = `${wordFile.name.replace(/\.[^/.]+$/, "")}.pdf`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="w-full min-h-screen overflow-hidden relative bg-background mb-6">
      <div className="flex flex-col justify-center items-center pt-16 sm:pt-24 md:pt-32 px-4">
        <h1 className="text-3xl sm:text-4xl md:text-5xl text-foreground font-bold mb-2 sm:mb-4 text-center">
          Word to PDF Converter
        </h1>
        <p className="text-gray-600 text-base sm:text-lg md:text-xl mb-8 sm:mb-12 text-center">
          Convert your Word documents to PDF format
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
                Upload Word File
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
                  ? "Drop the Word file here"
                  : "or Drag Word file here"}
              </p>
              <p className="text-sm text-gray-400 mt-2">
                Only Word files (.doc, .docx) are supported (max 10MB)
              </p>
            </div>

            {wordFile && (
              <div className="w-full">
                <div className="bg-gray-50 rounded-lg p-4 flex flex-col gap-3">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <FileText className="h-5 w-5 text-gray-500" />
                      <span className="text-sm font-medium text-gray-700 truncate">
                        {wordFile.name}
                      </span>
                    </div>
                    <button
                      onClick={resetState}
                      className="bg-red-500 text-white rounded-full p-1.5 hover:bg-red-600 transition-colors"
                    >
                      <X className="h-3 w-3" />
                    </button>
                  </div>
                </div>

                {isConverting && (
                  <div className="mt-4">
                    <div className="w-full bg-gray-200 rounded-full h-2.5">
                      <div
                        className="bg-[#0095FF] h-2.5 rounded-full transition-all duration-300"
                        style={{ width: `${progress}%` }}
                      ></div>
                    </div>
                    <p className="text-center text-sm text-gray-600 mt-2">
                      Converting to PDF... {Math.round(progress)}%
                    </p>
                  </div>
                )}

                <div className="mt-4 flex justify-center gap-4">
                  <Button
                    onClick={convertToPdf}
                    disabled={isConverting}
                    className={`bg-[#1E90FF] hover:bg-[#1873CC] ${
                      isConverting ? "opacity-50 cursor-not-allowed" : ""
                    }`}
                  >
                    <FileText className="mr-2 h-4 w-4" />
                    {isConverting ? "Converting..." : "Convert to PDF"}
                  </Button>
                </div>
              </div>
            )}
          </div>

          {pdfUrl && (
            <div className="mt-6 flex justify-center gap-4">
              <Button
                onClick={downloadPdf}
                className="bg-green-500 hover:bg-green-600"
              >
                <Download className="mr-2 h-4 w-4" />
                Download PDF
              </Button>
            </div>
          )}
        </Card>
      </div>
    </div>
  );
}
