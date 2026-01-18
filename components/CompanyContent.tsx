'use client';

import { useState, FormEvent, useEffect } from 'react';
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
      <header className="min-h-screen flex items-start justify-center max-w-6xl mx-auto text-center pt-8 sm:pt-12 md:pt-16 lg:pt-20 px-4 relative">
        {/* Background Logo - вынесен из h2 для правильной загрузки */}
        <img 
          src="/logo.png" 
          alt="Web-Alchemy Logo" 
          className="fixed inset-0 w-full h-full z-0 pointer-events-none object-cover logo-transparent"
          style={{ backgroundColor: 'transparent' }}
          loading="eager"
          fetchPriority="high"
          onLoad={(e) => {
            // Плавно показываем логотип после загрузки
            e.currentTarget.classList.add('loaded');
          }}
          onError={(e) => {
            // Скрываем изображение при ошибке загрузки
            e.currentTarget.style.display = 'none';
          }}
        />
        <div className="mist-effect relative w-full">
          <h2 className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl xl:text-9xl 2xl:text-[10rem] font-bold tracking-tight text-gray-900 dark:text-gray-100 mb-10 sm:mb-12 md:mb-14 lg:mb-16 leading-[0.7] sm:leading-[0.6] text-center mx-auto relative z-10 break-words">
          <span className="inline-flex flex-wrap justify-center perspective-1000 relative z-10 gap-0 sm:gap-0">
            {t('hero.companyName').split('').map((char, index) => (
              <span
                key={index}
                className="inline-block letter-3d"
                style={{
                  animationDelay: `${index * 0.1}s`,
                  transformStyle: 'preserve-3d'
                }}
              >
                {char === ' ' ? '\u00A0' : char}
              </span>
            ))}
          </span>
        </h2>
        <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl 2xl:text-7xl font-light tracking-tight text-gray-900 dark:text-gray-100 mb-3 sm:mb-4 md:mb-6 leading-[1.2] sm:leading-[1.1] subtitle-fade-in px-2 subtitle-shadow">
          {t('hero.title').split(' и сайтов')[0]}<br />
          {'и сайтов '}
          <span className="bg-gradient-to-r from-gray-900 via-gray-700 to-gray-500 dark:from-gray-100 dark:via-gray-300 dark:to-gray-500 bg-clip-text text-transparent">
            {t('hero.titleHighlight')}
          </span>
        </h1>
        <p className="text-sm sm:text-base md:text-lg lg:text-xl text-gray-700 dark:text-gray-300 mb-3 sm:mb-4 leading-relaxed max-w-3xl mx-auto px-2 description-text italic font-serif">
          {t('hero.subtitle')}
        </p>
        <p className="text-sm sm:text-base md:text-lg lg:text-xl text-gray-700 dark:text-gray-300 mb-6 sm:mb-8 md:mb-10 px-2 tagline-text">
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
            href="/services" 
            className="inline-flex items-center justify-center px-6 sm:px-8 py-3.5 min-w-[180px] min-h-[44px] border-2 border-gray-300 dark:border-gray-700 text-gray-900 dark:text-gray-100 rounded-lg hover:border-gray-900 dark:hover:border-gray-100 hover:bg-gray-50 dark:hover:bg-gray-900 transition-all duration-200 font-medium hover:scale-[1.02] active:scale-[0.98]"
          >
            {t('hero.cta.secondary')}
          </a>
        </div>
        </div>
      </header>

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
            
            {/* Technology Logos - Infinite Scroll Animation */}
            <div className="relative overflow-hidden mb-12 px-4 w-full">
              <div className="flex items-center gap-6 sm:gap-8 tech-logos-scroll w-fit">
                {/* First set of logos */}
                {/* Python */}
                <img 
                  src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/python/python-original.svg" 
                  alt="Python" 
                  className="h-12 sm:h-14 w-auto opacity-80 hover:opacity-100 transition-opacity hover:scale-110 flex-shrink-0"
                  title="Python"
                />
                {/* Django */}
                <img 
                  src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/django/django-plain.svg" 
                  alt="Django" 
                  className="h-12 sm:h-14 w-auto opacity-80 hover:opacity-100 transition-opacity hover:scale-110 flex-shrink-0"
                  title="Django"
                />
                {/* Django REST Framework */}
                <img 
                  src="/logo-rest.png" 
                  alt="Django REST Framework" 
                  className="h-12 sm:h-14 w-auto opacity-80 hover:opacity-100 transition-opacity hover:scale-110 dark:brightness-150 dark:contrast-125 flex-shrink-0"
                  title="Django REST Framework"
                  onError={(e) => {
                    const img = e.currentTarget;
                    if (!img.dataset.fallbackUsed) {
                      img.dataset.fallbackUsed = 'true';
                      img.src = '/logo-rest.svg';
                    } else if (!img.dataset.fallback2Used) {
                      img.dataset.fallback2Used = 'true';
                      img.src = '/logo-rest.jpg';
                    }
                  }}
                />
                {/* FastAPI */}
                <img 
                  src="https://fastapi.tiangolo.com/img/logo-margin/logo-teal.png" 
                  alt="FastAPI" 
                  className="h-12 sm:h-14 w-auto opacity-80 hover:opacity-100 transition-opacity hover:scale-110 flex-shrink-0"
                  title="FastAPI"
                  onError={(e) => {
                    const img = e.currentTarget;
                    if (!img.dataset.fallbackUsed) {
                      img.dataset.fallbackUsed = 'true';
                      img.src = 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/fastapi/fastapi-original.svg';
                    }
                  }}
                />
                {/* TypeScript */}
                <img 
                  src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/typescript/typescript-original.svg" 
                  alt="TypeScript" 
                  className="h-12 sm:h-14 w-auto opacity-80 hover:opacity-100 transition-opacity hover:scale-110 flex-shrink-0"
                  title="TypeScript"
                />
                {/* Tailwind CSS */}
                <img 
                  src="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/tailwindcss/tailwindcss-original.svg" 
                  alt="Tailwind CSS" 
                  className="h-12 sm:h-14 w-auto opacity-80 hover:opacity-100 transition-opacity hover:scale-110 flex-shrink-0"
                  title="Tailwind CSS"
                  onError={(e) => {
                    const img = e.currentTarget;
                    img.src = 'https://upload.wikimedia.org/wikipedia/commons/d/d5/Tailwind_CSS_Logo.svg';
                  }}
                />
                {/* Next.js */}
                <img 
                  src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nextjs/nextjs-original.svg" 
                  alt="Next.js" 
                  className="h-12 sm:h-14 w-auto opacity-80 hover:opacity-100 transition-opacity hover:scale-110 dark:invert flex-shrink-0"
                  title="Next.js"
                />
                {/* Vue.js */}
                <img 
                  src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/vuejs/vuejs-original.svg" 
                  alt="Vue.js" 
                  className="h-12 sm:h-14 w-auto opacity-80 hover:opacity-100 transition-opacity hover:scale-110 flex-shrink-0"
                  title="Vue.js"
                />
                {/* Vite */}
                <img 
                  src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/vitejs/vitejs-original.svg" 
                  alt="Vite" 
                  className="h-12 sm:h-14 w-auto opacity-80 hover:opacity-100 transition-opacity hover:scale-110 flex-shrink-0"
                  title="Vite"
                />
                
                {/* Duplicate set for seamless loop */}
                {/* Python */}
                <img 
                  src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/python/python-original.svg" 
                  alt="Python" 
                  className="h-12 sm:h-14 w-auto opacity-80 hover:opacity-100 transition-opacity hover:scale-110 flex-shrink-0"
                  title="Python"
                  aria-hidden="true"
                />
                {/* Django */}
                <img 
                  src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/django/django-plain.svg" 
                  alt="Django" 
                  className="h-12 sm:h-14 w-auto opacity-80 hover:opacity-100 transition-opacity hover:scale-110 flex-shrink-0"
                  title="Django"
                  aria-hidden="true"
                />
                {/* Django REST Framework */}
                <img 
                  src="/logo-rest.png" 
                  alt="Django REST Framework" 
                  className="h-12 sm:h-14 w-auto opacity-80 hover:opacity-100 transition-opacity hover:scale-110 dark:brightness-150 dark:contrast-125 flex-shrink-0"
                  title="Django REST Framework"
                  aria-hidden="true"
                  onError={(e) => {
                    const img = e.currentTarget;
                    if (!img.dataset.fallbackUsed) {
                      img.dataset.fallbackUsed = 'true';
                      img.src = '/logo-rest.svg';
                    }
                  }}
                />
                {/* FastAPI */}
                <img 
                  src="https://fastapi.tiangolo.com/img/logo-margin/logo-teal.png" 
                  alt="FastAPI" 
                  className="h-12 sm:h-14 w-auto opacity-80 hover:opacity-100 transition-opacity hover:scale-110 flex-shrink-0"
                  title="FastAPI"
                  aria-hidden="true"
                  onError={(e) => {
                    const img = e.currentTarget;
                    if (!img.dataset.fallbackUsed) {
                      img.dataset.fallbackUsed = 'true';
                      img.src = 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/fastapi/fastapi-original.svg';
                    }
                  }}
                />
                {/* TypeScript */}
                <img 
                  src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/typescript/typescript-original.svg" 
                  alt="TypeScript" 
                  className="h-12 sm:h-14 w-auto opacity-80 hover:opacity-100 transition-opacity hover:scale-110 flex-shrink-0"
                  title="TypeScript"
                  aria-hidden="true"
                />
                {/* Tailwind CSS */}
                <img 
                  src="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/tailwindcss/tailwindcss-original.svg" 
                  alt="Tailwind CSS" 
                  className="h-12 sm:h-14 w-auto opacity-80 hover:opacity-100 transition-opacity hover:scale-110 flex-shrink-0"
                  title="Tailwind CSS"
                  aria-hidden="true"
                />
                {/* Next.js */}
                <img 
                  src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nextjs/nextjs-original.svg" 
                  alt="Next.js" 
                  className="h-12 sm:h-14 w-auto opacity-80 hover:opacity-100 transition-opacity hover:scale-110 dark:invert flex-shrink-0"
                  title="Next.js"
                  aria-hidden="true"
                />
                {/* Vue.js */}
                <img 
                  src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/vuejs/vuejs-original.svg" 
                  alt="Vue.js" 
                  className="h-12 sm:h-14 w-auto opacity-80 hover:opacity-100 transition-opacity hover:scale-110 flex-shrink-0"
                  title="Vue.js"
                  aria-hidden="true"
                />
                {/* Vite */}
                <img 
                  src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/vitejs/vitejs-original.svg" 
                  alt="Vite" 
                  className="h-12 sm:h-14 w-auto opacity-80 hover:opacity-100 transition-opacity hover:scale-110 flex-shrink-0"
                  title="Vite"
                  aria-hidden="true"
                />
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              <div className="bg-white dark:bg-gray-900 p-6 rounded-2xl border border-gray-200/50 dark:border-gray-800">
                <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                  {t('about.tech.python')}
                </p>
              </div>
              <div className="bg-white dark:bg-gray-900 p-6 rounded-2xl border border-gray-200/50 dark:border-gray-800">
                <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                  {t('about.tech.django')}
                </p>
              </div>
              <div className="bg-white dark:bg-gray-900 p-6 rounded-2xl border border-gray-200/50 dark:border-gray-800">
                <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                  {t('about.tech.fastapi')}
                </p>
              </div>
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
            <p className="text-center text-gray-600 dark:text-gray-400 mb-6 max-w-2xl mx-auto">
              {t('about.approach.desc')}
            </p>
            <div className="space-y-4">
              <div className="bg-white dark:bg-gray-900 py-3 sm:py-4 px-4 sm:px-5 rounded-2xl border border-gray-200/50 dark:border-gray-800">
                <h4 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-2">
                  {t('about.approach.clean')}
                </h4>
                <p className="text-gray-600 dark:text-gray-300 leading-relaxed text-sm sm:text-base">
                  {t('about.approach.cleanDesc')}
                </p>
              </div>
              <div className="bg-white dark:bg-gray-900 py-3 sm:py-4 px-4 sm:px-5 rounded-2xl border border-gray-200/50 dark:border-gray-800">
                <h4 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-2">
                  {t('about.approach.fast')}
                </h4>
                <p className="text-gray-600 dark:text-gray-300 leading-relaxed text-sm sm:text-base">
                  {t('about.approach.fastDesc')}
                </p>
              </div>
              <div className="bg-white dark:bg-gray-900 py-3 sm:py-4 px-4 sm:px-5 rounded-2xl border border-gray-200/50 dark:border-gray-800">
                <h4 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-2">
                  {t('about.approach.modern')}
                </h4>
                <p className="text-gray-600 dark:text-gray-300 leading-relaxed text-sm sm:text-base">
                  {t('about.approach.modernDesc')}
                </p>
              </div>
              <div className="bg-white dark:bg-gray-900 py-3 sm:py-4 px-4 sm:px-5 rounded-2xl border border-gray-200/50 dark:border-gray-800">
                <h4 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-2">
                  {t('about.approach.detail')}
                </h4>
                <p className="text-gray-600 dark:text-gray-300 leading-relaxed text-sm sm:text-base">
                  {t('about.approach.detailDesc')}
                </p>
              </div>
              <div className="bg-white dark:bg-gray-900 py-3 sm:py-4 px-4 sm:px-5 rounded-2xl border border-gray-200/50 dark:border-gray-800">
                <h4 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-2">
                  {t('about.approach.market')}
                </h4>
                <p className="text-gray-600 dark:text-gray-300 leading-relaxed text-sm sm:text-base">
                  {t('about.approach.marketDesc')}
                </p>
              </div>
              <div className="bg-white dark:bg-gray-900 py-3 sm:py-4 px-4 sm:px-5 rounded-2xl border border-gray-200/50 dark:border-gray-800">
                <h4 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-2">
                  {t('about.approach.handcrafted')}
                </h4>
                <p className="text-gray-600 dark:text-gray-300 leading-relaxed text-sm sm:text-base">
                  {t('about.approach.handcraftedDesc')}
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="mb-16 sm:mb-20 lg:mb-24 scroll-mt-24">
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
                  autoComplete="name"
                  required
                  disabled={status === 'loading'}
                  className={`w-full px-5 py-4 border-2 rounded-xl focus:outline-none focus:ring-2 transition-all duration-200 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 ${
                    errors.name
                      ? 'border-red-300 dark:border-red-700 focus:border-red-500 dark:focus:border-red-400 focus:ring-red-200 dark:focus:ring-red-900/30'
                      : 'border-gray-200 dark:border-gray-700 focus:border-blue-500 dark:focus:border-blue-400 focus:ring-blue-200 dark:focus:ring-blue-900/30'
                  } ${status === 'loading' ? 'opacity-50 cursor-not-allowed' : ''}`}
                  placeholder={t('contact.form.namePlaceholder') || 'Введите ваше имя'}
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
                  autoComplete="email"
                  required
                  disabled={status === 'loading'}
                  className={`w-full px-5 py-4 border-2 rounded-xl focus:outline-none focus:ring-2 transition-all duration-200 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 ${
                    errors.email
                      ? 'border-red-300 dark:border-red-700 focus:border-red-500 dark:focus:border-red-400 focus:ring-red-200 dark:focus:ring-red-900/30'
                      : 'border-gray-200 dark:border-gray-700 focus:border-blue-500 dark:focus:border-blue-400 focus:ring-blue-200 dark:focus:ring-blue-900/30'
                  } ${status === 'loading' ? 'opacity-50 cursor-not-allowed' : ''}`}
                  placeholder={t('contact.form.emailPlaceholder') || 'your@email.com'}
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
                  autoComplete="off"
                  rows={6}
                  required
                  disabled={status === 'loading'}
                  className={`w-full px-5 py-4 border-2 rounded-xl focus:outline-none focus:ring-2 transition-all duration-200 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 resize-none ${
                    errors.message
                      ? 'border-red-300 dark:border-red-700 focus:border-red-500 dark:focus:border-red-400 focus:ring-red-200 dark:focus:ring-red-900/30'
                      : 'border-gray-200 dark:border-gray-700 focus:border-blue-500 dark:focus:border-blue-400 focus:ring-blue-200 dark:focus:ring-blue-900/30'
                  } ${status === 'loading' ? 'opacity-50 cursor-not-allowed' : ''}`}
                  placeholder={t('contact.form.messagePlaceholder') || 'Опишите ваш проект или задайте вопрос...'}
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
                  t('contact.form.submit') || 'Отправить сообщение'
                )}
              </button>
            </form>
          </div>
        </div>
      </section>
    </>
  );
}
