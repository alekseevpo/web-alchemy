'use client';

import React, { createContext, useContext, useState, ReactNode } from 'react';
import { detectLanguageSync, Language } from './detectLanguage';

export type { Language };

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string) => string;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
}

interface LanguageProviderProps {
  children: ReactNode;
  translations: Record<Language, Record<string, string>>;
}

export function LanguageProvider({ children, translations }: LanguageProviderProps) {
  const [language, setLanguageState] = useState<Language>(() => {
    const savedLang = typeof window !== 'undefined'
      ? (localStorage.getItem('language') as Language | null)
      : null;
    return detectLanguageSync(savedLang).language;
  });
  const [mounted] = useState(() => typeof window !== 'undefined');

  const setLanguage = (lang: Language) => {
    setLanguageState(lang);
    localStorage.setItem('language', lang);
  };

  const t = (key: string): string => {
    return translations[language]?.[key] || translations['ru']?.[key] || key;
  };

  // Предотвращаем мерцание при гидратации
  if (!mounted) {
    return (
      <LanguageContext.Provider value={{ language: 'ru', setLanguage, t: (key) => translations['ru']?.[key] || key }}>
        {children}
      </LanguageContext.Provider>
    );
  }

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
}
