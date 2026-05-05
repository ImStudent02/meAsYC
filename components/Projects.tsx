// Projects Section - Bento-box grid with hover effects
// Each card has scale+glow animation on hover
"use client";

import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";
import { ExternalLink, Code2 } from "lucide-react";
import { Project } from "@/lib/types";

interface ProjectsProps {
  title: string;
  subtitle: string;
  projects: Project[];
}

export default function Projects({ title, subtitle, projects }: ProjectsProps) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="projects" className="relative" style={{ background: "var(--bg-primary)" }}>
      <div className="section-container" ref={ref}>
        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="mb-20 md:mb-32"
        >
          <span
            className="inline-block text-sm md:text-base font-semibold tracking-[0.3em] uppercase py-2 mb-6"
            style={{ color: "var(--accent-primary)", borderBottom: "1px solid var(--accent-primary)" }}
          >
            02. Showcase
          </span>
          <h2 className="text-4xl sm:text-5xl md:text-7xl font-black uppercase tracking-tighter" style={{ color: "var(--text-primary)" }}>
            {title}
          </h2>
        </motion.div>

        {/* Premium Project Grid - Large distinct architectural blocks */}
        <div className="grid grid-cols-1 gap-20 lg:gap-32">
          {projects.map((project, i) => (
            <motion.div
              key={project.id}
              initial={{ opacity: 0, y: 60 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, delay: 0.2 + i * 0.15 }}
              className="group"
            >
              <div className="flex flex-col lg:flex-row gap-10 items-center">
                
                {/* Project Visual block - Massive & clean */}
                <div
                  className="w-full lg:w-3/5 relative aspect-video overflow-hidden bg-[var(--bg-card)]"
                  style={{ border: "1px solid rgba(255,255,255,0.03)" }}
                >
                  {/* Subtle Monochromatic Gradient */}
                  <motion.div 
                    className="absolute inset-0 opacity-40 mix-blend-overlay"
                    style={{
                      background: `linear-gradient(${135 + i * 45}deg, #111 0%, var(--accent-primary) 100%)`,
                      filter: "grayscale(100%)"
                    }}
                    animate={{ scale: [1, 1.05, 1] }}
                    transition={{ duration: 15 + i, repeat: Infinity, ease: "linear" }}
                  />

                  {/* Minimal glass pattern */}
                  <div className="absolute inset-0" style={{
                    backgroundImage: "radial-gradient(var(--border-glass) 1px, transparent 1px)",
                    backgroundSize: "32px 32px",
                    opacity: 0.3
                  }}></div>

                  <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-700 bg-black/40 backdrop-blur-sm">
                     <a href={project.project_url || "#"} target="_blank" rel="noopener noreferrer" className="btn-accent px-8 py-4 bg-white text-black border-none text-sm tracking-widest font-bold uppercase transition-transform transform scale-95 group-hover:scale-100">
                        View Project
                     </a>
                  </div>
                </div>

                {/* Project Info - Minimalist Typography */}
                <div className="w-full lg:w-2/5 flex flex-col justify-center">
                  <div className="mb-4">
                    <span
                      className="text-5xl sm:text-6xl md:text-8xl font-black italic tracking-tighter"
                      style={{ color: "transparent", WebkitTextStroke: "1px var(--border-glass)" }}
                    >
                      {String(i + 1).padStart(2, "0")}
                    </span>
                  </div>
                  
                  <h3
                    className="text-3xl sm:text-4xl md:text-5xl font-black mb-4 sm:mb-6 uppercase tracking-tight transition-colors duration-500 group-hover:text-[var(--accent-primary)]"
                    style={{ color: "var(--text-primary)" }}
                  >
                    {project.title}
                  </h3>
                  
                  <p
                    className="text-base sm:text-lg md:text-xl mb-8 sm:mb-10 leading-relaxed font-light"
                    style={{ color: "var(--text-secondary)" }}
                  >
                    {project.description}
                  </p>

                  <div className="flex flex-wrap gap-4 pt-6 sm:pt-8 border-t" style={{ borderColor: "var(--border-glass)" }}>
                    {project.tags
                      .split(",")
                      .map((tag) => tag.trim())
                      .filter(Boolean)
                      .map((tag) => (
                        <span
                          key={tag}
                          className="text-[10px] sm:text-xs font-bold px-0 py-1 uppercase tracking-[0.2em]"
                          style={{ color: "var(--text-primary)" }}
                        >
                          {tag}
                        </span>
                      ))}
                  </div>
                </div>

              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
