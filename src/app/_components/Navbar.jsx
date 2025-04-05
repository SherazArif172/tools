"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import {
  Moon,
  Sun,
  ChevronDown,
  Menu,
  X,
  Search,
  Grid3x3,
  FileOutput,
  RefreshCw,
  FileText,
  Layers,
  Edit,
  RotateCw,
  Type,
  FileSpreadsheet,
  Image,
  Scissors,
  Video,
  Sparkles,
  MessageSquare,
  File,
} from "lucide-react";
import { useRouter } from "next/navigation";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";

export default function Navbar() {
  const [theme, setTheme] = useState("light");
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [showResults, setShowResults] = useState(false);
  const searchRef = useRef(null);
  const router = useRouter();

  const toolCategories = {
    "PDF Tools": {
      icon: <FileText className="h-4 w-4" />,
      tools: [
        {
          name: "Compress PDF",
          path: "/compress-pdf",
          icon: <FileOutput className="h-4 w-4" />,
        },
        {
          name: "Merge PDF",
          path: "/merge-pdf",
          icon: <Layers className="h-4 w-4" />,
        },
        {
          name: "Split PDF",
          path: "/split-pdf",
          icon: <Scissors className="h-4 w-4" />,
        },
        {
          name: "PDF to Word",
          path: "/pdf-to-word",
          icon: <FileText className="h-4 w-4" />,
        },
        {
          name: "Word to PDF",
          path: "/word-to-pdf",
          icon: <FileText className="h-4 w-4" />,
        },
        {
          name: "PDF to Excel",
          path: "/pdf-to-excel",
          icon: <FileSpreadsheet className="h-4 w-4" />,
        },
        {
          name: "Excel to PDF",
          path: "/excel-to-pdf",
          icon: <FileSpreadsheet className="h-4 w-4" />,
        },
      ],
    },
    "Image Tools": {
      icon: <Image className="h-4 w-4" />,
      tools: [
        {
          name: "JPG to PDF",
          path: "/jpg-to-pdf",
          icon: <Image className="h-4 w-4" />,
        },
        {
          name: "PNG to PDF",
          path: "/png-to-pdf",
          icon: <Image className="h-4 w-4" />,
        },
        {
          name: "Image to PDF",
          path: "/image-to-pdf",
          icon: <Image className="h-4 w-4" />,
        },
        {
          name: "PDF to JPG",
          path: "/pdf-to-jpg",
          icon: <Image className="h-4 w-4" />,
        },
        {
          name: "Compress Image",
          path: "/compress-image",
          icon: <FileOutput className="h-4 w-4" />,
        },
      ],
    },
    "Video Tools": {
      icon: <Video className="h-4 w-4" />,
      tools: [
        {
          name: "Video to GIF",
          path: "/video-to-gif",
          icon: <Video className="h-4 w-4" />,
        },
        {
          name: "Compress Video",
          path: "/compress-video",
          icon: <FileOutput className="h-4 w-4" />,
        },
        {
          name: "Trim Video",
          path: "/trim-video",
          icon: <Scissors className="h-4 w-4" />,
        },
      ],
    },
    "AI Tools": {
      icon: <Sparkles className="h-4 w-4" />,
      tools: [
        {
          name: "AI Chat",
          path: "/ai-chat",
          icon: <MessageSquare className="h-4 w-4" />,
        },
        {
          name: "Text Generator",
          path: "/text-generator",
          icon: <Type className="h-4 w-4" />,
        },
        {
          name: "Image Generator",
          path: "/image-generator",
          icon: <Image className="h-4 w-4" />,
        },
      ],
    },
    "File Tools": {
      icon: <File className="h-4 w-4" />,
      tools: [
        {
          name: "File Converter",
          path: "/file-converter",
          icon: <RefreshCw className="h-4 w-4" />,
        },
        {
          name: "File Compressor",
          path: "/file-compressor",
          icon: <FileOutput className="h-4 w-4" />,
        },
        {
          name: "File Merger",
          path: "/file-merger",
          icon: <Layers className="h-4 w-4" />,
        },
      ],
    },
  };

  useEffect(() => {
    // Check for saved theme preference or system preference
    const savedTheme = localStorage.getItem("theme");
    const systemTheme = window.matchMedia("(prefers-color-scheme: dark)")
      .matches
      ? "dark"
      : "light";

    const initialTheme = savedTheme || systemTheme;
    setTheme(initialTheme);

    if (initialTheme === "dark") {
      document.documentElement.classList.add("dark");
    }
  }, []);

  // Close search results when clicking outside
  useEffect(() => {
    function handleClickOutside(event) {
      if (searchRef.current && !searchRef.current.contains(event.target)) {
        setShowResults(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const toggleTheme = () => {
    const newTheme = theme === "light" ? "dark" : "light";
    setTheme(newTheme);
    localStorage.setItem("theme", newTheme);
    document.documentElement.classList.toggle("dark");
  };

  const handleSearch = (query) => {
    setSearchQuery(query);
    setShowResults(query.length > 0);
  };

  const filteredTools = Object.entries(toolCategories).reduce(
    (acc, [category, data]) => {
      const matchingTools = data.tools.filter((tool) =>
        tool.name.toLowerCase().includes(searchQuery.toLowerCase())
      );
      if (matchingTools.length > 0) {
        acc.push({ category, tools: matchingTools });
      }
      return acc;
    },
    []
  );

  const handleToolSelect = (route) => {
    router.push(route);
    setShowResults(false);
    setSearchQuery("");
  };

  return (
    <nav className="border-b border-gray-200/10 bg-gradient-to-r from-indigo-100 via-rose-50 to-teal-50 backdrop-blur-sm dark:from-slate-900/80 dark:via-slate-800/80 dark:to-slate-900/80 sticky top-0 z-50 shadow-sm">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        {/* Logo/Brand */}
        <div className="flex-shrink-0">
          <Link
            href="/"
            className="text-xl font-bold bg-gradient-to-r from-indigo-600 to-violet-600 bg-clip-text text-transparent hover:from-indigo-500 hover:to-violet-500 transition-colors dark:text-white"
          >
            ZASKTools
          </Link>
        </div>

        {/* Desktop Navigation */}
        <div className="hidden md:flex md:flex-1 md:justify-center">
          <ul className="flex space-x-8 items-center">
            <li>
              <Link
                href="/"
                className="text-sm font-medium text-gray-800 hover:text-indigo-600 dark:text-gray-200 dark:hover:text-primary inline-flex items-center transition-colors"
              >
                Home
              </Link>
            </li>
            <li className="relative group">
              <button className="text-sm font-medium text-gray-800 hover:text-indigo-600 dark:text-gray-200 dark:hover:text-primary inline-flex items-center gap-1.5 transition-colors">
                <Grid3x3 className="h-4 w-4" />
                Tools
                <ChevronDown className="h-4 w-4 rotate-180 transform transition-transform duration-200 group-hover:rotate-0" />
              </button>

              {/* Tools Dropdown */}
              <div className="absolute top-full left-0 mt-2 w-[1000px] bg-gradient-to-r from-indigo-200/90 via-rose-100/90 to-teal-100/90 backdrop-blur-sm dark:from-slate-900/95 dark:via-slate-800/95 dark:to-slate-900/95 rounded-lg shadow-xl opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 border border-gray-200/10 -translate-x-1/3">
                <div className="p-4">
                  <div className="grid grid-cols-5 gap-x-6">
                    {Object.entries(toolCategories).map(
                      ([category, { icon, tools }]) => (
                        <div key={category} className="min-w-[180px]">
                          {/* Category Header */}
                          <div className="flex items-center gap-2 pb-3 mb-3 border-b border-gray-200/10">
                            <span className="text-gray-400 dark:text-gray-500">
                              {icon}
                            </span>
                            <span className="text-sm font-medium text-gray-900 dark:text-gray-100 whitespace-nowrap">
                              {category}
                            </span>
                          </div>

                          {/* Tools List */}
                          <div className="space-y-1">
                            {tools.map((tool) => (
                              <Link
                                key={tool.path}
                                href={tool.path}
                                className="flex items-center gap-2 px-2 py-1.5 text-sm text-gray-600 dark:text-gray-400 hover:bg-white/70 dark:hover:bg-slate-800/70 rounded-md group/tool whitespace-nowrap"
                              >
                                <span className="text-gray-400 dark:text-gray-500 group-hover/tool:text-indigo-500">
                                  {tool.icon}
                                </span>
                                <span className="group-hover/tool:text-indigo-600 dark:group-hover/tool:text-indigo-400">
                                  {tool.name}
                                </span>
                              </Link>
                            ))}
                          </div>
                        </div>
                      )
                    )}
                  </div>
                </div>
              </div>
            </li>
          </ul>
        </div>

        {/* Right side items */}
        <div className="flex items-center space-x-2 md:space-x-4">
          {/* Theme toggle - visible on all screen sizes */}
          <Button
            variant="ghost"
            size="icon"
            onClick={toggleTheme}
            className="hover:bg-indigo-50 dark:hover:bg-gray-800/50 transition-colors"
          >
            {theme === "light" ? (
              <Moon className="h-5 w-5 text-indigo-600" />
            ) : (
              <Sun className="h-5 w-5" />
            )}
            <span className="sr-only">Toggle theme</span>
          </Button>

          {/* Search input and Sign in - hidden on mobile */}
          <div className="hidden md:flex md:items-center md:space-x-4">
            <div className="relative" ref={searchRef}>
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-indigo-400" />
                <Input
                  type="search"
                  placeholder="Search tools..."
                  className="w-64 pl-10 rounded-md bg-white/70 hover:bg-white focus:bg-white transition-colors dark:bg-gray-800/50 border-indigo-100 focus:border-indigo-300 dark:border-gray-700"
                  value={searchQuery}
                  onChange={(e) => handleSearch(e.target.value)}
                  onFocus={() => setShowResults(true)}
                />
              </div>
              {showResults && filteredTools.length > 0 && (
                <div className="absolute top-full left-0 right-0 mt-1 bg-white dark:bg-gray-800 border border-indigo-100 dark:border-gray-700 rounded-md shadow-lg z-50 max-h-60 overflow-y-auto">
                  {filteredTools.map(({ category, tools }) => (
                    <div
                      key={category}
                      className="border-b border-indigo-50 dark:border-gray-700 last:border-b-0"
                    >
                      <div className="px-4 py-2 text-sm font-semibold text-indigo-600 dark:text-gray-400 bg-indigo-50/50 dark:bg-gray-800/50">
                        {category}
                      </div>
                      {tools.map((tool) => (
                        <button
                          key={tool.path}
                          className="w-full px-4 py-2 text-left text-sm hover:bg-indigo-50/50 dark:hover:bg-gray-700/50 flex items-center text-gray-700 dark:text-gray-200"
                          onClick={() => handleToolSelect(tool.path)}
                        >
                          <span className="text-indigo-400 mr-2">
                            {tool.icon}
                          </span>
                          {tool.name}
                        </button>
                      ))}
                    </div>
                  ))}
                </div>
              )}
              {showResults && filteredTools.length === 0 && (
                <div className="absolute top-full left-0 right-0 mt-1 bg-white dark:bg-gray-800 border border-indigo-100 dark:border-gray-700 rounded-md shadow-lg z-50 p-4 text-sm text-gray-500 dark:text-gray-400">
                  No tools found matching "{searchQuery}"
                </div>
              )}
            </div>
            <Button className="bg-gradient-to-r from-indigo-600 to-violet-600 hover:from-indigo-500 hover:to-violet-500 text-white transition-all duration-200">
              Sign In
            </Button>
          </div>

          {/* Mobile menu button */}
          <div className="flex md:hidden">
            <button
              type="button"
              className="inline-flex items-center justify-center rounded-md p-2 text-gray-500 hover:bg-indigo-50 hover:text-indigo-600 dark:text-gray-400 dark:hover:bg-gray-800/50 dark:hover:text-gray-300 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-500"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              <span className="sr-only">Open main menu</span>
              {mobileMenuOpen ? (
                <X className="h-6 w-6" />
              ) : (
                <Menu className="h-6 w-6" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu, show/hide based on menu state */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm">
          <div className="flex flex-col items-center space-y-4 px-2 py-4">
            <Link
              href="/"
              className="w-full rounded-md px-3 py-2 text-center text-base font-medium text-gray-800 hover:bg-indigo-50 hover:text-indigo-600 dark:text-gray-200 dark:hover:bg-gray-700/50"
            >
              Home
            </Link>
            <Link
              href="/tools"
              className="w-full rounded-md px-3 py-2 text-center text-base font-medium text-gray-800 hover:bg-indigo-50 hover:text-indigo-600 dark:text-gray-200 dark:hover:bg-gray-700/50 flex items-center justify-center gap-2"
            >
              <Grid3x3 className="h-4 w-4" />
              Tools
            </Link>
          </div>
        </div>
      )}
    </nav>
  );
}
