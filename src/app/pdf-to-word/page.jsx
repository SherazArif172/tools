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
import * as pdfjsLib from "pdfjs-dist";
import { Document, Packer, Paragraph, TextRun } from "docx";

// Initialize PDF.js worker
if (typeof window !== "undefined") {
  pdfjsLib.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjsLib.version}/pdf.worker.min.js`;
}

export default function PdfToWord() {
  const [pdfFile, setPdfFile] = useState(null);
  const [progress, setProgress] = useState(0);
  const [isConverting, setIsConverting] = useState(false);
  const [error, setError] = useState("");
  const [wordUrl, setWordUrl] = useState(null);

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
      setPdfFile({
        name: file.name,
        file: file,
      });
      setWordUrl(null);
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
    if (wordUrl) {
      URL.revokeObjectURL(wordUrl);
    }
    setPdfFile(null);
    setWordUrl(null);
    setProgress(0);
    setIsConverting(false);
  };

  const convertToWord = async () => {
    if (!pdfFile) return;
    setIsConverting(true);
    setProgress(0);

    try {
      // Read the PDF file
      const arrayBuffer = await pdfFile.file.arrayBuffer();
      setProgress(20);

      // Load PDF document
      const pdf = await pdfjsLib.getDocument({ data: arrayBuffer }).promise;
      setProgress(40);

      // Extract text from all pages
      let fullText = "";
      for (let i = 1; i <= pdf.numPages; i++) {
        const page = await pdf.getPage(i);
        const textContent = await page.getTextContent();
        const pageText = textContent.items.map((item) => item.str).join(" ");
        fullText += pageText + "\n\n";
        setProgress(40 + (i / pdf.numPages) * 20);
      }

      // Create Word document
      const doc = new Document({
        sections: [
          {
            properties: {},
            children: fullText
              .split("\n\n")
              .filter((line) => line.trim())
              .map(
                (line) =>
                  new Paragraph({
                    children: [new TextRun(line.trim())],
                  })
              ),
          },
        ],
      });

      setProgress(80);

      // Generate Word document
      const buffer = await Packer.toBlob(doc);
      setProgress(90);

      // Create download URL
      const wordUrl = URL.createObjectURL(buffer);
      setWordUrl(wordUrl);
      setProgress(100);

      // Clean up
      setIsConverting(false);
    } catch (error) {
      console.error("Conversion error:", error);
      setError("Error converting PDF to Word. Please try again.");
      setIsConverting(false);
      setTimeout(() => setError(""), 5000);
    }
  };

  const downloadWord = () => {
    if (!wordUrl) return;
    const link = document.createElement("a");
    link.href = wordUrl;
    link.download = `${pdfFile.name.replace(/\.[^/.]+$/, "")}.docx`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="w-full min-h-screen overflow-hidden relative bg-background mb-6">
      <div className="flex flex-col justify-center items-center pt-16 sm:pt-24 md:pt-32 px-4">
        <h1 className="text-3xl sm:text-4xl md:text-5xl text-foreground font-bold mb-2 sm:mb-4 text-center">
          PDF to Word Converter
        </h1>
        <p className="text-gray-600 text-base sm:text-lg md:text-xl mb-8 sm:mb-12 text-center">
          Convert your PDF documents to Word format
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

            {pdfFile && (
              <div className="w-full">
                <div className="bg-gray-50 rounded-lg p-4 flex flex-col gap-3">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <FileText className="h-5 w-5 text-gray-500" />
                      <span className="text-sm font-medium text-gray-700 truncate">
                        {pdfFile.name}
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
                      Converting to Word... {Math.round(progress)}%
                    </p>
                  </div>
                )}

                <div className="mt-4 flex justify-center gap-4">
                  <Button
                    onClick={convertToWord}
                    disabled={isConverting}
                    className={`bg-[#1E90FF] hover:bg-[#1873CC] ${
                      isConverting ? "opacity-50 cursor-not-allowed" : ""
                    }`}
                  >
                    <FileText className="mr-2 h-4 w-4" />
                    {isConverting ? "Converting..." : "Convert to Word"}
                  </Button>
                </div>
              </div>
            )}
          </div>

          {wordUrl && (
            <div className="mt-6 flex justify-center gap-4">
              <Button
                onClick={downloadWord}
                className="bg-green-500 hover:bg-green-600"
              >
                <Download className="mr-2 h-4 w-4" />
                Download Word
              </Button>
            </div>
          )}
        </Card>
      </div>
    </div>
  );
}
