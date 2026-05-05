// About Section - Clean typography with skill badges
// Scroll-triggered fade-in animations
"use client";

import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";
import { MonitorSmartphone, Database } from "lucide-react";

interface AboutProps {
  title: string;
  text: string;
  skills: string; // comma-separated skill list
}

export default function About({ title, text, skills }: AboutProps) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  // Split skills string into array
  const skillList = skills.split(",").map((s) => s.trim()).filter(Boolean);

  return (
    <section id="about" className="relative" style={{ background: "var(--bg-secondary)" }}>
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
            01. Background
          </span>
          <h2 className="text-4xl sm:text-5xl md:text-7xl font-black uppercase tracking-tighter" style={{ color: "var(--text-primary)" }}>
            {title}
          </h2>
        </motion.div>

        {/* Content grid */}
        <div className="grid md:grid-cols-[1.5fr_1fr] gap-16 lg:gap-32 items-start">
          {/* Main text content */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="space-y-8"
          >
            <div
              className="text-xl md:text-3xl leading-relaxed font-light"
              style={{ color: "var(--text-secondary)" }}
            >
              {text.split('\n').map((paragraph, idx) => (
                <p key={idx} className="mb-6">{paragraph}</p>
              ))}
            </div>

            {/* Premium minimal feature list */}
            <div className="grid sm:grid-cols-2 gap-8 pt-12 border-t mt-12" style={{ borderColor: "var(--border-glass)" }}>
              <div className="group cursor-pointer">
                <div className="mb-4 text-[var(--accent-primary)] group-hover:scale-110 transition-transform origin-left">
                  <MonitorSmartphone size={32} strokeWidth={1} />
                </div>
                <h3 className="text-xl font-bold mb-2 uppercase tracking-wide">Frontend Architecture</h3>
                <p className="font-light text-base leading-relaxed" style={{ color: "var(--text-secondary)" }}>
                  Crafting buttery-smooth, interactive UI ecosystems.
                </p>
              </div>

              <div className="group cursor-pointer">
                <div className="mb-4 text-[var(--accent-primary)] group-hover:scale-110 transition-transform origin-left">
                  <Database size={32} strokeWidth={1} />
                </div>
                <h3 className="text-xl font-bold mb-2 uppercase tracking-wide">Backend Systems</h3>
                <p className="font-light text-base leading-relaxed" style={{ color: "var(--text-secondary)" }}>
                  Designing robust, secure, and scalable architectures.
                </p>
              </div>
            </div>
          </motion.div>

          {/* Tech Stack section - Premium vertical list */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="w-full relative"
          >
            <div className="sticky top-32">
              <h3 className="text-sm font-bold uppercase tracking-[0.2em] mb-10 pb-4 border-b" style={{ color: "var(--text-primary)", borderColor: "var(--border-glass)" }}>
                Core Technologies
              </h3>
              
              <div className="flex flex-col gap-4">
                {skills.split(",").map((skill, index) => (
                  <motion.div
                    key={skill}
                    initial={{ opacity: 0, y: 10 }}
                    animate={isInView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.4, delay: 0.5 + index * 0.1 }}
                    className="flex items-center justify-between group cursor-pointer py-4 border-b transition-colors duration-300"
                    style={{ borderColor: "var(--border-glass)" }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.borderColor = "var(--text-primary)";
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.borderColor = "var(--border-glass)";
                    }}
                  >
                    <span
                      className="text-lg md:text-xl font-medium tracking-wide uppercase group-hover:translate-x-4 transition-transform duration-500"
                      style={{ color: "var(--text-primary)" }}
                    >
                      {skill.trim()}
                    </span>
                    <span 
                      className="opacity-0 group-hover:opacity-100 transition-opacity duration-500 text-sm font-bold tracking-widest"
                      style={{ color: "var(--accent-primary)" }}
                    >
                      {String(index + 1).padStart(2, '0')}
                    </span>
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
