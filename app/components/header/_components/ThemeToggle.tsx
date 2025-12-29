'use client';

import { Moon, Sun } from 'lucide-react';

import { useTheme } from '@/app/context/ThemeContext';

export default function DarkModeToggle() {
  const { handleSetTheme } = useTheme();
  const toggleTheme = () => {
    handleSetTheme();
  };

  return (
    <button onClick={toggleTheme} className="">
      <Sun size={24} className="hidden dark:block" />
      <Moon size={24} className="block dark:hidden" />
    </button>
  );
}
