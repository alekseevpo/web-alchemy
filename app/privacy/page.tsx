import { Metadata } from 'next';
import { PrivacyPage } from '@/components/PrivacyPage';

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://web-alchemy-seven.vercel.app';

export const metadata: Metadata = {
  title: 'Политика конфиденциальности - Web-Alchemy',
  description: 'Политика конфиденциальности Web-Alchemy. Информация о том, как мы собираем, используем и защищаем ваши персональные данные.',
  robots: {
    index: true,
    follow: true,
  },
  alternates: {
    canonical: `${siteUrl}/privacy`,
  },
};

export default function Page() {
  return <PrivacyPage />;
}
