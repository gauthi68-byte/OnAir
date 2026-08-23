import { supabase } from '../../../../lib/supabase';
import bcrypt from 'bcrypt';
import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  try {
    const { username, password } = await request.json();

    const hashedPassword = await bcrypt.hash(password, 10);

    const { data, error } = await supabase
      .from('users')
      .insert([{ username, password: hashedPassword }])
      .select();

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 400 });
    }

    return NextResponse.json({ message: 'Utilisateur créé avec succès', data });
  } catch (err: any) {
    return NextResponse.json({ error: 'Erreur serveur' }, { status: 500 });
  }
}
