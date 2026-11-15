import { z } from 'zod';

// Skema validasi untuk Form Masuk (Login)
export const LoginFormSchema = z.object({
  email: z
    .string()
    .email({ message: 'Masukkan email yang valid.' })
    .trim(),
  password: z
    .string()
    .min(1, { message: 'Password wajib diisi.' }),
});

// Tipe data untuk status respon form action (useActionState)
export type FormState =
  | {
      errors?: {
        email?: string[];
        password?: string[];
      };
      message?: string;
      success?: boolean;
    }
  | undefined;

// Tipe data untuk User
export interface User {
  id: string;
  name: string;
  email: string;
  password: string;
}
