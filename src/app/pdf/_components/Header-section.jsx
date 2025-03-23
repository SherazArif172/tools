"use client";

import { Search } from "lucide-react";

export default function HeaderSection({ searchTerm, setSearchTerm }) {
  return (
    <div className="relative py-12 px-4 text-center">
      {/* Decorative elements */}
      <div className="absolute top-0 right-12 w-8 h-8 bg-pink-400 rounded-lg transform rotate-12 opacity-70"></div>
      <div className="absolute top-12 left-12 w-2 h-2 bg-rose-400 rounded-full"></div>
      <div className="absolute bottom-12 right-24 w-2 h-2 bg-rose-400 rounded-full"></div>
      <div
        className="absolute top-0 left-24 w-8 h-8 bg-amber-300 transform -rotate-12 opacity-70"
        style={{ clipPath: "polygon(50% 0%, 0% 100%, 100% 100%)" }}
      ></div>
      <div className="absolute bottom-0 left-1/4 w-6 h-6 bg-blue-400 transform rotate-45 opacity-70"></div>
      <div className="absolute bottom-12 right-8 w-4 h-4 bg-amber-200 rounded-sm transform rotate-12 opacity-80"></div>

      {/* Title and subtitle */}
      <h1 className="text-5xl font-bold mb-2">Pdf Tools</h1>
      <p className="text-gray-600 mb-8">Free Online PDF Tools</p>

      {/* Search bar */}
      <div className="flex items-center justify-center max-w-md mx-auto">
        <div className="relative flex w-full">
          <div className="absolute inset-y-0 left-3 flex items-center pointer-events-none">
            <Search className="h-5 w-5 text-gray-400" />
          </div>
          <input
            type="text"
            placeholder="Search PDF tools..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10 pr-4 py-2 w-full rounded-full border border-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
      </div>
    </div>
  );
}
