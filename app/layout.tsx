import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { Analytics } from "@vercel/analytics/react";
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

export const metadata: Metadata = {
  title: "Web Alchemy | Разработка веб-проектов любой сложности под ключ",
  description: "Создаем современные веб-приложения под ключ с использованием TypeScript, Vue.js и Django. От идеи до запуска — быстро, качественно, профессионально.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ru" suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <Providers>
          <AppChrome />
          {children}
        </Providers>
        <Analytics />
      </body>
    </html>
  );
}
