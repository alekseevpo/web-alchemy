/**
 * Серверная функция для извлечения языка из заголовков запроса
 * Используется только в Server Components (generateMetadata и т.д.)
 */

import { headers } from 'next/headers';
import type { Language } from './detectLanguage';

/**
 * Извлекает язык из заголовков запроса (серверная функция)
 * Используется в generateMetadata и других server components
 */
export async function getLanguageFromHeaders(): Promise<Language> {
  try {
    const headersList = await headers();
    const acceptLanguage = headersList.get('accept-language');
    
    if (acceptLanguage) {
      // Парсим Accept-Language заголовок
      // Формат: "ru-RU,ru;q=0.9,en-US;q=0.8,en;q=0.7"
      const languages = acceptLanguage
        .split(',')
        .map(lang => lang.split(';')[0].trim().toLowerCase());
      
      // Ищем первый поддерживаемый язык
      for (const lang of languages) {
        const langCode = lang.slice(0, 2);
        if (langCode === 'ru' || langCode === 'en' || langCode === 'es') {
          return langCode as Language;
        }
      }
    }
  } catch (error) {
    // Если заголовки недоступны, возвращаем значение по умолчанию
    console.debug('Failed to read headers:', error);
  }
  
  // По умолчанию - русский
  return 'ru';
}
