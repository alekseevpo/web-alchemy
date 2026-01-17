import { Metadata } from 'next';
import { ServiceDetailPage } from '@/components/ServiceDetailPage';
import { translations } from '@/lib/i18n/translations';
import { getLanguageFromHeaders } from '@/lib/i18n/getLanguageFromHeaders';

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://web-alchemy-seven.vercel.app';

export async function generateMetadata(): Promise<Metadata> {
  const lang = await getLanguageFromHeaders();
  const t = translations[lang];

  return {
    title: t['services.onlineStore.title'] + ' - Web-Alchemy',
    description: t['services.onlineStore.desc'],
    alternates: {
      canonical: `${siteUrl}/services/online-store`,
    },
    openGraph: {
      title: t['services.onlineStore.title'] + ' - Web-Alchemy',
      description: t['services.onlineStore.desc'],
      url: `${siteUrl}/services/online-store`,
    },
  };
}

export default function Page() {
  return <ServiceDetailPage serviceKey="onlineStore" />;
}
