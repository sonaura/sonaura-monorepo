export function getWebsiteDomain() {
  const NEXT_PUBLIC_WEBSITE_URL = process.env.NEXT_PUBLIC_WEBSITE_URL;
  const NEXT_PUBLIC_VERCEL_URL = process.env.NEXT_PUBLIC_VERCEL_URL;
  const NEXT_PUBLIC_SITE_ENV = process.env.NEXT_PUBLIC_SITE_ENV;

  return `${NEXT_PUBLIC_SITE_ENV === 'local' ? 'http' : 'https'}://${
    NEXT_PUBLIC_WEBSITE_URL || NEXT_PUBLIC_VERCEL_URL
  }`;
}
