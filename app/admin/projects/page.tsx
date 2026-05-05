// Admin Projects Manager - Full CRUD for portfolio projects
// Create, edit, delete projects with a clean card-based UI
"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Plus,
  Edit3,
  Trash2,
  Save,
  X,
  AlertCircle,
  RefreshCw,
} from "lucide-react";
import { getProjects, createProject, updateProject, deleteProject } from "@/lib/data";
import { Project } from "@/lib/types";
import { isSupabaseConfigured } from "@/lib/supabase";

// Empty project template for the create form
const emptyProject: Omit<Project, "id" | "created_at"> = {
  title: "",
  description: "",
  image_url: "",
  project_url: "",
  tags: "",
  sort_order: 0,
};

export default function ProjectsManager() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [editing, setEditing] = useState<string | null>(null); // project id being edited
  const [creating, setCreating] = useState(false);
  const [form, setForm] = useState(emptyProject);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const configured = isSupabaseConfigured();

  // Load projects
  useEffect(() => {
    loadProjects();
  }, []);

  const loadProjects = async () => {
    const data = await getProjects();
    setProjects(data);
  };

  // Handle create
  const handleCreate = async () => {
    if (!form.title.trim()) return;
    if (!configured) {
      setError("Supabase not configured. Can't create projects in preview mode.");
      setTimeout(() => setError(null), 3000);
      return;
    }
    setSaving(true);
    const success = await createProject(form);
    setSaving(false);
    if (success) {
      setCreating(false);
      setForm(emptyProject);
      loadProjects();
    } else {
      setError("Failed to create project");
      setTimeout(() => setError(null), 3000);
    }
  };

  // Handle update
  const handleUpdate = async (id: string) => {
    if (!configured) {
      setError("Supabase not configured.");
      setTimeout(() => setError(null), 3000);
      return;
    }
    setSaving(true);
    const success = await updateProject(id, form);
    setSaving(false);
    if (success) {
      setEditing(null);
      setForm(emptyProject);
      loadProjects();
    } else {
      setError("Failed to update project");
      setTimeout(() => setError(null), 3000);
    }
  };

  // Handle delete
  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this project?")) return;
    if (!configured) {
      setError("Supabase not configured.");
      setTimeout(() => setError(null), 3000);
      return;
    }
    const success = await deleteProject(id);
    if (success) {
      loadProjects();
    } else {
      setError("Failed to delete project");
      setTimeout(() => setError(null), 3000);
    }
  };

  // Start editing a project
  const startEdit = (project: Project) => {
    setEditing(project.id);
    setCreating(false);
    setForm({
      title: project.title,
      description: project.description,
      image_url: project.image_url,
      project_url: project.project_url,
      tags: project.tags,
      sort_order: project.sort_order,
    });
  };

  // Cancel editing/creating
  const cancelForm = () => {
    setEditing(null);
    setCreating(false);
    setForm(emptyProject);
  };

  // Input style
  const inputStyle: React.CSSProperties = {
    background: "var(--bg-glass)",
    border: "1px solid var(--border-glass)",
    color: "var(--text-primary)",
    borderRadius: "12px",
    padding: "10px 14px",
    width: "100%",
    fontSize: "14px",
    outline: "none",
    transition: "all 0.3s ease",
  };

  // Project form (reused for create and edit)
  const ProjectForm = ({ onSubmit, submitLabel }: { onSubmit: () => void; submitLabel: string }) => (
    <motion.div
      initial={{ opacity: 0, height: 0 }}
      animate={{ opacity: 1, height: "auto" }}
      exit={{ opacity: 0, height: 0 }}
      className="glass-card p-6 mb-6"
    >
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
        <div>
          <label className="block text-xs font-semibold mb-1" style={{ color: "var(--text-muted)" }}>
            Title *
          </label>
          <input
            type="text"
            value={form.title}
            onChange={(e) => setForm({ ...form, title: e.target.value })}
            placeholder="Project Title"
            style={inputStyle}
          />
        </div>
        <div>
          <label className="block text-xs font-semibold mb-1" style={{ color: "var(--text-muted)" }}>
            Project URL
          </label>
          <input
            type="text"
            value={form.project_url}
            onChange={(e) => setForm({ ...form, project_url: e.target.value })}
            placeholder="https://github.com/..."
            style={inputStyle}
          />
        </div>
        <div>
          <label className="block text-xs font-semibold mb-1" style={{ color: "var(--text-muted)" }}>
            Image URL
          </label>
          <input
            type="text"
            value={form.image_url}
            onChange={(e) => setForm({ ...form, image_url: e.target.value })}
            placeholder="https://example.com/image.jpg"
            style={inputStyle}
          />
        </div>
        <div>
          <label className="block text-xs font-semibold mb-1" style={{ color: "var(--text-muted)" }}>
            Tags (comma-separated)
          </label>
          <input
            type="text"
            value={form.tags}
            onChange={(e) => setForm({ ...form, tags: e.target.value })}
            placeholder="React, TypeScript, Supabase"
            style={inputStyle}
          />
        </div>
        <div>
          <label className="block text-xs font-semibold mb-1" style={{ color: "var(--text-muted)" }}>
            Sort Order
          </label>
          <input
            type="number"
            value={form.sort_order}
            onChange={(e) => setForm({ ...form, sort_order: parseInt(e.target.value) || 0 })}
            style={inputStyle}
          />
        </div>
      </div>
      <div className="mb-4">
        <label className="block text-xs font-semibold mb-1" style={{ color: "var(--text-muted)" }}>
          Description
        </label>
        <textarea
          value={form.description}
          onChange={(e) => setForm({ ...form, description: e.target.value })}
          placeholder="Describe your project..."
          rows={3}
          style={{ ...inputStyle, resize: "vertical" }}
        />
      </div>

      {/* Form actions */}
      <div className="flex gap-3">
        <motion.button
          onClick={onSubmit}
          disabled={saving || !form.title.trim()}
          className="btn-accent flex items-center gap-2 text-sm"
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          style={{ opacity: saving ? 0.7 : 1 }}
        >
          <Save size={16} />
          {saving ? "Saving..." : submitLabel}
        </motion.button>
        <motion.button
          onClick={cancelForm}
          className="px-4 py-2 rounded-xl text-sm cursor-pointer"
          style={{
            background: "var(--bg-glass)",
            color: "var(--text-secondary)",
            border: "1px solid var(--border-glass)",
          }}
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
        >
          <X size={16} />
        </motion.button>
      </div>
    </motion.div>
  );

  return (
    <div className="max-w-4xl mx-auto">
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-2xl font-bold gradient-text">Projects</h1>
            <p className="text-sm mt-1" style={{ color: "var(--text-muted)" }}>
              Manage your portfolio projects
            </p>
          </div>
          <div className="flex gap-2">
            <motion.button
              onClick={loadProjects}
              className="p-2 rounded-xl cursor-pointer"
              style={{ background: "var(--bg-glass)", border: "1px solid var(--border-glass)", color: "var(--text-secondary)" }}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
            >
              <RefreshCw size={18} />
            </motion.button>
            {!creating && !editing && (
              <motion.button
                onClick={() => { setCreating(true); setForm(emptyProject); }}
                className="btn-accent flex items-center gap-2 text-sm"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <Plus size={16} />
                Add Project
              </motion.button>
            )}
          </div>
        </div>

        {/* Not configured warning */}
        {!configured && (
          <div
            className="flex items-center gap-2 p-4 rounded-xl mb-6 text-sm"
            style={{
              background: "rgba(255, 165, 0, 0.1)",
              border: "1px solid rgba(255, 165, 0, 0.3)",
              color: "#ffaa00",
            }}
          >
            <AlertCircle size={16} />
            Supabase not configured. Showing mock data. CRUD is disabled.
          </div>
        )}

        {/* Error */}
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

        {/* Create form */}
        <AnimatePresence>
          {creating && <ProjectForm onSubmit={handleCreate} submitLabel="Create Project" />}
        </AnimatePresence>

        {/* Projects list */}
        <div className="space-y-4">
          {projects.map((project, i) => (
            <motion.div
              key={project.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.05 }}
            >
              {/* If editing this project, show form */}
              {editing === project.id ? (
                <ProjectForm
                  onSubmit={() => handleUpdate(project.id)}
                  submitLabel="Update Project"
                />
              ) : (
                <div className="glass-card p-5 flex items-center gap-4">
                  {/* Sort order badge */}
                  <div
                    className="w-10 h-10 rounded-xl flex items-center justify-center text-sm font-bold shrink-0"
                    style={{
                      background: "var(--accent-glow)",
                      color: "var(--accent-primary)",
                    }}
                  >
                    {project.sort_order}
                  </div>

                  {/* Project info */}
                  <div className="flex-1 min-w-0">
                    <h3 className="font-bold truncate" style={{ color: "var(--text-primary)" }}>
                      {project.title}
                    </h3>
                    <p className="text-xs truncate" style={{ color: "var(--text-muted)" }}>
                      {project.description}
                    </p>
                    {project.tags && (
                      <div className="flex flex-wrap gap-1 mt-1">
                        {project.tags.split(",").map((tag) => (
                          <span
                            key={tag.trim()}
                            className="text-xs px-2 py-0.5 rounded-md"
                            style={{
                              background: "var(--bg-glass)",
                              color: "var(--text-muted)",
                            }}
                          >
                            {tag.trim()}
                          </span>
                        ))}
                      </div>
                    )}
                  </div>

                  {/* Action buttons */}
                  <div className="flex gap-2 shrink-0">
                    <motion.button
                      onClick={() => startEdit(project)}
                      className="p-2 rounded-xl cursor-pointer"
                      style={{
                        background: "var(--bg-glass)",
                        border: "1px solid var(--border-glass)",
                        color: "var(--accent-primary)",
                      }}
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                    >
                      <Edit3 size={16} />
                    </motion.button>
                    <motion.button
                      onClick={() => handleDelete(project.id)}
                      className="p-2 rounded-xl cursor-pointer"
                      style={{
                        background: "rgba(255, 50, 50, 0.1)",
                        border: "1px solid rgba(255, 50, 50, 0.2)",
                        color: "#ff5555",
                      }}
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                    >
                      <Trash2 size={16} />
                    </motion.button>
                  </div>
                </div>
              )}
            </motion.div>
          ))}
        </div>

        {/* Empty state */}
        {projects.length === 0 && (
          <div className="glass-card p-12 text-center">
            <p style={{ color: "var(--text-muted)" }}>No projects yet. Click &quot;Add Project&quot; to create one.</p>
          </div>
        )}
      </motion.div>
    </div>
  );
}
