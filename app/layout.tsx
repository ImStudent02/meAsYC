// Root Layout - wraps the entire app with ThemeProvider
// Sets up font, metadata, and the global CSS
import type { Metadata } from "next";
import "./globals.css";
import { ThemeProvider } from "@/components/ThemeProvider";

import { AnimatedBackground } from "@/components/AnimatedBackground";

export const metadata: Metadata = {
  title: "meAsYC | Cinematic Portfolio",
  description:
    "A cinematic, immersive portfolio showcasing creative development and design work. Built with Next.js, Tailwind CSS, and Framer Motion.",
  keywords: ["portfolio", "developer", "web design", "next.js", "react"],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body>
        {/* ThemeProvider enables dark/light/hell theme switching */}
        <ThemeProvider>
          <AnimatedBackground />
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
