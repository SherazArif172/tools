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
    <div className="w-full max-w-7xl mx-auto px-4 py-8">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
        {tools.map((tool, index) => (
          <Card key={index} className="border">
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
  );
}
