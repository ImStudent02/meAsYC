// Hero Section - Full-screen cinematic intro with animated text reveals
// Dynamic background gradient + floating particles + staggered typography
"use client";

import { motion } from "framer-motion";
import { ChevronDown, ArrowRight } from "lucide-react";

interface HeroProps {
  title: string;
  subtitle: string;
  description: string;
}

export default function Hero({ title, subtitle, description }: HeroProps) {
  // Staggered animation for child elements
  const staggerContainer = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.2, delayChildren: 0.5 },
    },
  };

  const fadeInUp = {
    hidden: { opacity: 0, y: 40 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.8, ease: [0.25, 0.4, 0.25, 1] as [number, number, number, number] },
    },
  };

  return (
    <section id="nexus" className="relative min-h-[90vh] flex flex-col justify-center items-center px-6 overflow-hidden">

      {/* Main content */}
      <div className="z-10 text-center w-full max-w-3xl pt-20">
        <motion.div
          initial="hidden"
          animate="visible"
          variants={staggerContainer}
          className="flex flex-col items-center"
        >
          {/* Status Pill / Eyebrow */}
          <motion.div variants={fadeInUp} className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass-card mb-8">
            <span className="w-2 h-2 rounded-full animate-pulse" style={{ background: "var(--theme-primary)" }}></span>
            <span className="text-xs font-medium tracking-wider uppercase" style={{ color: "var(--theme-on-surface)" }}>
              {subtitle}
            </span>
          </motion.div>

          {/* Main Title */}
          <motion.h1
            variants={fadeInUp}
            className="font-display font-bold text-5xl sm:text-6xl md:text-7xl tracking-tight mb-6 leading-tight"
            style={{ color: "var(--theme-on-background)" }}
          >
            {title.split(" ").map((word, i) => {
              // Highlight the last word or specific words based on the theme
              if (i === title.split(" ").length - 1) {
                return (
                  <span key={i} className="text-gradient block mt-2 text-6xl sm:text-7xl md:text-8xl">
                    {word}
                  </span>
                );
              }
              return <span key={i}>{word} </span>;
            })}
          </motion.h1>

          {/* Description */}
          <motion.p
            variants={fadeInUp}
            className="text-lg mb-10 max-w-md mx-auto leading-relaxed"
            style={{ color: "var(--theme-on-surface-variant)" }}
          >
            {description}
          </motion.p>

          {/* Actions */}
          <motion.div
            variants={fadeInUp}
            className="flex flex-col sm:flex-row gap-4 w-full justify-center"
          >
            <a 
              href="#projects" 
              className="font-bold py-4 px-8 rounded-full transition-all hover:scale-105 active:scale-95 flex items-center justify-center"
              style={{ 
                background: "var(--theme-primary)", 
                color: "var(--theme-on-primary)",
                boxShadow: "0 0 20px color-mix(in srgb, var(--theme-primary) 30%, transparent)"
              }}
            >
              Initiate Sequence
            </a>
            <a
              href="#about"
              className="glass-card font-bold py-4 px-8 rounded-full transition-all flex items-center justify-center"
              style={{ color: "var(--theme-on-surface)" }}
              onMouseEnter={(e) => e.currentTarget.style.background = "var(--theme-surface-variant)"}
              onMouseLeave={(e) => e.currentTarget.style.background = "color-mix(in srgb, var(--theme-surface-container-high) 70%, transparent)"}
            >
              View Schematics
            </a>
          </motion.div>
        </motion.div>
      </div>

      {/* Scroll Indicator */}
      <motion.div
        className="absolute bottom-8 z-10 flex flex-col items-center gap-2 opacity-50"
        animate={{ y: [0, 10, 0], opacity: [0.3, 0.6, 0.3] }}
        transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut" }}
      >
        {/* <span className="text-[10px] uppercase tracking-[0.2em]" style={{ color: "var(--theme-on-surface)" }}>Descend</span> */}
        <div className="w-[1px] h-12" style={{ background: "linear-gradient(to bottom, var(--theme-on-surface), transparent)" }}></div>
      </motion.div>
    </section>
  );
}
