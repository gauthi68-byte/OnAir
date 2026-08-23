import { NextResponse } from 'next/server';
import db from '../../../../lib/db';
import bcrypt from 'bcrypt';

export async function POST(request: Request) {
  try {
    const { username, password } = await request.json();

    if (!username || !password) {
      return NextResponse.json({ error: 'Tous les champs sont requis' }, { status: 400 });
    }

    // Vérifier si l'utilisateur existe déjà
    const [existing]: any = await db.execute(
      'SELECT id FROM users WHERE username = ?',
      [username]
    );

    if (existing.length > 0) {
      return NextResponse.json({ error: 'Ce nom d\'utilisateur est déjà pris' }, { status: 400 });
    }

    // Hasher le mot de passe
    const hashedPassword = await bcrypt.hash(password, 10);

    // Insérer le nouvel utilisateur
    await db.execute(
      'INSERT INTO users (username, password) VALUES (?, ?)',
      [username, hashedPassword]
    );

    return NextResponse.json({ success: true, message: 'Inscription réussie' });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
