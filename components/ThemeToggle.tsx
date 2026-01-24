'use client';

import { useTheme } from 'next-themes';
import { useState } from 'react';
import { useLanguage } from '@/lib/i18n/LanguageContext';

export function ThemeToggle() {
  const { theme, setTheme } = useTheme();
  const [mounted] = useState(() => typeof window !== 'undefined');
  const { t } = useLanguage();

  if (!mounted) {
    return (
      <button
        className="ui-glass-btn w-10 h-10 rounded-lg flex items-center justify-center"
        aria-label={t('nav.theme.light')}
      >
        <svg
          className="w-5 h-5"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          strokeWidth={2}
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z"
          />
        </svg>
      </button>
    );
  }

  const toggleTheme = () => {
    setTheme(theme === 'dark' ? 'light' : 'dark');
  };

  const getIcon = () => {
    // Show what theme will be AFTER clicking
    // Light theme -> show moon (will switch to dark)
    // Dark theme -> show sun (will switch to light)
    if (theme === 'light') {
      // Light theme - show moon icon (will switch to dark)
      return (
        <svg
          className="w-5 h-5"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          strokeWidth={2}
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z"
          />
        </svg>
      );
    } else {
      // Dark theme - show sun icon (will switch to light)
      return (
        <svg
          className="w-5 h-5"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          strokeWidth={2}
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z"
          />
        </svg>
      );
    }
  };

  const getTooltip = () => {
    return theme === 'light' ? t('nav.theme.dark') : t('nav.theme.light');
  };

  return (
    <button
      onClick={toggleTheme}
      className="ui-glass-btn w-10 h-10 rounded-lg flex items-center justify-center"
      aria-label={getTooltip()}
      title={getTooltip()}
    >
      {getIcon()}
    </button>
  );
}
