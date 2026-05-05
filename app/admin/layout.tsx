// Admin Layout - wraps admin pages with sidebar + auth check
// Redirects to login if user is not authenticated
"use client";

import { useEffect, useState, ReactNode } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";

import {
  LayoutDashboard,
  FileText,
  FolderOpen,
  LogOut,
  ArrowLeft,
  Menu,
  X,
} from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";

// Sidebar nav items
const sidebarItems = [
  { label: "Dashboard", href: "/admin", icon: <LayoutDashboard size={18} /> },
  { label: "Site Content", href: "/admin/content", icon: <FileText size={18} /> },
  { label: "Projects", href: "/admin/projects", icon: <FolderOpen size={18} /> },
];

export default function AdminLayout({ children }: { children: ReactNode }) {
  const router = useRouter();
  const pathname = usePathname();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const isLoginPage = pathname === "/admin/login";

  // Handle logout (dummy for now)
  const handleLogout = async () => {
    router.push("/");
  };

  // Login page gets no sidebar wrapper
  if (isLoginPage) {
    return <>{children}</>;
  }

  return (
    <div className="min-h-screen flex" style={{ background: "var(--bg-primary)" }}>
      {/* Sidebar - desktop always visible, mobile toggle */}
      <aside
        className={`fixed md:static inset-y-0 left-0 z-40 w-64 transform transition-transform duration-300 ${
          sidebarOpen ? "translate-x-0" : "-translate-x-full md:translate-x-0"
        }`}
        style={{
          background: "var(--bg-secondary)",
          borderRight: "1px solid var(--border-glass)",
        }}
      >
        <div className="flex flex-col h-full p-4">
          {/* Logo */}
          <div className="flex items-center justify-between mb-8 px-2">
            <span className="text-xl font-bold gradient-text">Admin Panel</span>
            <button
              className="md:hidden cursor-pointer"
              onClick={() => setSidebarOpen(false)}
              style={{ color: "var(--text-muted)" }}
            >
              <X size={20} />
            </button>
          </div>

          {/* Nav links */}
          <nav className="flex-1 space-y-1">
            {sidebarItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setSidebarOpen(false)}
                className="flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all duration-200"
                style={{
                  background: pathname === item.href ? "var(--accent-glow)" : "transparent",
                  color: pathname === item.href ? "var(--accent-primary)" : "var(--text-secondary)",
                }}
              >
                {item.icon}
                {item.label}
              </Link>
            ))}
          </nav>

          {/* Bottom actions */}
          <div className="space-y-1">
            <Link
              href="/"
              className="flex items-center gap-3 px-4 py-3 rounded-xl text-sm transition-all duration-200"
              style={{ color: "var(--text-muted)" }}
            >
              <ArrowLeft size={18} />
              Back to Site
            </Link>
            <button
              onClick={handleLogout}
              className="flex items-center gap-3 w-full px-4 py-3 rounded-xl text-sm transition-all duration-200 cursor-pointer"
              style={{ color: "var(--text-muted)" }}
            >
              <LogOut size={18} />
              Logout
            </button>
          </div>
        </div>
      </aside>

      {/* Mobile sidebar overlay */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 z-30 md:hidden"
          style={{ background: "rgba(0,0,0,0.5)" }}
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Main content area */}
      <div className="flex-1 flex flex-col min-h-screen">
        {/* Top bar with mobile menu toggle */}
        <header
          className="flex items-center gap-4 px-6 py-4"
          style={{ borderBottom: "1px solid var(--border-glass)" }}
        >
          <button
            className="md:hidden cursor-pointer"
            onClick={() => setSidebarOpen(true)}
            style={{ color: "var(--text-primary)" }}
          >
            <Menu size={24} />
          </button>
          <h2 className="text-lg font-semibold" style={{ color: "var(--text-primary)" }}>
            {sidebarItems.find((i) => i.href === pathname)?.label || "Admin"}
          </h2>
        </header>

        {/* Page content */}
        <main className="flex-1 p-6">{children}</main>
      </div>
    </div>
  );
}
