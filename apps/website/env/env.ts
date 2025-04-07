import { parsedEnv } from '@/env/env-helper.mjs';

export const env = {
  ...parsedEnv,
  isDev: parsedEnv.NODE_ENV === 'development',
};
