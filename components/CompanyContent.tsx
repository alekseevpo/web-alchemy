'use client';

import { useState, FormEvent, useEffect, useRef } from 'react';
import Image from 'next/image';
import { useLanguage } from '@/lib/i18n/LanguageContext';
import { useRecaptcha } from '@/hooks/useRecaptcha';

type FormStatus = 'idle' | 'loading' | 'success' | 'error';

export function CompanyContent() {
  const { t } = useLanguage();
  const [status, setStatus] = useState<FormStatus>('idle');
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isDropdownOpen, setIsDropdownOpen] = useState<boolean>(false);
  const [isServiceDropdownOpen, setIsServiceDropdownOpen] = useState<boolean>(false);
  const [selectedService, setSelectedService] = useState<string>('');
  const { isReady, isAvailable, executeRecaptcha } = useRecaptcha();
  const serviceDropdownRef = useRef<HTMLDivElement>(null);
  
  // Закрываем выпадающее меню при клике вне его
  useEffect(() => {
    if (!isDropdownOpen) return;
    
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as HTMLElement;
      const dropdown = document.querySelector('.contact-dropdown');
      if (dropdown && !dropdown.contains(target)) {
        setIsDropdownOpen(false);
      }
    };
    
    document.addEventListener('mousedown', handleClickOutside);
    
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isDropdownOpen]);

  // Закрываем выпадающее меню услуг при клике вне его
  useEffect(() => {
    if (!isServiceDropdownOpen) return;
    
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as HTMLElement;
      if (serviceDropdownRef.current && !serviceDropdownRef.current.contains(target)) {
        setIsServiceDropdownOpen(false);
      }
    };
    
    document.addEventListener('mousedown', handleClickOutside);
    
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isServiceDropdownOpen]);

  const services = [
    { value: '', label: t('contact.form.servicePlaceholder') || 'Выберите услугу' },
    { value: 'webapp', label: t('services.webapp.title') || 'Веб-приложения' },
    { value: 'businesscard', label: t('services.businesscard.title') || 'Сайты-визитки' },
    { value: 'landing', label: t('services.landing.title') || 'Landing-страницы' },
    { value: 'corporate', label: t('services.corporate.title') || 'Корпоративные сайты' },
    { value: 'support', label: t('services.support.title') || 'Техническая поддержка' },
    { value: 'specification', label: t('services.specification.title') || 'Разработка технического задания' },
    { value: 'onlineStore', label: t('services.onlineStore.title') || 'Онлайн магазин' },
    { value: 'bot', label: t('services.bot.title') || 'Разработка ботов' },
    { value: 'other', label: t('contact.form.serviceOther') || 'Другое' },
  ];

  const validateForm = (formData: FormData): Record<string, string> => {
    const newErrors: Record<string, string> = {};
    
    const name = formData.get('name')?.toString().trim() || '';
    const email = formData.get('email')?.toString().trim() || '';
    const message = formData.get('message')?.toString().trim() || '';
    const service = selectedService || formData.get('service')?.toString().trim() || '';

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

    if (!service) {
      newErrors.service = t('form.error.serviceRequired') || 'Выберите услугу';
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
      // Проверка reCAPTCHA v3 (если доступна)
      let recaptchaVerified = true;
      if (isAvailable && isReady) {
        const recaptchaToken = await executeRecaptcha('contact');
        
        if (recaptchaToken) {
          // Отправляем токен на сервер для проверки
          const verifyResponse = await fetch('/api/verify-recaptcha', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({ token: recaptchaToken }),
          });

          const verifyData = await verifyResponse.json();
          recaptchaVerified = verifyData.success;

          if (!recaptchaVerified) {
            setErrors({
              general: t('form.error.recaptchaFailed') || 'Проверка reCAPTCHA не пройдена. Попробуйте еще раз.',
            });
            setStatus('idle');
            return;
          }
        } else {
          // Если reCAPTCHA не настроена, продолжаем без проверки
          console.warn('reCAPTCHA токен не получен, продолжаем без проверки');
        }
      }

      // Здесь будет реальная отправка данных
      // Пока имитируем отправку
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      setStatus('success');
      (e.target as HTMLFormElement).reset();
      setSelectedService('');
      
      // Сбрасываем статус через 5 секунд
      setTimeout(() => {
        setStatus('idle');
      }, 5000);
    } catch (error) {
      console.error('Ошибка отправки формы:', error);
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
        <div className="fixed inset-0 w-full h-full z-0 pointer-events-none">
          <Image
            src="/logo.png"
            alt="Web-Alchemy Logo"
            fill
            className="object-cover logo-transparent"
            style={{ backgroundColor: 'transparent' }}
            priority={false}
            loading="lazy"
            onLoad={(e) => {
              // Плавно показываем логотип после загрузки
              e.currentTarget.classList.add('loaded');
            }}
            onError={() => {
              // Скрываем изображение при ошибке загрузки через CSS
              // Обработка через onError может быть ограничена для next/image
            }}
          />
        </div>
        <div className="mist-effect relative w-full">
          <h2 className="hero-title-responsive font-bold tracking-tight text-gray-900 dark:text-gray-100 mb-10 sm:mb-12 md:mb-14 lg:mb-16 text-center mx-auto relative z-10 break-words whitespace-nowrap">
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
          {t('hero.titlePart1')}<br />
          {t('hero.titlePart2')}{' '}
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
                <label htmlFor="contact-name" className="flex items-center gap-2 text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                  </svg>
                  {t('contact.form.name') || 'Ваше имя'}
                </label>
                <input 
                  type="text" 
                  id="contact-name"
                  name="name"
                  autoComplete="name"
                  required
                  disabled={status === 'loading'}
                  className={`w-full px-5 py-4 border-2 rounded-xl focus:outline-none focus:ring-2 transition-all duration-200 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 placeholder:text-gray-400 dark:placeholder:text-gray-500 ${
                    errors.name
                      ? 'border-red-300 dark:border-red-700 focus:border-red-500 dark:focus:border-red-400 focus:ring-red-200 dark:focus:ring-red-900/30'
                      : 'border-gray-200 dark:border-gray-700 focus:border-blue-500 dark:focus:border-blue-400 focus:ring-blue-200 dark:focus:ring-blue-900/30 hover:border-gray-300 dark:hover:border-gray-600'
                  } ${status === 'loading' ? 'opacity-50 cursor-not-allowed' : ''}`}
                  placeholder={t('contact.form.namePlaceholder') || 'Введите ваше имя'}
                  aria-invalid={!!errors.name}
                  aria-describedby={errors.name ? 'contact-name-error' : undefined}
                />
                {errors.name && (
                  <p id="contact-name-error" className="mt-1 text-sm text-red-600 dark:text-red-400 flex items-center gap-1" role="alert">
                    <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                    </svg>
                    {errors.name}
                  </p>
                )}
              </div>
              <div>
                <label htmlFor="contact-email" className="flex items-center gap-2 text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                  {t('contact.form.email') || 'Email'}
                </label>
                <input 
                  type="email" 
                  id="contact-email"
                  name="email"
                  autoComplete="email"
                  required
                  disabled={status === 'loading'}
                  className={`w-full px-5 py-4 border-2 rounded-xl focus:outline-none focus:ring-2 transition-all duration-200 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 placeholder:text-gray-400 dark:placeholder:text-gray-500 ${
                    errors.email
                      ? 'border-red-300 dark:border-red-700 focus:border-red-500 dark:focus:border-red-400 focus:ring-red-200 dark:focus:ring-red-900/30'
                      : 'border-gray-200 dark:border-gray-700 focus:border-blue-500 dark:focus:border-blue-400 focus:ring-blue-200 dark:focus:ring-blue-900/30 hover:border-gray-300 dark:hover:border-gray-600'
                  } ${status === 'loading' ? 'opacity-50 cursor-not-allowed' : ''}`}
                  placeholder={t('contact.form.emailPlaceholder') || 'your@email.com'}
                  aria-invalid={!!errors.email}
                  aria-describedby={errors.email ? 'contact-email-error' : undefined}
                />
                {errors.email && (
                  <p id="contact-email-error" className="mt-1 text-sm text-red-600 dark:text-red-400 flex items-center gap-1" role="alert">
                    <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                    </svg>
                    {errors.email}
                  </p>
                )}
              </div>
              <div className="relative service-dropdown" ref={serviceDropdownRef}>
                <label htmlFor="contact-service" className="flex items-center gap-2 text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                  </svg>
                  {t('contact.form.service') || 'Услуга'}
                </label>
                <button
                  type="button"
                  onClick={() => setIsServiceDropdownOpen(!isServiceDropdownOpen)}
                  disabled={status === 'loading'}
                  className={`w-full px-5 py-4 border-2 rounded-xl focus:outline-none focus:ring-2 transition-all duration-200 text-left bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm text-base text-gray-900 dark:text-gray-100 flex items-center justify-between ${
                    errors.service
                      ? 'border-red-300 dark:border-red-700 focus:border-red-500 dark:focus:border-red-400 focus:ring-red-200 dark:focus:ring-red-900/30'
                      : 'border-gray-200 dark:border-gray-700 focus:border-blue-500 dark:focus:border-blue-400 focus:ring-blue-200 dark:focus:ring-blue-900/30 hover:border-gray-300 dark:hover:border-gray-600'
                  } ${status === 'loading' ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'}`}
                  aria-invalid={!!errors.service}
                  aria-describedby={errors.service ? 'contact-service-error' : undefined}
                  aria-expanded={isServiceDropdownOpen}
                >
                  <span className={selectedService ? '' : 'text-gray-400 dark:text-gray-500'}>
                    {selectedService ? services.find(s => s.value === selectedService)?.label : (t('contact.form.servicePlaceholder') || 'Выберите услугу')}
                  </span>
                  <svg 
                    className={`w-5 h-5 transition-transform duration-200 ${isServiceDropdownOpen ? 'rotate-180' : ''}`} 
                    fill="none" 
                    stroke="currentColor" 
                    viewBox="0 0 24 24"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </button>
                {/* Скрытое поле для формы */}
                <input type="hidden" name="service" value={selectedService} required />
                {isServiceDropdownOpen && (
                  <div className="dropdown-menu ui-glass-menu absolute left-0 right-0 mt-2 rounded-xl overflow-hidden z-50 shadow-xl max-h-[300px] overflow-y-auto">
                    {services.map((service) => (
                      <button
                        key={service.value}
                        type="button"
                        onClick={() => {
                          setSelectedService(service.value);
                          setIsServiceDropdownOpen(false);
                        }}
                        className={`w-full flex items-center gap-2 px-5 py-3.5 text-base transition-colors ${
                          selectedService === service.value
                            ? 'bg-blue-500/10 text-blue-700 dark:text-blue-300 font-medium'
                            : service.value === ''
                            ? 'text-gray-400 dark:text-gray-500 hover:bg-black/5 dark:hover:bg-white/10'
                            : 'text-gray-700 dark:text-gray-300 hover:bg-black/5 dark:hover:bg-white/10'
                        }`}
                      >
                        <span className="flex-1 text-left">{service.label}</span>
                        {selectedService === service.value && service.value !== '' && (
                          <svg className="w-5 h-5 text-blue-600 dark:text-blue-400 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                          </svg>
                        )}
                      </button>
                    ))}
                  </div>
                )}
                {errors.service && (
                  <p id="contact-service-error" className="mt-1 text-sm text-red-600 dark:text-red-400 flex items-center gap-1" role="alert">
                    <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                    </svg>
                    {errors.service}
                  </p>
                )}
              </div>
              <div>
                <label htmlFor="contact-message" className="flex items-center gap-2 text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                  </svg>
                  {t('contact.form.message') || 'Сообщение'}
                </label>
                <textarea 
                  id="contact-message"
                  name="message"
                  autoComplete="off"
                  rows={6}
                  required
                  disabled={status === 'loading'}
                  className={`w-full px-5 py-4 pt-4 border-2 rounded-xl focus:outline-none focus:ring-2 transition-all duration-200 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 resize-none placeholder:text-gray-400 dark:placeholder:text-gray-500 ${
                    errors.message
                      ? 'border-red-300 dark:border-red-700 focus:border-red-500 dark:focus:border-red-400 focus:ring-red-200 dark:focus:ring-red-900/30'
                      : 'border-gray-200 dark:border-gray-700 focus:border-blue-500 dark:focus:border-blue-400 focus:ring-blue-200 dark:focus:ring-blue-900/30 hover:border-gray-300 dark:hover:border-gray-600'
                  } ${status === 'loading' ? 'opacity-50 cursor-not-allowed' : ''}`}
                  placeholder={t('contact.form.messagePlaceholder') || 'Опишите ваш проект или задайте вопрос...'}
                  aria-invalid={!!errors.message}
                  aria-describedby={errors.message ? 'contact-message-error' : undefined}
                ></textarea>
                {errors.message && (
                  <p id="contact-message-error" className="mt-1 text-sm text-red-600 dark:text-red-400 flex items-center gap-1" role="alert">
                    <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                    </svg>
                    {errors.message}
                  </p>
                )}
              </div>
              {errors.general && (
                <div className="p-4 bg-red-50 dark:bg-red-900/20 border-2 border-red-200 dark:border-red-800 rounded-xl">
                  <p className="text-sm text-red-600 dark:text-red-400 flex items-center gap-2" role="alert">
                    <svg className="w-5 h-5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                    </svg>
                    {errors.general}
                  </p>
                </div>
              )}
              <button 
                type="submit"
                disabled={status === 'loading'}
                className={`w-full sm:w-auto px-8 py-4 bg-gradient-to-r from-gray-900 to-gray-800 dark:from-gray-100 dark:to-gray-200 text-white dark:text-gray-900 rounded-xl transition-all duration-200 font-medium shadow-lg hover:shadow-xl flex items-center justify-center gap-2 ${
                  status === 'loading'
                    ? 'opacity-50 cursor-not-allowed'
                    : 'hover:from-gray-800 hover:to-gray-700 dark:hover:from-gray-200 dark:hover:to-gray-300 hover:scale-[1.02] active:scale-[0.98]'
                }`}
              >
                {status === 'loading' ? (
                  <>
                    <svg className="animate-spin h-5 w-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    {t('form.submitting') || 'Отправка...'}
                  </>
                ) : (
                  <>
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
                    </svg>
                    {t('contact.form.submit') || 'Отправить сообщение'}
                  </>
                )}
              </button>
              <div className="relative mt-4 contact-dropdown">
                <button
                  type="button"
                  onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                  className="w-full sm:w-auto px-8 py-4 bg-gray-100 dark:bg-gray-800 text-gray-900 dark:text-gray-100 rounded-xl transition-all duration-200 font-medium shadow-md hover:shadow-lg flex items-center justify-center gap-2 hover:bg-gray-200 dark:hover:bg-gray-700"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                  </svg>
                  {t('contact.form.write') || 'Написать'}
                  <svg 
                    className={`w-4 h-4 transition-transform duration-200 ${isDropdownOpen ? 'rotate-180' : ''}`} 
                    fill="none" 
                    stroke="currentColor" 
                    viewBox="0 0 24 24"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </button>
                {isDropdownOpen && (
                  <div className="absolute top-full left-0 mt-2 w-full sm:w-auto bg-white dark:bg-gray-900 rounded-xl shadow-xl border border-gray-200 dark:border-gray-800 overflow-hidden z-50">
                    <a
                      href="https://wa.me/34624682795"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-3 px-6 py-4 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
                      onClick={() => setIsDropdownOpen(false)}
                    >
                      <svg className="w-5 h-5 text-green-600 dark:text-green-400" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
                      </svg>
                      {t('contact.whatsapp') || 'WhatsApp'}
                    </a>
                    <a
                      href="https://t.me/ppmtrue"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-3 px-6 py-4 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
                      onClick={() => setIsDropdownOpen(false)}
                    >
                      <svg className="w-5 h-5 text-blue-600 dark:text-blue-400" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M11.944 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 12 0a12 12 0 0 0-.056 0zm4.962 7.224c.1-.002.321.023.465.14a.506.506 0 0 1 .171.325c.016.093.036.306.02.472-.18 1.898-.962 6.502-1.36 8.627-.168.9-.499 1.201-.82 1.23-.696.065-1.225-.46-1.9-.902-1.056-.693-1.653-1.124-2.678-1.8-1.185-.78-.417-1.21.258-1.91.177-.184 3.247-2.977 3.307-3.23.007-.032.014-.15-.056-.212s-.174-.041-.249-.024c-.106.024-1.793 1.14-5.061 3.345-.48.33-.913.49-1.302.48-.428-.008-1.252-.241-1.865-.44-.752-.245-1.349-.374-1.297-.789.027-.216.325-.437.893-.663 3.498-1.524 5.83-2.529 6.998-3.014 3.332-1.386 4.025-1.627 4.476-1.635z"/>
                      </svg>
                      {t('contact.telegram') || 'Telegram'}
                    </a>
                    <a
                      href="mailto:alekseevpo@gmail.com"
                      className="flex items-center gap-3 px-6 py-4 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
                      onClick={() => setIsDropdownOpen(false)}
                    >
                      <svg className="w-5 h-5 text-gray-600 dark:text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                      </svg>
                      {t('contact.email') || 'Email'}
                    </a>
                  </div>
                )}
              </div>
            </form>
          </div>
        </div>
      </section>
    </>
  );
}
