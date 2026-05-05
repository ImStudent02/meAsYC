// Footer - Simple, clean footer with gradient border top
"use client";

import { motion } from "framer-motion";
import { Heart } from "lucide-react";

interface FooterProps {
  githubUrl?: string;
  twitterUrl?: string;
  linkedinUrl?: string;
}

export default function Footer({ githubUrl, twitterUrl, linkedinUrl }: FooterProps) {
  return (
    <footer
      className="relative py-12 text-center flex flex-col items-center gap-6"
      style={{
        background: "color-mix(in srgb, var(--theme-surface-container-lowest) 92%, transparent)",
        borderTop: "1px solid color-mix(in srgb, var(--theme-outline-variant) 20%, transparent)",
      }}
    >
      <div className="flex items-center justify-center gap-6">
        {githubUrl && (
          <a href={githubUrl} target="_blank" rel="noopener noreferrer" className="transition-all hover:scale-110 hover:-translate-y-1" style={{ color: "var(--theme-on-surface-variant)" }} onMouseEnter={(e) => e.currentTarget.style.color = "var(--theme-primary)"} onMouseLeave={(e) => e.currentTarget.style.color = "var(--theme-on-surface-variant)"}>
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4"></path><path d="M9 18c-4.51 2-5-2-7-2"></path></svg>
          </a>
        )}
        {twitterUrl && (
          <a href={twitterUrl} target="_blank" rel="noopener noreferrer" className="transition-all hover:scale-110 hover:-translate-y-1" style={{ color: "var(--theme-on-surface-variant)" }} onMouseEnter={(e) => e.currentTarget.style.color = "var(--theme-primary)"} onMouseLeave={(e) => e.currentTarget.style.color = "var(--theme-on-surface-variant)"}>
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z"></path></svg>
          </a>
        )}
        {linkedinUrl && (
          <a href={linkedinUrl} target="_blank" rel="noopener noreferrer" className="transition-all hover:scale-110 hover:-translate-y-1" style={{ color: "var(--theme-on-surface-variant)" }} onMouseEnter={(e) => e.currentTarget.style.color = "var(--theme-primary)"} onMouseLeave={(e) => e.currentTarget.style.color = "var(--theme-on-surface-variant)"}>
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path><rect x="2" y="9" width="4" height="12"></rect><circle cx="4" cy="4" r="2"></circle></svg>
          </a>
        )}
      </div>

      <motion.p
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        className="text-sm flex items-center justify-center gap-2 mt-4"
        style={{ color: "var(--theme-on-surface-variant)" }}
      >
        Built with <Heart size={14} style={{ color: "var(--theme-primary)" }} className="animate-pulse" /> by meAsYC
      </motion.p>
    </footer>
  );
}
