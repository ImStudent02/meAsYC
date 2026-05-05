import { SiteContentMap, Project } from "./types";
import { mockContent, mockProjects } from "./mock-data";

export async function fetchSiteContent(): Promise<SiteContentMap> {
  try {
    const res = await fetch('/api/data', { cache: 'no-store' });
    if (!res.ok) throw new Error('Failed to fetch data');
    const data = await res.json();
    return { ...mockContent, ...(data.content || {}) } as SiteContentMap;
  } catch (error) {
    console.error("Failed to fetch content:", error);
    return mockContent;
  }
}

export async function fetchProjects(): Promise<Project[]> {
  try {
    const res = await fetch('/api/data', { cache: 'no-store' });
    if (!res.ok) throw new Error('Failed to fetch projects');
    const data = await res.json();
    const projects = data.projects || mockProjects;
    return projects.sort((a: Project, b: Project) => a.sort_order - b.sort_order);
  } catch (error) {
    console.error("Failed to fetch projects:", error);
    return mockProjects;
  }
}

export async function updateSiteContent(key: string, value: string): Promise<boolean> {
  try {
    const response = await fetch('/api/data', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        type: 'content',
        payload: { [key]: value }
      })
    });
    return response.ok;
  } catch (error) {
    console.error("Failed to update site content:", error);
    return false;
  }
}

export async function createProject(project: Omit<Project, "id" | "created_at">): Promise<boolean> {
  try {
    const res = await fetch('/api/data', { cache: 'no-store' });
    const data = await res.json();
    const currentProjects = data.projects || [];
    
    const newProject: Project = {
      ...project,
      id: crypto.randomUUID(),
      created_at: new Date().toISOString()
    };
    currentProjects.push(newProject);
    
    const response = await fetch('/api/data', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ type: 'projects', payload: currentProjects })
    });
    return response.ok;
  } catch (error) {
    console.error("Failed to create project:", error);
    return false;
  }
}

export async function updateProject(id: string, updates: Partial<Project>): Promise<boolean> {
  try {
    const res = await fetch('/api/data', { cache: 'no-store' });
    const data = await res.json();
    let currentProjects = data.projects || [];
    
    currentProjects = currentProjects.map((p: Project) => 
      p.id === id ? { ...p, ...updates } : p
    );
    
    const response = await fetch('/api/data', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ type: 'projects', payload: currentProjects })
    });
    return response.ok;
  } catch (error) {
    console.error("Failed to update project:", error);
    return false;
  }
}

export async function deleteProject(id: string): Promise<boolean> {
  try {
    const res = await fetch('/api/data', { cache: 'no-store' });
    const data = await res.json();
    let currentProjects = data.projects || [];
    
    currentProjects = currentProjects.filter((p: Project) => p.id !== id);
    
    const response = await fetch('/api/data', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ type: 'projects', payload: currentProjects })
    });
    return response.ok;
  } catch (error) {
    console.error("Failed to delete project:", error);
    return false;
  }
}
