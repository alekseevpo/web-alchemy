'use client';

import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { detectLanguage, detectLanguageSync, Language } from './detectLanguage';

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
  const [language, setLanguageState] = useState<Language>('ru');
  const [mounted] = useState(true);

  useEffect(() => {
    // Сначала определяем язык синхронно (без задержки)
    // Приоритет: сохраненный язык > язык браузера > по умолчанию
    const savedLang = typeof window !== 'undefined' 
      ? (localStorage.getItem('language') as Language | null)
      : null;
    
    const initialDetection = detectLanguageSync(savedLang);
    
    // Затем пытаемся улучшить определение через геолокацию (асинхронно)
    // Только если нет сохраненного языка И язык браузера не определен
    // Логика: язык браузера имеет приоритет над геолокацией
    // (если пользователь из Испании, но браузер на русском - выбираем русский)
    if (!savedLang && initialDetection.source === 'default') {
      detectLanguage(savedLang).then((result) => {
        // Используем результат геолокации только если язык браузера не был определен
        // И геолокация дала другой язык (не русский по умолчанию)
        if (result.language !== initialDetection.language) {
          setLanguageState(result.language);
        }
      }).catch(() => {
        // Игнорируем ошибки геолокации
      });
    } else {
      setLanguageState(initialDetection.language);
    }
  }, []);

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
