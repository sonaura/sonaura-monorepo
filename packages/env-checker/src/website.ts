import { z } from 'zod';
import { getCustomRequiredEnv } from './utils/getCustomRequiredEnv';

const baseEnvSchema = z.object({
  // Required variables
  NEXT_PUBLIC_SITE_ENV: z.string().min(1),

  NEXT_PUBLIC_MERCHANT_NAME: z.string().min(1),
  NEXT_PUBLIC_MERCHANT_EMAIL: z.string().min(1),

  NEXT_PUBLIC_SIB_API_KEY: z.string().min(1),
  NEXT_PUBLIC_PAYPLUG_SECRET_KEY: z.string().min(1),
  NODE_ENV: z.string().min(1),

  // Optional variables
  GOOGLE_TAG_MANAGER_ID: z
    .string()
    .optional()
    .transform((val) => val || undefined),
  NEXT_PUBLIC_WEBSITE_URL: z
    .string()
    .optional()
    .transform((val) => val || undefined),
  NEXT_PUBLIC_VERCEL_URL: z
    .string()
    .optional()
    .transform((val) => val || undefined),
});

const getWebsiteEnvSchema = () => getCustomRequiredEnv(baseEnvSchema);

export const getWebsiteEnv = (env: unknown) => getWebsiteEnvSchema().parse(env);
