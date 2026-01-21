'use client';

import { useLanguage } from '@/lib/i18n/LanguageContext';
import { Footer } from '@/components/Footer';
import Link from 'next/link';

interface ServiceDetailPageProps {
  serviceKey: string; // e.g., 'webapp', 'businesscard', etc.
}

export function ServiceDetailPage({ serviceKey }: ServiceDetailPageProps) {
  const { t } = useLanguage();

  return (
    <div className="min-h-screen bg-[#fefbf6] dark:bg-transparent transition-colors duration-300">
      <div>
        <main id="main-content" className="max-w-7xl mx-auto px-4 sm:px-6 pt-24 pb-12 sm:pt-28 sm:pb-16 md:px-8 lg:pt-28 lg:px-12 xl:px-16">
          <header className="mb-16 sm:mb-20 lg:mb-24 max-w-4xl mx-auto">
            <Link
              href="/services"
              className="inline-flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-100 mb-8 transition-colors"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
              {t('nav.back')} к услугам
            </Link>
            
            <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-light tracking-tight text-gray-900 dark:text-gray-100 mb-6 leading-[1.1]">
              {t(`services.${serviceKey}.title`)}
            </h1>
            <p className="text-xl sm:text-2xl text-gray-600 dark:text-gray-400 leading-relaxed max-w-3xl">
              {t(`services.${serviceKey}.desc`)}
            </p>
            <div className="mt-8 p-6 bg-white dark:bg-gray-900 rounded-2xl border border-gray-200/50 dark:border-gray-800 inline-block">
              <p className="text-2xl font-semibold text-gray-900 dark:text-gray-100">
                {t(`services.${serviceKey}.price`) || 'Цена по запросу'}
              </p>
            </div>
          </header>

          {/* CTA Section */}
          <section className="max-w-4xl mx-auto text-center bg-gradient-to-br from-gray-50 to-gray-100/50 dark:from-gray-900/50 dark:to-gray-800/30 rounded-3xl p-8 sm:p-12 lg:p-16 mt-16">
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-light text-gray-900 dark:text-gray-100 mb-6">
              {t('services.cta.title') || 'Готовы начать проект?'}
            </h2>
            <p className="text-lg text-gray-600 dark:text-gray-400 mb-8 max-w-2xl mx-auto">
              {t('services.cta.desc') || 'Свяжитесь с нами для обсуждения вашего проекта и получения персонального предложения'}
            </p>
            <Link 
              href="/#contact" 
              className="inline-flex items-center justify-center px-8 py-3.5 min-w-[180px] bg-gray-900 dark:bg-gray-100 text-white dark:text-gray-900 rounded-lg hover:bg-gray-800 dark:hover:bg-gray-200 transition-all duration-200 font-medium shadow-lg hover:shadow-xl hover:scale-[1.02] active:scale-[0.98]"
            >
              {t('services.cta.button') || 'Обсудить проект'}
            </Link>
          </section>
        </main>

        <Footer />
      </div>
    </div>
  );
}
