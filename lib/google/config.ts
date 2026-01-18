/**
 * Google Services Configuration (MVP)
 * Централизованная конфигурация для всех Google сервисов
 */

/**
 * reCAPTCHA v3 Configuration
 */
export const RECAPTCHA_CONFIG = {
  siteKey: process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY || '',
  secretKey: process.env.RECAPTCHA_SECRET_KEY || '',
  apiUrl: 'https://www.google.com/recaptcha/api/siteverify',
  scriptUrl: 'https://www.google.com/recaptcha/api.js',
  isEnabled: () => {
    const siteKey = process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY;
    return !!siteKey && siteKey.length > 0;
  },
};

/**
 * Google Fonts Configuration
 */
export const GOOGLE_FONTS_CONFIG = {
  fonts: {
    geist: 'Geist',
    geistMono: 'Geist Mono',
  },
  apiUrl: 'https://fonts.googleapis.com',
  cssUrl: 'https://fonts.googleapis.com/css2',
};

/**
 * Google Analytics Configuration (опционально для будущего)
 */
export const GOOGLE_ANALYTICS_CONFIG = {
  measurementId: process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID || '',
  isEnabled: () => {
    const id = process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID;
    return !!id && id.length > 0;
  },
};

/**
 * Google Search Console / Site Verification (опционально)
 */
export const GOOGLE_SITE_VERIFICATION = {
  verificationCode: process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION || '',
  isEnabled: () => {
    const code = process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION;
    return !!code && code.length > 0;
  },
};

/**
 * Общая конфигурация Google сервисов
 */
export const GOOGLE_SERVICES = {
  recaptcha: RECAPTCHA_CONFIG,
  fonts: GOOGLE_FONTS_CONFIG,
  analytics: GOOGLE_ANALYTICS_CONFIG,
  siteVerification: GOOGLE_SITE_VERIFICATION,
  
  /**
   * Проверка доступности Google сервисов
   */
  checkServices: () => {
    return {
      recaptcha: RECAPTCHA_CONFIG.isEnabled(),
      analytics: GOOGLE_ANALYTICS_CONFIG.isEnabled(),
      siteVerification: GOOGLE_SITE_VERIFICATION.isEnabled(),
    };
  },
};

/**
 * CSP (Content Security Policy) директивы для Google
 */
export const GOOGLE_CSP_DIRECTIVES = {
  scriptSrc: [
    "'self'",
    'https://www.google.com',
    'https://www.gstatic.com',
  ],
  connectSrc: [
    "'self'",
    'https://www.google.com',
  ],
  fontSrc: [
    "'self'",
    'https://fonts.gstatic.com',
  ],
  styleSrc: [
    "'self'",
    "'unsafe-inline'",
    'https://fonts.googleapis.com',
  ],
};
