import { z, ZodObject, ZodRawShape } from 'zod';

export const requiredDatabaseEnv = z.object({
  NEXT_PUBLIC_SUPABASE_URL: z.string().min(1),
  NEXT_PUBLIC_SUPABASE_ANON_KEY: z.string().min(1),
});

export function getCustomRequiredEnv<T extends ZodRawShape>(
  customZodObject: ZodObject<T, any, any>,
) {
  // Return the merged schema with proper type
  return z.object({
    ...requiredDatabaseEnv.shape,
    ...customZodObject.shape,
  }) as z.ZodObject<T & typeof requiredDatabaseEnv.shape>;
}
