/**
 * reCAPTCHA v3 утилиты
 */

import { RECAPTCHA_CONFIG } from './google/config';

declare global {
  interface Window {
    grecaptcha: {
      ready: (callback: () => void) => void;
      execute: (siteKey: string, options: { action: string }) => Promise<string>;
    };
  }
}

export const RECAPTCHA_SITE_KEY = RECAPTCHA_CONFIG.siteKey;

/**
 * Инициализация reCAPTCHA v3
 */
export function loadRecaptchaScript(): Promise<void> {
  return new Promise((resolve, reject) => {
    if (window.grecaptcha) {
      resolve();
      return;
    }

    if (!RECAPTCHA_SITE_KEY) {
      reject(new Error('reCAPTCHA Site Key не настроен'));
      return;
    }

    const script = document.createElement('script');
    script.src = `${RECAPTCHA_CONFIG.scriptUrl}?render=${RECAPTCHA_SITE_KEY}`;
    script.async = true;
    script.defer = true;
    script.onload = () => {
      window.grecaptcha.ready(() => {
        resolve();
      });
    };
    script.onerror = () => {
      reject(new Error('Failed to load reCAPTCHA script'));
    };
    document.head.appendChild(script);
  });
}

/**
 * Получить токен reCAPTCHA v3
 * @param action - Действие для токена (например, 'submit', 'contact', 'support')
 */
export async function getRecaptchaToken(action: string = 'submit'): Promise<string | null> {
  if (!RECAPTCHA_SITE_KEY) {
    console.warn('reCAPTCHA Site Key не настроен');
    return null;
  }

  try {
    await loadRecaptchaScript();

    const token = await window.grecaptcha.execute(RECAPTCHA_SITE_KEY, {
      action,
    });

    return token;
  } catch (error) {
    console.error('Ошибка получения reCAPTCHA токена:', error);
    return null;
  }
}
