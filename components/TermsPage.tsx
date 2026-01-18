'use client';

import { useLanguage } from '@/lib/i18n/LanguageContext';
import { Footer } from '@/components/Footer';

export function TermsPage() {
  const { t } = useLanguage();

  return (
    <div className="min-h-screen bg-[#fefbf6] dark:bg-transparent transition-colors duration-300">
      <div>
        <main id="main-content" className="max-w-4xl mx-auto px-4 sm:px-6 pt-24 pb-12 sm:pt-28 sm:pb-16 md:px-8 lg:pt-28 lg:px-12 xl:px-16">
          <header className="mb-12 sm:mb-16">
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-light tracking-tight text-gray-900 dark:text-gray-100 mb-4">
              {t('terms.title') || 'Условия использования'}
            </h1>
            <p className="text-sm text-gray-500 dark:text-gray-500">
              {t('terms.lastUpdated') || 'Последнее обновление: '}{new Date().toLocaleDateString('ru-RU', { year: 'numeric', month: 'long', day: 'numeric' })}
            </p>
          </header>

          <div className="prose prose-lg dark:prose-invert max-w-none">
            <section className="mb-8">
              <h2 className="text-2xl font-light text-gray-900 dark:text-gray-100 mb-4">
                {t('terms.section1.title') || '1. Принятие условий'}
              </h2>
              <p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-4">
                {t('terms.section1.content') || 'Используя веб-сайт Web-Alchemy, вы соглашаетесь с настоящими Условиями использования. Если вы не согласны с какими-либо условиями, пожалуйста, не используйте наш сайт.'}
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-light text-gray-900 dark:text-gray-100 mb-4">
                {t('terms.section2.title') || '2. Использование сайта'}
              </h2>
              <p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-4">
                {t('terms.section2.content') || 'Вы можете использовать наш сайт для ознакомления с нашими услугами, отправки запросов и связи с нами. Запрещается использовать сайт для незаконных целей или действий, которые могут нанести вред сайту или другим пользователям.'}
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-light text-gray-900 dark:text-gray-100 mb-4">
                {t('terms.section3.title') || '3. Интеллектуальная собственность'}
              </h2>
              <p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-4">
                {t('terms.section3.content') || 'Весь контент сайта, включая тексты, изображения, логотипы и дизайн, является собственностью Web-Alchemy и защищен законами об интеллектуальной собственности. Использование материалов сайта без разрешения запрещено.'}
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-light text-gray-900 dark:text-gray-100 mb-4">
                {t('terms.section4.title') || '4. Услуги'}
              </h2>
              <p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-4">
                {t('terms.section4.content') || 'Мы предоставляем услуги по разработке веб-приложений и сайтов. Условия оказания услуг, сроки и стоимость обсуждаются индивидуально с каждым клиентом и фиксируются в отдельном договоре.'}
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-light text-gray-900 dark:text-gray-100 mb-4">
                {t('terms.section5.title') || '5. Ограничение ответственности'}
              </h2>
              <p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-4">
                {t('terms.section5.content') || 'Web-Alchemy не несет ответственности за любые прямые или косвенные убытки, возникшие в результате использования или невозможности использования сайта. Мы стремимся обеспечить точность информации на сайте, но не гарантируем её полноту или актуальность.'}
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-light text-gray-900 dark:text-gray-100 mb-4">
                {t('terms.section6.title') || '6. Изменения условий'}
              </h2>
              <p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-4">
                {t('terms.section6.content') || 'Мы оставляем за собой право изменять настоящие Условия использования в любое время. Изменения вступают в силу с момента их публикации на сайте. Рекомендуем периодически проверять актуальную версию условий.'}
              </p>
            </section>
          </div>
        </main>

        <Footer />
      </div>
    </div>
  );
}
