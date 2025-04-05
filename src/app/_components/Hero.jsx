"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { SearchIcon, ArrowRightIcon } from "lucide-react";
import { TextGenerateEffect } from "@/components/TextGenerateEffect";
import Link from "next/link";
import { WordRotate } from "@/components/magicui/word-rotate";
import { TextAnimate } from "@/components/magicui/text-animate";
import { useRouter } from "next/navigation";

import { LayoutGroup, motion } from "motion/react";
import TextRotate from "@/fancy/components/text/text-rotate";
import FloatingShapes from "./FloatingShapes";

// Levenshtein distance function for fuzzy matching
function levenshteinDistance(a, b) {
  const matrix = [];
  for (let i = 0; i <= b.length; i++) {
    matrix[i] = [i];
  }
  for (let j = 0; j <= a.length; j++) {
    matrix[0][j] = j;
  }
  for (let i = 1; i <= b.length; i++) {
    for (let j = 1; j <= a.length; j++) {
      if (b.charAt(i - 1) === a.charAt(j - 1)) {
        matrix[i][j] = matrix[i - 1][j - 1];
      } else {
        matrix[i][j] = Math.min(
          matrix[i - 1][j - 1] + 1,
          matrix[i][j - 1] + 1,
          matrix[i - 1][j] + 1
        );
      }
    }
  }
  return matrix[b.length][a.length];
}

// Function to calculate similarity score
function calculateSimilarity(str1, str2) {
  const distance = levenshteinDistance(str1.toLowerCase(), str2.toLowerCase());
  const maxLength = Math.max(str1.length, str2.length);
  return 1 - distance / maxLength;
}

