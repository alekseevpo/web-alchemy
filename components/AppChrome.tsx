'use client';

import { useState, useEffect } from 'react';
import { usePathname } from 'next/navigation';
import Link from 'next/link';
import { ThemeToggle } from '@/components/ThemeToggle';
import { LanguageToggle } from '@/components/LanguageToggle';
import { DevelopersButton } from '@/components/DevelopersButton';
import { ScrollToTop } from '@/components/ScrollToTop';
import { TableOfContents } from '@/components/TableOfContents';
import { DevelopersToc } from '@/components/DevelopersToc';
import { BackButton } from '@/components/BackButton';
import { useLanguage } from '@/lib/i18n/LanguageContext';

const mainNavLinks = [
  { href: '/', key: 'nav.home' },
  { href: '/projects', key: 'nav.projects' },
  { href: '/services', key: 'nav.services' },
  { href: '/support', key: 'nav.support' },
];

export function AppChrome() {
  const pathname = usePathname();
  const isDevelopers = pathname === '/developers';
  const isServicePage = pathname.startsWith('/services/') && pathname !== '/services';
  const { t } = useLanguage();
  const [isMobileNavOpen, setIsMobileNavOpen] = useState(false);

  useEffect(() => {
    if (isMobileNavOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    
    return () => {
      document.body.style.overflow = '';
    };
  }, [isMobileNavOpen]);

  return (
    <>
      {/* Left top actions */}
      <div className="fixed top-4 left-4 z-50 lg:left-6 flex items-center gap-2">
        {(isDevelopers || isServicePage) && <BackButton />}
        {!isDevelopers && !isServicePage && <DevelopersButton />}
      </div>

      {/* Center navigation - Desktop only */}
      <nav className="hidden lg:flex fixed top-4 left-1/2 transform -translate-x-1/2 z-50 items-center gap-2">
        <div className="ui-glass-btn flex items-center gap-2 px-2 py-2 rounded-xl">
          <Link
            href="/"
            className={`relative px-4 py-2 text-sm font-medium transition-colors rounded-lg group ${
              pathname === '/'
                ? 'text-gray-900 dark:text-gray-100'
                : 'text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-gray-100'
            }`}
          >
            {t('nav.home')}
            <span className={`absolute bottom-1 left-1/2 transform -translate-x-1/2 bg-gray-900 dark:bg-gray-100 transition-all duration-300 ease-out ${
              pathname === '/' ? 'h-0.5 w-3/4' : 'h-px w-0 group-hover:w-3/4'
            }`}></span>
          </Link>
          <Link
            href="/projects"
            className={`relative px-4 py-2 text-sm font-medium transition-colors rounded-lg group ${
              pathname === '/projects'
                ? 'text-gray-900 dark:text-gray-100'
                : 'text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-gray-100'
            }`}
          >
            {t('nav.projects')}
            <span className={`absolute bottom-1 left-1/2 transform -translate-x-1/2 bg-gray-900 dark:bg-gray-100 transition-all duration-300 ease-out ${
              pathname === '/projects' ? 'h-0.5 w-3/4' : 'h-px w-0 group-hover:w-3/4'
            }`}></span>
          </Link>
          <Link
            href="/services"
            className={`relative px-4 py-2 text-sm font-medium transition-colors rounded-lg group ${
              pathname === '/services'
                ? 'text-gray-900 dark:text-gray-100'
                : 'text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-gray-100'
            }`}
          >
            {t('nav.services')}
            <span className={`absolute bottom-1 left-1/2 transform -translate-x-1/2 bg-gray-900 dark:bg-gray-100 transition-all duration-300 ease-out ${
              pathname === '/services' ? 'h-0.5 w-3/4' : 'h-px w-0 group-hover:w-3/4'
            }`}></span>
          </Link>
          <Link
            href="/support"
            className={`relative px-4 py-2 text-sm font-medium transition-colors rounded-lg group ${
              pathname === '/support'
                ? 'text-gray-900 dark:text-gray-100'
                : 'text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-gray-100'
            }`}
          >
            {t('nav.support')}
            <span className={`absolute bottom-1 left-1/2 transform -translate-x-1/2 bg-gray-900 dark:bg-gray-100 transition-all duration-300 ease-out ${
              pathname === '/support' ? 'h-0.5 w-3/4' : 'h-px w-0 group-hover:w-3/4'
            }`}></span>
          </Link>
        </div>
      </nav>

      {/* Right top actions */}
      <div className="fixed top-4 right-4 z-[100] lg:right-6 flex items-center gap-2">
        <ThemeToggle />
        <LanguageToggle />
        {/* Mobile Main Navigation Button */}
        <button
          onClick={() => setIsMobileNavOpen(!isMobileNavOpen)}
          className="lg:hidden ui-glass-btn w-10 h-10 rounded-lg flex items-center justify-center relative"
          aria-label={t('nav.showNavigation') || 'Показать навигацию'}
          aria-expanded={isMobileNavOpen}
        >
          <svg
            className="w-5 h-5 text-gray-700 dark:text-gray-300"
            fill="none"
            stroke="currentColor"
            strokeWidth={2.5}
            viewBox="0 0 24 24"
          >
            {isMobileNavOpen ? (
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2.5}
                d="M6 18L18 6M6 6l12 12"
              />
            ) : (
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2.5}
                d="M4 6h16M4 12h16M4 18h16"
              />
            )}
          </svg>
        </button>
      </div>

      {/* Mobile Main Navigation Menu */}
      {isMobileNavOpen && (
        <nav
          className="lg:hidden fixed inset-0 z-40"
          aria-label={t('nav.mainNavigation') || 'Главная навигация'}
        >
          {/* Overlay */}
          <div 
            className="fixed inset-0 bg-black/60 backdrop-blur-sm animate-[fadeIn_0.2s_ease-out]"
            onClick={() => setIsMobileNavOpen(false)}
          />
          
          {/* Menu Panel */}
          <div className="relative z-50 h-full overflow-y-auto p-4 animate-[slideInRight_0.3s_ease-out]">
            <div className="max-w-sm mx-auto mt-20 bg-white dark:bg-gray-900 rounded-2xl p-6 shadow-2xl border border-gray-200 dark:border-gray-800">
              <div className="mb-6">
                <h3 className="text-xl font-bold text-gray-900 dark:text-gray-100">
                  {t('nav.menu') || 'Меню'}
                </h3>
              </div>

              <ul className="space-y-2">
                {mainNavLinks.map((link) => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      onClick={() => setIsMobileNavOpen(false)}
                      className={`block px-4 py-3 rounded-xl text-base font-medium transition-all duration-200 ${
                        pathname === link.href
                          ? 'bg-gray-900 dark:bg-gray-100 text-white dark:text-gray-900 shadow-lg'
                          : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800'
                      }`}
                    >
                      {t(link.key)}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </nav>
      )}

      {/* Navigation + helpers */}
      <ScrollToTop />
      {isDevelopers ? <DevelopersToc /> : <TableOfContents />}
    </>
  );
}

