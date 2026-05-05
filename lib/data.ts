import fs from 'fs';
import path from 'path';
import { SiteContentMap, Project } from "./types";
import { mockContent, mockProjects } from "./mock-data";

// Fallback if fs fails
const getFallbackData = () => ({
  content: mockContent,
  projects: mockProjects
});

// Helper to safely read local JSON
function readLocalData() {
  try {
    const dataFilePath = path.join(process.cwd(), 'content', 'data.json');
    if (fs.existsSync(dataFilePath)) {
      const fileContents = fs.readFileSync(dataFilePath, 'utf8');
      return JSON.parse(fileContents);
    }
  } catch (error) {
    console.error("Error reading content/data.json:", error);
  }
  return getFallbackData();
}

// Fetch all site content (Server Side)
export async function getSiteContent(): Promise<SiteContentMap> {
  const data = readLocalData();
  return { ...mockContent, ...(data.content || {}) } as SiteContentMap;
}

// Fetch all projects (Server Side)
export async function getProjects(): Promise<Project[]> {
  const data = readLocalData();
  const projects = data.projects || mockProjects;
  return projects.sort((a: Project, b: Project) => a.sort_order - b.sort_order);
}


