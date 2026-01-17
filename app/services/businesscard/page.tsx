import { Metadata } from 'next';
import { ServiceDetailPage } from '@/components/ServiceDetailPage';
import { translations } from '@/lib/i18n/translations';
import { getLanguageFromHeaders } from '@/lib/i18n/detectLanguage';

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://web-alchemy-seven.vercel.app';

export async function generateMetadata(): Promise<Metadata> {
  const lang = getLanguageFromHeaders();
  const t = translations[lang];

  return {
    title: t('services.businesscard.title') + ' - Web-Alchemy',
    description: t('services.businesscard.desc'),
    alternates: {
      canonical: `${siteUrl}/services/businesscard`,
    },
    openGraph: {
      title: t('services.businesscard.title') + ' - Web-Alchemy',
      description: t('services.businesscard.desc'),
      url: `${siteUrl}/services/businesscard`,
    },
  };
}

export default function Page() {
  return <ServiceDetailPage serviceKey="businesscard" />;
}
