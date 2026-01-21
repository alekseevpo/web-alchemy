'use client';

import { useEffect, useRef, ReactNode } from 'react';

interface LocomotiveScrollProviderProps {
  children: ReactNode;
}

export function LocomotiveScrollProvider({ children }: LocomotiveScrollProviderProps) {
  const scrollRef = useRef<any>(null);

  useEffect(() => {
    // Динамический импорт для SSR совместимости
    const initLocomotiveScroll = async () => {
      try {
        const LocomotiveScroll = (await import('locomotive-scroll')).default;
        
        scrollRef.current = new LocomotiveScroll({
          // Используем window как контейнер (по умолчанию)
          // Опции Lenis для плавного скролла
          lenisOptions: {
            duration: 1.2,
            easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
            orientation: 'vertical',
            smoothWheel: true,
            touchMultiplier: 2,
          },
        });

        // Обновляем после загрузки страницы
        window.addEventListener('load', () => {
          scrollRef.current?.resize();
        });

      } catch (error) {
        console.warn('Locomotive Scroll initialization failed:', error);
      }
    };

    initLocomotiveScroll();

    return () => {
      if (scrollRef.current) {
        scrollRef.current.destroy();
        scrollRef.current = null;
      }
    };
  }, []);

  return <>{children}</>;
}
