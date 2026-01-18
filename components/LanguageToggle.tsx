'use client';

import { useState, useRef, useEffect } from 'react';
import { useLanguage, Language } from '@/lib/i18n/LanguageContext';

const languages: { code: Language; label: string; fullName: { ru: string; en: string; es: string } }[] = [
  { code: 'ru', label: 'RU', fullName: { ru: 'Русский', en: 'Russian', es: 'Ruso' } },
  { code: 'en', label: 'EN', fullName: { ru: 'Английский', en: 'English', es: 'Inglés' } },
  { code: 'es', label: 'ES', fullName: { ru: 'Испанский', en: 'Spanish', es: 'Español' } },
];

export function LanguageToggle() {
  const { language, setLanguage, t } = useLanguage();
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const currentLang = languages.find(l => l.code === language) || languages[0];

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    }

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <div className="relative flex-shrink-0" ref={dropdownRef} style={{ contain: 'layout style' }}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="ui-glass-btn h-10 px-3 rounded-lg flex items-center justify-center gap-1.5 whitespace-nowrap"
        aria-label={t('nav.selectLanguage')}
        aria-expanded={isOpen}
        style={{ position: 'relative' }}
      >
        <span className="text-sm font-medium text-gray-700 dark:text-gray-300">{currentLang.label}</span>
        <svg 
          className={`w-4 h-4 transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`} 
          fill="none" 
          stroke="currentColor" 
          viewBox="0 0 24 24"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </svg>
      </button>

      {isOpen && (
        <div 
          className="dropdown-menu ui-glass-menu absolute right-0 mt-2 w-40 rounded-lg overflow-hidden z-[110]"
          style={{ 
            right: '0',
            maxWidth: 'calc(100vw - 3rem)'
          }}
        >
          {languages.map((lang) => (
            <button
              key={lang.code}
              onClick={() => {
                setLanguage(lang.code);
                setIsOpen(false);
              }}
              className={`w-full flex items-center gap-2 px-3 py-2.5 text-sm transition-colors ${
                language === lang.code
                  ? 'bg-blue-500/10 text-blue-700 dark:text-blue-300'
                  : 'text-gray-700 dark:text-gray-300 hover:bg-black/5 dark:hover:bg-white/10'
              }`}
            >
              <span className="font-medium">{lang.label}</span>
              <span className="flex-1 text-left text-gray-600 dark:text-gray-400">{lang.fullName[language]}</span>
              {language === lang.code && (
                <svg className="w-4 h-4 text-blue-600 dark:text-blue-400" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                </svg>
              )}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
