import { Metadata } from 'next';
import { ServiceDetailPage } from '@/components/ServiceDetailPage';
import { translations } from '@/lib/i18n/translations';
import { getLanguageStatic } from '@/lib/i18n/getLanguageFromHeaders';

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://web-alchemy-seven.vercel.app';

export async function generateMetadata(): Promise<Metadata> {
  const lang = await getLanguageStatic();
  const t = translations[lang];

  return {
    title: t['services.webapp.title'] + ' - Web-Alchemy',
    description: t['services.webapp.desc'],
    alternates: {
      canonical: `${siteUrl}/services/webapp`,
    },
    openGraph: {
      title: t['services.webapp.title'] + ' - Web-Alchemy',
      description: t['services.webapp.desc'],
      url: `${siteUrl}/services/webapp`,
    },
  };
}

export default function Page() {
  return <ServiceDetailPage serviceKey="webapp" />;
}
