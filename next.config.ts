import createNextIntlPlugin from 'next-intl/plugin';
import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [{ protocol: 'https', hostname: 'images.pexels.com', pathname: '/photos/**' }],
  },
  // Preserve previously shared policy URLs; both topics now use one legal page.
  async redirects() {
    return [
      { source: '/:locale(en|ar)/privacy-policy', destination: '/:locale/legal', permanent: true },
      { source: '/:locale(en|ar)/terms', destination: '/:locale/legal', permanent: true },
    ];
  },
  async headers() {
    return [{ source: '/:path*', headers: [
      {key:'X-Content-Type-Options',value:'nosniff'},
      {key:'Referrer-Policy',value:'strict-origin-when-cross-origin'},
      {key:'X-Frame-Options',value:'SAMEORIGIN'},
      {key:'Permissions-Policy',value:'camera=(), microphone=(), geolocation=()'},
    ]}];
  },
  turbopack: {
    rules: {
      '*.css': {
        loaders: ['@tailwindcss/turbopack'],
        as: '*.css',
      },
    },
  },
};

export default createNextIntlPlugin('./src/i18n/request.ts')(nextConfig);
