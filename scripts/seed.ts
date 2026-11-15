import bcrypt from 'bcrypt';
import { sql } from '@vercel/postgres';

async function main() {
  if (process.env.NODE_ENV === 'production') {
    console.error('Seed hanya diizinkan di development.');
    process.exit(1);
  }

  const email = process.env.SEED_EMAIL;
  const password = process.env.SEED_PASSWORD;

  if (!email || !password) {
    console.error(
      'Error: SEED_EMAIL dan SEED_PASSWORD harus diset di environment variables.',
    );
    process.exit(1);
  }

  try {
    console.log('Menyiapkan tabel users...');
    await sql`CREATE EXTENSION IF NOT EXISTS "uuid-ossp"`;
    await sql`
      CREATE TABLE IF NOT EXISTS users (
        id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
        name VARCHAR(255) NOT NULL,
        email TEXT NOT NULL UNIQUE,
        password TEXT NOT NULL
      );
    `;

    console.log('Menghash password dan memasukkan data user...');
    const hashedPassword = await bcrypt.hash(password, 10);
    await sql`
      INSERT INTO users (name, email, password)
      VALUES ('Airine Meidiana', ${email}, ${hashedPassword})
      ON CONFLICT (email) DO NOTHING;
    `;

    console.log(`Database berhasil di-seed untuk user "Airine Meidiana" (${email}).`);
  } catch (error) {
    console.error('Seed error:', (error as Error).message);
    process.exit(1);
  }
}

main();
