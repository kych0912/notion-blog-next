'use client';

import { createContext, useContext, useEffect, useState } from 'react';

interface ThemeContextType {
  theme: 'light' | 'dark';
  handleSetTheme: () => void;
}

export const ThemeContext = createContext<ThemeContextType>({
  theme: 'light',
  handleSetTheme: () => {},
});

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
};

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [theme, setTheme] = useState<'light' | 'dark'>('light');

  useEffect(() => {
    const isDark = window.document.documentElement.classList.contains('dark');
    setTheme(isDark ? 'dark' : 'light');
  }, []);

  const handleSetTheme = () => {
    const isDark = window.document.documentElement.classList.toggle('dark');
    isDark
      ? window.document.documentElement.style.setProperty('color-scheme', 'dark')
      : window.document.documentElement.style.removeProperty('color-scheme');
    window.document.cookie = `next-blog-theme=${isDark ? 'dark' : 'light'}; SameSite=Lax; Path=/;`;
    setTheme(isDark ? 'dark' : 'light');
  };

  return (
    <ThemeContext.Provider value={{ theme, handleSetTheme }}>{children}</ThemeContext.Provider>
  );
}
