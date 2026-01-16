'use client';

import { useState, FormEvent } from 'react';
import { useLanguage } from '@/lib/i18n/LanguageContext';

type FormStatus = 'idle' | 'loading' | 'success' | 'error';

export function CompanyContent() {
  const { t } = useLanguage();
  const [status, setStatus] = useState<FormStatus>('idle');
  const [errors, setErrors] = useState<Record<string, string>>({});

  const validateForm = (formData: FormData): Record<string, string> => {
    const newErrors: Record<string, string> = {};
    
    const name = formData.get('name')?.toString().trim() || '';
    const email = formData.get('email')?.toString().trim() || '';
    const message = formData.get('message')?.toString().trim() || '';

    if (!name) {
      newErrors.name = t('form.error.nameRequired') || 'Имя обязательно для заполнения';
    }

    if (!email) {
      newErrors.email = t('form.error.emailRequired') || 'Email обязателен для заполнения';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      newErrors.email = t('form.error.emailInvalid') || 'Введите корректный email адрес';
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
    <>
      {/* Hero Section */}
      <header className="mb-16 sm:mb-20 lg:mb-24 max-w-6xl mx-auto text-center">
        <h2 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-light tracking-tight text-gray-900 dark:text-gray-100 mb-2 sm:mb-3 leading-[1.1]">
          {t('hero.companyName')}
        </h2>
        <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-light tracking-tight text-gray-900 dark:text-gray-100 mb-4 sm:mb-6 leading-[1.1]">
          {t('hero.title')}{' '}
          <span className="block bg-gradient-to-r from-gray-900 via-gray-700 to-gray-500 dark:from-gray-100 dark:via-gray-300 dark:to-gray-500 bg-clip-text text-transparent mt-2">
            {t('hero.titleHighlight')}
          </span>
        </h1>
        <p className="text-xl sm:text-2xl text-gray-600 dark:text-gray-400 mb-4 leading-relaxed max-w-3xl mx-auto">
          {t('hero.subtitle')}
        </p>
        <p className="text-base sm:text-lg text-gray-500 dark:text-gray-500 mb-10">
          {t('header.tagline')}
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <a 
            href="#contact" 
            className="inline-flex items-center justify-center px-6 sm:px-8 py-3.5 min-w-[180px] min-h-[44px] bg-gray-900 dark:bg-gray-100 text-white dark:text-gray-900 rounded-lg hover:bg-gray-800 dark:hover:bg-gray-200 transition-all duration-200 font-medium shadow-lg hover:shadow-xl hover:scale-[1.02] active:scale-[0.98]"
          >
            {t('hero.cta.primary')}
          </a>
          <a 
            href="#services" 
            className="inline-flex items-center justify-center px-6 sm:px-8 py-3.5 min-w-[180px] min-h-[44px] border-2 border-gray-300 dark:border-gray-700 text-gray-900 dark:text-gray-100 rounded-lg hover:border-gray-900 dark:hover:border-gray-100 hover:bg-gray-50 dark:hover:bg-gray-900 transition-all duration-200 font-medium hover:scale-[1.02] active:scale-[0.98]"
          >
            {t('hero.cta.secondary')}
          </a>
        </div>
      </header>

      {/* Services Section */}
      <section id="services" className="mb-16 sm:mb-20 lg:mb-24 scroll-mt-24">
        <h2 className="text-3xl sm:text-4xl md:text-5xl font-light text-gray-900 dark:text-gray-100 mb-12 sm:mb-16">
          {t('services.title')}
        </h2>
        <div className="grid md:grid-cols-3 gap-6 sm:gap-8">
          {/* WebApp Card */}
          <div className="group relative bg-white dark:bg-gray-900 p-8 sm:p-10 rounded-3xl shadow-lg hover:shadow-2xl transition-all duration-500 border-2 border-gray-200/50 dark:border-gray-800 hover:border-blue-400 dark:hover:border-blue-600 hover:-translate-y-3 overflow-hidden">
            {/* Gradient overlay on hover */}
            <div className="absolute inset-0 bg-gradient-to-br from-blue-50/0 via-blue-50/0 to-blue-50/0 dark:from-blue-900/0 dark:via-blue-900/0 dark:to-blue-900/0 group-hover:from-blue-50/30 group-hover:via-blue-50/20 group-hover:to-blue-50/10 dark:group-hover:from-blue-900/20 dark:group-hover:via-blue-900/10 dark:group-hover:to-blue-900/5 transition-all duration-500 rounded-3xl pointer-events-none"></div>
            
            {/* Icon container with background */}
            <div className="relative mb-6">
              <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-blue-500 to-blue-600 dark:from-blue-400 dark:to-blue-500 flex items-center justify-center transform group-hover:scale-110 group-hover:rotate-3 transition-all duration-500 shadow-lg group-hover:shadow-blue-500/50">
                <span className="text-3xl">🚀</span>
              </div>
            </div>
            
            <h3 className="relative text-xl font-bold text-gray-900 dark:text-gray-100 mb-4 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors duration-300">
              {t('services.webapp.title')}
            </h3>
            <p className="relative text-gray-600 dark:text-gray-300 leading-relaxed text-base">
              {t('services.webapp.desc')}
            </p>
          </div>

          {/* Business Card Website */}
          <div className="group relative bg-white dark:bg-gray-900 p-8 sm:p-10 rounded-3xl shadow-lg hover:shadow-2xl transition-all duration-500 border-2 border-gray-200/50 dark:border-gray-800 hover:border-purple-400 dark:hover:border-purple-600 hover:-translate-y-3 overflow-hidden">
            {/* Gradient overlay on hover */}
            <div className="absolute inset-0 bg-gradient-to-br from-purple-50/0 via-purple-50/0 to-purple-50/0 dark:from-purple-900/0 dark:via-purple-900/0 dark:to-purple-900/0 group-hover:from-purple-50/30 group-hover:via-purple-50/20 group-hover:to-purple-50/10 dark:group-hover:from-purple-900/20 dark:group-hover:via-purple-900/10 dark:group-hover:to-purple-900/5 transition-all duration-500 rounded-3xl pointer-events-none"></div>
            
            {/* Icon container with background */}
            <div className="relative mb-6">
              <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-purple-500 to-purple-600 dark:from-purple-400 dark:to-purple-500 flex items-center justify-center transform group-hover:scale-110 group-hover:rotate-3 transition-all duration-500 shadow-lg group-hover:shadow-purple-500/50">
                <span className="text-3xl">💼</span>
              </div>
            </div>
            
            <h3 className="relative text-xl font-bold text-gray-900 dark:text-gray-100 mb-4 group-hover:text-purple-600 dark:group-hover:text-purple-400 transition-colors duration-300">
              {t('services.businesscard.title')}
            </h3>
            <p className="relative text-gray-600 dark:text-gray-300 leading-relaxed text-base">
              {t('services.businesscard.desc')}
            </p>
          </div>

          {/* Landing Pages Card */}
          <div className="group relative bg-white dark:bg-gray-900 p-8 sm:p-10 rounded-3xl shadow-lg hover:shadow-2xl transition-all duration-500 border-2 border-gray-200/50 dark:border-gray-800 hover:border-emerald-400 dark:hover:border-emerald-600 hover:-translate-y-3 overflow-hidden">
            {/* Gradient overlay on hover */}
            <div className="absolute inset-0 bg-gradient-to-br from-emerald-50/0 via-emerald-50/0 to-emerald-50/0 dark:from-emerald-900/0 dark:via-emerald-900/0 dark:to-emerald-900/0 group-hover:from-emerald-50/30 group-hover:via-emerald-50/20 group-hover:to-emerald-50/10 dark:group-hover:from-emerald-900/20 dark:group-hover:via-emerald-900/10 dark:group-hover:to-emerald-900/5 transition-all duration-500 rounded-3xl pointer-events-none"></div>
            
            {/* Icon container with background */}
            <div className="relative mb-6">
              <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-emerald-500 to-emerald-600 dark:from-emerald-400 dark:to-emerald-500 flex items-center justify-center transform group-hover:scale-110 group-hover:rotate-3 transition-all duration-500 shadow-lg group-hover:shadow-emerald-500/50">
                <span className="text-3xl">📄</span>
              </div>
            </div>
            
            <h3 className="relative text-xl font-bold text-gray-900 dark:text-gray-100 mb-4 group-hover:text-emerald-600 dark:group-hover:text-emerald-400 transition-colors duration-300">
              {t('services.landing.title')}
            </h3>
            <p className="relative text-gray-600 dark:text-gray-300 leading-relaxed text-base">
              {t('services.landing.desc')}
            </p>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="mb-16 sm:mb-20 lg:mb-24 scroll-mt-24">
        <h2 className="text-3xl sm:text-4xl md:text-5xl font-light text-gray-900 dark:text-gray-100 mb-12 sm:mb-16 text-center">
          {t('about.title')}
        </h2>
        <div className="prose prose-lg dark:prose-invert max-w-none">
          <p className="text-center text-xl mb-16 text-gray-700 dark:text-gray-300 leading-relaxed max-w-3xl mx-auto">
            {t('about.desc')}
          </p>
          
          {/* Our Stack Section */}
          <div className="max-w-4xl mx-auto mb-16">
            <h3 className="text-2xl sm:text-3xl font-light text-gray-900 dark:text-gray-100 mb-4 text-center">
              {t('about.tech.title')}
            </h3>
            <p className="text-center text-gray-600 dark:text-gray-400 mb-8 max-w-2xl mx-auto">
              {t('about.tech.desc')}
            </p>
            <div className="grid md:grid-cols-2 gap-6">
              <div className="bg-white dark:bg-gray-900 p-6 rounded-2xl border border-gray-200/50 dark:border-gray-800">
                <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                  {t('about.tech.typescript')}
                </p>
              </div>
              <div className="bg-white dark:bg-gray-900 p-6 rounded-2xl border border-gray-200/50 dark:border-gray-800">
                <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                  {t('about.tech.vue')}
                </p>
              </div>
              <div className="bg-white dark:bg-gray-900 p-6 rounded-2xl border border-gray-200/50 dark:border-gray-800">
                <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                  {t('about.tech.django')}
                </p>
              </div>
              <div className="bg-white dark:bg-gray-900 p-6 rounded-2xl border border-gray-200/50 dark:border-gray-800">
                <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                  {t('about.tech.tailwind')}
                </p>
              </div>
              <div className="bg-white dark:bg-gray-900 p-6 rounded-2xl border border-gray-200/50 dark:border-gray-800">
                <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                  {t('about.tech.vite')}
                </p>
              </div>
              <div className="bg-white dark:bg-gray-900 p-6 rounded-2xl border border-gray-200/50 dark:border-gray-800">
                <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                  {t('about.tech.nextjs')}
                </p>
              </div>
            </div>
          </div>

          {/* Our Approach Section */}
          <div className="max-w-4xl mx-auto">
            <h3 className="text-2xl sm:text-3xl font-light text-gray-900 dark:text-gray-100 mb-4 text-center">
              {t('about.approach.title')}
            </h3>
            <p className="text-center text-gray-600 dark:text-gray-400 mb-8 max-w-2xl mx-auto">
              {t('about.approach.desc')}
            </p>
            <div className="space-y-6">
              <div className="bg-white dark:bg-gray-900 p-6 sm:p-8 rounded-2xl border border-gray-200/50 dark:border-gray-800">
                <h4 className="text-xl font-semibold text-gray-900 dark:text-gray-100 mb-3">
                  {t('about.approach.clean')}
                </h4>
                <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
                  {t('about.approach.cleanDesc')}
                </p>
              </div>
              <div className="bg-white dark:bg-gray-900 p-6 sm:p-8 rounded-2xl border border-gray-200/50 dark:border-gray-800">
                <h4 className="text-xl font-semibold text-gray-900 dark:text-gray-100 mb-3">
                  {t('about.approach.fast')}
                </h4>
                <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
                  {t('about.approach.fastDesc')}
                </p>
              </div>
              <div className="bg-white dark:bg-gray-900 p-6 sm:p-8 rounded-2xl border border-gray-200/50 dark:border-gray-800">
                <h4 className="text-xl font-semibold text-gray-900 dark:text-gray-100 mb-3">
                  {t('about.approach.modern')}
                </h4>
                <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
                  {t('about.approach.modernDesc')}
                </p>
              </div>
              <div className="bg-white dark:bg-gray-900 p-6 sm:p-8 rounded-2xl border border-gray-200/50 dark:border-gray-800">
                <h4 className="text-xl font-semibold text-gray-900 dark:text-gray-100 mb-3">
                  {t('about.approach.detail')}
                </h4>
                <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
                  {t('about.approach.detailDesc')}
                </p>
              </div>
              <div className="bg-white dark:bg-gray-900 p-6 sm:p-8 rounded-2xl border border-gray-200/50 dark:border-gray-800">
                <h4 className="text-xl font-semibold text-gray-900 dark:text-gray-100 mb-3">
                  {t('about.approach.market')}
                </h4>
                <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
                  {t('about.approach.marketDesc')}
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="mb-16 sm:mb-20 lg:mb-24 scroll-mt-24 bg-gradient-to-br from-gray-50 to-gray-100/50 dark:from-gray-900/50 dark:to-gray-800/30 rounded-3xl p-8 sm:p-12 lg:p-16">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-light text-gray-900 dark:text-gray-100 mb-6 sm:mb-8">
            {t('contact.title')}
          </h2>
          <p className="text-xl text-gray-600 dark:text-gray-400 mb-10 sm:mb-14 leading-relaxed">
            {t('contact.subtitle')}
          </p>
          <div className="bg-white dark:bg-gray-900 p-8 sm:p-12 rounded-3xl shadow-xl border border-gray-200/50 dark:border-gray-800">
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
                <label htmlFor="contact-name" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  {t('contact.form.name') || 'Ваше имя'}
                </label>
                <input 
                  type="text" 
                  id="contact-name"
                  name="name"
                  required
                  disabled={status === 'loading'}
                  className={`w-full px-5 py-4 border-2 rounded-xl focus:outline-none focus:ring-2 transition-all duration-200 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 placeholder-gray-400 dark:placeholder-gray-500 ${
                    errors.name
                      ? 'border-red-300 dark:border-red-700 focus:border-red-500 dark:focus:border-red-400 focus:ring-red-200 dark:focus:ring-red-900/30'
                      : 'border-gray-200 dark:border-gray-700 focus:border-blue-500 dark:focus:border-blue-400 focus:ring-blue-200 dark:focus:ring-blue-900/30'
                  } ${status === 'loading' ? 'opacity-50 cursor-not-allowed' : ''}`}
                  placeholder={t('contact.form.name') || 'Введите ваше имя'}
                  aria-invalid={!!errors.name}
                  aria-describedby={errors.name ? 'contact-name-error' : undefined}
                />
                {errors.name && (
                  <p id="contact-name-error" className="mt-1 text-sm text-red-600 dark:text-red-400" role="alert">
                    {errors.name}
                  </p>
                )}
              </div>
              <div>
                <label htmlFor="contact-email" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  {t('contact.form.email') || 'Email'}
                </label>
                <input 
                  type="email" 
                  id="contact-email"
                  name="email"
                  required
                  disabled={status === 'loading'}
                  className={`w-full px-5 py-4 border-2 rounded-xl focus:outline-none focus:ring-2 transition-all duration-200 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 placeholder-gray-400 dark:placeholder-gray-500 ${
                    errors.email
                      ? 'border-red-300 dark:border-red-700 focus:border-red-500 dark:focus:border-red-400 focus:ring-red-200 dark:focus:ring-red-900/30'
                      : 'border-gray-200 dark:border-gray-700 focus:border-blue-500 dark:focus:border-blue-400 focus:ring-blue-200 dark:focus:ring-blue-900/30'
                  } ${status === 'loading' ? 'opacity-50 cursor-not-allowed' : ''}`}
                  placeholder={t('contact.form.email') || 'Введите ваш email'}
                  aria-invalid={!!errors.email}
                  aria-describedby={errors.email ? 'contact-email-error' : undefined}
                />
                {errors.email && (
                  <p id="contact-email-error" className="mt-1 text-sm text-red-600 dark:text-red-400" role="alert">
                    {errors.email}
                  </p>
                )}
              </div>
              <div>
                <label htmlFor="contact-message" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  {t('contact.form.message') || 'Сообщение'}
                </label>
                <textarea 
                  id="contact-message"
                  name="message"
                  required
                  disabled={status === 'loading'}
                  rows={5}
                  className={`w-full px-5 py-4 border-2 rounded-xl focus:outline-none focus:ring-2 transition-all duration-200 resize-none bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 placeholder-gray-400 dark:placeholder-gray-500 ${
                    errors.message
                      ? 'border-red-300 dark:border-red-700 focus:border-red-500 dark:focus:border-red-400 focus:ring-red-200 dark:focus:ring-red-900/30'
                      : 'border-gray-200 dark:border-gray-700 focus:border-blue-500 dark:focus:border-blue-400 focus:ring-blue-200 dark:focus:ring-blue-900/30'
                  } ${status === 'loading' ? 'opacity-50 cursor-not-allowed' : ''}`}
                  placeholder={t('contact.form.message') || 'Расскажите нам о вашем проекте'}
                  aria-invalid={!!errors.message}
                  aria-describedby={errors.message ? 'contact-message-error' : undefined}
                ></textarea>
                {errors.message && (
                  <p id="contact-message-error" className="mt-1 text-sm text-red-600 dark:text-red-400" role="alert">
                    {errors.message}
                  </p>
                )}
              </div>
              <button 
                type="submit"
                disabled={status === 'loading'}
                className={`w-full px-8 py-4 bg-gray-900 dark:bg-gray-100 text-white dark:text-gray-900 rounded-xl hover:bg-gray-800 dark:hover:bg-gray-200 transition-all duration-200 font-medium shadow-lg hover:shadow-xl hover:scale-[1.02] active:scale-[0.98] min-h-[48px] ${
                  status === 'loading' ? 'opacity-50 cursor-not-allowed' : ''
                }`}
              >
                {status === 'loading' ? (
                  <span className="flex items-center justify-center gap-2">
                    <svg className="animate-spin h-5 w-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    {t('form.loading') || 'Отправка...'}
                  </span>
                ) : (
                  t('contact.form.submit')
                )}
              </button>
            </form>
            <p className="text-sm text-gray-500 dark:text-gray-400 mt-8">
              {t('contact.form.or')}
            </p>
          </div>
        </div>
      </section>
    </>
  );
}
