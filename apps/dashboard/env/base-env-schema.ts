import { z } from 'zod';

export const baseEnvSchema = z.object({
  // Required variables
  NEXT_PUBLIC_SITE_ENV: z.string().min(1),

  // Optional variables
  NODE_ENV: z
    .enum(['development', 'production', 'test'])
    .default('development'),
  NEXT_PUBLIC_WEBSITE_URL: z
    .string()
    .optional()
    .transform((val) => val || undefined),
  NEXT_PUBLIC_VERCEL_URL: z
    .string()
    .optional()
    .transform((val) => val || undefined),
});
