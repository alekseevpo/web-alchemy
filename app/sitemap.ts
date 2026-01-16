import { MetadataRoute } from 'next';

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://web-alchemy-seven.vercel.app';

export default function sitemap(): MetadataRoute.Sitemap {
  const routes = [
    '',
    '/projects',
    '/services',
    '/support',
    '/feedback',
    '/faq',
    '/developers',
    '/privacy',
    '/terms',
    '/cookies',
  ];

  return routes.map((route) => ({
    url: `${siteUrl}${route}`,
    lastModified: new Date(),
    changeFrequency: route === '' ? 'weekly' : 'monthly',
    priority: route === '' ? 1 : 0.8,
  }));
}
