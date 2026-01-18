'use client';

import { useEffect, useState } from 'react';
import { useLanguage } from '@/lib/i18n/LanguageContext';

interface TocItem {
  id: string;
  title: { ru: string; en: string; es: string };
}

const devSections: TocItem[] = [
  { id: 'pm', title: { ru: 'PM', en: 'PM', es: 'PM' } },
  { id: 'design', title: { ru: 'Дизайнеры', en: 'Designers', es: 'Diseñadores' } },
  { id: 'frontend', title: { ru: 'Frontend', en: 'Frontend', es: 'Frontend' } },
  { id: 'backend', title: { ru: 'Backend', en: 'Backend', es: 'Backend' } },
  { id: 'qa', title: { ru: 'QA', en: 'QA', es: 'QA' } },
  { id: 'devops', title: { ru: 'DevOps', en: 'DevOps', es: 'DevOps' } },
];

export function DevelopersToc() {
  const [activeId, setActiveId] = useState<string>('');
  const [isOpen, setIsOpen] = useState(false);
  const { language, t } = useLanguage();

  useEffect(() => {
    if (isOpen) document.body.style.overflow = 'hidden';
    else document.body.style.overflow = '';
    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY + 150;
      for (let i = devSections.length - 1; i >= 0; i--) {
        const element = document.getElementById(devSections[i].id);
        if (element && element.offsetTop <= scrollPosition) {
          setActiveId(devSections[i].id);
          break;
        }
      }
    };
    window.addEventListener('scroll', handleScroll);
    // Отложенный вызов, чтобы избежать проблем с прокруткой при загрузке
    setTimeout(() => handleScroll(), 100);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (!element) return;
    const offset = 80;
    const elementPosition = element.getBoundingClientRect().top;
    const offsetPosition = elementPosition + window.pageYOffset - offset;
    window.scrollTo({ top: offsetPosition, behavior: 'smooth' });
    setIsOpen(false);
  };

  const title =
    language === 'ru'
      ? 'Команда'
      : language === 'es'
        ? 'Equipo'
        : 'Team';

  return (
    <>
      <nav
        className={`
          ${isOpen ? 'fixed inset-0 z-40' : 'hidden'}
        `}
        aria-label={t('nav.sectionNavigation')}
      >
        {isOpen && (
          <>
            <div className="fixed inset-0 bg-black/50 backdrop-blur-sm" onClick={() => setIsOpen(false)} />
            <div className="relative z-50 h-full overflow-y-auto p-4" style={{ overflowX: 'hidden' }}>
              <div className="max-w-md mx-auto mt-20 ui-glass-menu rounded-xl p-4">
                <div className="flex items-center justify-between mb-3">
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100">{title}</h3>
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
                  {devSections.map((s) => (
                    <li key={s.id}>
                      <button
                        onClick={() => scrollToSection(s.id)}
                        className={`
                          w-full text-left px-3 py-2 rounded-lg text-sm transition-colors
                          hover:bg-gray-100 dark:hover:bg-gray-800
                          ${activeId === s.id ? 'bg-blue-50 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 font-medium' : 'text-gray-700 dark:text-gray-300'}
                        `}
                      >
                        {s.title[language]}
                      </button>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </>
        )}
      </nav>
    </>
  );
}

