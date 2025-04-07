import { z } from 'zod';

export const addToListSchema = z.object({
  firstName: z.string(),
  lastName: z.string(),
  email: z.string(),
  phone: z.string(),
  includeListIds: z.array(z.number()),
});

export type AddToListInput = z.infer<typeof addToListSchema>;
