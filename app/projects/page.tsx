import { Metadata } from 'next';
import { ProjectsPage } from '@/components/ProjectsPage';

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://web-alchemy-seven.vercel.app';

export const metadata: Metadata = {
  title: 'Проекты - Портфолио наших работ',
  description: 'Примеры выполненных проектов: веб-приложения, сайты-визитки, landing-страницы и корпоративные решения. Посмотрите наши работы и оцените качество разработки.',
  openGraph: {
    title: 'Проекты - Web-Alchemy',
    description: 'Портфолио выполненных проектов: веб-приложения, сайты и корпоративные решения',
    url: `${siteUrl}/projects`,
  },
  alternates: {
    canonical: `${siteUrl}/projects`,
  },
};

export default function Page() {
  return <ProjectsPage />;
}
