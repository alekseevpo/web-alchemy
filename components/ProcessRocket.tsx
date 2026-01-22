'use client';

import { useEffect, useRef } from 'react';
import Image from 'next/image';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { MotionPathPlugin } from 'gsap/MotionPathPlugin';

// Регистрируем плагины
if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger, MotionPathPlugin);
}

export function ProcessRocket() {
  const rocketRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const rocket = rocketRef.current;
    if (!rocket) return;

    // Анимация полета ракеты (hover эффект)
    const flyAnimation = gsap.to(rocket, {
      y: -20,
      duration: 1,
      repeat: -1,
      yoyo: true,
      ease: "power3.inOut"
    });

    // Анимация движения по траектории при прокрутке
    const scrollAnimation = gsap.to(rocket, {
      x: -1200, // Увеличенная дальность полета на 1200px
      rotation: "-90deg-=30", // Максимальный поворот при движении
      ease: "power3.inOut", // Максимально динамичная ease функция
      scrollTrigger: {
        trigger: rocket,
        start: "top 95%", // Начать как можно раньше
        end: "bottom 5%", // Закончить как можно позже
        scrub: 0.3, // Максимально быстрая реакция на прокрутку
        markers: false,
      },
    });

    // Анимация дополнительного вращения (вокруг своей оси)
    const rotateAnimation = gsap.to(rocket, {
      rotation: "-90deg+=6",
      duration: 1.5,
      repeat: -1,
      yoyo: true,
      ease: "power3.inOut"
    });

    return () => {
      flyAnimation.kill();
      scrollAnimation.kill();
      rotateAnimation.kill();
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
    };
  }, []);

  return (
    <div 
      ref={rocketRef}
      className="absolute z-10" // Ракета под текстом
      style={{
        width: '160px', // Уменьшенный размер ракеты
        height: '160px',
        position: 'absolute',
        right: '-150px', // Начинает справа за текстом
        top: '50%',
        transform: 'translateY(-50%) rotate(-90deg)',
      }}
    >
      <Image
        src="/rocket_sticker.png"
        alt="Ракета"
        fill
        sizes="160px" // Уменьшенный размер изображения
        style={{
          objectFit: 'contain',
        }}
      />
    </div>
  );
}
