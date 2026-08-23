import { supabase } from '@/lib/supabase';
import bcrypt from 'bcrypt';
import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  try {
    const { username, password } = await request.json();

    // Recherche de l'utilisateur dans Supabase
    const { data: users, error } = await supabase
      .from('users')
      .select('*')
      .eq('username', username)
      .limit(1);

    if (error || !users || users.length === 0) {
      return NextResponse.json({ error: 'Utilisateur non trouvé' }, { status: 401 });
    }

    const user = users[0];
    const passwordMatch = await bcrypt.compare(password, user.password);

    if (!passwordMatch) {
      return NextResponse.json({ error: 'Mot de passe incorrect' }, { status: 401 });
    }

    return NextResponse.json({ message: 'Connexion réussie' });
  } catch (err: any) {
    return NextResponse.json({ error: 'Erreur serveur' }, { status: 500 });
  }
}
