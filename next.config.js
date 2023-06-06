// /** @type {import('next').NextConfig} */
// const { i18n } = require('./next-i18next.config');

// const nextConfig = {
//   i18n,
//   reactStrictMode: true,

//   webpack(config, { isServer, dev }) {
//     config.experiments = {
//       asyncWebAssembly: true,
//       layers: true,
//     };

//     return config;
//   },
//   reactStrictMode: false,
//   experimental: {
//     appDir: true,
//   },
// images: {
// remotePatterns: [
// {
//   protocol: 'https',
//   hostname: 'images.pexels.com',
//   port: '',
//   pathname: '/**',
// },
// {
//   protocol: 'https',
//   hostname: 'images.unsplash.com',
//   port: '',
//   pathname: '/**',
// },
// {
//   protocol: 'https',
//   hostname: 'a0.muscache.com',
//   port: '',
//   pathname: '/**',
// },
// {
//   protocol: 'https',
//   hostname: 'www.gstatic.com',
//   port: '',
//   pathname: '/**',
// },
// {
//   protocol: 'https',
//   hostname: 'i.ibb.co',
//   port: '',
//   pathname: '/**',
// },
// {
//   protocol: 'https',
//   hostname: 'lh3.googleusercontent.com',
//   port: '',
//   pathname: '/**',
// },
// {
//   protocol: 'https',
//   hostname: 's.gravatar.com',
//   port: '',
//   pathname: '/**',
// },
// {
//   protocol: 'https',
//   hostname: 'i.ytimg.com',
//   port: '',
//   pathname: '/**',
// },
// ],
// },
// };

// module.exports = nextConfig;

/** @type {import('next').NextConfig} */
require('dotenv').config();
const nextConfig = {
  // pageExtensions: ['page.tsx', 'page.ts', 'page.jsx', 'page.js'],
  env: {
    NEXT_PUBLIC_FIREBASE_API_KEY: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
    NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
    NEXT_PUBLIC_FIREBASE_PROJECT_ID: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
    NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
    NEXT_PUBLIC_FIREBASE_DATABASE_URL: process.env.NEXT_PUBLIC_FIREBASE_DATABASE_URL,
    NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
    NEXT_PUBLIC_FIREBASE_APP_ID: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
    NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID: process.env.NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID,
    OPENAI_API_KEY: process.env.OPENAI_API_KEY,
  },
  eslint: {
    // Warning: This allows production builds to successfully complete even if
    // your project has ESLint errors.
    ignoreDuringBuilds: true,
  },
  // distDir: 'out',
  reactStrictMode: false,
  experimental: {
    appDir: true,
  },
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'images.pexels.com',
        port: '',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
        port: '',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'a0.muscache.com',
        port: '',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'www.gstatic.com',
        port: '',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'i.ibb.co',
        port: '',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'lh3.googleusercontent.com',
        port: '',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 's.gravatar.com',
        port: '',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'i.ytimg.com',
        port: '',
        pathname: '/**',
      },
    ],
  },
};

module.exports = nextConfig;
