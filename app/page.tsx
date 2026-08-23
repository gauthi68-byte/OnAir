'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function AuthPage() {
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setSuccessMessage('');
    setLoading(true);

    const endpoint = isLogin ? '/api/auth/login' : '/api/auth/register';

    try {
      const res = await fetch(endpoint, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || 'Une erreur est survenue.');
      }

      if (isLogin) {
        router.push('/dashboard');
      } else {
        setSuccessMessage('Compte créé avec succès ! Veuillez vous connecter.');
        setIsLogin(true);
      }
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="min-h-screen bg-neutral-950 text-neutral-100 flex flex-col items-center justify-center p-4">
      <div className="absolute top-6 left-6 flex items-center space-x-2">
        <div className="w-4 h-4 bg-red-600 rounded-full animate-pulse"></div>
        <span className="font-mono tracking-widest text-sm uppercase text-neutral-400">TV MANAGER // LIVE</span>
      </div>

      <div className="w-full max-w-md bg-neutral-900 border border-neutral-800 rounded-xl p-8 shadow-2xl">
        <h1 className="text-2xl font-bold tracking-tight mb-2 text-center">
          {isLogin ? 'Connexion Antenne' : 'Création de Chaîne'}
        </h1>
        <p className="text-xs text-neutral-400 text-center mb-6 uppercase tracking-wider">
          {isLogin ? 'Accédez à votre régie de diffusion' : 'Lancez votre propre empire médiatique'}
        </p>

        {error && (
          <div className="mb-4 p-3 bg-red-950/50 border border-red-800 text-red-200 text-sm rounded-lg">
            {error}
          </div>
        )}

        {successMessage && (
          <div className="mb-4 p-3 bg-emerald-950/50 border border-emerald-800 text-emerald-200 text-sm rounded-lg">
            {successMessage}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-xs font-mono uppercase text-neutral-400 mb-1">Adresse E-mail</label>
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full bg-neutral-950 border border-neutral-800 rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:border-red-600 transition-colors"
              placeholder="directeur@votre-chaine.tv"
            />
          </div>

          <div>
            <label className="block text-xs font-mono uppercase text-neutral-400 mb-1">Mot de passe</label>
            <input
              type="password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full bg-neutral-950 border border-neutral-800 rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:border-red-600 transition-colors"
              placeholder="••••••••"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-red-600 hover:bg-red-700 font-medium text-sm py-2.5 rounded-lg transition-colors disabled:opacity-50 mt-2"
          >
            {loading ? 'Traitement en cours...' : isLogin ? 'Prendre l’antenne' : 'Enregistrer la chaîne'}
          </button>
        </form>

        <div className="mt-6 text-center">
          <button
            onClick={() => { setIsLogin(!isLogin); setError(''); setSuccessMessage(''); }}
            className="text-xs text-neutral-400 hover:text-neutral-200 underline transition-colors"
          >
            {isLogin ? 'Pas encore de chaîne ? Créez votre compte' : 'Déjà une chaîne ? Connectez-vous'}
          </button>
        </div>
      </div>
    </main>
  );
}