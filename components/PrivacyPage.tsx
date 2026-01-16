'use client';

import { useLanguage } from '@/lib/i18n/LanguageContext';
import { Footer } from '@/components/Footer';

export function PrivacyPage() {
  const { t } = useLanguage();

  return (
    <div className="min-h-screen bg-[#fefbf6] dark:bg-transparent transition-colors duration-300">
      <div>
        <main className="max-w-4xl mx-auto px-4 sm:px-6 pt-24 pb-12 sm:pt-28 sm:pb-16 md:px-8 lg:pt-28 lg:px-12 xl:px-16">
          <header className="mb-12 sm:mb-16">
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-light tracking-tight text-gray-900 dark:text-gray-100 mb-4">
              {t('privacy.title') || 'Политика конфиденциальности'}
            </h1>
            <p className="text-sm text-gray-500 dark:text-gray-500">
              {t('privacy.lastUpdated') || 'Последнее обновление: '}{new Date().toLocaleDateString('ru-RU', { year: 'numeric', month: 'long', day: 'numeric' })}
            </p>
          </header>

          <div className="prose prose-lg dark:prose-invert max-w-none">
            <section className="mb-8">
              <h2 className="text-2xl font-light text-gray-900 dark:text-gray-100 mb-4">
                {t('privacy.section1.title') || '1. Общие положения'}
              </h2>
              <p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-4">
                {t('privacy.section1.content') || 'Настоящая Политика конфиденциальности определяет порядок обработки и защиты персональных данных пользователей веб-сайта Web-Alchemy. Мы обязуемся защищать вашу конфиденциальность и обеспечивать безопасность ваших персональных данных.'}
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-light text-gray-900 dark:text-gray-100 mb-4">
                {t('privacy.section2.title') || '2. Собираемые данные'}
              </h2>
              <p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-4">
                {t('privacy.section2.content') || 'Мы можем собирать следующие типы персональных данных: имя, адрес электронной почты, номер телефона, а также другую информацию, которую вы добровольно предоставляете при заполнении форм на сайте.'}
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-light text-gray-900 dark:text-gray-100 mb-4">
                {t('privacy.section3.title') || '3. Использование данных'}
              </h2>
              <p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-4">
                {t('privacy.section3.content') || 'Собранные данные используются исключительно для связи с вами, обработки ваших запросов, предоставления услуг и улучшения качества нашего сервиса. Мы не передаем ваши персональные данные третьим лицам без вашего согласия.'}
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-light text-gray-900 dark:text-gray-100 mb-4">
                {t('privacy.section4.title') || '4. Защита данных'}
              </h2>
              <p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-4">
                {t('privacy.section4.content') || 'Мы применяем современные методы защиты информации для обеспечения безопасности ваших персональных данных от несанкционированного доступа, изменения, раскрытия или уничтожения.'}
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-light text-gray-900 dark:text-gray-100 mb-4">
                {t('privacy.section5.title') || '5. Ваши права'}
              </h2>
              <p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-4">
                {t('privacy.section5.content') || 'Вы имеете право запросить доступ к вашим персональным данным, их исправление или удаление. Для этого свяжитесь с нами через форму обратной связи или по электронной почте.'}
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-light text-gray-900 dark:text-gray-100 mb-4">
                {t('privacy.section6.title') || '6. Контакты'}
              </h2>
              <p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-4">
                {t('privacy.section6.content') || 'По всем вопросам, связанным с обработкой персональных данных, вы можете обратиться к нам через форму обратной связи на сайте или страницу поддержки.'}
              </p>
            </section>
          </div>
        </main>

        <Footer />
      </div>
    </div>
  );
}
