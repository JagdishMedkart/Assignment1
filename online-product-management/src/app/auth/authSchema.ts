import { z } from 'zod';

export const authSchema = z.object({
  Username: z.string().min(1, 'Username is required.').max(255),
  Email: z.string().email('Invalid email address.'),
  password: z.string().min(1, 'Password hash is required.')
});

export type AuthSchema = z.infer<typeof authSchema>;