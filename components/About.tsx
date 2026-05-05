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
  card1Title: string;
  card1Text: string;
  card2Title: string;
  card2Text: string;
}

export default function About({ title, text, skills, card1Title, card1Text, card2Title, card2Text }: AboutProps) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  // Split skills string into array
  const skillList = skills.split(",").map((s) => s.trim()).filter(Boolean);

  return (
    <section id="about" className="py-24 md:py-32 px-6 relative border-t" style={{ background: "color-mix(in srgb, var(--theme-surface-container-lowest) 92%, transparent)", borderColor: "color-mix(in srgb, var(--theme-outline-variant) 20%, transparent)" }}>
      {/* Background element */}
      <div className="absolute right-0 top-1/2 -translate-y-1/2 w-1/3 h-full hidden lg:block" style={{ background: "color-mix(in srgb, var(--theme-surface-container-low) 50%, transparent)", borderLeft: "1px solid color-mix(in srgb, var(--theme-outline-variant) 30%, transparent)" }}></div>

      <div className="max-w-7xl mx-auto relative z-10" ref={ref}>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="flex items-center gap-4 mb-16"
        >
          <h2 className="font-display font-bold text-4xl md:text-5xl tracking-tight uppercase" style={{ color: "var(--theme-on-background)" }}>
            Evolution Core
          </h2>
          <div className="h-[2px] flex-grow max-w-md" style={{ background: "linear-gradient(to right, var(--theme-primary), transparent)" }}></div>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-12 gap-6 auto-rows-[minmax(180px,auto)]">
          {/* Bio Box */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={isInView ? { opacity: 1, scale: 1 } : {}}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="glass-card p-8 md:col-span-8 md:row-span-2 rounded-3xl group relative overflow-hidden"
          >
            <div className="absolute top-0 right-0 w-32 h-32 blur-3xl opacity-20 group-hover:opacity-40 transition-opacity" style={{ background: "var(--theme-primary)" }}></div>
            <h3 className="text-xl font-bold mb-4 uppercase tracking-wider" style={{ color: "var(--theme-primary)" }}>{title}</h3>
            <div className="text-lg md:text-xl leading-relaxed font-light z-10 relative space-y-6" style={{ color: "var(--theme-on-surface-variant)" }}>
              {text.split('\n').map((paragraph, idx) => (
                <p key={idx}>{paragraph}</p>
              ))}
            </div>
          </motion.div>

          {/* Architecture Box */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={isInView ? { opacity: 1, scale: 1 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="glass-card p-8 md:col-span-4 rounded-3xl flex flex-col justify-between group"
          >
            <div className="mb-4 text-primary group-hover:scale-110 transition-transform origin-left" style={{ color: "var(--theme-primary)" }}>
              <MonitorSmartphone size={32} strokeWidth={1} />
            </div>
            <div>
              <h3 className="text-xl font-bold mb-2 uppercase tracking-wide" style={{ color: "var(--theme-on-surface)" }}>{card1Title}</h3>
              <p className="font-light text-sm leading-relaxed" style={{ color: "var(--theme-on-surface-variant)" }}>
                {card1Text}
              </p>
            </div>
          </motion.div>

          {/* Backend Box */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={isInView ? { opacity: 1, scale: 1 } : {}}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="glass-card p-8 md:col-span-4 rounded-3xl flex flex-col justify-between group"
            style={{ background: "color-mix(in srgb, var(--theme-surface-variant) 30%, transparent)" }}
          >
            <div className="mb-4 text-primary group-hover:scale-110 transition-transform origin-left" style={{ color: "var(--theme-primary)" }}>
              <Database size={32} strokeWidth={1} />
            </div>
            <div>
              <h3 className="text-xl font-bold mb-2 uppercase tracking-wide" style={{ color: "var(--theme-on-surface)" }}>{card2Title}</h3>
              <p className="font-light text-sm leading-relaxed" style={{ color: "var(--theme-on-surface-variant)" }}>
                {card2Text}
              </p>
            </div>
          </motion.div>

          {/* Skills Grid */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="md:col-span-12 mt-12"
          >
            <h3 className="font-display font-bold text-2xl mb-8 flex items-center gap-4" style={{ color: "var(--theme-on-background)" }}>
              <span className="w-8 h-[2px]" style={{ background: "var(--theme-tertiary)" }}></span>
              Tech Stack
            </h3>
            <div className="flex flex-wrap gap-3">
              {skillList.map((skill, index) => (
                <span
                  key={index}
                  className="px-6 py-3 rounded-full border text-sm font-medium tracking-wide transition-all hover:scale-105 cursor-default"
                  style={{ 
                    borderColor: "var(--theme-outline-variant)", 
                    color: "var(--theme-on-surface)",
                    background: "color-mix(in srgb, var(--theme-surface) 50%, transparent)"
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.borderColor = "var(--theme-primary)";
                    e.currentTarget.style.color = "var(--theme-primary)";
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.borderColor = "var(--theme-outline-variant)";
                    e.currentTarget.style.color = "var(--theme-on-surface)";
                  }}
                >
                  {skill}
                </span>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
