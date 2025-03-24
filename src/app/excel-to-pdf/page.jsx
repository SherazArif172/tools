"use client";

import { useState } from "react";
import { useDropzone } from "react-dropzone";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Download, X, RefreshCw, FolderOpen, AlertCircle } from "lucide-react";
import ExcelJS from "exceljs";
import {
  PDFViewer,
  Document,
  Page,
  Text,
  View,
  StyleSheet,
  pdf,
} from "@react-pdf/renderer";

// Create styles
const styles = StyleSheet.create({
  page: {
    flexDirection: "column",
    backgroundColor: "#ffffff",
    padding: 30,
  },
  title: {
    fontSize: 24,
    marginBottom: 20,
    textAlign: "center",
  },
  table: {
    display: "table",
    width: "auto",
    borderStyle: "solid",
    borderColor: "#e5e7eb",
    borderWidth: 1,
    borderRightWidth: 0,
    borderBottomWidth: 0,
  },
  tableRow: {
    flexDirection: "row",
    borderBottomWidth: 1,
    borderBottomColor: "#e5e7eb",
    minHeight: 25,
    alignItems: "center",
  },
  tableHeader: {
    backgroundColor: "#f3f4f6",
  },
  tableCell: {
    width: "25%",
    borderStyle: "solid",
    borderColor: "#e5e7eb",
    borderWidth: 1,
    borderLeftWidth: 0,
    borderTopWidth: 0,
    padding: 5,
  },
  headerCell: {
    fontWeight: "bold",
  },
});

