import { Metadata } from 'next';
import { FAQPage } from '@/components/FAQPage';

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://web-alchemy-seven.vercel.app';

export const metadata: Metadata = {
  title: 'FAQ - Часто задаваемые вопросы',
  description: 'Ответы на часто задаваемые вопросы о веб-разработке, наших услугах, ценах и процессе работы над проектами.',
  openGraph: {
    title: 'FAQ - Web-Alchemy',
    description: 'Ответы на часто задаваемые вопросы о веб-разработке и наших услугах',
    url: `${siteUrl}/faq`,
  },
  alternates: {
    canonical: `${siteUrl}/faq`,
  },
};

export default function Page() {
  return <FAQPage />;
}
