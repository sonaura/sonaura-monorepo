import { getCustomRequiredEnv } from '@sonaura/database/required-env';
import { baseEnvSchema } from './base-env-schema';

export const envSchema = getCustomRequiredEnv(baseEnvSchema);

export const parsedEnv = envSchema.parse(process.env);

export const env = {
  ...parsedEnv,
  isDev: parsedEnv.NODE_ENV === 'development',
};
