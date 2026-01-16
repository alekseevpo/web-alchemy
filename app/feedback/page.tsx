import { Metadata } from 'next';
import { FeedbackPage } from '@/components/FeedbackPage';

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://web-alchemy-seven.vercel.app';

export const metadata: Metadata = {
  title: 'Обратная связь и отзывы - Web-Alchemy',
  description: 'Поделитесь своим мнением о нашей работе. Ваши отзывы помогают нам становиться лучше и улучшать качество услуг.',
  openGraph: {
    title: 'Обратная связь и отзывы - Web-Alchemy',
    description: 'Поделитесь своим мнением о нашей работе',
    url: `${siteUrl}/feedback`,
  },
  alternates: {
    canonical: `${siteUrl}/feedback`,
  },
};

export default function Page() {
  return <FeedbackPage />;
}