export default function ExcelToPdf() {
  const [file, setFile] = useState(null);
  const [error, setError] = useState("");
  const [isConverting, setIsConverting] = useState(false);
  const [excelData, setExcelData] = useState(null);
  const [showPreview, setShowPreview] = useState(false);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    accept: {
      "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet": [
        ".xlsx",
      ],
      "application/vnd.ms-excel": [".xls"],
    },
    maxSize: 10485760, // 10MB
    multiple: false,
    onDrop: async (acceptedFiles, rejectedFiles) => {
      if (rejectedFiles.length > 0) {
        setError("Only Excel files (.xlsx, .xls) are allowed.");
        setTimeout(() => setError(""), 5000);
        return;
      }

      setError("");
      setFile(acceptedFiles[0]);
      setExcelData(null);
      setShowPreview(false);
    },
    onDropRejected: (rejectedFiles) => {
      const errors = rejectedFiles.map((file) => {
        if (file.errors[0].code === "file-invalid-type") {
          return `${file.file.name} is not an Excel file`;
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
    setFile(null);
    setExcelData(null);
    setShowPreview(false);
    setIsConverting(false);
  };

  const processExcelData = async () => {
    if (!file) return;
    setIsConverting(true);
    setError("");

    try {
      const workbook = new ExcelJS.Workbook();
      const arrayBuffer = await file.arrayBuffer();
      await workbook.xlsx.load(arrayBuffer);

      const worksheet = workbook.worksheets[0];
      if (!worksheet) {
        throw new Error("No worksheet found in the Excel file");
      }

      const range = worksheet.dimensions;
      if (!range) {
        throw new Error("The Excel file appears to be empty");
      }

      const headers = [];
      const data = [];

      worksheet.eachRow((row, rowNumber) => {
        const rowData = [];
        row.eachCell((cell) => {
          rowData.push(cell.text || "");
        });

        if (rowNumber === 1) {
          headers.push(rowData);
        } else {
          data.push(rowData);
        }
      });

      setExcelData({ headers: headers[0], data });
      setShowPreview(true);
      setIsConverting(false);
    } catch (error) {
      console.error("Error processing Excel:", error);
      setError(
        error.message || "An error occurred while processing the Excel file."
      );
      setIsConverting(false);
    }
  };

  const downloadPdf = async () => {
    if (!excelData) return;

    try {
      const blob = await pdf(
        <Document>
          <Page size="A4" style={styles.page}>
            <Text style={styles.title}>{file.name.split(".")[0]}</Text>
            <View style={styles.table}>
              {/* Header Row */}
              <View style={[styles.tableRow, styles.tableHeader]}>
                {excelData.headers.map((header, index) => (
                  <View
                    key={index}
                    style={[styles.tableCell, styles.headerCell]}
                  >
                    <Text>{header}</Text>
                  </View>
                ))}
              </View>
              {/* Data Rows */}
              {excelData.data.map((row, rowIndex) => (
                <View key={rowIndex} style={styles.tableRow}>
                  {row.map((cell, cellIndex) => (
                    <View key={cellIndex} style={styles.tableCell}>
                      <Text>{cell}</Text>
                    </View>
                  ))}
                </View>
              ))}
            </View>
          </Page>
        </Document>
      ).toBlob();

      const url = URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = url;
      link.download = `${file.name.split(".")[0]}.pdf`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      URL.revokeObjectURL(url);
    } catch (error) {
      console.error("Error generating PDF:", error);
      setError("Failed to generate PDF. Please try again.");
    }
  };

  return (
    <div className="w-full min-h-screen overflow-hidden relative bg-background mb-6">
      <div className="flex flex-col justify-center items-center pt-16 sm:pt-24 md:pt-32 px-4">
        <h1 className="text-3xl sm:text-4xl md:text-5xl text-foreground font-bold mb-2 sm:mb-4 text-center">
          Convert Excel to PDF
        </h1>
        <p className="text-gray-600 text-base sm:text-lg md:text-xl mb-8 sm:mb-12 text-center">
          Transform your Excel spreadsheets into PDF documents instantly
        </p>

        <Card className="w-full max-w-xl p-4 sm:p-6">
          <div className="flex flex-col items-center justify-center space-y-4 sm:space-y-6">
            <Button
              onClick={() =>
                document.querySelector('input[type="file"]').click()
              }
              variant="outline"
              className="bg-background border-[#1E90FF] text-[#1E90FF] hover:bg-[#1E90FF] hover:text-white h-12 rounded-lg px-4 sm:px-6 font-medium w-full max-w-md"
            >
              <FolderOpen className="mr-2 h-5 w-5" />
              Upload Excel File
            </Button>

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
                  ? "Drop the Excel file here"
                  : "or Drag Excel file here"}
              </p>
              <p className="text-sm text-gray-400 mt-2">
                Supported formats: .xlsx, .xls (max 10MB)
              </p>
            </div>

            {file && (
              <div className="w-full bg-gray-50 rounded-lg p-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <FolderOpen className="h-5 w-5 text-gray-500" />
                    <span className="text-sm font-medium text-gray-700 truncate">
                      {file.name}
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
            )}

            {file && !showPreview && (
              <div className="flex gap-4">
                <Button
                  onClick={processExcelData}
                  disabled={isConverting}
                  className={`bg-[#1E90FF] hover:bg-[#1873CC] ${
                    isConverting ? "opacity-50 cursor-not-allowed" : ""
                  }`}
                >
                  {isConverting ? "Processing..." : "Convert to PDF"}
                </Button>
                <Button
                  onClick={resetState}
                  variant="outline"
                  disabled={isConverting}
                  className={`text-red-500 hover:text-red-600 hover:bg-red-50 ${
                    isConverting ? "opacity-50 cursor-not-allowed" : ""
                  }`}
                >
                  <RefreshCw className="mr-2 h-4 w-4" />
                  Reset
                </Button>
              </div>
            )}

            {showPreview && excelData && (
              <div className="w-full space-y-4">
                <div className="w-full h-[500px] border rounded-lg overflow-hidden">
                  <PDFViewer width="100%" height="100%">
                    <Document>
                      <Page size="A4" style={styles.page}>
                        <Text style={styles.title}>
                          {file.name.split(".")[0]}
                        </Text>
                        <View style={styles.table}>
                          {/* Header Row */}
                          <View style={[styles.tableRow, styles.tableHeader]}>
                            {excelData.headers.map((header, index) => (
                              <View
                                key={index}
                                style={[styles.tableCell, styles.headerCell]}
                              >
                                <Text>{header}</Text>
                              </View>
                            ))}
                          </View>
                          {/* Data Rows */}
                          {excelData.data.map((row, rowIndex) => (
                            <View key={rowIndex} style={styles.tableRow}>
                              {row.map((cell, cellIndex) => (
                                <View key={cellIndex} style={styles.tableCell}>
                                  <Text>{cell}</Text>
                                </View>
                              ))}
                            </View>
                          ))}
                        </View>
                      </Page>
                    </Document>
                  </PDFViewer>
                </div>
                <Button
                  onClick={downloadPdf}
                  className="bg-green-500 hover:bg-green-600 w-full"
                >
                  <Download className="mr-2 h-4 w-4" />
                  Download PDF
                </Button>
              </div>
            )}
          </div>
        </Card>
      </div>
    </div>
  );
}
