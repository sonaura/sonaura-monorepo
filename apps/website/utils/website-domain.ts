export function getWebsiteDomain() {
  const siteEnv = process.env.NEXT_PUBLIC_SITE_ENV!;

  return `${siteEnv === 'local' ? 'http' : 'https'}://${
    process.env.NEXT_PUBLIC_WEBSITE_URL || process.env.NEXT_PUBLIC_VERCEL_URL
  }`;
}