export default function HeroSection() {
  const [searchQuery, setSearchQuery] = useState("");
  const [error, setError] = useState("");
  const router = useRouter();

  const toolRoutes = {
    "pdf to excel": "/pdf-to-excel",
    "excel to pdf": "/excel-to-pdf",
    "word to pdf": "/word-to-pdf",
    "pdf to word": "/pdf-to-word",
    "merge pdf": "/merge-pdf",
    "split pdf": "/split-pdf",
    "compress pdf": "/compress-pdf",
    "image to pdf": "/image-to-pdf",
    "jpg to pdf": "/jpg-to-pdf",
    "png to pdf": "/png-to-pdf",
  };

  const handleSearch = (e) => {
    e.preventDefault();
    const query = searchQuery.toLowerCase().trim();

    // Reset error state
    setError("");

    // Validate input
    if (!query) {
      setError("Please enter a tool name to search");
      return;
    }

    // Find the best matching tool using fuzzy search
    let bestMatch = null;
    let highestSimilarity = 0.6; // Minimum similarity threshold (60%)

    Object.entries(toolRoutes).forEach(([toolName]) => {
      const similarity = calculateSimilarity(query, toolName);
      if (similarity > highestSimilarity) {
        highestSimilarity = similarity;
        bestMatch = toolName;
      }
    });

    if (bestMatch) {
      router.push(toolRoutes[bestMatch]);
    } else {
      setError("No matching tool found. Try searching for a different tool.");
    }
  };

  const words = [
    { text: "Work Effortless", color: "bg-blue-800 dark:bg-blue-900" },
    { text: "Creativity Flow", color: "bg-purple-800 dark:bg-purple-900" },
    { text: "Ideas Happen", color: "bg-yellow-800 dark:bg-yellow-900" },
    { text: "Tasks Magical", color: "bg-pink-800 dark:bg-pink-900" },
    { text: "Files Smarter", color: "bg-green-800 dark:bg-green-900" },
    { text: "Life Easier", color: "bg-orange-800 dark:bg-orange-900" },
  ];

  return (
    <section className="relative w-full py-12 md:py-16 lg:py-20 overflow-hidden">
      <div className="container px-4 md:px-6">
        <div className="flex flex-col items-center space-y-4 text-center">
          <div className="space-y-2 max-w-[800px]">
            <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl flex flex-wrap justify-center items-center gap-2">
              <TextAnimate
                animation="blurIn"
                as="p"
                duration={0.9}
                className="text-gray-900 dark:text-white font-bold tracking-wide"
              >
                Your Shortcut to Simpler Days
              </TextAnimate>
              <span className="inline-flex min-w-[200px] justify-center">
                <LayoutGroup>
                  <motion.p className="flex whitespace-pre" layout>
                    <motion.span
                      className="pt-0.5 sm:pt-1 md:pt-2"
                      layout
                      transition={{
                        type: "spring",
                        damping: 30,
                        stiffness: 400,
                      }}
                    ></motion.span>
                    <TextRotate
                      texts={words.map((word) => word.text)}
                      mainClassName="text-white px-4 sm:px-4 md:px-5 bg-slate-900/80 dark:bg-slate-950/80 overflow-hidden py-2 sm:py-2.5 md:py-3 justify-center rounded-xl mt-1 relative group backdrop-blur-md border border-white/10 shadow-[0_0_15px_rgba(56,189,248,0.3)] transition-all duration-500 before:absolute before:inset-0 before:rounded-xl before:bg-gradient-to-r before:from-cyan-500/20 before:via-sky-500/20 before:to-blue-500/20 before:opacity-100 after:absolute after:inset-0 after:rounded-xl after:bg-[radial-gradient(circle_at_50%_50%,rgba(56,189,248,0.15),transparent_70%)] after:opacity-100"
                      staggerFrom={"last"}
                      initial={{ y: "-100%" }}
                      animate={{ y: 0 }}
                      exit={{ y: "120%" }}
                      staggerDuration={0.025}
                      splitLevelClassName="overflow-hidden pb-0.5 sm:pb-1 md:pb-1 relative z-10"
                      transition={{
                        type: "spring",
                        damping: 30,
                        stiffness: 400,
                      }}
                      rotationInterval={3000}
                    />
                  </motion.p>
                </LayoutGroup>
              </span>
            </h1>
            <p className="mx-auto max-w-[600px] text-gray-600 dark:text-gray-300 md:text-lg">
              Explore our collection of free tools for PDF editing, image
              optimization, video conversion, AI-powered writing, file
              management, and more -all designed to save you time and effort.
            </p>
          </div>

          <div className="w-full max-w-md mt-6">
            <form onSubmit={handleSearch} className="relative">
              <SearchIcon className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-indigo-400" />
              <Input
                type="text"
                placeholder="Search for a tool"
                className={`w-full pl-10 py-6 text-base rounded-lg border-indigo-100 focus:border-indigo-300 dark:border-gray-700 bg-white/70 hover:bg-white focus:bg-white transition-colors dark:bg-white/5 backdrop-blur-sm text-gray-900 dark:text-white placeholder-gray-400 ${
                  error ? "border-red-500" : ""
                }`}
                value={searchQuery}
                onChange={(e) => {
                  setSearchQuery(e.target.value);
                  setError("");
                }}
              />
              <Button
                type="submit"
                className="absolute right-1 top-1/2 -translate-y-1/2 h-10 bg-gradient-to-r from-indigo-600 to-violet-600 hover:from-indigo-500 hover:to-violet-500 text-white transition-all duration-200"
              >
                <ArrowRightIcon className="h-5 w-5" />
              </Button>
            </form>
            {error && (
              <p className="text-red-500 dark:text-red-400 text-sm mt-2 text-center">
                {error}
              </p>
            )}
          </div>

          <div className="flex flex-wrap justify-center gap-x-6 gap-y-2 mt-4 text-sm text-gray-600 dark:text-gray-300">
            <span>Popular tools:</span>
            <Link
              href="/pdf-to-excel"
              className="text-indigo-600 hover:text-indigo-500 transition-colors"
            >
              PDF to Excel
            </Link>
            <Link
              href="/merge-pdf"
              className="text-indigo-600 hover:text-indigo-500 transition-colors"
            >
              Merge PDFs
            </Link>
            <Link
              href="/compress-pdf"
              className="text-indigo-600 hover:text-indigo-500 transition-colors"
            >
              Compress PDF
            </Link>
            <Link
              href="/word-to-pdf"
              className="text-indigo-600 hover:text-indigo-500 transition-colors"
            >
              Word to PDF
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
