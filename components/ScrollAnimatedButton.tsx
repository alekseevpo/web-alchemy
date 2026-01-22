'use client';

import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';

export function ScrollAnimatedButton() {
  const [rotation, setRotation] = useState(0);
  const lastScrollYRef = useRef(0);
  const rafIdRef = useRef<number | null>(null);
  const isInitializedRef = useRef(false);

  useEffect(() => {
    // Инициализируем начальную позицию скролла
    if (!isInitializedRef.current) {
      lastScrollYRef.current = window.scrollY;
      isInitializedRef.current = true;
    }

    const handleScroll = () => {
      // Отменяем предыдущий запрос анимации, если он есть
      if (rafIdRef.current !== null) {
        cancelAnimationFrame(rafIdRef.current);
      }

      rafIdRef.current = requestAnimationFrame(() => {
        const currentScrollY = window.scrollY || window.pageYOffset || document.documentElement.scrollTop;
        const scrollDelta = currentScrollY - lastScrollYRef.current;

        // Если вернулись на самый верх страницы, сбрасываем угол поворота
        if (currentScrollY <= 0) {
          setRotation(0);
          lastScrollYRef.current = 0;
          return;
        }

        // Вращение зависит от направления скролла
        // Вниз → вращение вправо (положительное)
        // Вверх → вращение влево (отрицательное)
        if (Math.abs(scrollDelta) > 0.1) {
          setRotation((prev) => {
            // Скорость вращения зависит от скорости скролла
            // Ограничиваем максимальную скорость вращения
            const rotationSpeed = Math.min(Math.abs(scrollDelta) * 0.3, 8);
            const direction = scrollDelta > 0 ? 1 : -1;
            const newRotation = prev + rotationSpeed * direction;
            return newRotation;
          });
        }

        lastScrollYRef.current = currentScrollY;
      });
    };

    // Добавляем обработчик скролла
    window.addEventListener('scroll', handleScroll, { passive: true });
    
    // Также слушаем события на document для совместимости
    document.addEventListener('scroll', handleScroll, { passive: true });

    return () => {
      window.removeEventListener('scroll', handleScroll);
      document.removeEventListener('scroll', handleScroll);
      if (rafIdRef.current !== null) {
        cancelAnimationFrame(rafIdRef.current);
      }
    };
  }, []);

  return (
    <Link
      href="#contact"
      className="scroll-animated-moon-button group"
    >
      <div className="relative w-full h-full">
        <img 
          src="/moon.png"
          alt="Let's talk!"
          className="scroll-animated-button-moon"
          style={{
            transform: `rotate(${rotation}deg)`,
            transition: 'none',
            willChange: 'transform',
          }}
        />
        <span 
          className="scroll-animated-moon-text absolute inset-0 flex items-center justify-center"
          style={{
            transition: 'none',
            willChange: 'transform',
          }}
        >
          Let&apos;s talk!
        </span>
      </div>
    </Link>
  );
}
