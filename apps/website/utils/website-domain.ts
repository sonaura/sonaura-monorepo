import { env } from '@/env';

export function getWebsiteDomain() {
  const {
    NEXT_PUBLIC_WEBSITE_URL,
    NEXT_PUBLIC_VERCEL_URL,
    NEXT_PUBLIC_SITE_ENV,
  } = env;

  return `${NEXT_PUBLIC_SITE_ENV === 'local' ? 'http' : 'https'}://${
    NEXT_PUBLIC_WEBSITE_URL || NEXT_PUBLIC_VERCEL_URL
  }/`;
}
