'use client';

import { useEffect, useRef } from 'react';
import { useTheme } from 'next-themes';

interface CommentSectionProps {
  repo: string;
  repoId: string;
  category?: string;
  categoryId?: string;
  mapping?: 'pathname' | 'url' | 'title' | 'og:title' | 'specific';
  term?: string;
  discussionNumber?: number;
  lang?: string;
}

export default function CommentSection({
  repo,
  repoId,
  category = 'Announcements',
  categoryId,
  mapping = 'pathname',
  term = 'Welcome to Giscus!',
  discussionNumber,
  lang = 'ru',
}: CommentSectionProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const scriptRef = useRef<HTMLScriptElement | null>(null);
  const { theme, resolvedTheme } = useTheme();
  
  // Определяем тему для Giscus
  const giscusTheme = resolvedTheme === 'dark' ? 'dark' : 'light';

  useEffect(() => {
    if (!containerRef.current) return;

    // Удаляем предыдущий скрипт, если он существует
    if (scriptRef.current && scriptRef.current.parentNode) {
      scriptRef.current.parentNode.removeChild(scriptRef.current);
      scriptRef.current = null;
    }

    // Очищаем контейнер
    // Используем replaceChildren() вместо innerHTML для безопасности
    containerRef.current.replaceChildren();

    // Создаем новый скрипт
    const script = document.createElement('script');
    script.src = 'https://giscus.app/client.js';
    script.setAttribute('data-repo', repo);
    script.setAttribute('data-repo-id', repoId);
    
    if (categoryId) {
      script.setAttribute('data-category-id', categoryId);
    } else {
      script.setAttribute('data-category', category);
    }
    
    script.setAttribute('data-mapping', mapping);
    
    if (mapping === 'specific' && discussionNumber) {
      script.setAttribute('data-number', discussionNumber.toString());
    } else if (term) {
      script.setAttribute('data-term', term);
    }
    
    script.setAttribute('data-strict', '0');
    script.setAttribute('data-reactions-enabled', '1');
    script.setAttribute('data-emit-metadata', '0');
    script.setAttribute('data-input-position', 'bottom');
    script.setAttribute('data-theme', giscusTheme);
    script.setAttribute('data-lang', lang);
    script.setAttribute('data-loading', 'lazy');
    script.crossOrigin = 'anonymous';
    script.async = true;

    containerRef.current.appendChild(script);
    scriptRef.current = script;

    return () => {
      // Очистка при размонтировании
      if (scriptRef.current && scriptRef.current.parentNode) {
        scriptRef.current.parentNode.removeChild(scriptRef.current);
        scriptRef.current = null;
      }
    };
  }, [repo, repoId, category, categoryId, mapping, term, discussionNumber, lang, giscusTheme]);

  // Обновляем тему Giscus при изменении темы
  useEffect(() => {
    if (!scriptRef.current) return;

    // Отправляем сообщение Giscus для обновления темы
    const iframe = containerRef.current?.querySelector('iframe');
    if (iframe && iframe.contentWindow) {
      iframe.contentWindow.postMessage(
        {
          giscus: {
            setConfig: {
              theme: giscusTheme,
            },
          },
        },
        'https://giscus.app'
      );
    }
  }, [giscusTheme]);

  return (
    <div className="mt-8 pt-8 border-t border-gray-200 dark:border-gray-800">
      <div ref={containerRef} className="giscus" />
    </div>
  );
}
