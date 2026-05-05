// Data fetching helpers - tries Supabase first, falls back to mock data
// This lets us develop the UI without a DB connection

import { supabase, isSupabaseConfigured } from "./supabase";
import { mockContent, mockProjects } from "./mock-data";
import { SiteContentMap, Project } from "./types";

// Fetch all site content and convert key-value rows into a single object
export async function getSiteContent(): Promise<SiteContentMap> {
  // If Supabase isn't set up yet, use mock data
  if (!isSupabaseConfigured()) {
    return mockContent;
  }

  try {
    const { data, error } = await supabase
      .from("site_content")
      .select("section_key, content_value");

    if (error || !data || data.length === 0) {
      console.warn("Supabase fetch failed, using mock data:", error?.message);
      return mockContent;
    }

    // Convert array of {section_key, content_value} into a flat object
    const contentMap: Record<string, string> = {};
    data.forEach((row) => {
      contentMap[row.section_key] = row.content_value;
    });

    // Merge with mock data so missing keys have defaults
    return { ...mockContent, ...contentMap } as SiteContentMap;
  } catch {
    return mockContent;
  }
}

// Fetch all projects ordered by sort_order
export async function getProjects(): Promise<Project[]> {
  if (!isSupabaseConfigured()) {
    return mockProjects;
  }

  try {
    const { data, error } = await supabase
      .from("projects")
      .select("*")
      .order("sort_order", { ascending: true });

    if (error || !data || data.length === 0) {
      console.warn("Projects fetch failed, using mock data:", error?.message);
      return mockProjects;
    }

    return data as Project[];
  } catch {
    return mockProjects;
  }
}

// Update a single site_content row (used by admin panel)
export async function updateSiteContent(
  key: string,
  value: string
): Promise<boolean> {
  const { error } = await supabase
    .from("site_content")
    .upsert({ section_key: key, content_value: value, updated_at: new Date().toISOString() });

  return !error;
}

// CRUD for projects (used by admin panel)
export async function createProject(project: Omit<Project, "id" | "created_at">): Promise<boolean> {
  const { error } = await supabase.from("projects").insert(project);
  return !error;
}

export async function updateProject(id: string, updates: Partial<Project>): Promise<boolean> {
  const { error } = await supabase.from("projects").update(updates).eq("id", id);
  return !error;
}

export async function deleteProject(id: string): Promise<boolean> {
  const { error } = await supabase.from("projects").delete().eq("id", id);
  return !error;
}
