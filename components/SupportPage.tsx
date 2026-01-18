'use client';

import { useState, FormEvent } from 'react';
import { useLanguage } from '@/lib/i18n/LanguageContext';
import { Footer } from '@/components/Footer';

type FormStatus = 'idle' | 'loading' | 'success' | 'error';

interface FAQItem {
  questionKey: string;
  answerKey: string;
}

const faqItems: FAQItem[] = [
  { questionKey: 'faq.q1', answerKey: 'faq.a1' },
  { questionKey: 'faq.q2', answerKey: 'faq.a2' },
  { questionKey: 'faq.q3', answerKey: 'faq.a3' },
  { questionKey: 'faq.q4', answerKey: 'faq.a4' },
  { questionKey: 'faq.q5', answerKey: 'faq.a5' },
  { questionKey: 'faq.q6', answerKey: 'faq.a6' },
];

export function SupportPage() {
  const { t } = useLanguage();
  const [status, setStatus] = useState<FormStatus>('idle');
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(null);

  const toggleFaqItem = (index: number) => {
    setOpenFaqIndex(openFaqIndex === index ? null : index);
  };

  const validateForm = (formData: FormData): Record<string, string> => {
    const newErrors: Record<string, string> = {};
    
    const name = formData.get('name')?.toString().trim() || '';
    const email = formData.get('email')?.toString().trim() || '';
    const subject = formData.get('subject')?.toString().trim() || '';
    const message = formData.get('message')?.toString().trim() || '';

    if (!name) {
      newErrors.name = t('form.error.nameRequired') || 'Имя обязательно для заполнения';
    }

    if (!email) {
      newErrors.email = t('form.error.emailRequired') || 'Email обязателен для заполнения';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      newErrors.email = t('form.error.emailInvalid') || 'Введите корректный email адрес';
    }

    if (!subject) {
      newErrors.subject = t('form.error.subjectRequired') || 'Тема обязательна для заполнения';
    }

    if (!message) {
      newErrors.message = t('form.error.messageRequired') || 'Сообщение обязательно для заполнения';
    } else if (message.length < 10) {
      newErrors.message = t('form.error.messageMinLength') || 'Сообщение должно содержать минимум 10 символов';
    }

    return newErrors;
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    
    const validationErrors = validateForm(formData);
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    setErrors({});
    setStatus('loading');

    try {
      // Здесь будет реальная отправка данных
      // Пока имитируем отправку
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      setStatus('success');
      (e.target as HTMLFormElement).reset();
      
      // Сбрасываем статус через 5 секунд
      setTimeout(() => {
        setStatus('idle');
      }, 5000);
    } catch (error) {
      setStatus('error');
      setTimeout(() => {
        setStatus('idle');
      }, 5000);
    }
  };

  return (
    <div className="min-h-screen bg-[#fefbf6] dark:bg-transparent transition-colors duration-300">
      <div>
        <main id="main-content" className="max-w-7xl mx-auto px-4 sm:px-6 pt-24 pb-12 sm:pt-28 sm:pb-16 md:px-8 lg:pt-28 lg:px-12 xl:px-16">
          <header className="mb-16 sm:mb-20 lg:mb-24 max-w-4xl mx-auto text-center">
            <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-light tracking-tight text-gray-900 dark:text-gray-100 mb-6 leading-[1.1]">
              {t('support.title') || 'Поддержка'}
            </h1>
            <p className="text-xl sm:text-2xl text-gray-600 dark:text-gray-400 leading-relaxed max-w-3xl mx-auto">
              {t('support.subtitle') || 'Напишите нам, и мы поможем вам решить любой вопрос'}
            </p>
          </header>

          {/* Support Form Section */}
          <section className="max-w-3xl mx-auto mb-16 sm:mb-20 lg:mb-24">
            <div className="bg-white dark:bg-gray-900 p-8 sm:p-12 rounded-3xl shadow-xl border border-gray-200/50 dark:border-gray-800">
              <h2 className="text-2xl sm:text-3xl font-light text-gray-900 dark:text-gray-100 mb-6">
                {t('support.form.title') || 'Связаться с поддержкой'}
              </h2>
              <p className="text-gray-600 dark:text-gray-400 mb-8">
                {t('support.form.desc') || 'Заполните форму, и мы ответим вам в ближайшее время'}
              </p>
              <form onSubmit={handleSubmit} className="space-y-6">
                {/* Success Message */}
                {status === 'success' && (
                  <div className="p-4 bg-green-50 dark:bg-green-900/20 border-2 border-green-200 dark:border-green-800 rounded-xl">
                    <p className="text-green-800 dark:text-green-200 text-sm font-medium">
                      {t('form.success.message') || 'Спасибо! Ваше сообщение отправлено. Мы свяжемся с вами в ближайшее время.'}
                    </p>
                  </div>
                )}

                {/* Error Message */}
                {status === 'error' && (
                  <div className="p-4 bg-red-50 dark:bg-red-900/20 border-2 border-red-200 dark:border-red-800 rounded-xl">
                    <p className="text-red-800 dark:text-red-200 text-sm font-medium">
                      {t('form.error.general') || 'Произошла ошибка при отправке сообщения. Пожалуйста, попробуйте еще раз.'}
                    </p>
                  </div>
                )}

                <div>
                  <label htmlFor="support-name" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    {t('support.form.name') || 'Ваше имя'}
                  </label>
                  <input 
                    type="text" 
                    id="support-name"
                    name="name"
                    autoComplete="name"
                    required
                    disabled={status === 'loading'}
                    className={`w-full px-5 py-4 border-2 rounded-xl focus:outline-none focus:ring-2 transition-all duration-200 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 ${
                      errors.name
                        ? 'border-red-300 dark:border-red-700 focus:border-red-500 dark:focus:border-red-400 focus:ring-red-200 dark:focus:ring-red-900/30'
                        : 'border-gray-200 dark:border-gray-700 focus:border-blue-500 dark:focus:border-blue-400 focus:ring-blue-200 dark:focus:ring-blue-900/30'
                    } ${status === 'loading' ? 'opacity-50 cursor-not-allowed' : ''}`}
                    placeholder={t('support.form.namePlaceholder') || 'Введите ваше имя'}
                    aria-invalid={!!errors.name}
                    aria-describedby={errors.name ? 'support-name-error' : undefined}
                  />
                  {errors.name && (
                    <p id="support-name-error" className="mt-1 text-sm text-red-600 dark:text-red-400" role="alert">
                      {errors.name}
                    </p>
                  )}
                </div>
                <div>
                  <label htmlFor="support-email" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    {t('support.form.email') || 'Email'}
                  </label>
                  <input 
                    type="email" 
                    id="support-email"
                    name="email"
                    autoComplete="email"
                    required
                    disabled={status === 'loading'}
                    className={`w-full px-5 py-4 border-2 rounded-xl focus:outline-none focus:ring-2 transition-all duration-200 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 ${
                      errors.email
                        ? 'border-red-300 dark:border-red-700 focus:border-red-500 dark:focus:border-red-400 focus:ring-red-200 dark:focus:ring-red-900/30'
                        : 'border-gray-200 dark:border-gray-700 focus:border-blue-500 dark:focus:border-blue-400 focus:ring-blue-200 dark:focus:ring-blue-900/30'
                    } ${status === 'loading' ? 'opacity-50 cursor-not-allowed' : ''}`}
                    placeholder={t('support.form.emailPlaceholder') || 'your@email.com'}
                    aria-invalid={!!errors.email}
                    aria-describedby={errors.email ? 'support-email-error' : undefined}
                  />
                  {errors.email && (
                    <p id="support-email-error" className="mt-1 text-sm text-red-600 dark:text-red-400" role="alert">
                      {errors.email}
                    </p>
                  )}
                </div>
                <div>
                  <label htmlFor="support-subject" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    {t('support.form.subject') || 'Тема обращения'}
                  </label>
                  <input 
                    type="text" 
                    id="support-subject"
                    name="subject"
                    autoComplete="off"
                    required
                    disabled={status === 'loading'}
                    className={`w-full px-5 py-4 border-2 rounded-xl focus:outline-none focus:ring-2 transition-all duration-200 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 ${
                      errors.subject
                        ? 'border-red-300 dark:border-red-700 focus:border-red-500 dark:focus:border-red-400 focus:ring-red-200 dark:focus:ring-red-900/30'
                        : 'border-gray-200 dark:border-gray-700 focus:border-blue-500 dark:focus:border-blue-400 focus:ring-blue-200 dark:focus:ring-blue-900/30'
                    } ${status === 'loading' ? 'opacity-50 cursor-not-allowed' : ''}`}
                    placeholder={t('support.form.subjectPlaceholder') || 'Кратко опишите тему обращения'}
                    aria-invalid={!!errors.subject}
                    aria-describedby={errors.subject ? 'support-subject-error' : undefined}
                  />
                  {errors.subject && (
                    <p id="support-subject-error" className="mt-1 text-sm text-red-600 dark:text-red-400" role="alert">
                      {errors.subject}
                    </p>
                  )}
                </div>
                <div>
                  <label htmlFor="support-message" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    {t('support.form.message') || 'Сообщение'}
                  </label>
                  <textarea 
                    id="support-message"
                    name="message"
                    autoComplete="off"
                    rows={6}
                    required
                    disabled={status === 'loading'}
                    className={`w-full px-5 py-4 border-2 rounded-xl focus:outline-none focus:ring-2 transition-all duration-200 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 resize-none ${
                      errors.message
                        ? 'border-red-300 dark:border-red-700 focus:border-red-500 dark:focus:border-red-400 focus:ring-red-200 dark:focus:ring-red-900/30'
                        : 'border-gray-200 dark:border-gray-700 focus:border-blue-500 dark:focus:border-blue-400 focus:ring-blue-200 dark:focus:ring-blue-900/30'
                    } ${status === 'loading' ? 'opacity-50 cursor-not-allowed' : ''}`}
                    placeholder={t('support.form.messagePlaceholder') || 'Опишите вашу проблему или вопрос подробнее...'}
                    aria-invalid={!!errors.message}
                    aria-describedby={errors.message ? 'support-message-error' : undefined}
                  ></textarea>
                  {errors.message && (
                    <p id="support-message-error" className="mt-1 text-sm text-red-600 dark:text-red-400" role="alert">
                      {errors.message}
                    </p>
                  )}
                </div>
                <button 
                  type="submit"
                  disabled={status === 'loading'}
                  className={`w-full sm:w-auto px-8 py-4 bg-gray-900 dark:bg-gray-100 text-white dark:text-gray-900 rounded-xl transition-all duration-200 font-medium shadow-lg hover:shadow-xl ${
                    status === 'loading'
                      ? 'opacity-50 cursor-not-allowed'
                      : 'hover:bg-gray-800 dark:hover:bg-gray-200 hover:scale-[1.02] active:scale-[0.98]'
                  }`}
                >
                  {status === 'loading' ? (
                    <span className="flex items-center justify-center gap-2">
                      <svg className="animate-spin h-5 w-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      {t('form.submitting') || 'Отправка...'}
                    </span>
                  ) : (
                    t('support.form.submit') || 'Отправить запрос'
                  )}
                </button>
              </form>
            </div>
          </section>

          {/* Additional Info Section */}
          <section className="max-w-4xl mx-auto text-center mb-16 sm:mb-20 lg:mb-24">
            <div className="grid md:grid-cols-3 gap-6 sm:gap-8">
              <div className="bg-white dark:bg-gray-900/50 p-6 rounded-2xl border border-gray-200/50 dark:border-gray-800">
                <div className="w-12 h-12 rounded-full bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center mx-auto mb-4">
                  <svg className="w-6 h-6 text-blue-600 dark:text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-2">
                  {t('support.info.responseTime.title') || 'Быстрый ответ'}
                </h3>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  {t('support.info.responseTime.desc') || 'Отвечаем в течение 24 часов'}
                </p>
              </div>
              <div className="bg-white dark:bg-gray-900/50 p-6 rounded-2xl border border-gray-200/50 dark:border-gray-800">
                <div className="w-12 h-12 rounded-full bg-green-100 dark:bg-green-900/30 flex items-center justify-center mx-auto mb-4">
                  <svg className="w-6 h-6 text-green-600 dark:text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                  </svg>
                </div>
                <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-2">
                  {t('support.info.expert.title') || 'Профессиональная помощь'}
                </h3>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  {t('support.info.expert.desc') || 'Наши специалисты помогут решить любую задачу'}
                </p>
              </div>
              <div className="bg-white dark:bg-gray-900/50 p-6 rounded-2xl border border-gray-200/50 dark:border-gray-800">
                <div className="w-12 h-12 rounded-full bg-purple-100 dark:bg-purple-900/30 flex items-center justify-center mx-auto mb-4">
                  <svg className="w-6 h-6 text-purple-600 dark:text-purple-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18.364 5.636l-3.536 3.536m0 5.656l3.536 3.536M9.172 9.172L5.636 5.636m3.536 9.192l-3.536 3.536M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-5 0a4 4 0 11-8 0 4 4 0 018 0z" />
                  </svg>
                </div>
                <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-2">
                  {t('support.info.available.title') || 'Всегда на связи'}
                </h3>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  {t('support.info.available.desc') || 'Поддержка доступна в любое время'}
                </p>
              </div>
            </div>
          </section>

          {/* FAQ Section */}
          <section className="max-w-4xl mx-auto mb-16 sm:mb-20 lg:mb-24" id="faq">
            <header className="mb-12 text-center">
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-light text-gray-900 dark:text-gray-100 mb-4">
                {t('faq.title') || 'Часто задаваемые вопросы'}
              </h2>
              <p className="text-xl text-gray-600 dark:text-gray-400">
                {t('faq.subtitle') || 'Ответы на самые популярные вопросы о наших услугах'}
              </p>
            </header>

            <div className="space-y-4">
              {faqItems.map((item, index) => (
                <div
                  key={index}
                  className="bg-white dark:bg-gray-900 rounded-2xl border border-gray-200/50 dark:border-gray-800 overflow-hidden transition-all duration-300 hover:shadow-lg"
                >
                  <button
                    onClick={() => toggleFaqItem(index)}
                    className="w-full px-6 sm:px-8 py-5 sm:py-6 text-left flex items-center justify-between group"
                  >
                    <h3 className="text-lg sm:text-xl font-semibold text-gray-900 dark:text-gray-100 pr-4 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                      {t(item.questionKey)}
                    </h3>
                    <svg
                      className={`w-5 h-5 text-gray-500 dark:text-gray-400 flex-shrink-0 transition-transform duration-300 ${
                        openFaqIndex === index ? 'rotate-180' : ''
                      }`}
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                  </button>
                  {openFaqIndex === index && (
                    <div className="px-6 sm:px-8 pb-5 sm:pb-6">
                      <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
                        {t(item.answerKey)}
                      </p>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </section>
        </main>

        <Footer />
      </div>
    </div>
  );
}
