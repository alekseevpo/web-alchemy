import { Metadata } from 'next';
import { SupportPage } from '@/components/SupportPage';

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://web-alchemy-seven.vercel.app';

export const metadata: Metadata = {
  title: 'Поддержка - Свяжитесь с нами',
  description: 'Техническая поддержка и консультации по веб-разработке. Мы ответим на все ваши вопросы и поможем решить любые задачи.',
  openGraph: {
    title: 'Поддержка - Web-Alchemy',
    description: 'Техническая поддержка и консультации по веб-разработке',
    url: `${siteUrl}/support`,
  },
  alternates: {
    canonical: `${siteUrl}/support`,
  },
};

export default function Page() {
  return <SupportPage />;
}
