'use client';

import { useEffect, useRef } from 'react';

interface SectionCommentProps {
  sectionId: string;
  title: string;
  repo?: string;
  repoId?: string;
  categoryId?: string;
}

export default function SectionComment({ 
  sectionId, 
  title,
  repo,
  repoId,
  categoryId
}: SectionCommentProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const scriptId = `giscus-script-${sectionId}`;

  useEffect(() => {
    if (!repo || !repoId || !containerRef.current) return;

    // Проверяем, не загружен ли уже скрипт для этого раздела
    if (document.getElementById(scriptId)) {
      return;
    }

    // Очищаем контейнер перед добавлением нового виджета
    containerRef.current.innerHTML = '';

    // Создаем div для виджета Giscus (Giscus создаст содержимое внутри)
    const giscusDiv = document.createElement('div');
    giscusDiv.className = 'giscus';
    containerRef.current.appendChild(giscusDiv);

    // Загружаем скрипт Giscus для этого виджета
    const script = document.createElement('script');
    script.id = scriptId;
    script.src = 'https://giscus.app/client.js';
    script.setAttribute('data-repo', repo);
    script.setAttribute('data-repo-id', repoId);
    if (categoryId) {
      script.setAttribute('data-category-id', categoryId);
    }
    // Используем mapping="title" для создания отдельных обсуждений для каждого раздела
    script.setAttribute('data-mapping', 'title');
    script.setAttribute('data-term', title);
    script.setAttribute('data-strict', '0');
    script.setAttribute('data-reactions-enabled', '1');
    script.setAttribute('data-emit-metadata', '0');
    script.setAttribute('data-input-position', 'bottom');
    script.setAttribute('data-theme', 'preferred_color_scheme');
    script.setAttribute('data-lang', 'ru');
    script.setAttribute('data-loading', 'lazy');
    script.crossOrigin = 'anonymous';
    script.async = true;

    // Скрипт должен быть добавлен в контейнер, а не в giscusDiv
    containerRef.current.appendChild(script);

    return () => {
      // Очистка при размонтировании
      const scriptElement = document.getElementById(scriptId);
      if (scriptElement && scriptElement.parentNode) {
        scriptElement.parentNode.removeChild(scriptElement);
      }
    };
  }, [repo, repoId, sectionId, title, categoryId, scriptId]);

  if (!repo || !repoId) {
    return (
      <div className="mt-6 pt-6 border-t border-gray-100 dark:border-gray-800">
        <p className="text-sm text-gray-500 dark:text-gray-400">
          Для работы комментариев настройте Giscus (укажите репозиторий GitHub в переменных окружения).
        </p>
      </div>
    );
  }

  return (
    <div className="mt-8 pt-8 border-t border-gray-200 dark:border-gray-800">
      <div className="mb-4">
        <h4 className="text-lg font-medium text-gray-900 dark:text-gray-100 mb-2">
          Комментарии к разделу &quot;{title}&quot;
        </h4>
        <p className="text-sm text-gray-600 dark:text-gray-400">
          Оставьте комментарии, вопросы или предложения по этому разделу. Каждый раздел имеет отдельную тему для обсуждения.
        </p>
      </div>
      <div ref={containerRef} className="giscus-section-comments" />
    </div>
  );
}
