import { z } from 'zod';
import { requiredDatabaseEnv } from '@sonaura/database/required-env';

export const baseEnvSchema = z.object({
  // Required variables
  NEXT_PUBLIC_SITE_ENV: z.string().min(1),

  // Optional variables
  NODE_ENV: z
    .enum(['development', 'production', 'test'])
    .default('development'),
  NEXT_PUBLIC_WEBSITE_URL: z.string().optional(),
  NEXT_PUBLIC_VERCEL_URL: z.string().optional(),
});

export const envSchema = z.object({
  ...baseEnvSchema.shape,
  ...requiredDatabaseEnv.shape,
});

export const parsedEnv = envSchema.passthrough().parse(process.env);
