"use client";

import FloatingShapes from "./FloatingShapes";

export default function BackgroundShapes({ children }) {
  return (
    <div className="relative w-full min-h-screen">
      {/* Background with floating shapes */}
      <div className="fixed inset-0 -z-10">
        {/* Base gradient - different for light/dark mode */}
        <div className="absolute inset-0 bg-gradient-to-br from-indigo-100 via-rose-50 to-teal-50 dark:from-slate-900 dark:via-slate-800 dark:to-slate-900" />

        {/* Floating Shapes */}
        <FloatingShapes />

        {/* Subtle pattern overlay */}
        <div className="absolute inset-0 opacity-[0.15] dark:opacity-[0.1] z-20">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(79,70,229,0.1)_1px,transparent_1px)] dark:bg-[radial-gradient(circle_at_50%_50%,rgba(255,255,255,0.1)_1px,transparent_1px)] bg-[size:20px_20px]" />
          <div className="absolute inset-0 bg-[linear-gradient(45deg,rgba(99,102,241,0.05)_1px,transparent_1px)] dark:bg-[linear-gradient(45deg,rgba(255,255,255,0.05)_1px,transparent_1px)] bg-[size:20px_20px]" />
        </div>

        {/* Glowing orbs - different colors for light/dark */}
        <div className="absolute inset-0">
          <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-indigo-300/30 dark:bg-blue-500/20 rounded-full mix-blend-multiply dark:mix-blend-screen filter blur-3xl animate-pulse" />
          <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-violet-300/30 dark:bg-purple-500/20 rounded-full mix-blend-multiply dark:mix-blend-screen filter blur-3xl animate-pulse animation-delay-2000" />
        </div>

        {/* Shimmer effect - subtle in both modes */}
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-indigo-100/50 to-transparent dark:via-white/5 animate-shimmer" />
      </div>

      {/* Main content */}
      <div className="relative z-10">{children}</div>
    </div>
  );
}
