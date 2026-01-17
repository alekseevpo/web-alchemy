'use client';

import { useState, FormEvent, useEffect } from 'react';
import { useLanguage } from '@/lib/i18n/LanguageContext';

type FormStatus = 'idle' | 'loading' | 'success' | 'error';

export function CompanyContent() {
  const { t } = useLanguage();
  const [status, setStatus] = useState<FormStatus>('idle');
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [currentSlide, setCurrentSlide] = useState(2); // Начинаем с середины (2 из 5 слайдов)
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768); // md breakpoint
    };
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

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
        <h2 className="text-3xl sm:text-4xl md:text-5xl font-light text-gray-900 dark:text-gray-100 mb-12 sm:mb-16 text-center">
          {t('services.title')}
        </h2>
        
        {/* Slider Container - 3D Carousel */}
        <div className="relative">
          {/* Slides Wrapper with 3D perspective */}
          <div 
            className="relative overflow-visible rounded-3xl"
            style={{ 
              perspective: '1500px',
              perspectiveOrigin: 'center center',
              height: '600px'
            }}
          >
            <div 
              className="flex transition-transform duration-700 ease-in-out"
              style={{ 
                transform: `translateX(-${currentSlide * 100}%)`,
                transformStyle: 'preserve-3d'
              }}
            >
              {/* WebApp Card */}
              <div 
                className="min-w-full px-2 sm:px-4 transition-all duration-700 ease-in-out"
                style={{
                  transform: `translateZ(${currentSlide === 0 ? 100 : -200}px) rotateY(${(currentSlide - 0) * 35}deg) scale(${currentSlide === 0 ? 1 : 0.85})`,
                  opacity: currentSlide === 0 ? 1 : Math.max(0.5, 1 - Math.abs(currentSlide - 0) * 0.25),
                  filter: currentSlide === 0 ? 'blur(0px)' : `blur(${Math.abs(currentSlide - 0) * 2}px)`
                }}
              >
                <div className="group relative bg-white dark:bg-gray-900 p-8 sm:p-10 rounded-3xl shadow-lg transition-all duration-500 border-2 border-gray-200/50 dark:border-gray-800 hover:border-blue-400 dark:hover:border-blue-600 overflow-hidden md:h-[524px] md:flex md:flex-col">
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
              </div>

              {/* Business Card Website */}
              <div 
                className="min-w-full px-2 sm:px-4 transition-all duration-700 ease-in-out"
                style={{
                  transform: `translateZ(${currentSlide === 1 ? 100 : -200}px) rotateY(${(currentSlide - 1) * 35}deg) scale(${currentSlide === 1 ? 1 : 0.85})`,
                  opacity: currentSlide === 1 ? 1 : Math.max(0.5, 1 - Math.abs(currentSlide - 1) * 0.25),
                  filter: currentSlide === 1 ? 'blur(0px)' : `blur(${Math.abs(currentSlide - 1) * 2}px)`
                }}
              >
                <div className="group relative bg-white dark:bg-gray-900 p-8 sm:p-10 rounded-3xl shadow-lg transition-all duration-500 border-2 border-gray-200/50 dark:border-gray-800 hover:border-purple-400 dark:hover:border-purple-600 overflow-hidden md:h-[524px] md:flex md:flex-col">
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
              </div>

              {/* Landing Pages Card */}
              <div 
                className="min-w-full px-2 sm:px-4 transition-all duration-700 ease-in-out"
                style={{
                  transform: `translateZ(${currentSlide === 2 ? 100 : -200}px) rotateY(${(currentSlide - 2) * 35}deg) scale(${currentSlide === 2 ? 1 : 0.85})`,
                  opacity: currentSlide === 2 ? 1 : Math.max(0.5, 1 - Math.abs(currentSlide - 2) * 0.25),
                  filter: currentSlide === 2 ? 'blur(0px)' : `blur(${Math.abs(currentSlide - 2) * 2}px)`
                }}
              >
                <div className="group relative bg-white dark:bg-gray-900 p-8 sm:p-10 rounded-3xl shadow-lg transition-all duration-500 border-2 border-gray-200/50 dark:border-gray-800 hover:border-emerald-400 dark:hover:border-emerald-600 overflow-hidden md:h-[524px] md:flex md:flex-col">
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

              {/* Corporate Websites Card */}
              <div 
                className="min-w-full px-2 sm:px-4 transition-all duration-700 ease-in-out"
                style={{
                  transform: `translateZ(${currentSlide === 3 ? 100 : -200}px) rotateY(${(currentSlide - 3) * 35}deg) scale(${currentSlide === 3 ? 1 : 0.85})`,
                  opacity: currentSlide === 3 ? 1 : Math.max(0.5, 1 - Math.abs(currentSlide - 3) * 0.25),
                  filter: currentSlide === 3 ? 'blur(0px)' : `blur(${Math.abs(currentSlide - 3) * 2}px)`
                }}
              >
                <div className="group relative bg-white dark:bg-gray-900 p-8 sm:p-10 rounded-3xl shadow-lg transition-all duration-500 border-2 border-gray-200/50 dark:border-gray-800 hover:border-orange-400 dark:hover:border-orange-600 overflow-hidden md:h-[524px] md:flex md:flex-col">
            {/* Gradient overlay on hover */}
            <div className="absolute inset-0 bg-gradient-to-br from-orange-50/0 via-orange-50/0 to-orange-50/0 dark:from-orange-900/0 dark:via-orange-900/0 dark:to-orange-900/0 group-hover:from-orange-50/30 group-hover:via-orange-50/20 group-hover:to-orange-50/10 dark:group-hover:from-orange-900/20 dark:group-hover:via-orange-900/10 dark:group-hover:to-orange-900/5 transition-all duration-500 rounded-3xl pointer-events-none"></div>
            
            {/* Icon container with background */}
            <div className="relative mb-6">
              <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-orange-500 to-orange-600 dark:from-orange-400 dark:to-orange-500 flex items-center justify-center transform group-hover:scale-110 group-hover:rotate-3 transition-all duration-500 shadow-lg group-hover:shadow-orange-500/50">
                <span className="text-3xl">🏢</span>
              </div>
            </div>
            
            <h3 className="relative text-xl font-bold text-gray-900 dark:text-gray-100 mb-4 group-hover:text-orange-600 dark:group-hover:text-orange-400 transition-colors duration-300">
              {t('services.corporate.title')}
            </h3>
                  <p className="relative text-gray-600 dark:text-gray-300 leading-relaxed text-base">
                    {t('services.corporate.desc')}
                  </p>
                </div>
              </div>

              {/* Technical Support Card */}
              <div 
                className="min-w-full px-2 sm:px-4 transition-all duration-700 ease-in-out"
                style={{
                  transform: `translateZ(${currentSlide === 4 ? 100 : -200}px) rotateY(${(currentSlide - 4) * 35}deg) scale(${currentSlide === 4 ? 1 : 0.85})`,
                  opacity: currentSlide === 4 ? 1 : Math.max(0.5, 1 - Math.abs(currentSlide - 4) * 0.25),
                  filter: currentSlide === 4 ? 'blur(0px)' : `blur(${Math.abs(currentSlide - 4) * 2}px)`
                }}
              >
                <div className="group relative bg-white dark:bg-gray-900 p-8 sm:p-10 rounded-3xl shadow-lg transition-all duration-500 border-2 border-gray-200/50 dark:border-gray-800 hover:border-indigo-400 dark:hover:border-indigo-600 overflow-hidden md:h-[524px] md:flex md:flex-col">
            {/* Gradient overlay on hover */}
            <div className="absolute inset-0 bg-gradient-to-br from-indigo-50/0 via-indigo-50/0 to-indigo-50/0 dark:from-indigo-900/0 dark:via-indigo-900/0 dark:to-indigo-900/0 group-hover:from-indigo-50/30 group-hover:via-indigo-50/20 group-hover:to-indigo-50/10 dark:group-hover:from-indigo-900/20 dark:group-hover:via-indigo-900/10 dark:group-hover:to-indigo-900/5 transition-all duration-500 rounded-3xl pointer-events-none"></div>
            
            {/* Icon container with background */}
            <div className="relative mb-6">
              <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-indigo-500 to-indigo-600 dark:from-indigo-400 dark:to-indigo-500 flex items-center justify-center transform group-hover:scale-110 group-hover:rotate-3 transition-all duration-500 shadow-lg group-hover:shadow-indigo-500/50">
                <span className="text-3xl">🔧</span>
              </div>
            </div>
            
            <h3 className="relative text-xl font-bold text-gray-900 dark:text-gray-100 mb-4 group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors duration-300">
              {t('services.support.title')}
            </h3>
                  <p className="relative text-gray-600 dark:text-gray-300 leading-relaxed text-base">
                    {t('services.support.desc')}
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Navigation Buttons */}
          <button
            onClick={() => setCurrentSlide((prev) => (prev - 1 + 5) % 5)}
            className="absolute -left-4 top-1/2 -translate-y-1/2 z-10 ui-glass-btn w-10 h-10 rounded-lg flex items-center justify-center hover:scale-110 active:scale-95 transition-transform"
            aria-label="Предыдущий слайд"
          >
            <svg className="w-5 h-5 text-gray-700 dark:text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
          </button>
          <button
            onClick={() => setCurrentSlide((prev) => (prev + 1) % 5)}
            className="absolute -right-4 top-1/2 -translate-y-1/2 z-10 ui-glass-btn w-10 h-10 rounded-lg flex items-center justify-center hover:scale-110 active:scale-95 transition-transform"
            aria-label="Следующий слайд"
          >
            <svg className="w-5 h-5 text-gray-700 dark:text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </button>

          {/* Dots Indicator */}
          <div className="flex justify-center gap-2 mt-8">
            {[0, 1, 2, 3, 4].map((index) => (
              <button
                key={index}
                onClick={() => setCurrentSlide(index)}
                className={`w-2 h-2 rounded-full transition-all duration-300 ${
                  currentSlide === index
                    ? 'bg-gray-900 dark:bg-gray-100 w-8'
                    : 'bg-gray-300 dark:bg-gray-700 hover:bg-gray-400 dark:hover:bg-gray-600'
                }`}
                aria-label={`Перейти к слайду ${index + 1}`}
              />
            ))}
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
