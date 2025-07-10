import Image from "next/image";
import HeroSection from "./_components/Hero";
import ToolsSection from "./_components/Tools";

export default function Home() {
  return (
    <div className="max-w-7xl mx-auto">
      <HeroSection />
      <ToolsSection />
    </div>
  );
}
