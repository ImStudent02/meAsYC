// Navbar - floating glass navigation bar with theme switcher
// Sticks to top, blurs on scroll, has smooth theme toggle
"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useTheme, Theme } from "./ThemeProvider";
import { Moon, Sun, Flame, Menu, X } from "lucide-react";

// Nav links - smooth scroll to each section
const navLinks = [
  { label: "Home", href: "#hero" },
  { label: "About", href: "#about" },
  { label: "Resume", href: "#resume" },
  { label: "Projects", href: "#projects" },
  { label: "Games", href: "#games" },
  { label: "Contact", href: "#contact" },
];

const themeOptions: { value: Theme; icon: React.ReactNode; label: string }[] = [
  { value: "dark", icon: <Moon size={16} />, label: "Celestial (Dark)" },
  { value: "light", icon: <Sun size={16} />, label: "White Heaven (Light)" },
  { value: "red", icon: <Flame size={16} />, label: "Hell Fire (Red)" },
];

export default function Navbar() {
  const { theme, setTheme } = useTheme();
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [themeMenuOpen, setThemeMenuOpen] = useState(false);

  // Track scroll to add background blur
  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <motion.nav
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 0.9 }}
      transition={{ duration: 0.8, ease: "easeOut" }}
      className="fixed top-0 left-0 right-0 z-50 transition-all duration-500"
      style={{
        background: scrolled ? "var(--bg-primary)" : "transparent",
        borderBottom: scrolled ? "1px solid var(--border-glass)" : "1px solid transparent",
      }}
    >
      <div className="max-w-[1800px] mx-auto px-6 md:px-12 py-5 flex items-center justify-between">
        {/* Logo */}
        <motion.a
          href="#hero"
          className="text-xl md:text-2xl font-black uppercase tracking-[0.2em] cursor-pointer"
          style={{ color: "var(--text-primary)" }}
        >
          This is Yashkumar (YC) Mayani.
        </motion.a>

        {/* Desktop nav links */}
        <div className="hidden md:flex items-center gap-10">
          {navLinks.map((link) => (
            <motion.a
              key={link.href}
              href={link.href}
              className="text-xs font-bold uppercase tracking-[0.15em] transition-colors duration-300 cursor-pointer hover:text-[var(--accent-primary)]"
              style={{ color: "var(--text-secondary)" }}
            >
              {link.label}
            </motion.a>
          ))}

          {/* Theme Switcher */}
          <div className="relative ml-4">
            <button
              onClick={() => setThemeMenuOpen(!themeMenuOpen)}
              className="p-2 transition-all duration-300 cursor-pointer border hover:bg-[var(--text-primary)] hover:text-[var(--bg-primary)] group"
              style={{
                borderColor: "var(--border-glass)",
                color: "var(--text-primary)",
                background: "transparent"
              }}
            >
              {theme === "dark" && <Moon size={16} />}
              {theme === "light" && <Sun size={16} />}
              {theme === "red" && <Flame size={16} />}
            </button>

            {/* Theme dropdown */}
            <AnimatePresence>
              {themeMenuOpen && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 10 }}
                  className="absolute right-0 top-12 min-w-[200px]"
                  style={{
                    background: "var(--bg-primary)",
                    border: "1px solid var(--border-glass)",
                    boxShadow: "0 20px 40px rgba(0,0,0,0.2)",
                  }}
                >
                  {themeOptions.map((opt) => {
                    const isActive = theme === opt.value;
                    return (
                      <button
                        key={opt.value}
                        onClick={() => { setTheme(opt.value); setThemeMenuOpen(false); }}
                        className={`flex items-center gap-4 w-full px-6 py-4 text-xs font-bold uppercase tracking-widest transition-all duration-200 cursor-pointer border-l-4 ${
                          isActive 
                            ? "border-[var(--accent-primary)] text-[var(--accent-primary)] hover:bg-[var(--accent-primary)] hover:text-[var(--bg-primary)]" 
                            : "border-transparent text-[var(--text-primary)] hover:bg-[var(--text-primary)] hover:text-[var(--bg-primary)]"
                        }`}
                        style={{
                          borderBottom: "1px solid var(--border-glass)"
                        }}
                      >
                        {opt.icon}
                        {opt.label}
                      </button>
                    );
                  })}
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>

        {/* Mobile hamburger */}
        <button
          className="md:hidden p-2 cursor-pointer"
          style={{ color: "var(--text-primary)" }}
          onClick={() => setMobileOpen(!mobileOpen)}
        >
          {mobileOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile menu overlay */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden overflow-hidden border-b"
            style={{
              background: "var(--bg-primary)",
              borderColor: "var(--border-glass)",
            }}
          >
            <div className="flex flex-col p-4 gap-2">
              {navLinks.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  onClick={() => setMobileOpen(false)}
                  className="px-4 py-3 rounded-xl text-sm font-medium transition-all duration-200"
                  style={{ color: "var(--text-secondary)" }}
                >
                  {link.label}
                </a>
              ))}
              {/* Mobile theme options */}
              <div className="flex flex-wrap gap-2 px-4 py-3">
                {themeOptions.map((opt) => (
                  <button
                    key={opt.value}
                    onClick={() => { setTheme(opt.value); setMobileOpen(false); }}
                    className="flex items-center gap-2 px-3 py-2 rounded-xl text-xs transition-all cursor-pointer"
                    style={{
                      background: theme === opt.value ? "var(--accent-glow)" : "var(--bg-glass)",
                      color: theme === opt.value ? "var(--accent-primary)" : "var(--text-secondary)",
                      border: "1px solid var(--border-glass)",
                    }}
                  >
                    {opt.icon}
                    {opt.label}
                  </button>
                ))}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
}
