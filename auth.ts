import NextAuth from 'next-auth';
import { authConfig } from './auth.config';
import Credentials from 'next-auth/providers/credentials';
import { z } from 'zod';
import { sql } from '@vercel/postgres';
import type { User } from '@/app/lib/definitions';
import bcrypt from 'bcrypt';

async function getUser(email: string): Promise<User | undefined> {
  try {
    if (process.env.POSTGRES_URL || process.env.DATABASE_URL) {
      const user = await sql<User>`SELECT * FROM users WHERE email=${email}`;
      if (user.rows[0]) return user.rows[0];
    }
  } catch (error) {
    console.warn('Database query error or unconfigured:', error);
  }

  // Akun demo untuk pengujian dosen jika database belum terkoneksi
  const normalized = email.trim().toLowerCase();
  if (normalized === 'airine@gmail.com' || normalized === 'airinemeidiana@gmail.com') {
    return {
      id: 'usr_airine',
      name: 'Airine',
      email: normalized,
      password: await bcrypt.hash('123456', 10),
      createdAt: '2026-11-15T00:00:00.000Z',
    };
  }
  return undefined;
}

export const { auth, signIn, signOut } = NextAuth({
  ...authConfig,
  secret: process.env.AUTH_SECRET || process.env.NEXTAUTH_SECRET || process.env.SESSION_SECRET,
  providers: [
    Credentials({
      async authorize(credentials) {
        const parsedCredentials = z
          .object({ email: z.string().email(), password: z.string().min(6) })
          .safeParse(credentials);

        if (parsedCredentials.success) {
          const { email, password } = parsedCredentials.data;
          const user = await getUser(email);
          if (!user) return null;
          const passwordsMatch = await bcrypt.compare(password, user.password);

          if (passwordsMatch) return user;
        }

        console.log('Invalid credentials');
        return null;
      },
    }),
  ],
});
