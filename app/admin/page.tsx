// Admin Dashboard - Overview page with quick stats
// Links to content editor and projects manager
"use client";

import { motion } from "framer-motion";
import { FileText, FolderOpen, Palette, ExternalLink } from "lucide-react";
import Link from "next/link";

// Dashboard cards - quick links to admin sections
const cards = [
  {
    title: "Site Content",
    description: "Edit hero text, about section, and other site copy",
    icon: <FileText size={28} />,
    href: "/admin/content",
    count: "8 Fields",
  },
  {
    title: "Projects",
    description: "Manage your portfolio projects",
    icon: <FolderOpen size={28} />,
    href: "/admin/projects",
    count: "CRUD",
  },
  {
    title: "Live Site",
    description: "View your public portfolio",
    icon: <ExternalLink size={28} />,
    href: "/",
    count: "Preview",
  },
  {
    title: "Design System",
    description: "Theme automatically applied from frontend",
    icon: <Palette size={28} />,
    href: "#",
    count: "3 Themes",
  },
];

export default function AdminDashboard() {
  return (
    <div className="max-w-4xl mx-auto">
      {/* Welcome header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-8"
      >
        <h1 className="text-3xl font-bold mb-2 gradient-text">Welcome Back</h1>
        <p style={{ color: "var(--text-secondary)" }}>
          Manage your portfolio content from here. All changes go live instantly.
        </p>
      </motion.div>

      {/* Quick access cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {cards.map((card, i) => (
          <motion.div
            key={card.title}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1 }}
          >
            <Link href={card.href}>
              <div className="glass-card p-6 h-full cursor-pointer">
                <div className="flex items-start justify-between mb-4">
                  <div
                    className="p-3 rounded-xl"
                    style={{ background: "var(--accent-glow)", color: "var(--accent-primary)" }}
                  >
                    {card.icon}
                  </div>
                  <span
                    className="text-xs px-3 py-1 rounded-lg font-medium"
                    style={{
                      background: "var(--bg-glass)",
                      color: "var(--text-muted)",
                      border: "1px solid var(--border-glass)",
                    }}
                  >
                    {card.count}
                  </span>
                </div>
                <h3 className="text-lg font-bold mb-1" style={{ color: "var(--text-primary)" }}>
                  {card.title}
                </h3>
                <p className="text-sm" style={{ color: "var(--text-secondary)" }}>
                  {card.description}
                </p>
              </div>
            </Link>
          </motion.div>
        ))}
      </div>

      {/* Setup info */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5 }}
        className="glass-card p-6 mt-8"
      >
        <h3 className="font-bold mb-3" style={{ color: "var(--text-primary)" }}>
          ⚡ Quick Setup Guide
        </h3>
        <ul className="space-y-2 text-sm" style={{ color: "var(--text-secondary)" }}>
          <li>Data is now stored locally in <code>content/data.json</code></li>
          <li>Changes made here will be instantly reflected on the site</li>
          <li>Note: In serverless deployments (Vercel), changes may not persist across redeploys.</li>
        </ul>
      </motion.div>
    </div>
  );
}
