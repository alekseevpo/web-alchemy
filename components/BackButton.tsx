'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useLanguage } from '@/lib/i18n/LanguageContext';

export function BackButton() {
  const { t } = useLanguage();
  const pathname = usePathname();
  
  // Определяем, куда возвращаться: если это страница услуги, то на /services, иначе на главную
  const backHref = pathname.startsWith('/services/') ? '/services' : '/';

  return (
    <Link
      href={backHref}
      className="ui-glass-btn h-10 px-3 rounded-lg flex items-center justify-center text-sm font-medium"
      aria-label={t('nav.back')}
    >
      ← {t('nav.back')}
    </Link>
  );
}

