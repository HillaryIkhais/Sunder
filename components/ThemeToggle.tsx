'use client';

import { useTheme } from 'next-themes';
import { Moon, Sun } from 'lucide-react';
import { useEffect, useState } from 'react';

export function ThemeToggle() {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  // Avoid hydration mismatch by only rendering after mount
  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return <div className="w-8 h-8" />; // Placeholder
  }

  return (
    <button
      onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
      className="p-2 rounded-sm border border-border text-foreground hover:bg-foreground/5 transition-all flex items-center justify-center w-8 h-8 focus:outline-none"
      aria-label="Toggle Theme"
    >
      {theme === 'dark' ? (
        <Sun className="w-3 h-3" />
      ) : (
        <Moon className="w-3 h-3" />
      )}
    </button>
  );
}
