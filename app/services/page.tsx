import { Metadata } from 'next';
import { ServicesPage } from '@/components/ServicesPage';

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://web-alchemy-seven.vercel.app';

export const metadata: Metadata = {
  title: 'Услуги - Разработка веб-приложений и сайтов',
  description: 'Сайты-визитки, landing-страницы для мероприятий, корпоративные проекты В2B и B2C. Для бизнеса и для клиентов. Быстро, качественно с применением современных технологий.',
  openGraph: {
    title: 'Услуги - Web-Alchemy',
    description: 'Сайты-визитки, landing-страницы для мероприятий, корпоративные проекты В2B и B2C',
    url: `${siteUrl}/services`,
  },
  alternates: {
    canonical: `${siteUrl}/services`,
  },
};

export default function Page() {
  return <ServicesPage />;
}
