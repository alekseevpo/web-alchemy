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
      y: -15,
      duration: 1.5,
      repeat: -1,
      yoyo: true,
      ease: "power2.inOut"
    });

    // Анимация движения по траектории при прокрутке
    let lastDirection = 0; // Отслеживаем последнее направление
    let rocketPosition = 0; // Отслеживаем позицию ракеты (0 = начальная, -1650 = улетела)
    
    // Определяем скорость в зависимости от устройства
    const isMobile = window.innerWidth <= 768;
    const scrubSpeed = isMobile ? 0.01 : 0.5; // Для мобильных еще медленнее
    
    // Отдельная анимация для движения (без поворота)
    const scrollAnimation = gsap.to(rocket, {
      x: -1650, // Дальность полета на 1650px (+150px)
      ease: (progress) => {
        // Кастомная ease функция с замедлением в центре
        if (progress >= 0.35 && progress <= 0.65) {
          // Замедление в центре - очень медленное движение
          const centerProgress = (progress - 0.35) / 0.3; // 0-1 в центральной зоне
          return 0.35 + (centerProgress * centerProgress * 0.3); // Квадратичная функция для замедления
        }
        // Нормальное движение вне центра
        return progress;
      },
      scrollTrigger: {
        trigger: rocket,
        start: "top 90%", // Начать раньше
        end: "bottom 10%", // Закончить позже
        scrub: scrubSpeed, // Адаптивная скорость
        markers: false,
        toggleActions: "play none none reset",
        onEnter: () => {
          // Как только ракета становится видимой - дополнительно замедляем
          gsap.to(rocket, {
            duration: isMobile ? 2 : 1,
            ease: "power2.out",
            overwrite: "auto"
          });
        },
        onUpdate: (self) => {
          // Используем self.direction для определения направления
          const currentDirection = self.direction;
          
          // Дополнительное замедление когда ракета видима
          if (self.isActive) {
            gsap.to(rocket, {
              duration: 0.5,
              ease: "power2.out",
              overwrite: "auto"
            });
          }
          
          // Разворачиваем ракету только один раз при смене направления
          if (currentDirection !== 0 && currentDirection !== lastDirection) {
            if (currentDirection === -1) {
              // Скролл вверх - проверяем позицию ракеты
              if (rocketPosition === -1650) {
                // Ракета улетела за экран - зеркально возвращаем
                gsap.set(rocket, {
                  rotation: "90deg", // Смотрит вправо
                  x: 0 // Возвращаем в начальную позицию
                });
                rocketPosition = 0; // Обновляем позицию
              } else {
                // Ракета не улетела - обычный разворот
                gsap.set(rocket, {
                  rotation: "90deg" // Абсолютное значение для полета вправо
                });
              }
            } else if (currentDirection === 1) {
              // Скролл вниз - ракета летит влево
              gsap.set(rocket, {
                rotation: "-90deg", // Абсолютное значение для полета влево
                x: -1650 // Улетает за экран
              });
              rocketPosition = -1650; // Обновляем позицию
            }
            lastDirection = currentDirection;
          }
        }
      },
    });

    // Анимация дополнительного вращения (вокруг своей оси)
    const rotateAnimation = gsap.to(rocket, {
      rotation: "-90deg+=4",
      duration: 2,
      repeat: -1,
      yoyo: true,
      ease: "power2.inOut"
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
        right: '-300px', // Сдвинута еще дальше за пределы экрана
        top: '50%',
        transform: 'translateY(-50%) rotate(-90deg)',
      }}
    >
      <video
        src="/roket2.mov"
        autoPlay
        loop
        muted
        playsInline
        style={{
          width: '100%',
          height: '100%',
          objectFit: 'contain',
        }}
      />
    </div>
  );
}
