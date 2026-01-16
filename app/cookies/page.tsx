import { Metadata } from 'next';
import { CookiesPage } from '@/components/CookiesPage';

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://web-alchemy-seven.vercel.app';

export const metadata: Metadata = {
  title: 'Политика cookies - Web-Alchemy',
  description: 'Политика использования cookies на сайте Web-Alchemy. Информация о том, какие cookies мы используем и как ими управлять.',
  robots: {
    index: true,
    follow: true,
  },
  alternates: {
    canonical: `${siteUrl}/cookies`,
  },
};

export default function Page() {
  return <CookiesPage />;
}
