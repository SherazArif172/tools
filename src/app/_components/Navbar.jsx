"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Moon, Sun } from "lucide-react";

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

  const toggleTheme = () => {
    const newTheme = theme === "light" ? "dark" : "light";
    setTheme(newTheme);
    localStorage.setItem("theme", newTheme);
    document.documentElement.classList.toggle("dark");
  };

  return (
    <nav className="border-b bg-background">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        {/* Logo/Brand */}
        <div className="flex-shrink-0">
          <Link href="/" className="text-xl font-bold">
            Tools
          </Link>
        </div>

        {/* Desktop Navigation */}
        <div className="hidden md:flex md:flex-1 md:justify-center">
          <ul className="flex space-x-8">
            <li>
              <Link href="/" className="text-sm font-medium hover:text-primary">
                Home
              </Link>
            </li>
            <li className="group relative">
              <button className="flex items-center text-sm font-medium hover:text-primary">
                Features
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="ml-1 h-4 w-4"
                >
                  <path d="m6 9 6 6 6-6" />
                </svg>
              </button>
              <div className="absolute left-0 top-full z-10 mt-1 hidden w-48 rounded-md border bg-background py-1 shadow-lg group-hover:block">
                <Link
                  href="/features/analytics"
                  className="block px-4 py-2 text-sm hover:bg-muted"
                >
                  Analytics
                </Link>
                <Link
                  href="/features/automation"
                  className="block px-4 py-2 text-sm hover:bg-muted"
                >
                  Automation
                </Link>
                <Link
                  href="/features/reports"
                  className="block px-4 py-2 text-sm hover:bg-muted"
                >
                  Reports
                </Link>
                <Link
                  href="/features/integrations"
                  className="block px-4 py-2 text-sm hover:bg-muted"
                >
                  Integrations
                </Link>
              </div>
            </li>
            <li>
              <Link
                href="/pricing"
                className="text-sm font-medium hover:text-primary"
              >
                Pricing
              </Link>
            </li>
            <li className="group relative">
              <button className="flex items-center text-sm font-medium hover:text-primary">
                About
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="ml-1 h-4 w-4"
                >
                  <path d="m6 9 6 6 6-6" />
                </svg>
              </button>
              <div className="absolute left-0 top-full z-10 mt-1 hidden w-48 rounded-md border bg-background py-1 shadow-lg group-hover:block">
                <Link
                  href="/about/company"
                  className="block px-4 py-2 text-sm hover:bg-muted"
                >
                  Company
                </Link>
                <Link
                  href="/about/team"
                  className="block px-4 py-2 text-sm hover:bg-muted"
                >
                  Team
                </Link>
                <Link
                  href="/about/careers"
                  className="block px-4 py-2 text-sm hover:bg-muted"
                >
                  Careers
                </Link>
              </div>
            </li>
            <li>
              <Link
                href="/contact"
                className="text-sm font-medium hover:text-primary"
              >
                Contact
              </Link>
            </li>
          </ul>
        </div>

        {/* Right side items */}
        <div className="flex items-center space-x-2 md:space-x-4">
          {/* Theme toggle - visible on all screen sizes */}
          <Button variant="ghost" size="icon" onClick={toggleTheme}>
            {theme === "light" ? (
              <Moon className="h-5 w-5" />
            ) : (
              <Sun className="h-5 w-5" />
            )}
            <span className="sr-only">Toggle theme</span>
          </Button>

          {/* Search input and Sign in - hidden on mobile */}
          <div className="hidden md:flex md:items-center md:space-x-4">
            <div className="relative">
              <Input
                type="search"
                placeholder="Search"
                className="w-64 rounded-md"
              />
            </div>
            <Button>Sign In</Button>
          </div>

          {/* Mobile menu button */}
          <div className="flex md:hidden">
            <button
              type="button"
              className="inline-flex items-center justify-center rounded-md p-2 text-gray-400 hover:bg-gray-100 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-primary"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              <span className="sr-only">Open main menu</span>
              <svg
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                aria-hidden="true"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d={
                    mobileMenuOpen
                      ? "M6 18L18 6M6 6l12 12"
                      : "M4 6h16M4 12h16M4 18h16"
                  }
                />
              </svg>
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu, show/hide based on menu state */}
      {mobileMenuOpen && (
        <div className="md:hidden">
          <div className="flex flex-col items-center space-y-4 px-2 py-4">
            <Link
              href="/"
              className="w-full rounded-md px-3 py-2 text-center text-base font-medium hover:bg-gray-100 hover:text-primary"
            >
              Home
            </Link>

            <div className="w-full">
              <Collapsible className="w-full">
                <CollapsibleTrigger className="flex w-full items-center justify-center rounded-md px-3 py-2 text-base font-medium hover:bg-gray-100 hover:text-primary">
                  Features
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="ml-1 h-4 w-4"
                  >
                    <path d="m6 9 6 6 6-6" />
                  </svg>
                </CollapsibleTrigger>
                <CollapsibleContent className="space-y-1">
                  <Link
                    href="/features/analytics"
                    className="block rounded-md px-3 py-2 text-center text-sm hover:bg-gray-100 hover:text-primary"
                  >
                    Analytics
                  </Link>
                  <Link
                    href="/features/automation"
                    className="block rounded-md px-3 py-2 text-center text-sm hover:bg-gray-100 hover:text-primary"
                  >
                    Automation
                  </Link>
                  <Link
                    href="/features/reports"
                    className="block rounded-md px-3 py-2 text-center text-sm hover:bg-gray-100 hover:text-primary"
                  >
                    Reports
                  </Link>
                  <Link
                    href="/features/integrations"
                    className="block rounded-md px-3 py-2 text-center text-sm hover:bg-gray-100 hover:text-primary"
                  >
                    Integrations
                  </Link>
                </CollapsibleContent>
              </Collapsible>
            </div>

            <Link
              href="/pricing"
              className="w-full rounded-md px-3 py-2 text-center text-base font-medium hover:bg-gray-100 hover:text-primary"
            >
              Pricing
            </Link>

            <div className="w-full">
              <Collapsible className="w-full">
                <CollapsibleTrigger className="flex w-full items-center justify-center rounded-md px-3 py-2 text-base font-medium hover:bg-gray-100 hover:text-primary">
                  About
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="ml-1 h-4 w-4"
                  >
                    <path d="m6 9 6 6 6-6" />
                  </svg>
                </CollapsibleTrigger>
                <CollapsibleContent className="space-y-1">
                  <Link
                    href="/about/company"
                    className="block rounded-md px-3 py-2 text-center text-sm hover:bg-gray-100 hover:text-primary"
                  >
                    Company
                  </Link>
                  <Link
                    href="/about/team"
                    className="block rounded-md px-3 py-2 text-center text-sm hover:bg-gray-100 hover:text-primary"
                  >
                    Team
                  </Link>
                  <Link
                    href="/about/careers"
                    className="block rounded-md px-3 py-2 text-center text-sm hover:bg-gray-100 hover:text-primary"
                  >
                    Careers
                  </Link>
                </CollapsibleContent>
              </Collapsible>
            </div>

            <Link
              href="/contact"
              className="w-full rounded-md px-3 py-2 text-center text-base font-medium hover:bg-gray-100 hover:text-primary"
            >
              Contact
            </Link>

            <div className="mt-2 w-full px-4">
              <Input
                type="search"
                placeholder="Search"
                className="w-full rounded-md"
              />
            </div>

            <div className="mt-4 w-full px-4">
              <Button className="w-full">Sign In</Button>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
}
