"use client";

import { useState } from "react";
import { useDropzone } from "react-dropzone";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Download, X, RefreshCw, FolderOpen, AlertCircle } from "lucide-react";
import jsPDF from "jspdf";
import JSZip from "jszip";
import { motion } from "framer-motion";
import Background from "@/app/_components/Background";

export default function PdfTools() {
  const [images, setImages] = useState([]);
  const [pdfUrl, setPdfUrl] = useState(null);
  const [singlePdf, setSinglePdf] = useState(false);
  const [progress, setProgress] = useState(0);
  const [isConverting, setIsConverting] = useState(false);
  const [error, setError] = useState("");

  const { getRootProps, getInputProps, isDragActive, fileRejections } =
    useDropzone({
      accept: {
        "image/jpeg": [".jpg", ".jpeg"],
      },
      maxSize: 10485760, // 10MB
      onDrop: (acceptedFiles, rejectedFiles) => {
        if (rejectedFiles.length > 0) {
          const fileTypes = rejectedFiles
            .map((file) => file.file.type)
            .join(", ");
          setError(
            `Only JPG/JPEG files are allowed. Rejected files: ${fileTypes}`
          );
          setTimeout(() => setError(""), 5000); // Clear error after 5 seconds
          return;
        }

        setError("");
        const newImages = acceptedFiles.map((file) =>
          URL.createObjectURL(file)
        );
        setImages((prev) => [...prev, ...newImages]);
        setPdfUrl(null);
      },
      onDropRejected: (rejectedFiles) => {
        const errors = rejectedFiles.map((file) => {
          if (file.errors[0].code === "file-invalid-type") {
            return `${file.file.name} is not a JPG/JPEG file`;
          }
          if (file.errors[0].code === "file-too-large") {
            return `${file.file.name} is larger than 10MB`;
          }
          return file.errors[0].message;
        });
        setError(errors.join(", "));
        setTimeout(() => setError(""), 5000); // Clear error after 5 seconds
      },
    });

  const removeImage = (index) => {
    setImages((prev) => {
      const newImages = [...prev];
      URL.revokeObjectURL(newImages[index]); // Clean up the object URL
      newImages.splice(index, 1);
      return newImages;
    });
  };

  const resetState = () => {
    // Clean up all object URLs
    images.forEach((url) => URL.revokeObjectURL(url));
    if (pdfUrl) {
      pdfUrl.forEach((url) => URL.revokeObjectURL(url));
    }
    setImages([]);
    setPdfUrl(null);
    setSinglePdf(false);
    setProgress(0);
    setIsConverting(false);
  };

  const convertToPdf = async () => {
    if (images.length === 0) return;
    setIsConverting(true);
    setProgress(0);

    if (singlePdf) {
      // Convert each image to a separate PDF
      const pdfPromises = images.map((imageUrl, index) => {
        return new Promise((resolve) => {
          const img = new Image();
          img.src = imageUrl;
          img.onload = () => {
            const pdf = new jsPDF({
              orientation: img.width > img.height ? "l" : "p",
              unit: "px",
              format: [img.width, img.height],
            });

            pdf.addImage(img, "JPEG", 0, 0, img.width, img.height);
            const pdfBlob = pdf.output("blob");
            setProgress((prev) =>
              Math.min(90, ((index + 1) / images.length) * 100)
            );
            resolve(pdfBlob);
          };
        });
      });

      const pdfBlobs = await Promise.all(pdfPromises);

      // Create a zip file
      const zip = new JSZip();
      pdfBlobs.forEach((blob, index) => {
        zip.file(`converted_${index + 1}.pdf`, blob);
      });

      // Generate the zip file
      setProgress(95);
      const zipBlob = await zip.generateAsync({ type: "blob" });
      const zipUrl = URL.createObjectURL(zipBlob);
      setProgress(100);
      setPdfUrl([zipUrl]);
      setIsConverting(false);
    } else {
      // Convert all images to a single PDF
      const pdf = new jsPDF();
      let isFirstPage = true;

      for (let i = 0; i < images.length; i++) {
        const imageUrl = images[i];
        await new Promise((resolve) => {
          const img = new Image();
          img.src = imageUrl;
          img.onload = () => {
            if (!isFirstPage) {
              pdf.addPage();
            }
            isFirstPage = false;

            const imgWidth = img.width;
            const imgHeight = img.height;
            const pdfWidth = pdf.internal.pageSize.getWidth();
            const pdfHeight = pdf.internal.pageSize.getHeight();
            const ratio = Math.min(pdfWidth / imgWidth, pdfHeight / imgHeight);
            const width = imgWidth * ratio;
            const height = imgHeight * ratio;
            const x = (pdfWidth - width) / 2;
            const y = (pdfHeight - height) / 2;

            pdf.addImage(img, "JPEG", x, y, width, height);
            setProgress(((i + 1) / images.length) * 95);
            resolve();
          };
        });
      }

      const pdfBlob = pdf.output("blob");
      const pdfUrl = URL.createObjectURL(pdfBlob);
      setProgress(100);
      setPdfUrl([pdfUrl]);
      setIsConverting(false);
    }
  };

  const downloadPdf = (url, index) => {
    if (!url) return;
    const link = document.createElement("a");
    link.href = url;
    link.download = singlePdf ? "converted_images.zip" : "converted.pdf";
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
            JPG to PDF Converter
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-lg sm:text-xl text-gray-600 dark:text-gray-300 mb-8 sm:mb-12 text-center"
          >
            Convert your JPG images to PDF format with ease
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="w-full max-w-2xl"
          >
            <Card className="w-full p-6 sm:p-8 backdrop-blur-sm bg-white/80 dark:bg-gray-800/80 border border-gray-200/50 dark:border-gray-700/50 shadow-xl">
              <div className="flex flex-col items-center justify-center space-y-4 sm:space-y-6">
                <div className="flex flex-col sm:flex-row gap-4 w-full max-w-md">
                  <Button
                    onClick={() =>
                      document.querySelector('input[type="file"]').click()
                    }
                    className="group relative overflow-hidden bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white h-12 rounded-lg px-6 font-medium w-full transition-all duration-300"
                  >
                    <span className="relative z-10 flex items-center justify-center">
                      <FolderOpen className="mr-2 h-5 w-5" />
                      Upload JPG Files
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
                      ? "Drop the JPG images here"
                      : "or Drag JPG files here"}
                  </p>
                  <p className="text-sm text-gray-400 mt-2">
                    Only JPG files are supported (max 10MB)
                  </p>
                </div>

                {images.length > 0 && (
                  <div className="w-full">
                    <div className="flex items-center justify-center space-x-2 mb-4">
                      <Switch
                        id="pdf-mode"
                        checked={singlePdf}
                        onCheckedChange={setSinglePdf}
                        className="data-[state=checked]:bg-[#1E90FF]"
                      />
                      <Label
                        htmlFor="pdf-mode"
                        className="text-base font-semibold text-gray-700"
                      >
                        {singlePdf
                          ? "Single PDF per image (ZIP)"
                          : "All images in one PDF"}
                      </Label>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 w-full">
                      {images.map((image, index) => (
                        <div key={index} className="relative h-[200px]">
                          <div className="relative w-full h-full bg-gray-50 rounded-lg shadow-lg overflow-hidden p-2">
                            <img
                              src={image || "/placeholder.svg"}
                              alt={`Preview ${index + 1}`}
                              className="w-full h-full object-contain rounded-md"
                            />
                            <button
                              onClick={() => removeImage(index)}
                              className="absolute top-1 right-1 bg-red-500 text-white rounded-full p-1.5 hover:bg-red-600 transition-colors"
                            >
                              <X className="h-3 w-3" />
                            </button>
                          </div>
                        </div>
                      ))}
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
                          Converting... {Math.round(progress)}%
                        </p>
                      </div>
                    )}

                    <div className="mt-4 flex justify-center gap-4">
                      <Button
                        onClick={convertToPdf}
                        disabled={isConverting}
                        className={`group relative overflow-hidden bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white h-12 rounded-lg px-6 font-medium transition-all duration-300 ${
                          isConverting ? "opacity-50 cursor-not-allowed" : ""
                        }`}
                      >
                        <span className="relative z-10 flex items-center justify-center">
                          {isConverting ? "Converting..." : "Convert to PDF"}
                        </span>
                        <div className="absolute inset-0 bg-gradient-to-r from-purple-600 to-pink-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                      </Button>
                      <Button
                        onClick={resetState}
                        disabled={isConverting}
                        className={`group relative overflow-hidden bg-gradient-to-r from-gray-600 to-gray-700 hover:from-gray-700 hover:to-gray-800 text-white h-12 rounded-lg px-6 font-medium transition-all duration-300 ${
                          isConverting ? "opacity-50 cursor-not-allowed" : ""
                        }`}
                      >
                        <span className="relative z-10 flex items-center justify-center">
                          <RefreshCw className="mr-2 h-4 w-4" />
                          Reset
                        </span>
                      </Button>
                    </div>
                  </div>
                )}
              </div>

              {pdfUrl && (
                <div className="mt-6 flex justify-center gap-4">
                  {pdfUrl.map((url, index) => (
                    <Button
                      key={index}
                      onClick={() => downloadPdf(url, index)}
                      className="group relative overflow-hidden bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 text-white h-12 rounded-lg px-6 font-medium transition-all duration-300"
                    >
                      <span className="relative z-10 flex items-center justify-center">
                        <Download className="mr-2 h-4 w-4" />
                        Download {singlePdf ? "ZIP" : "PDF"}
                      </span>
                      <div className="absolute inset-0 bg-gradient-to-r from-emerald-600 to-green-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                    </Button>
                  ))}
                </div>
              )}
            </Card>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
