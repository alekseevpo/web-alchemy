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
    if (isVisible) {
      document.body.style.paddingBottom = '180px'; // Отступ для баннера
    } else {
      document.body.style.paddingBottom = '';
    }
    
    return () => {
      document.body.style.paddingBottom = '';
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
    <div className="fixed bottom-0 left-0 right-0 z-50 p-4 sm:p-6 animate-[slideUp_0.3s_ease-out]">
      <div className="max-w-7xl mx-auto">
        <div className="ui-glass-menu rounded-2xl p-6 sm:p-8 shadow-2xl border border-gray-200/50 dark:border-gray-800">
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
            <div className="flex-1">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-2">
                {t('cookieConsent.title') || 'Мы используем cookies'}
              </h3>
              <p className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed">
                {t('cookieConsent.description') || 'Этот сайт использует cookies для улучшения работы сайта и анализа трафика. '}
                <Link
                  href="/cookies"
                  className="text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 underline transition-colors"
                >
                  {t('cookieConsent.learnMore') || 'Узнать больше'}
                </Link>
              </p>
            </div>
            <div className="flex flex-col sm:flex-row gap-3 sm:gap-4">
              <button
                onClick={handleDecline}
                className="px-6 py-3 border-2 border-gray-300 dark:border-gray-700 text-gray-700 dark:text-gray-300 rounded-lg hover:border-gray-900 dark:hover:border-gray-100 hover:bg-gray-50 dark:hover:bg-gray-900 transition-all duration-200 font-medium whitespace-nowrap"
              >
                {t('cookieConsent.decline') || 'Отклонить'}
              </button>
              <button
                onClick={handleAccept}
                className="px-6 py-3 bg-gray-900 dark:bg-gray-100 text-white dark:text-gray-900 rounded-lg hover:bg-gray-800 dark:hover:bg-gray-200 transition-all duration-200 font-medium shadow-lg hover:shadow-xl hover:scale-[1.02] active:scale-[0.98] whitespace-nowrap"
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
