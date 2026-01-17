import { Metadata } from 'next';
import { ServiceDetailPage } from '@/components/ServiceDetailPage';
import { translations } from '@/lib/i18n/translations';
import { getLanguageFromHeaders } from '@/lib/i18n/detectLanguage';

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://web-alchemy-seven.vercel.app';

export async function generateMetadata(): Promise<Metadata> {
  const lang = getLanguageFromHeaders();
  const t = translations[lang];

  return {
    title: t('services.bot.title') + ' - Web-Alchemy',
    description: t('services.bot.desc'),
    alternates: {
      canonical: `${siteUrl}/services/bot`,
    },
    openGraph: {
      title: t('services.bot.title') + ' - Web-Alchemy',
      description: t('services.bot.desc'),
      url: `${siteUrl}/services/bot`,
    },
  };
}

export default function Page() {
  return <ServiceDetailPage serviceKey="bot" />;
}
