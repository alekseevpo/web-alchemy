'use client';

import { useEffect } from 'react';
import { useLanguage } from '@/lib/i18n/LanguageContext';

/**
 * Компонент для обновления HTML lang атрибута
 * в соответствии с выбранным языком
 */
export function LanguageSetter() {
  const { language } = useLanguage();

  useEffect(() => {
    if (typeof document !== 'undefined') {
      document.documentElement.lang = language;
    }
  }, [language]);

  return null;
}
