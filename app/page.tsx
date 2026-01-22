'use client';

import { useEffect } from 'react';
import { usePathname } from 'next/navigation';
import { Footer } from '@/components/Footer';
import { CompanyContent } from '@/components/CompanyContent';
import SimpleLiquidGradient from '@/components/SimpleLiquidGradient';
import LiquidGradient from '@/components/LiquidGradient';
import TestGradient from '@/components/TestGradient';

export default function Home() {
  const pathname = usePathname();

  useEffect(() => {
    // Отключаем автоматическое восстановление позиции скролла браузером
    if (typeof window !== 'undefined' && 'scrollRestoration' in window.history) {
      window.history.scrollRestoration = 'manual';
    }
    
    // Прокручиваем наверх сразу при монтировании компонента
    if (typeof window !== 'undefined') {
      // Прокручиваем наверх немедленно
      window.scrollTo(0, 0);
      
      // Также прокручиваем через небольшую задержку на случай, если браузер попытается восстановить позицию
      const timeout1 = setTimeout(() => {
        window.scrollTo(0, 0);
      }, 0);
      
      const timeout2 = setTimeout(() => {
        window.scrollTo(0, 0);
      }, 100);
      
      // Убираем hash из URL если он есть
      const hash = window.location.hash;
      if (hash) {
        window.history.replaceState(null, '', window.location.pathname + window.location.search);
      }
      
      return () => {
        clearTimeout(timeout1);
        clearTimeout(timeout2);
      };
    }
  }, []);

  return (
    <div className="min-h-screen transition-colors duration-300">
      {/* Simple Liquid Gradient Background */}
      <SimpleLiquidGradient />
      
      {/* Liquid Gradient Background - отключен */}
      {/* <LiquidGradient colorScheme={1} intensity={1.5} speed={1.0} /> */}
      
      {/* Test Gradient Background - отключен */}
      {/* <TestGradient /> */}
      
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
