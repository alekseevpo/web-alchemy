'use client';

import { useEffect, useState } from 'react';
import { loadRecaptchaScript, getRecaptchaToken, RECAPTCHA_SITE_KEY } from '@/lib/recaptcha';

/**
 * Хук для работы с reCAPTCHA v3
 */
export function useRecaptcha() {
  const [isReady, setIsReady] = useState(false);
  const [isAvailable, setIsAvailable] = useState(!!RECAPTCHA_SITE_KEY);

  useEffect(() => {
    if (!RECAPTCHA_SITE_KEY) {
      setIsAvailable(false);
      return;
    }

    loadRecaptchaScript()
      .then(() => {
        setIsReady(true);
      })
      .catch((error) => {
        console.error('Ошибка загрузки reCAPTCHA:', error);
        setIsReady(false);
      });
  }, []);

  /**
   * Выполнить проверку reCAPTCHA
   * @param action - Действие для токена
   */
  const executeRecaptcha = async (action: string = 'submit'): Promise<string | null> => {
    if (!isReady || !isAvailable) {
      return null;
    }

    return await getRecaptchaToken(action);
  };

  return {
    isReady,
    isAvailable,
    executeRecaptcha,
  };
}
