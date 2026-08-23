'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function DashboardPage() {
  const router = useRouter();
  
  // États de simulation du jeu
  const [currentTime, setCurrentTime] = useState('06:00');
  const [filledSlots, setFilledSlots] = useState(210); // Sur 288 blocs (environ 73%)
  const totalSlots = 288;
  
  // Programme fictif en cours de diffusion (Simulé pour l'instant T)
  const currentProgram = {
    title: "Le Grand JT de l'Eco",
    category: "Information",
    durationRemaining: "3m 45s",
    rating: "4.2/5",
    posterBg: "from-blue-900 to-slate-900"
  };

  const percentage = Math.round((filledSlots / totalSlots) * 100);
  const canAutoFill = percentage >= 75;

  const handleLogout = () => {
    router.push('/');
  };

  return (
    <main className="min-h-screen bg-neutral-950 text-neutral-100 flex flex-col justify-between p-6 select-none">
      
      {/* HEADER : Nom de la chaîne, Niveau et Bug Antenne en haut à droite */}
      <header className="flex justify-between items-center border-b border-neutral-800 pb-4">
        <div className="flex items-center space-x-4">
          <div className="flex items-center space-x-2">
            <div className="w-3 h-3 bg-red-600 rounded-full animate-pulse"></div>
            <span className="font-mono text-xs tracking-widest text-neutral-400 uppercase">RÉGIE CENTRALE // NIVEAU 1</span>
          </div>
          <span className="text-neutral-600">|</span>
          <h1 className="font-bold text-lg tracking-wide text-neutral-200">Ma Chaîne TV</h1>
        </div>

        {/* BUG ANTENNE (Logo en haut à droite) */}
        <div className="flex items-center space-x-6">
          <div className="text-right font-mono text-xs text-neutral-400">
            <div>TEMPS VIRTUEL</div>
            <div className="text-emerald-400 font-bold text-sm">{currentTime} (Journée 1)</div>
          </div>
          
          <button 
            onClick={handleLogout}
            className="text-xs font-mono text-neutral-400 hover:text-red-400 border border-neutral-800 px-3 py-1.5 rounded-lg transition-colors"
          >
            Quitter l'antenne
          </button>

          {/* Le Logo incrusté "Bug Antenne" */}
          <div className="bg-neutral-900 border border-neutral-700 px-4 py-2 rounded-xl shadow-lg flex items-center space-x-2">
            <div className="w-2.5 h-2.5 bg-red-600 rounded-full"></div>
            <span className="font-extrabold tracking-wider text-sm bg-gradient-to-r from-white to-neutral-400 bg-clip-text text-transparent">TV+</span>
          </div>
        </div>
      </header>

      {/* CORPS DU DASHBOARD : Vue Live + Outils de Grille */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 my-6 flex-grow">
        
        {/* COLONNE 1 & 2 : Écran de Diffusion en Direct (Live Play) */}
        <div className="lg:col-span-2 bg-neutral-900 border border-neutral-800 rounded-2xl p-6 flex flex-col justify-between relative overflow-hidden shadow-2xl">
          <div className="absolute top-0 right-0 w-96 h-96 bg-red-600/5 rounded-full blur-3xl pointer-events-none"></div>

          <div>
            <div className="flex justify-between items-center mb-4">
              <span className="text-xs font-mono tracking-widest text-red-500 uppercase flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-red-500 animate-ping"></span>
                Diffusion en Direct (Bloc 5 min)
              </span>
              <span className="text-xs font-mono text-neutral-400">Temps restant : {currentProgram.durationRemaining}</span>
            </div>

            {/* Lecteur / Affiche du programme en cours */}
            <div className={`w-full h-64 rounded-xl bg-gradient-to-br ${currentProgram.posterBg} border border-neutral-700/50 flex flex-col justify-end p-6 relative shadow-inner`}>
              <div className="absolute top-4 left-4 bg-neutral-950/80 backdrop-blur-md px-3 py-1 rounded-full text-xs font-mono text-neutral-300 border border-neutral-800">
                {currentProgram.category}
              </div>
              <h2 className="text-3xl font-black text-white tracking-tight">{currentProgram.title}</h2>
              <p className="text-xs text-neutral-300 mt-1">Note IMDb : <span className="text-amber-400 font-bold">{currentProgram.rating}</span></p>
            </div>
          </div>

          {/* Statistiques rapides du direct */}
          <div className="grid grid-cols-3 gap-4 mt-6 pt-6 border-t border-neutral-800/80">
            <div>
              <div className="text-[10px] font-mono text-neutral-500 uppercase">Audience Instantanée</div>
              <div className="text-lg font-bold text-neutral-200 mt-0.5">142 500 <span className="text-xs font-normal text-emerald-400">+12%</span></div>
            </div>
            <div>
              <div className="text-[10px] font-mono text-neutral-500 uppercase">Indice Flow</div>
              <div className="text-lg font-bold text-emerald-400 mt-0.5">Optimal (1.0)</div>
            </div>
            <div>
              <div className="text-[10px] font-mono text-neutral-500 uppercase">Revenu Publicitaire</div>
              <div className="text-lg font-bold text-neutral-200 mt-0.5">~340 € / min</div>
            </div>
          </div>
        </div>

        {/* COLONNE 3 : Gestion de la Grille & Auto-Remplissage */}
        <div className="bg-neutral-900 border border-neutral-800 rounded-2xl p-6 flex flex-col justify-between">
          <div>
            <h3 className="font-bold text-sm tracking-wide uppercase text-neutral-300 mb-1">Grille Journalière (24h)</h3>
            <p className="text-xs text-neutral-500 mb-6">288 blocs de 5 minutes (06:00 - 06:00)</p>

            {/* Barre de progression de remplissage */}
            <div className="space-y-2 mb-6">
              <div className="flex justify-between text-xs font-mono">
                <span className="text-neutral-400">Complétion</span>
                <span className={percentage >= 75 ? 'text-emerald-400 font-bold' : 'text-neutral-300'}>{percentage}% ({filledSlots}/{totalSlots} blocs)</span>
              </div>
              <div className="w-full h-2.5 bg-neutral-950 rounded-full overflow-hidden border border-neutral-800">
                <div 
                  className={`h-full transition-all duration-500 ${percentage >= 75 ? 'bg-emerald-500' : 'bg-red-600'}`} 
                  style={{ width: `${percentage}%` }}
                ></div>
              </div>
            </div>

            <div className="bg-neutral-950 border border-neutral-800/80 rounded-xl p-4 text-xs text-neutral-400 space-y-2">
              <p className="font-semibold text-neutral-300">Règle d'auto-remplissage :</p>
              <p>Atteignez <span className="text-white font-bold">75% de complétion</span> de votre grille pour débloquer l'algorithme d'auto-remplissage intelligent des blocs restants.</p>
            </div>
          </div>

          {/* Bouton d'auto-remplissage conditionnel */}
          <button
            disabled={!canAutoFill}
            className={`w-full py-3 rounded-xl font-medium text-xs tracking-wider uppercase transition-all ${
              canAutoFill 
                ? 'bg-emerald-600 hover:bg-emerald-500 text-white shadow-lg shadow-emerald-950' 
                : 'bg-neutral-800 text-neutral-500 cursor-not-allowed'
            }`}
          >
            {canAutoFill ? '⚡ Auto-remplir les trous (QoL)' : 'Remplir à 75% requis'}
          </button>
        </div>

      </div>

      {/* FOOTER : Ticker d'actualité en bas d'écran */}
      <footer className="bg-neutral-900 border border-neutral-800 rounded-xl px-4 py-3 flex items-center space-x-4 overflow-hidden">
        <span className="bg-red-600 text-white font-mono text-[10px] uppercase font-bold px-2 py-0.5 rounded shrink-0 animate-pulse">
          FLASH INFO
        </span>
        <div className="whitespace-nowrap overflow-hidden text-xs text-neutral-400 font-mono">
          <span className="inline-block animate-marquee">
            ► Les audiences du matin sont en hausse de 4% sur la cible jeune • Prochaine bascule publicitaire à 12:00 • Rappel : respectez les quotas de diffusion de votre palier FAST.
          </span>
        </div>
      </footer>

    </main>
  );
}