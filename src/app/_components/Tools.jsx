import {
  ArrowRight,
  FileText,
  Image,
  Video,
  FileSpreadsheet,
  MessageSquare,
} from "lucide-react";
import Link from "next/link";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

export default function ToolsSection() {
  const tools = [
    {
      icon: <FileText className="h-5 w-5" />,
      count: "45+ tools",
      title: "PDF Tools",
      description: "Solve Your PDF Problems",
      featuredTool: "PDF Creator",
      color: "bg-purple-100 text-purple-500",
      iconBg: "bg-purple-500",
      path: "/pdf",
    },
    {
      icon: <Image className="h-5 w-5" />,
      count: "30+ tools",
      title: "Image Tools",
      description: "Solve Your Image Problems",
      featuredTool: "Remove BG",
      color: "bg-orange-100 text-orange-500",
      iconBg: "bg-orange-500",
      path: "/", // Added path
    },
    {
      icon: <Video className="h-5 w-5" />,
      count: "10+ tools",
      title: "Video Tools",
      description: "Solve Your Video Problems",
      featuredTool: "Mute Video",
      color: "bg-rose-100 text-rose-500",
      iconBg: "bg-rose-500",
      path: "/", // Added path
    },
    {
      icon: <MessageSquare className="h-5 w-5" />,
      count: "10+ tools",
      title: "AI Write",
      description: "Solve Your Text Problems",
      featuredTool: "Paragraph Writer",
      color: "bg-blue-100 text-blue-500",
      iconBg: "bg-blue-500",
      path: "/", // Added path
    },
    {
      icon: <FileSpreadsheet className="h-5 w-5" />,
      count: "15+ tools",
      title: "File Tools",
      description: "Solve Your File Problems",
      featuredTool: "Split Excel",
      color: "bg-teal-100 text-teal-500",
      iconBg: "bg-teal-500",
      path: "/", // Added path
    },
  ];

  return (
    <section className="relative w-full py-12 md:py-16 lg:py-20 overflow-hidden">
      {/* Background design */}
      <div className="absolute inset-0 -z-10">
        {/* Base gradient */}
        <div className="absolute inset-0 bg-gradient-to-br from-teal-50 via-rose-50 to-indigo-50 dark:from-slate-900 dark:via-slate-800 dark:to-slate-900" />

        {/* Subtle pattern overlay */}
        <div className="absolute inset-0 opacity-[0.15] dark:opacity-[0.1]">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(20,184,166,0.1)_1px,transparent_1px)] dark:bg-[radial-gradient(circle_at_50%_50%,rgba(255,255,255,0.1)_1px,transparent_1px)] bg-[size:20px_20px]" />
          <div className="absolute inset-0 bg-[linear-gradient(45deg,rgba(20,184,166,0.05)_1px,transparent_1px)] dark:bg-[linear-gradient(45deg,rgba(255,255,255,0.05)_1px,transparent_1px)] bg-[size:20px_20px]" />
        </div>

        {/* Floating elements */}
        <div className="absolute inset-0 overflow-hidden">
          {[...Array(15)].map((_, i) => (
            <div
              key={i}
              className="absolute w-1 h-1 bg-teal-400/30 dark:bg-teal-400/20 rounded-full animate-particle"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                animationDelay: `${Math.random() * 5}s`,
              }}
            />
          ))}
        </div>

        {/* Glowing orbs */}
        <div className="absolute inset-0">
          <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-teal-300/30 dark:bg-teal-500/20 rounded-full mix-blend-multiply dark:mix-blend-screen filter blur-3xl animate-pulse" />
          <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-rose-300/30 dark:bg-rose-500/20 rounded-full mix-blend-multiply dark:mix-blend-screen filter blur-3xl animate-pulse animation-delay-2000" />
        </div>

        {/* Shimmer effect */}
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-teal-100/50 to-transparent dark:via-white/5 animate-shimmer" />
      </div>

      <div className="container px-4 md:px-6 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
          {tools.map((tool, index) => (
            <Card
              key={index}
              className="border backdrop-blur-sm bg-white/70 dark:bg-white/5 hover:bg-white/90 dark:hover:bg-white/10 transition-all duration-300"
            >
              <CardContent className="pt-6">
                <Link
                  href={tool.path}
                  className="text-muted-foreground hover:text-foreground"
                >
                  <div className="flex justify-between items-start mb-4">
                    <div className={`${tool.iconBg} p-2 rounded-full`}>
                      <div className="text-white">{tool.icon}</div>
                    </div>
                    <Badge variant="secondary" className={tool.color}>
                      {tool.count}
                    </Badge>
                  </div>

                  <div className="flex justify-between items-center">
                    <div>
                      <h3 className="font-medium">{tool.title}</h3>
                      <p className="text-sm text-muted-foreground">
                        {tool.description}
                      </p>
                    </div>

                    <ArrowRight className="h-4 w-4" />
                  </div>
                </Link>
              </CardContent>

              <CardFooter className="bg-muted/50 px-6 py-3 flex justify-between text-sm">
                <span className="text-muted-foreground">Featured Tool :</span>
                <span className="font-medium">{tool.featuredTool}</span>
              </CardFooter>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
