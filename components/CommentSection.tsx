'use client';

import { useEffect, useRef } from 'react';

interface CommentSectionProps {
  repo: string;
  repoId: string;
  category?: string;
  categoryId?: string;
  mapping?: 'pathname' | 'url' | 'title' | 'og:title' | 'specific';
  term?: string;
  discussionNumber?: number;
  theme?: 'light' | 'dark' | 'preferred_color_scheme';
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
  theme = 'preferred_color_scheme',
  lang = 'ru',
}: CommentSectionProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current) return;

    const script = document.createElement('script');
    script.src = 'https://giscus.app/client.js';
    script.setAttribute('data-repo', repo);
    script.setAttribute('data-repo-id', repoId);
    script.setAttribute('data-category', category);
    if (categoryId) {
      script.setAttribute('data-category-id', categoryId);
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
    script.setAttribute('data-theme', theme);
    script.setAttribute('data-lang', lang);
    script.setAttribute('data-loading', 'lazy');
    script.crossOrigin = 'anonymous';
    script.async = true;

    containerRef.current.appendChild(script);

    return () => {
      if (containerRef.current && containerRef.current.contains(script)) {
        containerRef.current.removeChild(script);
      }
    };
  }, [repo, repoId, category, categoryId, mapping, term, discussionNumber, theme, lang]);

  return (
    <div className="mt-16 pt-16 border-t border-gray-200 dark:border-gray-800">
      <div ref={containerRef} className="giscus" />
    </div>
  );
}
