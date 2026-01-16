'use client';

import { ReactNode } from 'react';
import { ThemeProvider as NextThemesProvider } from 'next-themes';
import { LanguageProvider } from '@/lib/i18n/LanguageContext';
import { translations } from '@/lib/i18n/translations';
import { LanguageSetter } from './LanguageSetter';
import { CookieConsent } from './CookieConsent';
import { StructuredData } from './StructuredData';

interface ProvidersProps {
  children: ReactNode;
}

export function Providers({ children }: ProvidersProps) {
  return (
    <NextThemesProvider
      attribute="class"
      defaultTheme="system"
      enableSystem
      disableTransitionOnChange={false}
      storageKey="theme"
    >
      <LanguageProvider translations={translations}>
        <LanguageSetter />
        <StructuredData />
        {children}
        <CookieConsent />
      </LanguageProvider>
    </NextThemesProvider>
  );
}
