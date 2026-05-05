// Contact Section - Minimalist glassmorphism form
// Clean, focused design with animated inputs
"use client";

import { useState, useRef } from "react";
import { motion, useInView } from "framer-motion";
import { Mail } from "lucide-react";
import { Turnstile } from "@marsidev/react-turnstile";

interface ContactProps {
  title: string;
  subtitle: string;
}

export default function Contact({ title, subtitle }: ContactProps) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  // Form state
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [turnstileToken, setTurnstileToken] = useState("");
  const [sending, setSending] = useState(false);
  const [sent, setSent] = useState(false);
  const [error, setError] = useState(false);

  // Handle form submit
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!turnstileToken) {
      setError(true);
      setTimeout(() => setError(false), 3000);
      return;
    }

    setSending(true);
    
    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...form,
          subjectPrefix: "[YCP]",
          token: turnstileToken
        }),
      });

      if (response.ok) {
        setSent(true);
        setForm({ name: "", email: "", message: "" });
        setTurnstileToken(""); // Reset token
        setTimeout(() => setSent(false), 5000);
      } else {
        setError(true);
        setTimeout(() => setError(false), 3000);
      }
    } catch (error) {
      console.error("Transmission failed:", error);
    } finally {
      setSending(false);
    }
  };

  return (
    <section id="contact" className="py-24 md:py-32 px-6 relative border-t" style={{ background: "color-mix(in srgb, var(--theme-surface-container-lowest) 92%, transparent)", borderColor: "color-mix(in srgb, var(--theme-outline-variant) 20%, transparent)" }}>
      {/* Decorative Elements */}
      <div className="absolute left-0 top-0 w-full h-px" style={{ background: "linear-gradient(to right, transparent, color-mix(in srgb, var(--theme-outline-variant) 50%, transparent), transparent)" }}></div>
      
      <div className="max-w-4xl mx-auto relative z-10 text-center" ref={ref}>
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
        >
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-full mb-8 animate-pulse" style={{ background: "color-mix(in srgb, var(--theme-primary) 10%, transparent)", color: "var(--theme-primary)" }}>
            <Mail className="w-8 h-8" />
          </div>
          
          <h2 className="font-display font-bold text-4xl md:text-5xl tracking-tight uppercase mb-6" style={{ color: "var(--theme-on-background)" }}>
            {title}
          </h2>
          <p className="text-lg md:text-xl mb-12 max-w-2xl mx-auto font-light leading-relaxed" style={{ color: "var(--theme-on-surface-variant)" }}>
            {subtitle}
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          <form onSubmit={handleSubmit} className="glass-card p-8 md:p-12 rounded-3xl max-w-2xl mx-auto text-left">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
              {/* Name input */}
              <div className="space-y-2">
                <label className="text-sm font-bold uppercase tracking-wider" style={{ color: "var(--theme-on-surface)" }}>Designation</label>
                <input
                  type="text"
                  placeholder="John Doe"
                  value={form.name}
                  onChange={(e) => setForm({ ...form, name: e.target.value })}
                  required
                  className="w-full bg-transparent border-b px-0 py-3 text-lg transition-colors focus:outline-none"
                  style={{
                    borderColor: "var(--theme-outline)",
                    color: "var(--theme-on-surface)"
                  }}
                  onFocus={(e) => (e.target.style.borderColor = "var(--theme-primary)")}
                  onBlur={(e) => (e.target.style.borderColor = "var(--theme-outline)")}
                />
              </div>

              {/* Email input */}
              <div className="space-y-2">
                <label className="text-sm font-bold uppercase tracking-wider" style={{ color: "var(--theme-on-surface)" }}>Return Frequency (Email)</label>
                <input
                  type="email"
                  placeholder="john@example.com"
                  value={form.email}
                  onChange={(e) => setForm({ ...form, email: e.target.value })}
                  required
                  className="w-full bg-transparent border-b px-0 py-3 text-lg transition-colors focus:outline-none"
                  style={{
                    borderColor: "var(--theme-outline)",
                    color: "var(--theme-on-surface)"
                  }}
                  onFocus={(e) => (e.target.style.borderColor = "var(--theme-primary)")}
                  onBlur={(e) => (e.target.style.borderColor = "var(--theme-outline)")}
                />
              </div>
            </div>

            {/* Message textarea */}
            <div className="space-y-2 mb-10">
              <label className="text-sm font-bold uppercase tracking-wider" style={{ color: "var(--theme-on-surface)" }}>Transmission</label>
              <textarea
                placeholder="Message payload..."
                value={form.message}
                onChange={(e) => setForm({ ...form, message: e.target.value })}
                required
                rows={4}
                className="w-full bg-transparent border-b px-0 py-3 text-lg transition-colors focus:outline-none resize-y"
                style={{
                  borderColor: "var(--theme-outline)",
                  color: "var(--theme-on-surface)"
                }}
                onFocus={(e) => (e.target.style.borderColor = "var(--theme-primary)")}
                onBlur={(e) => (e.target.style.borderColor = "var(--theme-outline)")}
              />
            </div>

            {/* Turnstile Verification */}
            <div className="mb-10 flex justify-center">
              <Turnstile
                siteKey={process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY || ""}
                onSuccess={(token: string) => setTurnstileToken(token)}
                options={{ theme: "dark" }}
              />
            </div>

            {/* Submit button */}
            <button
              type="submit"
              disabled={sending || !turnstileToken}
              className="w-full font-bold py-4 rounded-full transition-all hover:scale-[1.02] active:scale-[0.98] uppercase tracking-widest text-sm"
              style={{ 
                opacity: (sending || !turnstileToken) ? 0.7 : 1,
                background: "var(--theme-primary)",
                color: "var(--theme-on-primary)",
                boxShadow: "0 0 20px color-mix(in srgb, var(--theme-primary) 30%, transparent)"
              }}
            >
              {sending ? (
                "TRANSMITTING..."
              ) : sent ? (
                "✓ PAYLOAD DELIVERED"
              ) : error ? (
                "Verification Failed"
              ) : (
                "SEND TRANSMISSION"
              )}
            </button>
          </form>
        </motion.div>
      </div>
    </section>
  );
}
