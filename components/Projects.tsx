"use client";

import { motion, useInView, PanInfo } from "framer-motion";
import { useRef, useState, useEffect } from "react";
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
  
  const [activeIndex, setActiveIndex] = useState(0);
  const [interactionTime, setInteractionTime] = useState(Date.now());

  // Auto-play loop every 5 seconds, resetting on interaction
  useEffect(() => {
    if (projects.length <= 1) return;
    const timer = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % projects.length);
    }, 5000);
    
    return () => clearInterval(timer);
  }, [interactionTime, projects.length]);

  const handleInteraction = () => {
    setInteractionTime(Date.now());
  };

  const handleDragEnd = (e: any, { offset, velocity }: PanInfo) => {
    handleInteraction();
    const swipe = offset.x;
    if (swipe < -50) {
      setActiveIndex((prev) => (prev + 1) % projects.length);
    } else if (swipe > 50) {
      setActiveIndex((prev) => (prev - 1 + projects.length) % projects.length);
    }
  };

  const getOffset = (index: number) => {
    const total = projects.length;
    let offset = (index - activeIndex) % total;
    if (offset > Math.floor(total / 2)) offset -= total;
    if (offset < -Math.floor(total / 2)) offset += total;
    return offset;
  };

  return (
    <section id="projects" className="py-24 md:py-32 px-6 relative border-t overflow-hidden" style={{ background: "color-mix(in srgb, var(--theme-surface) 92%, transparent)", borderColor: "color-mix(in srgb, var(--theme-outline-variant) 20%, transparent)" }}>
      <div className="max-w-7xl mx-auto relative z-10" ref={ref}>
        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 1.3 }}
          className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-16"
        >
          <div>
            <h2 className="font-display font-bold text-4xl md:text-5xl tracking-tight uppercase mb-4" style={{ color: "var(--theme-on-background)" }}>
              {title}
            </h2>
            <p className="max-w-xl text-lg font-light leading-relaxed" style={{ color: "var(--theme-on-surface-variant)" }}>
              {subtitle}
            </p>
          </div>
        </motion.div>

        {/* Project Carousel */}
        <div 
          className="relative w-full h-[600px] md:h-[650px] flex items-center justify-center"
        >
          {projects.map((project, i) => {
            const offset = getOffset(i);
            const isActive = offset === 0;
            const isVisible = Math.abs(offset) <= 2;
            
            if (!isVisible) return null;

            return (
              <motion.div
                key={project.id}
                drag="x"
                dragConstraints={{ left: 0, right: 0 }}
                onDragStart={handleInteraction}
                onDragEnd={handleDragEnd}
                onClick={() => {
                  if (!isActive) {
                    setActiveIndex(i);
                    handleInteraction();
                  }
                }}
                style={{ cursor: isActive ? 'grab' : 'pointer' }}
                animate={{ 
                  x: `${offset * 105}%`, 
                  scale: isActive ? 1 : 0.85,
                  opacity: isActive ? 1 : Math.abs(offset) === 1 ? 0.4 : 0,
                  zIndex: isActive ? 20 : 10 - Math.abs(offset),
                  filter: isActive ? "blur(0px)" : "blur(4px)"
                }}
                whileDrag={{ 
                  zIndex: 50,
                  scale: 0.95,
                  opacity: 0.9,
                  filter: "blur(0px)"
                }}
                transition={{ duration: 0.6, ease: [0.32, 0.72, 0, 1] }}
                className="absolute w-full max-w-[90vw] md:max-w-[600px] cursor-grab active:cursor-grabbing"
              >
                <div className={`transition-all duration-500 rounded-3xl ${isActive ? 'ring-2 ring-[var(--theme-primary)] ring-offset-4 ring-offset-[var(--theme-surface-container-lowest)]' : ''}`}>
                  {/* Project Visual block */}
                  <div className="w-full aspect-[16/10] rounded-t-3xl overflow-hidden relative bg-surface-variant pointer-events-none">
                    {/* Image overlay effect */}
                    <div 
                      className={`absolute inset-0 mix-blend-overlay transition-opacity duration-500 z-10 ${isActive ? 'opacity-0' : 'opacity-80'}`}
                      style={{ background: "var(--theme-primary)" }}
                    ></div>
                    
                    {/* Placeholder/Actual image */}
                    <div 
                      className={`w-full h-full object-cover transition-all duration-700 flex items-center justify-center ${isActive ? 'grayscale-0 scale-105' : 'grayscale'}`}
                      style={{ background: "color-mix(in srgb, var(--theme-surface-container-highest) 80%, transparent)" }}
                    >
                      {project.image_url ? (
                        // eslint-disable-next-line @next/next/no-img-element
                        <img src={project.image_url} alt={project.title} className="w-full h-full object-cover" draggable={false} />
                      ) : (
                        <Code2 size={64} style={{ color: "var(--theme-on-surface-variant)", opacity: 0.3 }} />
                      )}
                    </div>
                  </div>

                  {/* Project Info */}
                  <div 
                    className="p-6 md:p-8 rounded-b-3xl glass-card flex flex-col md:flex-row items-start justify-between gap-6 relative z-20 pointer-events-auto"
                    style={{ background: "var(--theme-surface-container-high)" }}
                  >
                    <div className="flex-1">
                      <h3
                        className="font-display font-bold text-2xl md:text-3xl mb-3"
                        style={{ color: "var(--theme-on-surface)" }}
                      >
                        {project.title}
                      </h3>
                      
                      <p
                        className="mb-6 line-clamp-2 leading-relaxed text-sm md:text-base"
                        style={{ color: "var(--theme-on-surface-variant)" }}
                      >
                        {project.description}
                      </p>

                      <div className="flex flex-wrap gap-2">
                        {project.tags
                          .split(",")
                          .map((tag) => tag.trim())
                          .filter(Boolean)
                          .map((tag) => (
                            <span
                              key={tag}
                              className="px-3 py-1 rounded-full border text-[10px] md:text-xs font-bold uppercase tracking-wider"
                              style={{ borderColor: "var(--theme-outline-variant)", color: "var(--theme-on-surface-variant)" }}
                            >
                              {tag}
                            </span>
                          ))}
                      </div>
                    </div>
                    
                    {isActive && (
                      <a href={project.project_url || "#"} target="_blank" rel="noopener noreferrer" 
                        className="w-14 h-14 rounded-full flex items-center justify-center shrink-0 transition-all duration-300 hover:scale-110 hover:rotate-12"
                        style={{ background: "var(--theme-primary)", color: "var(--theme-on-primary)", boxShadow: "0 0 20px var(--accent-glow)" }}
                      >
                        <ExternalLink size={24} />
                      </a>
                    )}
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
