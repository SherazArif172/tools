import Image from "next/image";
import HeroSection from "./_components/Hero";
import ToolsSection from "./_components/Tools";

export default function Home() {
  return (
    <div className="">
      <HeroSection />
      <ToolsSection />
    </div>
  );
}
