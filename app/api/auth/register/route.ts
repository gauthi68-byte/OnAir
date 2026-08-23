import { NextResponse } from 'next/server';
import bcrypt from 'bcrypt';
import pool from '@/lib/db';
import { randomUUID } from 'crypto';

export async function POST(request: Request) {
  try {
    const { email, password } = await request.json();

    if (!email || !password || password.length < 8) {
      return NextResponse.json(
        { error: 'E-mail requis et mot de passe de 8 caractères minimum.' },
        { status: 400 }
      );
    }

    const [existingUsers]: any = await pool.query(
      'SELECT id FROM users WHERE email = ?',
      [email]
    );

    if (existingUsers.length > 0) {
      return NextResponse.json(
        { error: 'Cet e-mail est déjà utilisé.' },
        { status: 409 }
      );
    }

    const saltRounds = 12;
    const passwordHash = await bcrypt.hash(password, saltRounds);
    const uuid = randomUUID();

    await pool.query(
      'INSERT INTO users (uuid, email, password_hash, email_verified) VALUES (?, ?, ?, TRUE)',
      [uuid, email, passwordHash]
    );

    return NextResponse.json(
      { message: 'Inscription réussie.' },
      { status: 201 }
    );

  } catch (error) {
    console.error('Erreur inscription :', error);
    return NextResponse.json(
      { error: 'Erreur interne du serveur.' },
      { status: 500 }
    );
  }
}