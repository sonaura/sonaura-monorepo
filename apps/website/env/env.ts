import { getWebsiteEnv } from '@sonaura/env-checker';

const parsedEnv = getWebsiteEnv(process.env);

export const env = {
  ...parsedEnv,
  isDev: parsedEnv.NODE_ENV === 'development',
};
