import { z } from 'zod';

export const sendMerchantEmailInputSchema = z.object({
  firstName: z.string(),
  lastName: z.string(),
  email: z.string(),
  message: z.string(),
  phone: z.string(),
  templateId: z.number(),
  params: z.object({}).optional(),
});

export type SendMerchantEmailInput = z.infer<
  typeof sendMerchantEmailInputSchema
>;
