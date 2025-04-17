import { env } from '@/env';

export function getWebsiteDomain() {
  const { WEBSITE_URL, VERCEL_URL, SITE_ENV } = env;

  return `${SITE_ENV === 'local' ? 'http' : 'https'}://${
    WEBSITE_URL || VERCEL_URL
  }`;
}
