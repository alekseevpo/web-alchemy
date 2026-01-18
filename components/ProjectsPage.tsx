'use client';

import { useLanguage } from '@/lib/i18n/LanguageContext';
import { Footer } from '@/components/Footer';

export function ProjectsPage() {
  const { t } = useLanguage();

  return (
    <div className="min-h-screen bg-[#fefbf6] dark:bg-transparent transition-colors duration-300">
      <div>
        <main id="main-content" className="max-w-7xl mx-auto px-4 sm:px-6 pt-24 pb-12 sm:pt-28 sm:pb-16 md:px-8 lg:pt-28 lg:px-12 xl:px-16">
          <header className="mb-16 sm:mb-20 lg:mb-24 max-w-4xl mx-auto text-center">
            <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-light tracking-tight text-gray-900 dark:text-gray-100 mb-6 leading-[1.1]">
              {t('projects.title') || 'Готовые проекты'}
            </h1>
            <p className="text-xl sm:text-2xl text-gray-600 dark:text-gray-400 leading-relaxed max-w-3xl mx-auto">
              {t('projects.subtitle') || 'Примеры наших работ и реализованных проектов'}
            </p>
          </header>

          {/* Projects Section */}
          <section className="max-w-7xl mx-auto mb-16 sm:mb-20 lg:mb-24">
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
              {/* Placeholder для проектов */}
              <div className="bg-white dark:bg-gray-900/50 rounded-3xl p-8 shadow-lg border border-gray-200/50 dark:border-gray-800">
                <div className="aspect-video bg-gradient-to-br from-gray-100 to-gray-200 dark:from-gray-800 dark:to-gray-900 rounded-2xl mb-6 flex items-center justify-center">
                  <span className="text-gray-400 dark:text-gray-600 text-sm">Изображение проекта</span>
                </div>
                <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-100 mb-2">
                  {t('projects.placeholder.title') || 'Проект в разработке'}
                </h3>
                <p className="text-gray-600 dark:text-gray-400">
                  {t('projects.placeholder.desc') || 'Скоро здесь появятся примеры наших работ'}
                </p>
              </div>
            </div>
          </section>
        </main>

        <Footer />
      </div>
    </div>
  );
}
