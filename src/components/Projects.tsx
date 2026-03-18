"use client";

import { motion } from "framer-motion";
import { useState } from "react";
import { cn } from "@/lib/utils";

interface Project {
  title: string;
  category: string;
  image: string;
}

const PROJECTS: Project[] = [
  {
    title: "Embedded Assistive System",
    category: "NodeMCU & IoT Sensors",
    image: "https://images.unsplash.com/photo-1518770660439-4636190af475?q=80&w=2000&auto=format&fit=crop",
  },
  {
    title: "Solar IoT Asset Tracking",
    category: "GPS & Motion Monitoring",
    image: "https://images.unsplash.com/photo-1504384308090-c894fdcc538d?q=80&w=2000&auto=format&fit=crop",
  },
  {
    title: "OSS-Community-Agent",
    category: "RAG & Streamlit",
    image: "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?q=80&w=2000&auto=format&fit=crop",
  },
  {
    title: "Medical Chatbot",
    category: "Flask & LangChain",
    image: "https://images.unsplash.com/photo-1526628953301-3e589a6a8b74?q=80&w=2000&auto=format&fit=crop",
  },
];

export default function Projects() {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  return (
    <section className="relative z-20 min-h-screen bg-black px-8 py-24 md:px-24">
      <div className="mx-auto max-w-7xl">
        <h2 className="mb-16 text-4xl md:text-6xl font-bold text-white tracking-tight">
          Selected Works.
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {PROJECTS.map((project, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.6, delay: idx * 0.1 }}
              onMouseEnter={() => setHoveredIndex(idx)}
              onMouseLeave={() => setHoveredIndex(null)}
              className={cn(
                "group relative overflow-hidden rounded-2xl border border-white/10 bg-white/5 p-4 transition-all duration-500",
                "backdrop-blur-xl hover:border-white/30 hover:bg-white/10"
              )}
            >
              {/* Subtle hover glow (Nano Banana concept) */}
              <div 
                className={cn(
                  "absolute -inset-px rounded-2xl opacity-0 transition duration-500",
                  "bg-gradient-to-r from-purple-500/20 via-transparent to-blue-500/20",
                  hoveredIndex === idx && "opacity-100"
                )}
              />

              <div className="relative aspect-video w-full overflow-hidden rounded-xl bg-neutral-900">
                <motion.img
                  initial={false}
                  animate={{
                    scale: hoveredIndex === idx ? 1.05 : 1,
                  }}
                  transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                  src={project.image}
                  alt={project.title}
                  className="h-full w-full object-cover object-center"
                />
              </div>

              <div className="mt-6 flex items-end justify-between">
                <div>
                  <h3 className="text-2xl font-semibold text-white">{project.title}</h3>
                  <p className="mt-2 text-sm text-gray-400">{project.category}</p>
                </div>
                <div className="flex h-10 w-10 items-center justify-center rounded-full border border-white/20 bg-white/5 transition-colors group-hover:bg-white text-white group-hover:text-black">
                  <svg width="15" height="15" viewBox="0 0 15 15" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M8.14645 3.14645C8.34171 2.95118 8.65829 2.95118 8.85355 3.14645L12.8536 7.14645C13.0488 7.34171 13.0488 7.65829 12.8536 7.85355L8.85355 11.8536C8.65829 12.0488 8.34171 12.0488 8.14645 11.8536C7.95118 11.6583 7.95118 11.3417 8.14645 11.1464L11.2929 8H2.5C2.22386 8 2 7.77614 2 7.5C2 7.22386 2.22386 7 2.5 7H11.2929L8.14645 3.85355C7.95118 3.65829 7.95118 3.34171 8.14645 3.14645Z" fill="currentColor" fillRule="evenodd" clipRule="evenodd"></path>
                  </svg>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
