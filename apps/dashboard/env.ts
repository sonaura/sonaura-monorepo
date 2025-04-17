export const env = {
  // Required
  SITE_ENV: process.env.NEXT_PUBLIC_SITE_ENV!,
  AUTH_ISSUER_URL: process.env.NEXT_PUBLIC_AUTH_ISSUER_URL!,

  // Optional
  WEBSITE_URL: process.env.NEXT_PUBLIC_WEBSITE_URL,
  VERCEL_URL: process.env.NEXT_PUBLIC_VERCEL_URL,

  // Custom
  isDev: process.env.NODE_ENV === 'development',
};
