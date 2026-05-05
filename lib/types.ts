// TypeScript types for our database tables and app data

// Matches the "site_content" table - key/value store for page text
export interface SiteContent {
  section_key: string;
  content_value: string;
  updated_at?: string;
}

// Matches the "projects" table - portfolio project entries
export interface Project {
  id: string;
  title: string;
  description: string;
  image_url: string;
  project_url: string;
  tags: string;          // comma-separated tags like "React, Next.js"
  sort_order: number;
  created_at?: string;
}

// Shape of site content after we convert key-value pairs into an object
export interface SiteContentMap {
  hero_title: string;
  hero_subtitle: string;
  hero_description: string;
  about_title: string;
  about_text: string;
  about_skills: string;
  contact_email: string;
  contact_title: string;
  contact_subtitle: string;
  projects_title: string;
  projects_subtitle: string;
  games_title: string;
  games_subtitle: string;
  [key: string]: string;   // allow extra keys
}

// Game definition for the pluggable game section
export interface GameDef {
  id: string;
  title: string;
  description: string;
  icon: string;           // lucide icon name
  component: string;      // component identifier
}
