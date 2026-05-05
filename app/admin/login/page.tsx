// Admin Login Page - Glassmorphism login form
// Authenticates with Supabase Auth (email/password)
"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { supabase, isSupabaseConfigured } from "@/lib/supabase";
import { Lock, Mail, AlertCircle } from "lucide-react";
import { useRouter } from "next/navigation";

export default function AdminLogin() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    // Check if Supabase is configured
    if (!isSupabaseConfigured()) {
      setError("Supabase is not configured. Add your keys to .env.local");
      setLoading(false);
      return;
    }

    try {
      const { error: authError } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (authError) {
        setError(authError.message);
      } else {
        // Successful login - redirect to dashboard
        router.push("/admin");
        router.refresh();
      }
    } catch {
      setError("Something went wrong. Please try again.");
    }

    setLoading(false);
  };

  // Input style matching the cinematic theme
  const inputStyle: React.CSSProperties = {
    background: "var(--bg-glass)",
    border: "1px solid var(--border-glass)",
    color: "var(--text-primary)",
    borderRadius: "12px",
    padding: "14px 16px 14px 44px",
    width: "100%",
    fontSize: "14px",
    outline: "none",
    transition: "all 0.3s ease",
  };

  return (
    <div
      className="min-h-screen flex items-center justify-center px-4"
      style={{ background: "var(--bg-primary)" }}
    >
      <motion.div
        initial={{ opacity: 0, y: 30, scale: 0.95 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.6 }}
        className="w-full max-w-md"
      >
        {/* Header */}
        <div className="text-center mb-8">
          <motion.div
            className="inline-block p-4 rounded-2xl mb-4"
            style={{ background: "var(--accent-glow)" }}
            animate={{ boxShadow: ["0 0 20px var(--accent-glow)", "0 0 40px var(--accent-glow)", "0 0 20px var(--accent-glow)"] }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            <Lock size={32} style={{ color: "var(--accent-primary)" }} />
          </motion.div>
          <h1 className="text-3xl font-bold gradient-text mb-2">Admin Portal</h1>
          <p style={{ color: "var(--text-muted)" }} className="text-sm">
            Sign in to manage your portfolio content
          </p>
        </div>

        {/* Login form */}
        <form onSubmit={handleLogin} className="glass-card p-8 space-y-5">
          {/* Error message */}
          {error && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              className="flex items-center gap-2 p-3 rounded-xl text-sm"
              style={{
                background: "rgba(255, 50, 50, 0.1)",
                border: "1px solid rgba(255, 50, 50, 0.3)",
                color: "#ff5555",
              }}
            >
              <AlertCircle size={16} />
              {error}
            </motion.div>
          )}

          {/* Email */}
          <div className="relative">
            <Mail
              size={18}
              className="absolute left-4 top-1/2 -translate-y-1/2"
              style={{ color: "var(--text-muted)" }}
            />
            <input
              type="email"
              placeholder="admin@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              style={inputStyle}
              onFocus={(e) => (e.target.style.borderColor = "var(--accent-primary)")}
              onBlur={(e) => (e.target.style.borderColor = "var(--border-glass)")}
            />
          </div>

          {/* Password */}
          <div className="relative">
            <Lock
              size={18}
              className="absolute left-4 top-1/2 -translate-y-1/2"
              style={{ color: "var(--text-muted)" }}
            />
            <input
              type="password"
              placeholder="••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              style={inputStyle}
              onFocus={(e) => (e.target.style.borderColor = "var(--accent-primary)")}
              onBlur={(e) => (e.target.style.borderColor = "var(--border-glass)")}
            />
          </div>

          {/* Submit */}
          <motion.button
            type="submit"
            disabled={loading}
            className="btn-accent w-full text-base"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            style={{ opacity: loading ? 0.7 : 1 }}
          >
            {loading ? "Signing in..." : "Sign In"}
          </motion.button>
        </form>

        {/* Back to site link */}
        <div className="text-center mt-6">
          <a
            href="/"
            className="text-sm transition-colors duration-300"
            style={{ color: "var(--text-muted)" }}
          >
            ← Back to Portfolio
          </a>
        </div>
      </motion.div>
    </div>
  );
}
