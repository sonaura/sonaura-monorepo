export const siteEnv = process.env.NEXT_PUBLIC_SITE_ENV;

export const websiteUrl = `${siteEnv === 'local' ? 'http' : 'https'}://${
  process.env.NEXT_PUBLIC_WEBSITE_URL || process.env.NEXT_PUBLIC_VERCEL_URL
}`;
