-- ============================================================
-- Supabase Schema for meAsYC Portfolio
-- Run this in Supabase SQL Editor (supabase.com dashboard)
-- ============================================================

-- Enable RLS on all tables
ALTER DEFAULT PRIVILEGES IN SCHEMA public GRANT ALL ON TABLES TO postgres, anon, authenticated, service_role;

-- ============================================================
-- 1. SITE CONTENT TABLE - Key-value store for page text
-- ============================================================
CREATE TABLE IF NOT EXISTS site_content (
  section_key TEXT PRIMARY KEY,
  content_value TEXT NOT NULL,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now())
);

-- Enable Row Level Security
ALTER TABLE site_content ENABLE ROW LEVEL SECURITY;

-- Public can read (visitors see the content)
CREATE POLICY "Public read site_content" ON site_content
  FOR SELECT USING (true);

-- Only authenticated users can modify (admin panel)
CREATE POLICY "Auth manage site_content" ON site_content
  FOR ALL USING (auth.role() = 'authenticated');

-- Seed initial content
INSERT INTO site_content (section_key, content_value) VALUES
  ('hero_title', 'Crafting Digital Worlds'),
  ('hero_subtitle', 'Full-Stack Developer & Creative Technologist'),
  ('hero_description', 'I build immersive web experiences that push the boundaries of what''s possible on the modern web.'),
  ('about_title', 'About Me'),
  ('about_text', 'I''m a passionate developer who believes code is an art form. With expertise spanning front-end magic and back-end architecture, I craft digital experiences that are as beautiful as they are functional.'),
  ('about_skills', 'React,Next.js,TypeScript,Node.js,Python,Supabase,Tailwind CSS,Framer Motion'),
  ('projects_title', 'Featured Projects'),
  ('projects_subtitle', 'A curated selection of my finest work'),
  ('games_title', 'Game Corner'),
  ('games_subtitle', 'Take a break and play something fun'),
  ('contact_title', 'Let''s Create Together'),
  ('contact_subtitle', 'Have a project in mind? Let''s make something extraordinary.'),
  ('contact_email', 'hello@measyc.dev')
ON CONFLICT (section_key) DO NOTHING;

-- ============================================================
-- 2. PROJECTS TABLE - Portfolio project entries
-- ============================================================
CREATE TABLE IF NOT EXISTS projects (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  title TEXT NOT NULL,
  description TEXT DEFAULT '',
  image_url TEXT DEFAULT '',
  project_url TEXT DEFAULT '',
  tags TEXT DEFAULT '',
  sort_order INTEGER DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now())
);

-- Enable Row Level Security
ALTER TABLE projects ENABLE ROW LEVEL SECURITY;

-- Public can read (visitors see projects)
CREATE POLICY "Public read projects" ON projects
  FOR SELECT USING (true);

-- Only authenticated users can modify (admin panel)
CREATE POLICY "Auth manage projects" ON projects
  FOR ALL USING (auth.role() = 'authenticated');

-- Seed sample projects
INSERT INTO projects (title, description, tags, project_url, sort_order) VALUES
  ('Nebula Dashboard', 'A real-time analytics dashboard with stunning data visualizations.', 'React,D3.js,WebSocket', 'https://github.com', 0),
  ('CryptoVault', 'Secure cryptocurrency portfolio tracker with live price feeds.', 'Next.js,Supabase,Tailwind', 'https://github.com', 1),
  ('SynthWave Player', 'A retro-futuristic music player with WebAudio API visualizations.', 'TypeScript,WebAudio,Canvas', 'https://github.com', 2),
  ('AI Art Studio', 'Generate and curate AI art with custom style transfer.', 'Python,TensorFlow,React', 'https://github.com', 3)
ON CONFLICT DO NOTHING;

-- ============================================================
-- 3. OPTIONAL: Contact messages table
-- (for storing form submissions)
-- ============================================================
CREATE TABLE IF NOT EXISTS contact_messages (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  email TEXT NOT NULL,
  message TEXT NOT NULL,
  read BOOLEAN DEFAULT false,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now())
);

ALTER TABLE contact_messages ENABLE ROW LEVEL SECURITY;

-- Anyone can insert (visitors submit contact forms)
CREATE POLICY "Public insert contact" ON contact_messages
  FOR INSERT WITH CHECK (true);

-- Only authenticated users can read/manage
CREATE POLICY "Auth manage contact" ON contact_messages
  FOR ALL USING (auth.role() = 'authenticated');
