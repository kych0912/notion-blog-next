'use client';

import { Moon, Sun } from 'lucide-react';

import { useTheme } from '@/app/context/ThemeContext';

export default function DarkModeToggle() {
  const { theme, handleSetTheme } = useTheme();
  const toggleTheme = () => {
    handleSetTheme();
  };

  return (
    <button
      type="button"
      onClick={toggleTheme}
      className="theme-toggle"
      aria-label={theme === 'dark' ? '라이트 모드로 전환' : '다크 모드로 전환'}
      aria-pressed={theme === 'dark'}
    >
      {theme === 'dark' ? (
        <Sun size={20} aria-hidden="true" />
      ) : (
        <Moon size={20} aria-hidden="true" />
      )}
    </button>
  );
}
