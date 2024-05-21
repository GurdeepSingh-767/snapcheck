import * as z from 'zod';

export const customerSchema = z.object({
  companyName: z.string().min(2, { message: "Enter a valid company name" }).max(255, { message: "Enter a valid company name" }),
  companyEmail: z.string().email({ message: "Invalid email address" }),
  contractId: z.string().min(2, { message: "Enter a valid id" }).max(255, { message: "Enter a valid id" }),
  costRate: z.coerce.number().min(1, { message: "Enter a valid price" }).max(999999999, { message: "Enter a valid price" }),
});