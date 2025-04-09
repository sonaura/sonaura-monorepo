import { z, ZodObject, ZodRawShape } from 'zod';
import { requiredDatabaseEnv } from '../database';

export function getCustomRequiredEnv<T extends ZodRawShape>(
  customZodObject: ZodObject<T, any, any>,
) {
  // Return the merged schema with proper type
  return z.object({
    ...requiredDatabaseEnv.shape,
    ...customZodObject.shape,
  }) as z.ZodObject<T & typeof requiredDatabaseEnv.shape>;
}
