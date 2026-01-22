/**
 * Серверная функция для извлечения языка из заголовков запроса
 * Используется только в Server Components (generateMetadata и т.д.)
 */
import { headers } from 'next/headers';
import type { Language } from './detectLanguage';

/**
 * Безопасная версия функции для использования в Server Components
 * Возвращает язык по умолчанию без использования headers()
 */
export function getLanguageStatic(): Language {
  return 'ru'; // По умолчанию - русский язык
}

/**
 * Извлекает язык из заголовков запроса (серверная функция)
 * Используется в generateMetadata и других server components
 * ВНИМАНИЕ: Вызывает DYNAMIC_SERVER_USAGE ошибки при статической генерации
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
    // console.debug('Failed to read headers:', error); // Убрано, так как основная проблема решена
  }
  
  // По умолчанию - русский
  return 'ru';
}
