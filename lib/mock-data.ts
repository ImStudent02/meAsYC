// Mock/fallback data - used when Supabase isn't configured yet
// This lets the site look awesome even before DB is connected

import { SiteContentMap, Project } from "./types";

export const mockContent: SiteContentMap = {
  hero_title: "Crafting Digital Worlds",
  hero_subtitle: "Full-Stack Developer & Creative Technologist",
  hero_description:
    "I build immersive web experiences that push the boundaries of what's possible on the modern web.",
  about_title: "About Me",
  about_text:
    "I'm a passionate developer who believes code is an art form. With expertise spanning front-end magic and back-end architecture, I craft digital experiences that are as beautiful as they are functional. Every pixel has purpose. Every animation tells a story.",
  about_skills: "React,Next.js,TypeScript,Node.js,Python,Supabase,Tailwind CSS,Framer Motion,Three.js,Docker",
  contact_email: "hello@measyc.dev",
  contact_title: "Let's Create Together",
  contact_subtitle: "Have a project in mind? Let's make something extraordinary.",
  projects_title: "Featured Projects",
  projects_subtitle: "A curated selection of my finest work",
  games_title: "Game Corner",
  games_subtitle: "Take a break and play something fun",
  social_github: "https://github.com",
  social_twitter: "https://twitter.com",
  social_linkedin: "https://linkedin.com",
  about_card1_title: "Frontend Systems",
  about_card1_text: "Crafting buttery-smooth, interactive UI ecosystems.",
  about_card2_title: "Backend Architecture",
  about_card2_text: "Designing robust, secure, and scalable databases.",
  edu_title: "Education",
  edu_text: "B.Tech in Computer Science\nUniversity of Tech | 2020 - 2024\nFocus on Software Engineering & AI",
  exp_title: "Experience",
  exp_text: "Senior Software Engineer\nTech Solutions Inc | 2024 - Present\nLeading frontend architecture and cloud infrastructure.\n\nSoftware Developer Intern\nInnovate Labs | 2023 - 2024\nDeveloped real-time collaboration features using WebSockets.",
};

export const mockProjects: Project[] = [
  {
    id: "1",
    title: "Nebula Dashboard",
    description: "A real-time analytics dashboard with stunning data visualizations and dark mode aesthetics.",
    image_url: "",
    project_url: "https://github.com",
    tags: "React,D3.js,WebSocket",
    sort_order: 0,
    created_at: new Date().toISOString(),
  },
  {
    id: "2",
    title: "CryptoVault",
    description: "Secure cryptocurrency portfolio tracker with end-to-end encryption and live price feeds.",
    image_url: "",
    project_url: "https://github.com",
    tags: "Next.js,Supabase,Tailwind",
    sort_order: 1,
    created_at: new Date().toISOString(),
  },
  {
    id: "3",
    title: "SynthWave Player",
    description: "A retro-futuristic music player with WebAudio API visualizations and playlist management.",
    image_url: "",
    project_url: "https://github.com",
    tags: "TypeScript,WebAudio,Canvas",
    sort_order: 2,
    created_at: new Date().toISOString(),
  },
  {
    id: "4",
    title: "AI Art Studio",
    description: "Generate and curate AI art with custom style transfer and gallery management.",
    image_url: "",
    project_url: "https://github.com",
    tags: "Python,TensorFlow,React",
    sort_order: 3,
    created_at: new Date().toISOString(),
  },
];
