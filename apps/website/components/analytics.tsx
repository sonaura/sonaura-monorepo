import { GoogleTagManager } from '@next/third-parties/google';
import { env } from '@/env';

export const Analytics = () => {
  const { isDev, GOOGLE_TAG_MANAGER_ID } = env;

  if (isDev || !GOOGLE_TAG_MANAGER_ID) {
    return null;
  }

  return <GoogleTagManager gtmId={GOOGLE_TAG_MANAGER_ID} />;
};
