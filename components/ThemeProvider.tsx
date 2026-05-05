// Theme provider component - wraps the app to enable theme switching
// Supports three themes: dark (default), light (heaven), hell (fire)
"use client";

import { createContext, useContext, useEffect, useState, ReactNode } from "react";

// Available themes
export type Theme = "dark" | "light" | "red";

interface ThemeContextType {
  theme: Theme;
  setTheme: (theme: Theme) => void;
}

const ThemeContext = createContext<ThemeContextType>({
  theme: "dark",
  setTheme: () => {},
});

// Hook to access current theme from any component
export const useTheme = () => useContext(ThemeContext);

export function ThemeProvider({ children }: { children: ReactNode }) {
  // Start with dark, then load saved preference
  const [theme, setThemeState] = useState<Theme>("dark");
  const [mounted, setMounted] = useState(false);

  // On mount: load theme from localStorage
  useEffect(() => {
    const saved = localStorage.getItem("portfolio-theme") as Theme;
    if (saved && ["dark", "light", "red"].includes(saved)) {
      setThemeState(saved);
    }
    setMounted(true);
  }, []);

  // When theme changes: save to localStorage & apply to DOM
  useEffect(() => {
    if (mounted) {
      localStorage.setItem("portfolio-theme", theme);
      document.documentElement.setAttribute("data-theme", theme);
    }
  }, [theme, mounted]);

  const setTheme = (newTheme: Theme) => {
    setThemeState(newTheme);
  };

  // Prevent flash of wrong theme on initial render
  if (!mounted) {
    return (
      <div style={{ visibility: "hidden" }}>
        {children}
      </div>
    );
  }

  return (
    <ThemeContext.Provider value={{ theme, setTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}
