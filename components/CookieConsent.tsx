'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useLanguage } from '@/lib/i18n/LanguageContext';

export function CookieConsent() {
  const [isVisible, setIsVisible] = useState(false);
  const { t } = useLanguage();

  useEffect(() => {
    // Проверяем, было ли уже принято согласие
    const consent = localStorage.getItem('cookie-consent');
    if (!consent) {
      // Показываем баннер с небольшой задержкой для лучшего UX
      const timer = setTimeout(() => {
        setIsVisible(true);
      }, 1000);
      return () => clearTimeout(timer);
    }
  }, []);

  useEffect(() => {
    // Добавляем/убираем padding-bottom для body когда баннер виден
    // Учитываем высоту баннера + отступ для кнопок навигации (bottom-24 = 96px)
    if (isVisible) {
      const isMobile = window.innerWidth < 1024; // lg breakpoint
      if (isMobile) {
        document.body.style.paddingBottom = '240px'; // Больше отступ для мобильных (баннер ~140px + кнопки ~100px)
      } else {
        document.body.style.paddingBottom = '180px'; // Отступ для десктопа
      }
    } else {
      document.body.style.paddingBottom = '';
    }
    
    const handleResize = () => {
      if (isVisible) {
        const isMobile = window.innerWidth < 1024;
        if (isMobile) {
          document.body.style.paddingBottom = '240px';
        } else {
          document.body.style.paddingBottom = '180px';
        }
      }
    };
    
    window.addEventListener('resize', handleResize);
    
    return () => {
      document.body.style.paddingBottom = '';
      window.removeEventListener('resize', handleResize);
    };
  }, [isVisible]);

  const handleAccept = () => {
    localStorage.setItem('cookie-consent', 'accepted');
    localStorage.setItem('cookie-consent-date', new Date().toISOString());
    setIsVisible(false);
  };

  const handleDecline = () => {
    localStorage.setItem('cookie-consent', 'declined');
    localStorage.setItem('cookie-consent-date', new Date().toISOString());
    setIsVisible(false);
  };

  if (!isVisible) {
    return null;
  }

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 p-3 sm:p-4 lg:p-6 animate-[slideUp_0.3s_ease-out] pb-safe">
      <div className="max-w-7xl mx-auto">
        <div className="ui-glass-menu rounded-xl sm:rounded-2xl p-4 sm:p-6 lg:p-8 shadow-2xl border border-gray-200/50 dark:border-gray-800">
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-3 sm:gap-4">
            <div className="flex-1">
              <h3 className="text-base sm:text-lg font-semibold text-gray-900 dark:text-gray-100 mb-1 sm:mb-2">
                {t('cookieConsent.title') || 'Мы используем cookies'}
              </h3>
              <p className="text-xs sm:text-sm text-gray-600 dark:text-gray-400 leading-relaxed">
                {t('cookieConsent.description') || 'Этот сайт использует cookies для улучшения работы сайта и анализа трафика. '}
                <Link
                  href="/cookies"
                  className="text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 underline transition-colors break-keep"
                >
                  {t('cookieConsent.learnMore') || 'Узнать больше'}
                </Link>
              </p>
            </div>
            <div className="flex flex-col sm:flex-row gap-2 sm:gap-3 lg:gap-4 flex-shrink-0">
              <button
                onClick={handleDecline}
                className="px-4 sm:px-6 py-2.5 sm:py-3 border-2 border-gray-300 dark:border-gray-700 text-gray-700 dark:text-gray-300 rounded-lg hover:border-gray-900 dark:hover:border-gray-100 hover:bg-gray-50 dark:hover:bg-gray-900 transition-all duration-200 font-medium whitespace-nowrap text-sm sm:text-base min-h-[44px] flex items-center justify-center"
              >
                {t('cookieConsent.decline') || 'Отклонить'}
              </button>
              <button
                onClick={handleAccept}
                className="px-4 sm:px-6 py-2.5 sm:py-3 bg-gray-900 dark:bg-gray-100 text-white dark:text-gray-900 rounded-lg hover:bg-gray-800 dark:hover:bg-gray-200 transition-all duration-200 font-medium shadow-lg hover:shadow-xl hover:scale-[1.02] active:scale-[0.98] whitespace-nowrap text-sm sm:text-base min-h-[44px] flex items-center justify-center"
              >
                {t('cookieConsent.accept') || 'Принять'}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
