'use client';

import { useLanguage } from '@/lib/i18n/LanguageContext';

export function Footer() {
  const currentYear = new Date().getFullYear();
  const { t } = useLanguage();

  return (
    <footer className="border-t border-gray-200 dark:border-gray-800 mt-20 pt-8 pb-8">
      <div className="max-w-3xl mx-auto px-6 md:px-8 lg:pr-8">
        <p className="text-xs text-gray-500 dark:text-gray-500 leading-relaxed">
          {t('footer.copyright').replace('2024', String(currentYear))}
        </p>
      </div>
    </footer>
  );
}
