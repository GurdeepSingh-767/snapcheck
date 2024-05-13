import * as z from 'zod';

const optionSchema = z.object({
  label: z.string(),
  value: z.string(),
  disable: z.boolean().optional(),
});

export const planSchema = z.object({
  plan: z.string().min(2, { message: "Enter a valid plan name" }).max(255, { message: "Enter a valid plan name" }),
  items: z.array(optionSchema).min(1),
  price: z.coerce.number().min(1, { message: "Enter a valid price" }).max(999999999, { message: "Enter a valid price" }),
});