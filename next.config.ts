import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Оптимизация изображений
  images: {
    formats: ['image/avif', 'image/webp'],
    deviceSizes: [640, 750, 828, 1080, 1200, 1920],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
    minimumCacheTTL: 60,
    // Разрешенные домены для внешних изображений
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'cdn.jsdelivr.net',
        pathname: '/gh/devicons/devicon@**',
      },
      {
        protocol: 'https',
        hostname: 'fastapi.tiangolo.com',
        pathname: '/img/**',
      },
    ],
  },

  // Компрессия
  compress: true,

  // Оптимизация production
  poweredByHeader: false,
  reactStrictMode: true,

  // Security headers
  async headers() {
    return [
      {
        source: '/:path*',
        headers: [
          {
            key: 'X-DNS-Prefetch-Control',
            value: 'on',
          },
          {
            key: 'Strict-Transport-Security',
            value: 'max-age=63072000; includeSubDomains; preload',
          },
          {
            key: 'X-Frame-Options',
            value: 'SAMEORIGIN',
          },
          {
            key: 'X-Content-Type-Options',
            value: 'nosniff',
          },
          {
            key: 'X-XSS-Protection',
            value: '1; mode=block',
          },
          {
            key: 'Referrer-Policy',
            value: 'origin-when-cross-origin',
          },
          {
            key: 'Permissions-Policy',
            value: 'camera=(), microphone=(), geolocation=()',
          },
          {
            key: 'Content-Security-Policy',
            value: [
              "default-src 'self'",
              "script-src 'self' 'unsafe-eval' 'unsafe-inline' https://giscus.app https://vercel.live https://www.google.com https://www.gstatic.com https://va.vercel-scripts.com https://vercel-scripts.com",
              "style-src 'self' 'unsafe-inline'",
              "img-src 'self' data: https: blob:",
              "font-src 'self' data:",
              "connect-src 'self' https://giscus.app https://vitals.vercel-insights.com https://www.google.com https://va.vercel-scripts.com",
              "frame-src 'self' https://www.google.com https://www.gstatic.com",
            ].join('; ')
          },
        ],
      },
    ];
  },
};

export default nextConfig;
