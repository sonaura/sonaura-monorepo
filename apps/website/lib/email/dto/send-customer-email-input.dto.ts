import { z } from 'zod';

export const sendCustomerEmailInputSchema = z.object({
  firstName: z.string(),
  lastName: z.string(),
  email: z.string(),
  message: z.string(),
  phone: z.string(),
  templateId: z.object({
    customer: z.number(),
    merchant: z.number(),
  }),
  includeListIds: z.array(z.number()).optional(),
  params: z.object({}).optional(),
});

export type SendCustomerEmailInput = z.infer<
  typeof sendCustomerEmailInputSchema
>;
