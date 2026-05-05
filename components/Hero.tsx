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
    <section id="hero" className="hero-bg min-h-screen flex items-center justify-center relative overflow-hidden">
      {/* Animated gradient orbs in background */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <motion.div
          className="absolute w-[80vw] h-[80vw] max-w-[800px] max-h-[800px] rounded-full opacity-20 blur-3xl"
          style={{
            background: "radial-gradient(circle, var(--accent-primary), transparent 70%)",
            top: "-20%",
            right: "-10%",
          }}
          animate={{ scale: [1, 1.1, 1], x: [0, 50, 0], y: [0, -30, 0] }}
          transition={{ duration: 15, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div
          className="absolute w-[60vw] h-[60vw] max-w-[600px] max-h-[600px] rounded-full opacity-15 blur-3xl"
          style={{
            background: "radial-gradient(circle, var(--accent-secondary), transparent 70%)",
            bottom: "-10%",
            left: "-10%",
          }}
          animate={{ scale: [1, 1.2, 1], x: [0, -40, 0], y: [0, 40, 0] }}
          transition={{ duration: 20, repeat: Infinity, ease: "easeInOut" }}
        />
      </div>

      {/* Main content */}
      <div className="relative z-10 max-w-7xl mx-auto px-6 h-full flex flex-col justify-center pt-20">
        <motion.div
          initial="hidden"
          animate="visible"
          variants={staggerContainer}
          className="max-w-4xl"
        >
          {/* Subtitle / Eyebrow */}
          <motion.div variants={fadeInUp} className="mb-6 overflow-hidden">
            <span
              className="inline-block text-sm md:text-base font-semibold tracking-[0.3em] uppercase py-2"
              style={{ color: "var(--accent-primary)", borderBottom: "1px solid var(--accent-primary)" }}
            >
              {subtitle}
            </span>
          </motion.div>

          {/* Massive Cinematic Title */}
          <motion.h1
            variants={fadeInUp}
            className="text-5xl sm:text-6xl md:text-8xl lg:text-[8rem] font-black leading-[0.9] tracking-tighter mb-8"
            style={{ color: "var(--text-primary)", textTransform: "uppercase" }}
          >
            {title.split(" ").map((word, i) => (
              <span key={i} className={i % 2 !== 0 ? "gradient-text" : ""}>
                {word}{" "}
              </span>
            ))}
          </motion.h1>

          {/* Description */}
          <motion.p
            variants={fadeInUp}
            className="text-xl md:text-2xl mb-12 max-w-2xl font-light leading-relaxed tracking-wide"
            style={{ color: "var(--text-secondary)" }}
          >
            {description}
          </motion.p>

          {/* Action buttons - Sharp & Architectural */}
          <motion.div
            variants={fadeInUp}
            className="grid grid-cols-1 sm:flex sm:flex-row sm:items-start gap-4 sm:gap-6 mt-10"
          >
            <a href="#projects" className="btn-accent flex items-center justify-center gap-3 w-full sm:w-auto text-center group">
              VIEW COLLECTION
              <ArrowRight size={18} className="group-hover:translate-x-2 transition-transform duration-500" />
            </a>

            <a
              href="#contact"
              className="flex items-center justify-center w-full sm:w-auto text-center py-4 px-8 border transition-all duration-500 uppercase tracking-[0.1em] text-[0.85rem] font-bold"
              style={{
                color: "var(--text-primary)",
                borderColor: "var(--border-glass)",
                background: "transparent"
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.background = "var(--text-primary)";
                e.currentTarget.style.color = "var(--bg-primary)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = "transparent";
                e.currentTarget.style.color = "var(--text-primary)";
              }}
            >
              INITIATE CONTACT
            </a>
          </motion.div>
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        className="absolute bottom-10 left-1/2 -translate-x-1/2 opacity-70"
        animate={{ y: [0, 15, 0], opacity: [0.4, 1, 0.4] }}
        transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut" }}
      >
        <ChevronDown size={32} style={{ color: "var(--text-muted)" }} />
      </motion.div>
    </section>
  );
}
