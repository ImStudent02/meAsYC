// Footer - Simple, clean footer with gradient border top
"use client";

import { motion } from "framer-motion";
import { Heart } from "lucide-react";

export default function Footer() {
  return (
    <footer
      className="relative py-8 text-center"
      style={{
        background: "var(--bg-secondary)",
        borderTop: "1px solid var(--border-glass)",
      }}
    >
      <motion.p
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        className="text-sm flex items-center justify-center gap-2"
        style={{ color: "var(--text-muted)" }}
      >
        Built with <Heart size={14} style={{ color: "var(--accent-primary)" }} /> by meAsYC
      </motion.p>
    </footer>
  );
}
