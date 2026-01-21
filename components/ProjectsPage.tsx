'use client';

import { useEffect, useRef } from 'react';
import { useLanguage } from '@/lib/i18n/LanguageContext';
import { Footer } from '@/components/Footer';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

export function ProjectsPage() {
  const { t } = useLanguage();
  const portfolioRef = useRef<HTMLElement>(null);

  useEffect(() => {
    if (!portfolioRef.current) return;

    const horizontalSections = gsap.utils.toArray('.horiz-gallery-wrapper');

    horizontalSections.forEach(function (sec) {
      const pinWrap = (sec as Element).querySelector('.horiz-gallery-strip');
      
      if (!pinWrap) return;

      let pinWrapWidth: number;
      let horizontalScrollLength: number;

      function refresh() {
        pinWrapWidth = (pinWrap as HTMLElement).scrollWidth;
        horizontalScrollLength = pinWrapWidth - window.innerWidth;
      }

      refresh();
      
      // Pinning and horizontal scrolling
      gsap.to(pinWrap, {
        scrollTrigger: {
          scrub: true,
          trigger: sec as Element,
          pin: sec as Element,
          start: "center center",
          end: () => `+=${pinWrapWidth}`,
          invalidateOnRefresh: true
        },
        x: () => -horizontalScrollLength,
        ease: "none"
      });

      ScrollTrigger.addEventListener("refreshInit", refresh);
    });

    return () => {
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
    };
  }, []);

  const projects = [
    { id: 1, image: "https://assets.codepen.io/16327/portrait-image-1.jpg" },
    { id: 2, image: "https://assets.codepen.io/16327/portrait-image-2.jpg" },
    { id: 3, image: "https://assets.codepen.io/16327/portrait-image-3.jpg" },
    { id: 4, image: "https://assets.codepen.io/16327/portrait-image-4.jpg" },
    { id: 5, image: "https://assets.codepen.io/16327/portrait-image-5.jpg" },
    { id: 6, image: "https://assets.codepen.io/16327/portrait-image-6.jpg" },
    { id: 7, image: "https://assets.codepen.io/16327/portrait-image-7.jpg" },
    { id: 8, image: "https://assets.codepen.io/16327/portrait-image-8.jpg" },
  ];

  return (
    <div className="min-h-screen bg-[#fefbf6] dark:bg-transparent transition-colors duration-300 overflow-x-hidden">
      <div id="smooth-content">
        {/* Intro Panel */}
        <section className="panel min-h-screen flex items-center justify-center">
          <div className="text-center">
            <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-light tracking-tight text-gray-900 dark:text-gray-100 mb-6 leading-[1.1]">
              {t('projects.title') || 'Готовые проекты'}
            </h1>
            <p className="text-xl sm:text-2xl text-gray-600 dark:text-gray-400 leading-relaxed max-w-3xl mx-auto mb-8">
              {t('projects.subtitle') || 'Примеры наших работ и реализованных проектов'}
            </p>
            <p className="text-lg text-gray-500 dark:text-gray-500">
              Scroll down for the Gallery
            </p>
          </div>
        </section>

        {/* Portfolio Gallery */}
        <section id="portfolio" ref={portfolioRef} className="relative">
          <div className="container-fluid w-full">
            <div className="horiz-gallery-wrapper">
              <div className="horiz-gallery-strip flex">
                {projects.map((project) => (
                  <div key={project.id} className="project-wrap">
                    <img 
                      src={project.image} 
                      alt={`Project ${project.id}`}
                      className="w-full h-full object-cover"
                    />
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* End Panel */}
        <section className="panel min-h-screen flex items-center justify-center">
          <div className="text-center">
            <h2 className="text-4xl sm:text-5xl md:text-6xl font-light text-gray-900 dark:text-gray-100">
              That's it!
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-400 mt-4">
              Свяжитесь с нами для создания вашего проекта
            </p>
          </div>
        </section>
      </div>

      <Footer />
    </div>
  );
}
