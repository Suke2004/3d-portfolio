"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

export default function Overlay() {
  const containerRef = useRef<HTMLDivElement>(null);
  
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  // Fade In and Fade Out for section 1 (0% to 30%)
  const opacity1 = useTransform(scrollYProgress, [0, 0.1, 0.25, 0.3], [0, 1, 1, 0]);
  const y1 = useTransform(scrollYProgress, [0, 0.3], [50, -50]);

  // Fade In and Fade Out for section 2 (30% to 60%)
  const opacity2 = useTransform(scrollYProgress, [0.3, 0.4, 0.55, 0.6], [0, 1, 1, 0]);
  const y2 = useTransform(scrollYProgress, [0.3, 0.6], [50, -50]);

  // Fade In for section 3 (60% to 100%)
  const opacity3 = useTransform(scrollYProgress, [0.6, 0.7, 0.9, 1], [0, 1, 1, 1]);
  const y3 = useTransform(scrollYProgress, [0.6, 1], [50, 0]);

  return (
    <div 
      ref={containerRef} 
      className="absolute top-0 left-0 w-full h-[500vh] pointer-events-none z-10"
    >
      <div className="sticky top-0 h-screen w-full flex flex-col justify-center px-8 md:px-24">
        
        {/* Section 1: Center */}
        <motion.div 
          style={{ opacity: opacity1, y: y1 }}
          className="absolute inset-x-0 mx-auto text-center"
        >
          <h1 className="text-4xl md:text-7xl font-bold tracking-tight text-white drop-shadow-lg">
            USTELA SUKESH REDDY
          </h1>
          <p className="mt-4 text-xl md:text-3xl text-gray-300 drop-shadow-md">
            Engineer & Data Scientist.
          </p>
        </motion.div>

        {/* Section 2: Left */}
        <motion.div 
          style={{ opacity: opacity2, y: y2 }}
          className="absolute left-8 md:left-24 max-w-xl"
        >
          <h2 className="text-3xl md:text-6xl font-bold text-white drop-shadow-lg">
            I build intelligent systems.
          </h2>
        </motion.div>

        {/* Section 3: Right */}
        <motion.div 
          style={{ opacity: opacity3, y: y3 }}
          className="absolute right-8 md:right-24 max-w-xl text-right"
        >
          <h2 className="text-3xl md:text-6xl font-bold text-white drop-shadow-lg">
            Bridging hardware, software, and data.
          </h2>
        </motion.div>

      </div>
    </div>
  );
}
