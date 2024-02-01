import { z } from 'zod';

export const customerLoginFormSchema = z.object({
  email: z.string().trim().email({ message: 'Please enter a valid email' }),
  password: z.string().trim().min(2, { message: 'password must be a minimum of 2 characters' }),
});

export type customerLoginFormInterface = z.infer<typeof customerLoginFormSchema>;
