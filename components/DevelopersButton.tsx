'use client';

import Link from 'next/link';
import { useLanguage } from '@/lib/i18n/LanguageContext';

export function DevelopersButton() {
  const { t } = useLanguage();

  return (
    <Link
      href="/developers"
      className="ui-glass-btn h-10 px-3 rounded-lg flex items-center justify-center text-sm font-medium"
    >
      {t('nav.team')}
    </Link>
  );
}

