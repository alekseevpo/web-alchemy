'use client';

import Link from 'next/link';
import { useLanguage } from '@/lib/i18n/LanguageContext';

export function BackButton() {
  const { t } = useLanguage();

  return (
    <Link
      href="/"
      className="ui-glass-btn h-10 px-3 rounded-lg flex items-center justify-center text-sm font-medium"
      aria-label={t('nav.back')}
    >
      ← {t('nav.back')}
    </Link>
  );
}

