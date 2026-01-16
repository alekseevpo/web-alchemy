'use client';

import { useLanguage } from '@/lib/i18n/LanguageContext';
import { Footer } from '@/components/Footer';

export function FeedbackPage() {
  const { t } = useLanguage();

  return (
    <div className="min-h-screen bg-[#fefbf6] dark:bg-transparent transition-colors duration-300">
      <div>
        <main className="max-w-7xl mx-auto px-4 sm:px-6 pt-24 pb-12 sm:pt-28 sm:pb-16 md:px-8 lg:pt-28 lg:px-12 xl:px-16">
          <header className="mb-16 sm:mb-20 lg:mb-24 max-w-4xl mx-auto text-center">
            <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-light tracking-tight text-gray-900 dark:text-gray-100 mb-6 leading-[1.1]">
              {t('feedback.title') || 'Обратная связь и отзывы'}
            </h1>
            <p className="text-xl sm:text-2xl text-gray-600 dark:text-gray-400 leading-relaxed max-w-3xl mx-auto">
              {t('feedback.subtitle') || 'Мы ценим ваше мнение и стремимся улучшать наш сервис'}
            </p>
          </header>

          {/* Feedback Form Section */}
          <section className="max-w-3xl mx-auto mb-16 sm:mb-20 lg:mb-24">
            <div className="bg-white dark:bg-gray-900 p-8 sm:p-12 rounded-3xl shadow-xl border border-gray-200/50 dark:border-gray-800">
              <h2 className="text-2xl sm:text-3xl font-light text-gray-900 dark:text-gray-100 mb-6">
                {t('feedback.form.title') || 'Оставить отзыв'}
              </h2>
              <p className="text-gray-600 dark:text-gray-400 mb-8">
                {t('feedback.form.desc') || 'Поделитесь своим опытом работы с нами или задайте вопрос'}
              </p>
              <form className="space-y-6">
                <div>
                  <label htmlFor="feedback-name" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    {t('feedback.form.name') || 'Ваше имя'}
                  </label>
                  <input 
                    type="text" 
                    id="feedback-name"
                    name="name"
                    className="w-full px-5 py-4 border-2 border-gray-200 dark:border-gray-700 rounded-xl focus:outline-none focus:border-blue-500 dark:focus:border-blue-400 focus:ring-2 focus:ring-blue-200 dark:focus:ring-blue-900/30 transition-all duration-200 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100"
                  />
                </div>
                <div>
                  <label htmlFor="feedback-email" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    {t('feedback.form.email') || 'Email'}
                  </label>
                  <input 
                    type="email" 
                    id="feedback-email"
                    name="email"
                    className="w-full px-5 py-4 border-2 border-gray-200 dark:border-gray-700 rounded-xl focus:outline-none focus:border-blue-500 dark:focus:border-blue-400 focus:ring-2 focus:ring-blue-200 dark:focus:ring-blue-900/30 transition-all duration-200 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100"
                  />
                </div>
                <div>
                  <label htmlFor="feedback-type" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    {t('feedback.form.type') || 'Тип обращения'}
                  </label>
                  <select 
                    id="feedback-type"
                    name="type"
                    className="w-full px-5 py-4 border-2 border-gray-200 dark:border-gray-700 rounded-xl focus:outline-none focus:border-blue-500 dark:focus:border-blue-400 focus:ring-2 focus:ring-blue-200 dark:focus:ring-blue-900/30 transition-all duration-200 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100"
                  >
                    <option value="feedback">{t('feedback.form.typeFeedback') || 'Отзыв'}</option>
                    <option value="question">{t('feedback.form.typeQuestion') || 'Вопрос'}</option>
                    <option value="suggestion">{t('feedback.form.typeSuggestion') || 'Предложение'}</option>
                  </select>
                </div>
                <div>
                  <label htmlFor="feedback-message" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    {t('feedback.form.message') || 'Сообщение'}
                  </label>
                  <textarea 
                    id="feedback-message"
                    name="message"
                    rows={6}
                    className="w-full px-5 py-4 border-2 border-gray-200 dark:border-gray-700 rounded-xl focus:outline-none focus:border-blue-500 dark:focus:border-blue-400 focus:ring-2 focus:ring-blue-200 dark:focus:ring-blue-900/30 transition-all duration-200 resize-none bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100"
                  ></textarea>
                </div>
                <button 
                  type="submit"
                  className="w-full px-8 py-4 bg-gray-900 dark:bg-gray-100 text-white dark:text-gray-900 rounded-xl hover:bg-gray-800 dark:hover:bg-gray-200 transition-all duration-200 font-medium shadow-lg hover:shadow-xl hover:scale-[1.02] active:scale-[0.98]"
                >
                  {t('feedback.form.submit') || 'Отправить'}
                </button>
              </form>
            </div>
          </section>

          {/* Reviews Section */}
          <section className="max-w-5xl mx-auto">
            <h2 className="text-3xl sm:text-4xl font-light text-gray-900 dark:text-gray-100 mb-12 text-center">
              {t('feedback.reviews.title') || 'Отзывы клиентов'}
            </h2>
            <div className="grid md:grid-cols-2 gap-6 sm:gap-8">
              {/* Placeholder for reviews - можно добавить реальные отзывы позже */}
              <div className="bg-white dark:bg-gray-900 p-6 sm:p-8 rounded-2xl border border-gray-200/50 dark:border-gray-800">
                <div className="flex items-center mb-4">
                  <div className="w-12 h-12 rounded-full bg-gradient-to-br from-blue-500 to-blue-600 flex items-center justify-center text-white font-semibold text-lg">
                    АБ
                  </div>
                  <div className="ml-4">
                    <p className="font-medium text-gray-900 dark:text-gray-100">Алексей Б.</p>
                    <p className="text-sm text-gray-500 dark:text-gray-400">{t('feedback.reviews.client') || 'Клиент'}</p>
                  </div>
                </div>
                <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
                  {t('feedback.reviews.placeholder') || 'Отличная работа! Быстро, качественно, профессионально. Рекомендую!'}
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
