import { z } from 'zod';

export const baseEnvSchema = z.object({
  // Required variables
  NEXT_PUBLIC_SITE_ENV: z.string().min(1),

  NEXT_PUBLIC_MERCHANT_NAME: z.string().min(1),
  NEXT_PUBLIC_MERCHANT_EMAIL: z.string().min(1),

  NEXT_PUBLIC_SIB_API_KEY: z.string().min(1),
  NEXT_PUBLIC_PAYPLUG_SECRET_KEY: z.string().min(1),

  // Optional variables
  NODE_ENV: z
    .enum(['development', 'production', 'test'])
    .default('development'),
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
