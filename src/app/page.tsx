import ScrollyCanvas from "@/components/ScrollyCanvas";
import Overlay from "@/components/Overlay";
import Projects from "@/components/Projects";

export default function Home() {
  return (
    <main className="relative min-h-screen bg-black">
      {/* Scroll Hero Section */}
      <div className="relative w-full">
        {/* We have exactly 120 frames in public/sequence */}
        <ScrollyCanvas frameCount={120} />
        <Overlay />
      </div>

      {/* Projects Grid Section */}
      <Projects />
      
      {/* Footer */}
      <footer className="relative z-20 border-t border-white/10 bg-black py-12 text-center">
        <p className="text-gray-500 text-sm tracking-widest uppercase">
          © {new Date().getFullYear()} USTELA SUKESH REDDY. All Rights Reserved.
        </p>
      </footer>
    </main>
  );
}
