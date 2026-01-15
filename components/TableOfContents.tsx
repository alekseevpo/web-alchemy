'use client';

import { useEffect, useState } from 'react';
import { useLanguage } from '@/lib/i18n/LanguageContext';

interface TocItem {
  id: string;
  titleKey: string;
  level: number;
}

const sections: TocItem[] = [
  { id: 'overview', titleKey: 'toc.section1', level: 1 },
  { id: 'tech-stack', titleKey: 'toc.section2', level: 1 },
  { id: 'b2b-platform', titleKey: 'toc.section3', level: 1 },
  { id: 'b2c-site', titleKey: 'toc.section4', level: 1 },
  { id: 'multilanguage', titleKey: 'toc.section5', level: 1 },
  { id: 'security', titleKey: 'toc.section6', level: 1 },
  { id: 'monetization', titleKey: 'toc.section7', level: 1 },
  { id: 'development-stages', titleKey: 'toc.section8', level: 1 },
  { id: 'additional', titleKey: 'toc.section9', level: 1 },
  { id: 'estimation', titleKey: 'toc.section10', level: 1 },
  { id: 'glossary', titleKey: 'toc.section11', level: 1 },
];

export function TableOfContents() {
  const [activeId, setActiveId] = useState<string>('');
  const [isOpen, setIsOpen] = useState(false);
  const { t } = useLanguage();

  // Блокировка скролла при открытом меню
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    
    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY + 150;

      for (let i = sections.length - 1; i >= 0; i--) {
        const element = document.getElementById(sections[i].id);
        if (element && element.offsetTop <= scrollPosition) {
          setActiveId(sections[i].id);
          break;
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll(); // Initial check

    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      const offset = 80;
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - offset;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth',
      });
      setIsOpen(false);
    }
  };

  return (
    <>
      {/* Мобильная кнопка */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="lg:hidden fixed bottom-20 right-6 z-50 bg-white/80 dark:bg-gray-900/80 backdrop-blur-[3px] border border-gray-200/50 dark:border-gray-700/50 text-gray-700 dark:text-gray-300 rounded-full p-4 shadow-lg transition-all duration-200 hover:bg-white dark:hover:bg-gray-800 hover:scale-105 active:scale-95"
        aria-label={t('nav.showNavigation')}
        aria-expanded={isOpen}
      >
        <svg
          className="w-6 h-6"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          {isOpen ? (
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M6 18L18 6M6 6l12 12"
            />
          ) : (
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M4 6h16M4 12h16M4 18h16"
            />
          )}
        </svg>
      </button>

      {/* Навигация */}
      <nav
        className={`
          ${isOpen 
            ? 'fixed inset-0 z-40' 
            : 'hidden lg:block lg:fixed lg:left-0 lg:top-0 lg:h-screen lg:w-64 lg:z-30'
          }
        `}
        aria-label={t('nav.sectionNavigation')}
      >
        {isOpen && (
          <>
            {/* Overlay */}
            <div 
              className="fixed inset-0 bg-black/50 backdrop-blur-sm"
              onClick={() => setIsOpen(false)}
            />
            {/* Меню навигации (мобильная версия) */}
            <div className="relative z-50 h-full overflow-y-auto p-4">
              <div className="max-w-md mx-auto mt-20 bg-white dark:bg-gray-900 rounded-xl p-4 shadow-lg border border-gray-200 dark:border-gray-800">
                <div className="flex items-center justify-between mb-3">
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100">
                    {t('toc.title')}
                  </h3>
                  <button
                    onClick={() => setIsOpen(false)}
                    className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
                    aria-label={t('nav.closeNavigation')}
                  >
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </button>
                </div>
                <ul className="space-y-1">
                  {sections.map((section) => (
                    <li key={section.id}>
                      <button
                        onClick={() => scrollToSection(section.id)}
                        className={`
                          w-full text-left px-3 py-2 rounded-lg text-sm transition-colors
                          hover:bg-gray-100 dark:hover:bg-gray-800
                          ${
                            activeId === section.id
                              ? 'bg-blue-50 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 font-medium'
                              : 'text-gray-700 dark:text-gray-300'
                          }
                        `}
                      >
                        {t(section.titleKey)}
                      </button>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </>
        )}
        {/* Десктопная версия - фиксированная слева */}
        {!isOpen && (
          <div className="lg:bg-white/80 dark:lg:bg-gray-900/80 lg:backdrop-blur-[3px] lg:border-r lg:border-gray-200/50 dark:lg:border-gray-700/50 lg:h-full lg:overflow-y-auto lg:p-6 lg:pt-24">
            <h3 className="text-sm font-semibold text-gray-900 dark:text-gray-100 mb-4 text-xs uppercase tracking-wider">
              {t('toc.title')}
            </h3>
            <ul className="space-y-1">
              {sections.map((section) => (
                <li key={section.id}>
                  <button
                    onClick={() => scrollToSection(section.id)}
                    className={`
                      w-full text-left px-3 py-2.5 rounded-lg text-sm transition-colors
                      hover:bg-gray-100 dark:hover:bg-gray-800
                      ${
                        activeId === section.id
                          ? 'bg-blue-50 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 font-medium'
                          : 'text-gray-700 dark:text-gray-300'
                      }
                    `}
                  >
                    {t(section.titleKey)}
                  </button>
                </li>
              ))}
            </ul>
          </div>
        )}
      </nav>
    </>
  );
}
