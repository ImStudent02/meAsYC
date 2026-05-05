// Main Page - assembles all cinematic sections
// Fetches content dynamically (from Supabase or falls back to mock data)
"use client";

import { useEffect, useState } from "react";
import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import About from "@/components/About";
import Projects from "@/components/Projects";
import GameSection from "@/components/GameSection";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";
import { getSiteContent, getProjects } from "@/lib/data";
import { SiteContentMap, Project } from "@/lib/types";
import { mockContent, mockProjects } from "@/lib/mock-data";

export default function HomePage() {
  // Dynamic content state - starts with mock data for instant render
  const [content, setContent] = useState<SiteContentMap>(mockContent);
  const [projects, setProjects] = useState<Project[]>(mockProjects);

  // Fetch real data from Supabase on mount (or keep mocks if not configured)
  useEffect(() => {
    async function loadData() {
      const [siteContent, projectData] = await Promise.all([
        getSiteContent(),
        getProjects(),
      ]);
      setContent(siteContent);
      setProjects(projectData);
    }
    loadData();
  }, []);

  return (
    <main>
      {/* Floating glass navbar with theme switcher */}
      <Navbar />

      {/* Full-screen cinematic hero */}
      <Hero
        title={content.hero_title}
        subtitle={content.hero_subtitle}
        description={content.hero_description}
      />

      {/* About me section with skills */}
      <About
        title={content.about_title}
        text={content.about_text}
        skills={content.about_skills}
      />

      {/* Projects bento grid */}
      <Projects
        title={content.projects_title}
        subtitle={content.projects_subtitle}
        projects={projects}
      />

      {/* Pluggable game section */}
      <GameSection
        title={content.games_title}
        subtitle={content.games_subtitle}
      />

      {/* Contact form */}
      <Contact
        title={content.contact_title}
        subtitle={content.contact_subtitle}
      />

      {/* Footer */}
      <Footer />
    </main>
  );
}
