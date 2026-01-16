'use client';

import { useEffect } from 'react';

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://web-alchemy-seven.vercel.app';

export function StructuredData() {
  useEffect(() => {
    // Organization Schema
    const organizationSchema = {
      '@context': 'https://schema.org',
      '@type': 'Organization',
      name: 'Web-Alchemy',
      url: siteUrl,
      logo: `${siteUrl}/logo.png`, // Нужно будет добавить логотип
      description: 'Разработка веб-приложений и сайтов любой сложности под ключ. Быстро, качественно с применением современных технологий.',
      contactPoint: {
        '@type': 'ContactPoint',
        telephone: '+34624682795',
        contactType: 'Customer Service',
        email: 'alekseevpo@gmail.com',
        availableLanguage: ['Russian', 'English', 'Spanish'],
      },
      sameAs: [
        'https://wa.me/34624682795',
        'https://t.me/ppmtrue',
      ],
    };

    // WebSite Schema
    const websiteSchema = {
      '@context': 'https://schema.org',
      '@type': 'WebSite',
      name: 'Web-Alchemy',
      url: siteUrl,
      description: 'Разработка веб-приложений и сайтов любой сложности под ключ',
      potentialAction: {
        '@type': 'SearchAction',
        target: {
          '@type': 'EntryPoint',
          urlTemplate: `${siteUrl}/?q={search_term_string}`,
        },
        'query-input': 'required name=search_term_string',
      },
    };

    // Service Schema
    const serviceSchema = {
      '@context': 'https://schema.org',
      '@type': 'Service',
      serviceType: 'Web Development',
      provider: {
        '@type': 'Organization',
        name: 'Web-Alchemy',
      },
      areaServed: 'Worldwide',
      availableChannel: {
        '@type': 'ServiceChannel',
        serviceUrl: siteUrl,
        servicePhone: '+34624682795',
      },
    };

    // Добавляем схемы в head
    const addScript = (schema: object, id: string) => {
      const script = document.createElement('script');
      script.type = 'application/ld+json';
      script.id = id;
      script.text = JSON.stringify(schema);
      document.head.appendChild(script);
    };

    // Удаляем старые схемы, если они есть
    const existingSchemas = ['organization-schema', 'website-schema', 'service-schema'];
    existingSchemas.forEach((id) => {
      const existing = document.getElementById(id);
      if (existing) {
        existing.remove();
      }
    });

    // Добавляем новые схемы
    addScript(organizationSchema, 'organization-schema');
    addScript(websiteSchema, 'website-schema');
    addScript(serviceSchema, 'service-schema');

    return () => {
      // Очистка при размонтировании
      existingSchemas.forEach((id) => {
        const existing = document.getElementById(id);
        if (existing) {
          existing.remove();
        }
      });
    };
  }, []);

  return null;
}
