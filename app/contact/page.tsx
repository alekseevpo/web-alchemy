import { Metadata } from 'next';
import { ContactPage } from '@/components/ContactPage';
import { translations } from '@/lib/i18n/translations';
import { getLanguageFromHeaders } from '@/lib/i18n/detectLanguage';

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://web-alchemy-seven.vercel.app';

export async function generateMetadata(): Promise<Metadata> {
  const lang = getLanguageFromHeaders();
  const t = translations[lang];

  return {
    title: t('contact.title') + ' - Web-Alchemy',
    description: t('contact.subtitle'),
    alternates: {
      canonical: `${siteUrl}/contact`,
    },
    openGraph: {
      title: t('contact.title') + ' - Web-Alchemy',
      description: t('contact.subtitle'),
      url: `${siteUrl}/contact`,
    },
  };
}

export default function Page() {
  return <ContactPage />;
}
