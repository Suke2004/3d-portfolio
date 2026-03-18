"use client";

import { useEffect, useRef, useState } from "react";
import { useScroll, useTransform, useMotionValueEvent } from "framer-motion";

interface ScrollyCanvasProps {
  frameCount: number;
}

export default function ScrollyCanvas({ frameCount }: ScrollyCanvasProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [images, setImages] = useState<HTMLImageElement[]>([]);
  const [imagesLoaded, setImagesLoaded] = useState(false);

  // Load exactly 120 frames since we discovered 120 PNG files ranging from 000 to 119
  useEffect(() => {
    const loadImages = async () => {
      const loadedImages: HTMLImageElement[] = [];

      for (let i = 0; i < frameCount; i++) {
        const img = new Image();
        // Zero padding like frame_000_delay-0.066s.png
        const num = i.toString().padStart(3, "0");
        img.src = `/sequence/frame_${num}_delay-0.066s.png`;
        await new Promise((resolve) => {
          img.onload = resolve;
          img.onerror = resolve; // Continue even if one fails
        });
        loadedImages.push(img);
      }

      setImages(loadedImages);
      setImagesLoaded(true);
    };

    loadImages();
  }, [frameCount]);

  // Framer motion scroll tracking
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  const currentIndex = useTransform(scrollYProgress, [0, 1], [0, frameCount - 1]);

  useMotionValueEvent(currentIndex, "change", (latest) => {
    if (!imagesLoaded || !canvasRef.current) return;

    const frameIndex = Math.floor(latest);
    const img = images[frameIndex];

    if (img) {
      const canvas = canvasRef.current;
      const ctx = canvas.getContext("2d");
      if (!ctx) return;

      // Handle object-fit: cover logic
      const cw = canvas.width;
      const ch = canvas.height;
      const iw = img.width;
      const ih = img.height;

      const scale = Math.max(cw / iw, ch / ih);
      const x = cw / 2 - (iw / 2) * scale;
      const y = ch / 2 - (ih / 2) * scale;

      ctx.clearRect(0, 0, cw, ch);
      ctx.drawImage(img, x, y, iw * scale, ih * scale);
    }
  });

  // Handle Resize
  useEffect(() => {
    const handleResize = () => {
      if (canvasRef.current) {
        canvasRef.current.width = window.innerWidth;
        canvasRef.current.height = window.innerHeight;
      }
    };

    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <div ref={containerRef} className="relative h-[500vh] w-full bg-black">
      <div className="sticky top-0 h-screen w-full overflow-hidden">
        <canvas ref={canvasRef} className="h-full w-full" />
      </div>
    </div>
  );
}
