/**
 * Определение языка пользователя на основе браузера и геолокации
 * Приоритет: язык браузера > геолокация
 */

export type Language = 'ru' | 'en' | 'es';

interface LanguageDetectionResult {
  language: Language;
  source: 'browser' | 'location' | 'default';
}

// Маппинг стран на языки
const countryToLanguage: Record<string, Language> = {
  // Страны, где основной язык русский
  'RU': 'ru', // Россия
  'BY': 'ru', // Беларусь
  'KZ': 'ru', // Казахстан
  'KG': 'ru', // Киргизия
  'UA': 'ru', // Украина (может быть и украинский, но многие используют русский)
  'MD': 'ru', // Молдова
  'AM': 'ru', // Армения (многие говорят на русском)
  'AZ': 'ru', // Азербайджан
  
  // Страны, где основной язык испанский
  'ES': 'es', // Испания
  'MX': 'es', // Мексика
  'AR': 'es', // Аргентина
  'CO': 'es', // Колумбия
  'CL': 'es', // Чили
  'PE': 'es', // Перу
  'VE': 'es', // Венесуэла
  'EC': 'es', // Эквадор
  'GT': 'es', // Гватемала
  'CU': 'es', // Куба
  'BO': 'es', // Боливия
  'DO': 'es', // Доминиканская Республика
  'HN': 'es', // Гондурас
  'PY': 'es', // Парагвай
  'SV': 'es', // Сальвадор
  'NI': 'es', // Никарагуа
  'CR': 'es', // Коста-Рика
  'PA': 'es', // Панама
  'UY': 'es', // Уругвай
  
  // Страны, где основной язык английский (только основные)
  'US': 'en', // США
  'GB': 'en', // Великобритания
  'CA': 'en', // Канада
  'AU': 'en', // Австралия
  'NZ': 'en', // Новая Зеландия
  'IE': 'en', // Ирландия
};

/**
 * Определяет язык браузера
 */
function getBrowserLanguage(): Language | null {
  if (typeof window === 'undefined') return null;
  
  const browserLang = navigator.language || (navigator as any).userLanguage;
  
  if (!browserLang) return null;
  
  // Получаем первые 2 символа (например, 'ru', 'en', 'es')
  const langCode = browserLang.slice(0, 2).toLowerCase();
  
  if (langCode === 'ru' || langCode === 'en' || langCode === 'es') {
    return langCode as Language;
  }
  
  // Проверяем также languages array для более точного определения
  if (navigator.languages) {
    for (const lang of navigator.languages) {
      const code = lang.slice(0, 2).toLowerCase();
      if (code === 'ru' || code === 'en' || code === 'es') {
        return code as Language;
      }
    }
  }
  
  return null;
}

/**
 * Определяет страну пользователя через IP
 * Использует бесплатный API ipapi.co
 */
async function getCountryByIP(): Promise<string | null> {
  try {
    // Используем бесплатный API для определения страны
    const response = await fetch('https://ipapi.co/country_code/', {
      headers: {
        'Accept': 'application/json',
      },
    });
    
    if (response.ok) {
      const countryCode = await response.text();
      return countryCode.trim();
    }
  } catch (error) {
    // Если API недоступен, игнорируем ошибку
    console.debug('Geo location detection failed:', error);
  }
  
  return null;
}

/**
 * Определяет язык на основе страны
 */
function getLanguageByCountry(countryCode: string | null): Language | null {
  if (!countryCode) return null;
  
  const language = countryToLanguage[countryCode.toUpperCase()];
  return language || null;
}

/**
 * Основная функция определения языка
 * Логика:
 * 1. Если есть сохраненный язык - используем его
 * 2. Если язык браузера совпадает с одним из поддерживаемых - используем его (приоритет)
 * 3. Если пользователь из страны с одним из наших языков - используем язык страны
 * 4. По умолчанию - русский
 */
export async function detectLanguage(savedLanguage?: Language | null): Promise<LanguageDetectionResult> {
  // 1. Если пользователь уже выбрал язык, используем его
  if (savedLanguage && ['ru', 'en', 'es'].includes(savedLanguage)) {
    return { language: savedLanguage, source: 'browser' };
  }
  
  // 2. Определяем язык браузера (высокий приоритет)
  const browserLang = getBrowserLanguage();
  if (browserLang) {
    return { language: browserLang, source: 'browser' };
  }
  
  // 3. Определяем страну по IP и выбираем язык
  const countryCode = await getCountryByIP();
  const locationLang = getLanguageByCountry(countryCode);
  if (locationLang) {
    return { language: locationLang, source: 'location' };
  }
  
  // 4. По умолчанию - русский
  return { language: 'ru', source: 'default' };
}

/**
 * Синхронная версия (только браузер + сохраненный язык)
 * Используется для начальной загрузки без задержки
 */
export function detectLanguageSync(savedLanguage?: Language | null): LanguageDetectionResult {
  // 1. Если пользователь уже выбрал язык
  if (savedLanguage && ['ru', 'en', 'es'].includes(savedLanguage)) {
    return { language: savedLanguage, source: 'browser' };
  }
  
  // 2. Определяем язык браузера
  const browserLang = getBrowserLanguage();
  if (browserLang) {
    return { language: browserLang, source: 'browser' };
  }
  
  // 3. По умолчанию
  return { language: 'ru', source: 'default' };
}
