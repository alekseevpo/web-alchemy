/**
 * Утилиты для работы с переменными окружения
 */

/**
 * Получает переменную окружения с проверкой
 * @param name - Имя переменной окружения
 * @param required - Обязательная ли переменная (по умолчанию true)
 * @returns Значение переменной окружения
 * @throws Error если обязательная переменная отсутствует
 */
export function getEnvVar(name: string, required = true): string {
  const value = process.env[name];
  
  if (required && (!value || value.trim() === '')) {
    throw new Error(
      `❌ Отсутствует обязательная переменная окружения: ${name}\n` +
      `   Убедитесь, что переменная установлена в .env.local или на Vercel.`
    );
  }
  
  return value?.trim() || '';
}

/**
 * Получает переменную окружения без проверки (опциональная)
 * @param name - Имя переменной окружения
 * @param defaultValue - Значение по умолчанию
 * @returns Значение переменной окружения или значение по умолчанию
 */
export function getEnvVarOptional(name: string, defaultValue = ''): string {
  const value = process.env[name];
  return value?.trim() || defaultValue;
}

/**
 * Валидация конфигурации Giscus
 * @returns Объект с валидированными значениями или null если Giscus не настроен
 */
export function getGiscusConfig() {
  const repo = getEnvVarOptional('NEXT_PUBLIC_GISCUS_REPO');
  const repoId = getEnvVarOptional('NEXT_PUBLIC_GISCUS_REPO_ID');
  const categoryId = getEnvVarOptional('NEXT_PUBLIC_GISCUS_CATEGORY_ID');

  // Если хотя бы одна переменная задана, проверяем обязательные
  if (repo || repoId) {
    if (!repo) {
      console.warn('⚠️ NEXT_PUBLIC_GISCUS_REPO не установлена, комментарии будут отключены');
      return null;
    }
    if (!repoId) {
      console.warn('⚠️ NEXT_PUBLIC_GISCUS_REPO_ID не установлена, комментарии будут отключены');
      return null;
    }
  }

  // Если ничего не задано, возвращаем null (Giscus отключен)
  if (!repo && !repoId) {
    return null;
  }

  return {
    repo,
    repoId,
    categoryId: categoryId || undefined,
  };
}
