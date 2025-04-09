import { getCustomRequiredEnv } from '@sonaura/database/required-env';
import { baseEnvSchema } from './base-env-schema';

const envSchema = getCustomRequiredEnv(baseEnvSchema);

envSchema.parse(process.env);
