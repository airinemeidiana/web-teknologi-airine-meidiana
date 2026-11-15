import bcrypt from 'bcrypt';
import { sql } from '@vercel/postgres';

export async function GET() {
  if (process.env.NODE_ENV === 'production') {
    return Response.json(
      { message: 'Seed hanya diizinkan di development.' },
      { status: 403 },
    );
  }

  const email = process.env.SEED_EMAIL;
  const password = process.env.SEED_PASSWORD;

  if (!email || !password) {
    return Response.json(
      {
        error:
          'SEED_EMAIL dan SEED_PASSWORD belum dikonfigurasi di environment variables.',
      },
      { status: 400 },
    );
  }

  try {
    await sql`CREATE EXTENSION IF NOT EXISTS "uuid-ossp"`;
    await sql`
      CREATE TABLE IF NOT EXISTS users (
        id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
        name VARCHAR(255) NOT NULL,
        email TEXT NOT NULL UNIQUE,
        password TEXT NOT NULL
      );
    `;

    const hashedPassword = await bcrypt.hash(password, 10);
    await sql`
      INSERT INTO users (name, email, password)
      VALUES ('Airine Meidiana', ${email}, ${hashedPassword})
      ON CONFLICT (email) DO NOTHING;
    `;

    return Response.json({
      message: 'Database seeded successfully',
      user: 'Airine Meidiana',
      email: email,
    });
  } catch (error) {
    console.error('Seed error:', error);
    return Response.json(
      { error: 'Gagal melakukan seed database: ' + (error as Error).message },
      { status: 500 },
    );
  }
}
