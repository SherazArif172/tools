"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { SearchIcon, ArrowRightIcon } from "lucide-react";
import { TextGenerateEffect } from "@/components/TextGenerateEffect";
import Link from "next/link";
import { WordRotate } from "@/components/magicui/word-rotate";

export default function HeroSection() {
  const [searchQuery, setSearchQuery] = useState("");

  const handleSearch = (e) => {
    e.preventDefault();
    // Handle search functionality here
    console.log("Searching for:", searchQuery);
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
    <section className="w-full py-12 md:py-16 lg:py-20 m-auto max-w-7xl">
      <div className="container px-4 md:px-6">
        <div className="flex flex-col items-center space-y-4 text-center">
          <div className="space-y-2 max-w-[800px]">
            <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl flex flex-wrap justify-center items-center gap-2">
              Your Shortcut to Simpler Days
              <span className="inline-flex min-w-[200px] justify-center">
                <WordRotate
                  duration={3000}
                  words={words.map((word) => (
                    <span
                      key={word.text}
                      className={`inline-block px-2 py-4 rounded-md ${word.color} transition-colors `}
                    >
                      {word.text}
                    </span>
                  ))}
                  className="inline-block"
                />
              </span>
            </h1>
            <p className="mx-auto max-w-[600px] text-gray-500 md:text-lg">
              Explore our collection of free tools for PDF editing, image
              optimization, video conversion, AI-powered writing, file
              management, and more -all designed to save you time and effort.
            </p>
          </div>

          <div className="w-full max-w-md mt-6">
            <form onSubmit={handleSearch} className="relative">
              <SearchIcon className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
              <Input
                type="text"
                placeholder="Search for a tool"
                className="w-full pl-10 py-6 text-base rounded-lg border-gray-200 focus:border-primary"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
              <Button
                type="submit"
                className="absolute right-1 top-1/2 -translate-y-1/2 h-10"
              >
                <ArrowRightIcon className="h-5 w-5" />
              </Button>
            </form>
          </div>

          <div className="flex flex-wrap justify-center gap-x-6 gap-y-2 mt-4 text-sm text-gray-500">
            <span>Popular tools:</span>
            <Link href="#" className="text-primary hover:underline">
              PDF to Excel
            </Link>
            <Link href="#" className="text-primary hover:underline">
              Merge PDFs
            </Link>
            <Link href="#" className="text-primary hover:underline">
              Compress Images
            </Link>
            <Link href="#" className="text-primary hover:underline">
              Word to PDF
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
