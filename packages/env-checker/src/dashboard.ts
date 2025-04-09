import { z } from 'zod';
import { getCustomRequiredEnv } from './utils/getCustomRequiredEnv';

const baseEnvSchema = z.object({
  // Required variables
  NEXT_PUBLIC_SITE_ENV: z.string().min(1),
  NODE_ENV: z.string().min(1),

  // Optional variables
  NEXT_PUBLIC_WEBSITE_URL: z
    .string()
    .optional()
    .transform((val) => val || undefined),
  NEXT_PUBLIC_VERCEL_URL: z
    .string()
    .optional()
    .transform((val) => val || undefined),
});

const getDashboardEnvSchema = () => getCustomRequiredEnv(baseEnvSchema);

export const getDashboardEnv = (env: unknown) =>
  getDashboardEnvSchema().parse(env);
