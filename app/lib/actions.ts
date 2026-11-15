'use server';

import { signIn } from '@/auth';
import { AuthError } from 'next-auth';

export async function authenticate(
  prevState: string | undefined,
  formData: FormData,
) {
  try {
    if (!formData.get('redirectTo')) {
      formData.set('redirectTo', '/dashboard');
    }
    await signIn('credentials', formData);
  } catch (error) {
    if (error instanceof AuthError) {
      switch (error.type) {
        case 'CredentialsSignin':
          return 'Email atau kata sandi tidak sesuai.';
        default:
          return 'Terjadi kesalahan sistem.';
      }
    }
    throw error;
  }
}
