'use client';

import { useLanguage } from '@/lib/i18n/LanguageContext';
import { Footer } from '@/components/Footer';

export function CookiesPage() {
  const { t } = useLanguage();

  return (
    <div className="min-h-screen bg-[#fefbf6] dark:bg-transparent transition-colors duration-300">
      <div>
        <main className="max-w-4xl mx-auto px-4 sm:px-6 pt-24 pb-12 sm:pt-28 sm:pb-16 md:px-8 lg:pt-28 lg:px-12 xl:px-16">
          <header className="mb-12 sm:mb-16">
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-light tracking-tight text-gray-900 dark:text-gray-100 mb-4">
              {t('cookies.title') || 'Политика cookies'}
            </h1>
            <p className="text-sm text-gray-500 dark:text-gray-500">
              {t('cookies.lastUpdated') || 'Последнее обновление: '}{new Date().toLocaleDateString('ru-RU', { year: 'numeric', month: 'long', day: 'numeric' })}
            </p>
          </header>

          <div className="prose prose-lg dark:prose-invert max-w-none">
            <section className="mb-8">
              <h2 className="text-2xl font-light text-gray-900 dark:text-gray-100 mb-4">
                {t('cookies.section1.title') || '1. Что такое cookies'}
              </h2>
              <p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-4">
                {t('cookies.section1.content') || 'Cookies — это небольшие текстовые файлы, которые сохраняются на вашем устройстве при посещении веб-сайта. Они помогают сайту запоминать ваши предпочтения и улучшать пользовательский опыт.'}
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-light text-gray-900 dark:text-gray-100 mb-4">
                {t('cookies.section2.title') || '2. Типы используемых cookies'}
              </h2>
              <p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-4">
                {t('cookies.section2.content') || 'Мы используем следующие типы cookies: необходимые для работы сайта (например, сохранение выбранной темы и языка), аналитические для понимания поведения пользователей, и функциональные для улучшения работы сайта.'}
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-light text-gray-900 dark:text-gray-100 mb-4">
                {t('cookies.section3.title') || '3. Управление cookies'}
              </h2>
              <p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-4">
                {t('cookies.section3.content') || 'Вы можете управлять cookies через настройки вашего браузера. Вы можете блокировать или удалять cookies, однако это может повлиять на функциональность сайта. Некоторые функции сайта могут работать некорректно при отключении cookies.'}
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-light text-gray-900 dark:text-gray-100 mb-4">
                {t('cookies.section4.title') || '4. Сторонние cookies'}
              </h2>
              <p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-4">
                {t('cookies.section4.content') || 'Мы можем использовать сервисы третьих сторон (например, аналитические инструменты), которые также могут устанавливать cookies на вашем устройстве. Эти cookies регулируются политиками конфиденциальности соответствующих сервисов.'}
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-light text-gray-900 dark:text-gray-100 mb-4">
                {t('cookies.section5.title') || '5. Срок хранения cookies'}
              </h2>
              <p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-4">
                {t('cookies.section5.content') || 'Различные cookies хранятся в течение разных периодов времени. Сессионные cookies удаляются после закрытия браузера, постоянные cookies могут храниться до нескольких месяцев или до их удаления вручную.'}
              </p>
            </section>
          </div>
        </main>

        <Footer />
      </div>
    </div>
  );
}
