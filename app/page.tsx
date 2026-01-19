'use client';

import { useEffect } from 'react';
import { usePathname } from 'next/navigation';
import { Footer } from '@/components/Footer';
import { CompanyContent } from '@/components/CompanyContent';

export default function Home() {
  const pathname = usePathname();

  useEffect(() => {
    // Прокручиваем наверх при загрузке страницы, если нет якоря в URL
    if (typeof window !== 'undefined') {
      // Если нет hash в URL, прокручиваем наверх
      if (!window.location.hash) {
        window.scrollTo(0, 0);
      }
      
      // Отключаем автоматическое восстановление позиции скролла браузером
      if ('scrollRestoration' in window.history) {
        window.history.scrollRestoration = 'manual';
      }
    }
  }, [pathname]);

  return (
    <div className="min-h-screen bg-[#fefbf6] dark:bg-transparent transition-colors duration-300">
      {/* Основной контент - центрирован */}
      <div>
        <main id="main-content" className="max-w-7xl mx-auto px-4 sm:px-6 pt-24 pb-12 sm:pt-28 sm:pb-16 md:px-8 lg:pt-28 lg:px-12 xl:px-16">
          <CompanyContent />
        </main>

        {/* Footer с авторскими правами */}
        <Footer />
      </div>
    </div>
  );
}
