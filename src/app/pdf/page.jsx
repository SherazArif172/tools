import { Search } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function PdfTools() {
  return (
    <div className="w-full min-h-screen overflow-hidden relative">
      {/* Decorative elements */}
      <div className="-translate-y-1/2 absolute left-20 top-0 transform">
        <div className="bg-orange-300 h-16 rounded-b-full w-16 rotate-45"></div>
      </div>
      <div className="absolute left-10 top-40">
        <div className="bg-red-300 h-3 rounded-full w-3"></div>
      </div>
      <div className="absolute bottom-40 left-40">
        <div className="bg-blue-300 h-4 rounded-sm w-4 rotate-45"></div>
      </div>
      <div className="absolute right-80 top-40">
        <div className="bg-pink-400 h-10 rounded-md w-10"></div>
      </div>
      <div className="absolute right-10 top-10">
        <div className="bg-pink-400 h-12 rounded-md w-12"></div>
      </div>
      <div className="absolute bottom-20 right-20">
        <div className="bg-red-300 h-3 rounded-full w-3"></div>
      </div>
      <div className="absolute bottom-40 right-40">
        <div className="bg-amber-300 h-6 rounded-sm w-6"></div>
      </div>

      {/* Main content */}
      <div className="flex flex-col justify-center items-center pt-32 px-4">
        <h1 className="text-5xl text-foreground font-bold mb-4 md:text-6xl">
          Pdf Tools
        </h1>
        <p className="text-gray-600 text-xl mb-12">Free Online PDF Tools</p>

        {/* Search bar */}
        <div className="flex w-full items-center max-w-xl">
          <div className="w-full relative">
            <div className="flex bg-white rounded-full shadow-lg items-center overflow-hidden">
              <div className="pl-5 pr-2">
                <Search className="h-5 text-blue-500 w-5" />
              </div>
              <input
                type="text"
                placeholder="Search"
                className="text-gray-700 w-full focus:outline-none px-2 py-4"
              />
              <div className="pr-2">
                <Button className="bg-blue-500 rounded-full text-white font-medium hover:bg-blue-600 px-8 py-2">
                  Search
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
