import { Metadata } from 'next';
import { TermsPage } from '@/components/TermsPage';

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://web-alchemy-seven.vercel.app';

export const metadata: Metadata = {
  title: 'Условия использования - Web-Alchemy',
  description: 'Условия использования сайта Web-Alchemy. Правила и условия, которые применяются при использовании нашего сайта и услуг.',
  robots: {
    index: true,
    follow: true,
  },
  alternates: {
    canonical: `${siteUrl}/terms`,
  },
};

export default function Page() {
  return <TermsPage />;
}
