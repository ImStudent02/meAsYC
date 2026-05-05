// Main Page - assembles all cinematic sections
// Fetches content dynamically (from Supabase or falls back to mock data)
import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import About from "@/components/About";
import Resume from "@/components/Resume";
import Projects from "@/components/Projects";
import GameSection from "@/components/GameSection";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";
import { getSiteContent, getProjects } from "@/lib/data";

export default async function HomePage() {
  const [content, projects] = await Promise.all([
    getSiteContent(),
    getProjects(),
  ]);

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

      {/* About me section with skills and dynamic cards */}
      <About
        title={content.about_title}
        text={content.about_text}
        skills={content.about_skills}
        card1Title={content.about_card1_title}
        card1Text={content.about_card1_text}
        card2Title={content.about_card2_title}
        card2Text={content.about_card2_text}
      />

      {/* Resume section - Education and Experience */}
      <Resume
        eduTitle={content.edu_title}
        eduText={content.edu_text}
        expTitle={content.exp_title}
        expText={content.exp_text}
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
      <Footer 
        githubUrl={content.social_github}
        twitterUrl={content.social_twitter}
        linkedinUrl={content.social_linkedin}
      />
    </main>
  );
}
