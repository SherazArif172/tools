"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { SearchIcon, ArrowRightIcon } from "lucide-react";
import { TextGenerateEffect } from "@/components/TextGenerateEffect";

export default function HeroSection() {
  const [searchQuery, setSearchQuery] = useState("");

  const handleSearch = (e) => {
    e.preventDefault();
    // Handle search functionality here
    console.log("Searching for:", searchQuery);
  };
  const words = `Free tools to make everything simple, smooth, and effortless.`;

  return (
    <section className="w-full py-12 md:py-16 lg:py-20 m-auto max-w-7xl">
      <div className="container px-4 md:px-6">
        <div className="flex flex-col items-center space-y-4 text-center">
          <div className="space-y-2 max-w-[800px]">
            <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl lg:text-6xl">
              <TextGenerateEffect words={words} />
            </h1>
            <p className="mx-auto max-w-[600px] text-gray-500 md:text-lg">
              All the tools you need to work with PDFs, Excel, Word and more in
              one place
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
            <a href="#" className="text-primary hover:underline">
              PDF to Excel
            </a>
            <a href="#" className="text-primary hover:underline">
              Merge PDFs
            </a>
            <a href="#" className="text-primary hover:underline">
              Compress Images
            </a>
            <a href="#" className="text-primary hover:underline">
              Word to PDF
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
