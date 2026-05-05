// Contact Section - Minimalist glassmorphism form
// Clean, focused design with animated inputs
"use client";

import { useState, useRef } from "react";
import { motion, useInView } from "framer-motion";
import { Mail } from "lucide-react";

interface ContactProps {
  title: string;
  subtitle: string;
}

export default function Contact({ title, subtitle }: ContactProps) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  // Form state
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [sending, setSending] = useState(false);
  const [sent, setSent] = useState(false);

  // Handle form submit (placeholder - can wire to Supabase or API)
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSending(true);
    // Simulate send
    await new Promise((r) => setTimeout(r, 1500));
    setSending(false);
    setSent(true);
    setForm({ name: "", email: "", message: "" });
    setTimeout(() => setSent(false), 3000);
  };

  return (
    <section id="contact" className="relative" style={{ background: "var(--bg-primary)" }}>
      <div className="section-container" ref={ref}>
        {/* Section header - Left aligned to match other sections */}
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
            03. Contact
          </span>
          <h2 className="text-4xl sm:text-5xl md:text-7xl font-black uppercase tracking-tighter" style={{ color: "var(--text-primary)" }}>
            {title}
          </h2>
          <p className="text-xl mt-6 font-light max-w-2xl" style={{ color: "var(--text-secondary)" }}>
            {subtitle}
          </p>
        </motion.div>

        {/* Two column contact layout */}
        <div className="grid lg:grid-cols-[1fr_1.5fr] gap-16 lg:gap-32 items-start">
          {/* Left info area */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-left"
          >
            <h3 className="text-3xl font-bold mb-6 uppercase tracking-wider" style={{ color: "var(--text-primary)" }}>Ready to start?</h3>
            <p className="text-lg leading-relaxed mb-12 font-light" style={{ color: "var(--text-secondary)" }}>
              Whether you have a specific project in mind, need technical advice, or just want to say hello—my inbox is always open. Let's build something extraordinary.
            </p>
            
            <div className="space-y-8 pt-8 border-t" style={{ borderColor: "var(--border-glass)" }}>
              <div className="group">
                <p className="text-xs font-bold uppercase tracking-[0.2em] mb-2" style={{ color: "var(--text-muted)" }}>Direct Email</p>
                <a href="mailto:hello@measyc.com" className="text-xl md:text-2xl font-light transition-colors duration-300 group-hover:text-[var(--accent-primary)]" style={{ color: "var(--text-primary)" }}>
                  hello@measyc.com
                </a>
              </div>
            </div>
          </motion.div>

          {/* Right form area */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="w-full"
          >
            <form onSubmit={handleSubmit} className="p-0 space-y-6">
              {/* Name input */}
              <div className="relative">
                <input
                  type="text"
                  placeholder="YOUR NAME"
                  value={form.name}
                  onChange={(e) => setForm({ ...form, name: e.target.value })}
                  required
                  style={{
                    background: "var(--bg-card)",
                    border: "1px solid var(--border-glass)",
                    color: "var(--text-primary)",
                    borderRadius: "0px",
                    padding: "20px 24px",
                    width: "100%",
                    fontSize: "14px",
                    fontWeight: "bold",
                    letterSpacing: "0.1em",
                    outline: "none",
                    transition: "all 0.4s ease",
                  }}
                  onFocus={(e) => (e.target.style.borderColor = "var(--text-primary)")}
                  onBlur={(e) => (e.target.style.borderColor = "var(--border-glass)")}
                />
              </div>

              {/* Email input */}
              <div className="relative">
                <input
                  type="email"
                  placeholder="EMAIL ADDRESS"
                  value={form.email}
                  onChange={(e) => setForm({ ...form, email: e.target.value })}
                  required
                  style={{
                    background: "var(--bg-card)",
                    border: "1px solid var(--border-glass)",
                    color: "var(--text-primary)",
                    borderRadius: "0px",
                    padding: "20px 24px",
                    width: "100%",
                    fontSize: "14px",
                    fontWeight: "bold",
                    letterSpacing: "0.1em",
                    outline: "none",
                    transition: "all 0.4s ease",
                  }}
                  onFocus={(e) => (e.target.style.borderColor = "var(--text-primary)")}
                  onBlur={(e) => (e.target.style.borderColor = "var(--border-glass)")}
                />
              </div>

              {/* Message textarea */}
              <div className="relative">
                <textarea
                  placeholder="PROJECT DETAILS..."
                  value={form.message}
                  onChange={(e) => setForm({ ...form, message: e.target.value })}
                  required
                  rows={5}
                  style={{
                    background: "var(--bg-card)",
                    border: "1px solid var(--border-glass)",
                    color: "var(--text-primary)",
                    borderRadius: "0px",
                    padding: "20px 24px",
                    width: "100%",
                    fontSize: "14px",
                    fontWeight: "bold",
                    letterSpacing: "0.1em",
                    outline: "none",
                    transition: "all 0.4s ease",
                    resize: "vertical"
                  }}
                  onFocus={(e) => (e.target.style.borderColor = "var(--text-primary)")}
                  onBlur={(e) => (e.target.style.borderColor = "var(--border-glass)")}
                />
              </div>

              {/* Submit button */}
              <motion.button
                type="submit"
                disabled={sending}
                className="btn-accent w-full"
                style={{ opacity: sending ? 0.7 : 1, marginTop: "24px" }}
              >
                {sending ? (
                  "TRANSMITTING..."
                ) : sent ? (
                  "✓ MESSAGE RECEIVED"
                ) : (
                  "INITIATE SEQUENCE"
                )}
              </motion.button>
            </form>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
