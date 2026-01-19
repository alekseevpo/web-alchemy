'use client';

import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';

export function ScrollAnimatedButton() {
  const [rotation, setRotation] = useState(0);
  const lastScrollYRef = useRef(0);
  const rafIdRef = useRef<number | null>(null);

  useEffect(() => {
    const handleScroll = () => {
      // Отменяем предыдущий запрос анимации, если он есть
      if (rafIdRef.current !== null) {
        cancelAnimationFrame(rafIdRef.current);
      }

      rafIdRef.current = requestAnimationFrame(() => {
        const currentScrollY = window.scrollY;
        const scrollDelta = currentScrollY - lastScrollYRef.current;

        // Вращение зависит от направления скролла
        // Вниз → вращение вправо (положительное)
        // Вверх → вращение влево (отрицательное)
        if (Math.abs(scrollDelta) > 0.1) {
          setRotation((prev) => {
            // Скорость вращения зависит от скорости скролла
            // Ограничиваем максимальную скорость вращения
            const rotationSpeed = Math.min(Math.abs(scrollDelta) * 0.3, 8);
            const direction = scrollDelta > 0 ? 1 : -1;
            return prev + rotationSpeed * direction;
          });
        }

        lastScrollYRef.current = currentScrollY;
      });
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => {
      window.removeEventListener('scroll', handleScroll);
      if (rafIdRef.current !== null) {
        cancelAnimationFrame(rafIdRef.current);
      }
    };
  }, []);

  return (
    <Link
      href="#contact"
      className="scroll-animated-button group"
      style={{
        transform: `rotate(${rotation}deg)`,
        transition: 'none', // Убираем transition для синхронного вращения со скроллом
      }}
    >
      <span 
        className="scroll-animated-button-text"
        style={{
          transform: `rotate(${-rotation}deg)`,
          transition: 'none', // Убираем transition для синхронного вращения текста
        }}
      >
        Let&apos;s talk!
      </span>
    </Link>
  );
}
