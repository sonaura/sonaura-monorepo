import { z } from 'zod';

export const subscribeNewsletterSchema = z.object({
  email: z.string(),
});

export type SubscribeNewsletterDto = z.infer<typeof subscribeNewsletterSchema>;
