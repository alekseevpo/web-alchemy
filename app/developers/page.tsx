import { Metadata } from 'next';
import { DevelopersPage } from '@/components/DevelopersPage';

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://web-alchemy-seven.vercel.app';

export const metadata: Metadata = {
  title: 'Наша команда - Web-Alchemy',
  description: 'МЫ команда, которая проектирует, разрабатывает и поддерживает продукты. Мы открытые и нам доверяют. Мы говорим на языке клиента и нас понимают.',
  openGraph: {
    title: 'Наша команда - Web-Alchemy',
    description: 'МЫ команда, которая проектирует, разрабатывает и поддерживает продукты',
    url: `${siteUrl}/developers`,
  },
  alternates: {
    canonical: `${siteUrl}/developers`,
  },
};

export default function Page() {
  return <DevelopersPage />;
}

