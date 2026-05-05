// Resume Section - Education and Experience timeline
// Clean, minimalist layout with high contrast between headers and details
"use client";

import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";
import { GraduationCap, Briefcase } from "lucide-react";

interface ResumeProps {
  eduTitle: string;
  eduText: string;
  expTitle: string;
  expText: string;
}

export default function Resume({ eduTitle, eduText, expTitle, expText }: ResumeProps) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  const renderItems = (text: string) => {
    return text.split('\n\n').map((item, idx) => (
      <div key={idx} className="mb-6 last:mb-0">
        {item.split('\n').map((line, lidx) => {
          if (lidx === 0) return <h4 key={lidx} className="text-lg font-bold" style={{ color: "var(--theme-on-surface)" }}>{line}</h4>;
          if (lidx === 1) return <p key={lidx} className="text-sm font-medium mb-2" style={{ color: "var(--theme-primary)" }}>{line}</p>;
          return <p key={lidx} className="text-sm font-light leading-relaxed opacity-80" style={{ color: "var(--theme-on-surface-variant)" }}>{line}</p>;
        })}
      </div>
    ));
  };

  return (
    <section id="resume" className="py-24 md:py-32 px-6 relative border-t" style={{ background: "color-mix(in srgb, var(--theme-surface) 92%, transparent)", borderColor: "color-mix(in srgb, var(--theme-outline-variant) 20%, transparent)" }}>
      <div className="max-w-7xl mx-auto relative z-10" ref={ref}>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 lg:gap-24">
          
          {/* Experience Column */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.1 }}
          >
            <div className="flex items-center gap-4 mb-12">
              <div className="p-3 rounded-2xl" style={{ background: "color-mix(in srgb, var(--theme-primary) 15%, transparent)", color: "var(--theme-primary)" }}>
                <Briefcase size={28} strokeWidth={1.5} />
              </div>
              <h2 className="font-display font-bold text-3xl md:text-4xl tracking-tight uppercase" style={{ color: "var(--theme-on-background)" }}>
                {expTitle}
              </h2>
            </div>
            <div className="glass-card p-8 rounded-3xl relative overflow-hidden">
              <div className="absolute top-0 left-0 w-1 h-full" style={{ background: "linear-gradient(to bottom, var(--theme-primary), transparent)" }}></div>
              {renderItems(expText)}
            </div>
          </motion.div>

          {/* Education Column */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <div className="flex items-center gap-4 mb-12">
              <div className="p-3 rounded-2xl" style={{ background: "color-mix(in srgb, var(--theme-tertiary) 15%, transparent)", color: "var(--theme-tertiary)" }}>
                <GraduationCap size={28} strokeWidth={1.5} />
              </div>
              <h2 className="font-display font-bold text-3xl md:text-4xl tracking-tight uppercase" style={{ color: "var(--theme-on-background)" }}>
                {eduTitle}
              </h2>
            </div>
            <div className="glass-card p-8 rounded-3xl relative overflow-hidden">
              <div className="absolute top-0 left-0 w-1 h-full" style={{ background: "linear-gradient(to bottom, var(--theme-tertiary), transparent)" }}></div>
              {renderItems(eduText)}
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
}
