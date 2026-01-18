import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { Analytics } from "@vercel/analytics/react";
import { SpeedInsights } from "@vercel/speed-insights/next";
import { Providers } from "@/components/Providers";
import { AppChrome } from "@/components/AppChrome";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://web-alchemy-seven.vercel.app';
const siteName = 'Web-Alchemy';

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "Web-Alchemy - Разработка Веб-приложений и сайтов любой сложности",
    template: "%s | Web-Alchemy",
  },
  description: "Создаем современные веб-приложения под ключ с использованием TypeScript, Vue.js и Django. От идеи до запуска — быстро, качественно, профессионально.",
  keywords: [
    'веб-разработка',
    'web development',
    'Next.js',
    'TypeScript',
    'Vue.js',
    'Django',
    'веб-приложения',
    'web applications',
    'сайты под ключ',
    'разработка сайтов',
    'B2B проекты',
    'B2C проекты',
    'landing pages',
    'корпоративные сайты',
  ],
  authors: [{ name: 'Web-Alchemy' }],
  creator: 'Web-Alchemy',
  publisher: 'Web-Alchemy',
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  openGraph: {
    type: 'website',
    locale: 'ru_RU',
    url: siteUrl,
    siteName: siteName,
    title: 'Web-Alchemy - Разработка Веб-приложений и сайтов любой сложности',
    description: 'Создаем современные веб-приложения под ключ с использованием TypeScript, Vue.js и Django. От идеи до запуска — быстро, качественно, профессионально.',
    images: [
      {
        url: '/og-image.png',
        width: 1200,
        height: 630,
        alt: 'Web-Alchemy - Разработка веб-приложений',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Web-Alchemy - Разработка Веб-приложений и сайтов любой сложности',
    description: 'Создаем современные веб-приложения под ключ с использованием TypeScript, Vue.js и Django.',
    images: ['/og-image.png'],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  alternates: {
    canonical: siteUrl,
    languages: {
      'ru-RU': siteUrl,
      'en-US': `${siteUrl}/en`,
      'es-ES': `${siteUrl}/es`,
    },
  },
};

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
  viewportFit: 'cover', // Для поддержки safe area на iOS
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ru" suppressHydrationWarning data-scroll-behavior="smooth">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <Providers>
          <AppChrome />
          {children}
        </Providers>
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  );
}
