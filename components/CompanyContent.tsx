'use client';

import { useState, FormEvent, useEffect, useRef } from 'react';
import Image from 'next/image';
import { useLanguage } from '@/lib/i18n/LanguageContext';
import { useRecaptcha } from '@/hooks/useRecaptcha';
import { ScrollAnimatedButton } from '@/components/ScrollAnimatedButton';

type FormStatus = 'idle' | 'loading' | 'success' | 'error';

export function CompanyContent() {
  const { t } = useLanguage();
  const [status, setStatus] = useState<FormStatus>('idle');
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isServiceDropdownOpen, setIsServiceDropdownOpen] = useState<boolean>(false);
  const [selectedService, setSelectedService] = useState<string>('');
  const [openApproachIndex, setOpenApproachIndex] = useState<number | null>(null);
  const [visibleTechCards, setVisibleTechCards] = useState<Set<number>>(new Set());
  const { isReady, isAvailable, executeRecaptcha } = useRecaptcha();
  const serviceDropdownRef = useRef<HTMLDivElement>(null);
  const techCardsRef = useRef<(HTMLDivElement | null)[]>([]);

  const toggleApproachItem = (index: number) => {
    setOpenApproachIndex(openApproachIndex === index ? null : index);
  };

  // Intersection Observer для анимации блоков Technology Stack
  useEffect(() => {
    const observers = techCardsRef.current
      .filter((ref): ref is HTMLDivElement => ref !== null)
      .map((element, index) => {
        const observer = new IntersectionObserver(
          (entries) => {
            entries.forEach((entry) => {
              if (entry.isIntersecting) {
                setVisibleTechCards((prev) => new Set([...prev, index]));
              }
            });
          },
          { threshold: 0.1 }
        );
        observer.observe(element);
        return observer;
      });

    return () => {
      observers.forEach((observer) => observer.disconnect());
    };
  }, []);

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
      // Получаем токен reCAPTCHA (если доступна)
      const recaptchaToken = isAvailable && isReady ? await executeRecaptcha('contact') : null;

      // Отправка данных на сервер
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: formData.get('name'),
          email: formData.get('email'),
          service: selectedService || formData.get('service'),
          message: formData.get('message'),
          recaptchaToken: recaptchaToken || null,
        }),
      });

      const result = await response.json();

      if (!response.ok || !result.success) {
        throw new Error(result.message || 'Ошибка отправки сообщения');
      }
      
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
      <header className="min-h-screen flex items-start justify-center max-w-6xl mx-auto text-center pt-4 sm:pt-6 md:pt-8 lg:pt-12 px-4 relative">
        {/* Background Logo - вынесен из h2 для правильной загрузки */}
        <div className="fixed inset-0 w-full h-full z-0 pointer-events-none">
          <Image
            src="/logo.png"
            alt="Web-Alchemy Logo"
            fill
            sizes="100vw"
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
          <span className="inline-flex flex-wrap justify-center items-baseline relative z-10 gap-0 sm:gap-0">
            {/* Web - анимация падения мячика */}
            <span className="inline-flex">
              {'Web'.split('').map((char, index) => (
                <span
                  key={`web-${index}`}
                  className="inline-block ball-drop"
                  style={{
                    animationDelay: `${index * 0.15}s`,
                  }}
                >
                  {char}
                </span>
              ))}
            </span>
            {/* Alchemy - анимация печатной машинки */}
            <span className="inline-flex items-baseline">
              {'Alchemy'.split('').map((char, index) => (
                <span
                  key={`alchemy-${index}`}
                  className="inline-block typewriter-char"
                  style={{
                    animationDelay: `${0.6 + index * 0.1}s`,
                  }}
                >
                  {char}
                </span>
              ))}
              {/* Мигающий курсор только в конце */}
              <span 
                className="inline-block typewriter-cursor"
                style={{
                  animationDelay: `${0.6 + 'Alchemy'.length * 0.1 + 0.1}s`,
                }}
              >
                |
              </span>
            </span>
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
        <p className="text-sm sm:text-base md:text-lg lg:text-xl text-gray-700 dark:text-gray-300 mb-6 sm:mb-8 md:mb-10 mt-4 sm:mt-6 md:mt-8 px-2 tagline-text">
          {t('header.tagline')}
        </p>
        
        {/* Контейнер для кнопок */}
        <div className="flex flex-col items-center gap-6 mt-12 sm:mt-16 md:mt-20 lg:mt-16 xl:mt-12">
          {/* Круглая анимированная кнопка "Let's talk!" */}
          <div className="relative">
            <ScrollAnimatedButton />
          </div>
          
          {/* Кнопка "Наши услуги" */}
          <a 
            href="/services" 
            className="inline-flex items-center justify-center px-6 sm:px-8 py-3.5 min-w-[180px] min-h-[44px] border-2 border-gray-300 dark:border-gray-700 text-gray-900 dark:text-gray-100 rounded-lg hover:border-gray-900 dark:hover:border-gray-100 hover:bg-gray-50 dark:hover:bg-gray-900 transition-all duration-200 font-medium hover:scale-[1.02] active:scale-[0.98] mt-8 sm:mt-12 md:mt-16"
          >
            {t('hero.cta.secondary')}
          </a>
        </div>
        </div>
      </header>

      {/* Разделитель между Hero и About секциями */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 md:px-8 my-12 sm:my-16 md:my-20 lg:my-24">
        <div className="h-px bg-gradient-to-r from-transparent via-gray-300 dark:via-gray-700 to-transparent"></div>
      </div>

      {/* About Section */}
      <section id="about" className="-mt-40 sm:-mt-32 md:-mt-16 lg:mt-0 mb-16 sm:mb-20 lg:mb-24 scroll-mt-24">
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
              {[
                { key: 'python', index: 0 },
                { key: 'django', index: 1 },
                { key: 'fastapi', index: 2 },
                { key: 'typescript', index: 3 },
                { key: 'vue', index: 4 },
                { key: 'tailwind', index: 5 },
                { key: 'vite', index: 6 },
                { key: 'nextjs', index: 7 },
              ].map(({ key, index }) => {
                const isVisible = visibleTechCards.has(index);
                const isLeft = index % 2 === 0;
                
                return (
                  <div
                    key={key}
                    ref={(el) => {
                      techCardsRef.current[index] = el;
                    }}
                    className={`tech-card bg-white dark:bg-gray-900 p-6 rounded-2xl border border-gray-200/50 dark:border-gray-800 ${
                      isVisible ? 'visible' : isLeft ? 'animate-left' : 'animate-right'
                    }`}
                    style={{ transitionDelay: `${index * 0.1}s` }}
                  >
                    <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                      {t(`about.tech.${key}`)}
                    </p>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Our Approach Section */}
          <div className="max-w-4xl mx-auto -mt-8 sm:-mt-6 md:mt-0">
            <h3 className="text-2xl sm:text-3xl font-light text-gray-900 dark:text-gray-100 mb-2 text-center">
              {t('about.approach.title')}
            </h3>
            <p className="text-center text-gray-600 dark:text-gray-400 mb-3 max-w-2xl mx-auto">
              {t('about.approach.desc')}
            </p>
            <div className="space-y-3">
              {[
                { title: 'about.approach.clean', desc: 'about.approach.cleanDesc' },
                { title: 'about.approach.fast', desc: 'about.approach.fastDesc' },
                { title: 'about.approach.modern', desc: 'about.approach.modernDesc' },
                { title: 'about.approach.detail', desc: 'about.approach.detailDesc' },
                { title: 'about.approach.market', desc: 'about.approach.marketDesc' },
                { title: 'about.approach.handcrafted', desc: 'about.approach.handcraftedDesc' },
              ].map((item, index) => (
                <div
                  key={index}
                  className="bg-white dark:bg-gray-900 rounded-2xl border border-gray-200/50 dark:border-gray-800 overflow-hidden transition-all duration-300 hover:shadow-lg"
                >
                  <button
                    onClick={() => toggleApproachItem(index)}
                    className="w-full px-4 sm:px-6 py-2 sm:py-2.5 text-left flex items-center justify-between group min-h-[3rem] sm:min-h-[3.5rem]"
                  >
                    <h4 className="text-lg font-semibold text-gray-900 dark:text-gray-100 pr-4 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                      {t(item.title)}
                    </h4>
                    <svg
                      className="w-5 h-5 text-gray-500 dark:text-gray-400 flex-shrink-0 transition-transform duration-300"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      {openApproachIndex === index ? (
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 12H4" />
                      ) : (
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                      )}
                    </svg>
                  </button>
                  <div
                    className={`overflow-hidden transition-all duration-500 ease-in-out ${
                      openApproachIndex === index ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
                    }`}
                  >
                    <div className="px-4 sm:px-6 pb-2 sm:pb-3">
                      <p className="text-gray-600 dark:text-gray-300 leading-relaxed text-sm sm:text-base">
                        {t(item.desc)}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
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
            </form>
          </div>
        </div>
      </section>
    </>
  );
}
