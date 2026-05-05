"use client";

import { useTheme } from "./ThemeProvider";
import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

export function AnimatedBackground() {
  const { theme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden">
      <AnimatePresence mode="wait">
        {theme === "dark" && (
          <motion.div
            key="celestial"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1 }}
            className="absolute inset-0 celestial-bg"
          >
            <div className="stars-layer-1"></div>
            <div className="stars-layer-2"></div>
            <div className="stars-layer-3"></div>
          </motion.div>
        )}

        {theme === "red" && (
          <motion.div
            key="inferno"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1 }}
            className="absolute inset-0 inferno-bg"
          >
            <div className="fire-container">
              <div className="flame flame-1"></div>
              <div className="flame flame-2"></div>
              <div className="flame flame-3"></div>
              <div className="flame flame-4"></div>
              <div className="flame flame-5"></div>
              <div className="flame flame-6"></div>
              <div className="flame flame-7"></div>
              <div className="fire-glow"></div>
            </div>
          </motion.div>
        )}

        {/* Light theme (white heaven) doesn't need extra animated background elements by request */}
      </AnimatePresence>
    </div>
  );
}
