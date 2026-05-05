// Admin Content Editor - CRUD for all site text fields
// Each field maps to a row in the site_content table
"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Save, Check, AlertCircle, RefreshCw } from "lucide-react";
import { fetchSiteContent, updateSiteContent } from "@/lib/api-client";
import { SiteContentMap } from "@/lib/types";
import { mockContent } from "@/lib/mock-data";

// Define editable fields with labels and field types
const FIELDS: { key: string; label: string; type: "text" | "textarea" }[] = [
  { key: "hero_title", label: "Hero Title", type: "text" },
  { key: "hero_subtitle", label: "Hero Subtitle", type: "text" },
  { key: "hero_description", label: "Hero Description", type: "textarea" },
  { key: "about_title", label: "About Title", type: "text" },
  { key: "about_text", label: "About Text", type: "textarea" },
  { key: "about_skills", label: "Skills (comma-separated)", type: "text" },
  { key: "projects_title", label: "Projects Section Title", type: "text" },
  { key: "projects_subtitle", label: "Projects Section Subtitle", type: "text" },
  { key: "games_title", label: "Games Section Title", type: "text" },
  { key: "games_subtitle", label: "Games Section Subtitle", type: "text" },
  { key: "contact_title", label: "Contact Title", type: "text" },
  { key: "contact_subtitle", label: "Contact Subtitle", type: "text" },
  { key: "contact_email", label: "Contact Email", type: "text" },
  { key: "social_github", label: "GitHub URL", type: "text" },
  { key: "social_twitter", label: "Twitter URL", type: "text" },
  { key: "social_linkedin", label: "LinkedIn URL", type: "text" },
  { key: "about_card1_title", label: "About Card 1 Title", type: "text" },
  { key: "about_card1_text", label: "About Card 1 Text", type: "textarea" },
  { key: "about_card2_title", label: "About Card 2 Title", type: "text" },
  { key: "about_card2_text", label: "About Card 2 Text", type: "textarea" },
  { key: "edu_title", label: "Education Title", type: "text" },
  { key: "edu_text", label: "Education Details", type: "textarea" },
  { key: "exp_title", label: "Experience Title", type: "text" },
  { key: "exp_text", label: "Experience Details", type: "textarea" },
];

export default function ContentEditor() {
  const [content, setContent] = useState<SiteContentMap>(mockContent);
  const [saving, setSaving] = useState<string | null>(null);
  const [saved, setSaved] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  // Load current content from DB
  useEffect(() => {
    loadContent();
  }, []);

  const loadContent = async () => {
    const data = await fetchSiteContent();
    setContent(data);
  };

  // Save a single field
  const saveField = async (key: string) => {
    setSaving(key);
    const success = await updateSiteContent(key, content[key]);
    setSaving(null);

    if (success) {
      setSaved(key);
      setTimeout(() => setSaved(null), 2000);
    } else {
      setError(`Failed to save ${key}`);
      setTimeout(() => setError(null), 3000);
    }
  };

  // Input style
  const inputStyle: React.CSSProperties = {
    background: "var(--bg-glass)",
    border: "1px solid var(--border-glass)",
    color: "var(--text-primary)",
    borderRadius: "12px",
    padding: "12px 16px",
    width: "100%",
    fontSize: "14px",
    outline: "none",
    transition: "all 0.3s ease",
  };

  return (
    <div className="max-w-3xl mx-auto">
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-2xl font-bold gradient-text">Site Content</h1>
            <p className="text-sm mt-1" style={{ color: "var(--text-muted)" }}>
              Edit the text displayed on your portfolio
            </p>
          </div>
          <motion.button
            onClick={loadContent}
            className="p-2 rounded-xl cursor-pointer"
            style={{ background: "var(--bg-glass)", border: "1px solid var(--border-glass)", color: "var(--text-secondary)" }}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
          >
            <RefreshCw size={18} />
          </motion.button>
        </div>

        {/* Error message */}
        {error && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex items-center gap-2 p-3 rounded-xl mb-4 text-sm"
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

        {/* Editable fields */}
        <div className="space-y-4">
          {FIELDS.map((field, i) => (
            <motion.div
              key={field.key}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.05 }}
              className="glass-card p-5"
            >
              <label
                className="block text-sm font-semibold mb-2"
                style={{ color: "var(--text-primary)" }}
              >
                {field.label}
              </label>

              <div className="flex gap-3">
                <div className="flex-1">
                  {field.type === "textarea" ? (
                    <textarea
                      value={content[field.key] || ""}
                      onChange={(e) =>
                        setContent({ ...content, [field.key]: e.target.value })
                      }
                      rows={3}
                      style={{ ...inputStyle, resize: "vertical" }}
                      onFocus={(e) => (e.target.style.borderColor = "var(--accent-primary)")}
                      onBlur={(e) => (e.target.style.borderColor = "var(--border-glass)")}
                    />
                  ) : (
                    <input
                      type="text"
                      value={content[field.key] || ""}
                      onChange={(e) =>
                        setContent({ ...content, [field.key]: e.target.value })
                      }
                      style={inputStyle}
                      onFocus={(e) => (e.target.style.borderColor = "var(--accent-primary)")}
                      onBlur={(e) => (e.target.style.borderColor = "var(--border-glass)")}
                    />
                  )}
                </div>

                {/* Save button per field */}
                <motion.button
                  onClick={() => saveField(field.key)}
                  disabled={saving === field.key}
                  className="self-start px-4 py-3 rounded-xl text-sm font-medium cursor-pointer transition-all duration-200"
                  style={{
                    background:
                      saved === field.key
                        ? "rgba(50, 205, 50, 0.2)"
                        : "var(--accent-glow)",
                    color: saved === field.key ? "#32cd32" : "var(--accent-primary)",
                    border: "1px solid var(--border-glass)",
                  }}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  {saving === field.key ? (
                    "..."
                  ) : saved === field.key ? (
                    <Check size={16} />
                  ) : (
                    <Save size={16} />
                  )}
                </motion.button>
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </div>
  );
}
