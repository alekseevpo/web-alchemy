'use client';

import { useEffect } from 'react';

interface TocItem {
  id: string;
  titleKey: string;
  level: number;
}

const sections: TocItem[] = [
  { id: 'services', titleKey: 'toc.services', level: 1 },
  { id: 'about', titleKey: 'toc.about', level: 1 },
  { id: 'contact', titleKey: 'toc.contact', level: 1 },
];

export function TableOfContents() {
  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY + 150;

      for (let i = sections.length - 1; i >= 0; i--) {
        const element = document.getElementById(sections[i].id);
        if (element && element.offsetTop <= scrollPosition) {
          break;
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll(); // Initial check

    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // На мобильных устройствах навигация по секциям скрыта, так как есть основное меню навигации
  return null;
}
