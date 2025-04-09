import './env/env-helper';

/** @type {import('next').NextConfig} */
const nextConfig = {
  transpilePackages: ['@sonaura/ui'],
  reactStrictMode: true,
  images: {
    dangerouslyAllowSVG: true,
    remotePatterns: [
      {
        hostname: 'omzwibopitojmqdieuml.supabase.co',
      },
      {
        hostname: 'localhost',
      },
    ],
  },
};

export default nextConfig;
