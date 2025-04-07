import { z } from 'zod';

export const createPaymentSchema = z.object({
  firstName: z.string(),
  lastName: z.string(),
  phoneNumber: z.string(),
  address: z.string(),
  city: z.string(),
  postalCode: z.string(),
  email: z.string(),
  amount: z.number(),
  products: z.array(z.object({})),
});

export type CreatePaymentInput = z.infer<typeof createPaymentSchema>;
