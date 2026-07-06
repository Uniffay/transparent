'use client';

import { useState } from 'react';

const EMOJI_OPTIONS = ['🚀', '🧑‍🚀', '👨‍🚀', '👩‍🚀', '🛰️', '🪐', '🌌', '⭐', '🛸', '🔭', '🌠', '🧭', '☄️', '🌙', '👽', '🐙'];

export default function CrewHome({
  onCreate,
  onJoin,
  error,
}: {
  onCreate: (name: string, emoji: string) => void;
  onJoin: (roomId: string, name: string, emoji: string) => void;
  error: string;
}) {
  const [name, setName] = useState('');
  const [roomId, setRoomId] = useState('');
  const [emoji, setEmoji] = useState('🚀');

  return (
    <div className="flex flex-col items-center justify-center min-h-screen px-6 py-10" style={{ background: bg }}>
      <div className="bg-white/95 rounded-3xl p-8 shadow-xl max-w-md w-full">
        <div className="text-5xl mb-2 text-center">🚀</div>
        <h1 className="text-3xl font-black mb-1 text-center text-gray-800">The Crew</h1>
        <p className="text-gray-500 text-sm mb-6 text-center">
          Jeu de plis coopératif. 3 à 5 joueurs, une seule main visible : la tienne.
        </p>

        <label className="text-xs font-bold uppercase tracking-widest text-gray-400">Ton pseudo</label>
        <input
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Ex: Commandant"
          maxLength={20}
          className="w-full mt-1 mb-4 px-4 py-3 rounded-xl border border-gray-200 outline-none focus:border-blue-500"
        />

        <label className="text-xs font-bold uppercase tracking-widest text-gray-400 mb-2 block">Ton icône</label>
        <div className="grid grid-cols-8 gap-2 mb-6">
          {EMOJI_OPTIONS.map((e) => (
            <button
              key={e}
              onClick={() => setEmoji(e)}
              className={`text-2xl rounded-xl py-2 transition-all ${emoji === e ? 'bg-blue-100 ring-2 ring-blue-500' : 'bg-gray-50 hover:bg-gray-100'}`}
            >
              {e}
            </button>
          ))}
        </div>

        <button
          onClick={() => name.trim() && onCreate(name.trim(), emoji)}
          disabled={!name.trim()}
          className="w-full text-white font-black py-4 rounded-2xl hover:opacity-90 transition-all shadow-md disabled:opacity-40"
          style={{ background: 'linear-gradient(135deg, #1E3A8A, #2563EB)' }}
        >
          Créer une salle
        </button>

        <div className="flex items-center gap-3 my-5">
          <div className="h-px bg-gray-200 flex-1" />
          <span className="text-gray-400 text-xs">ou rejoindre</span>
          <div className="h-px bg-gray-200 flex-1" />
        </div>

        <input
          value={roomId}
          onChange={(e) => setRoomId(e.target.value.toUpperCase())}
          placeholder="Code de salle (ex: A3F8C)"
          maxLength={5}
          className="w-full mb-3 px-4 py-3 rounded-xl border border-gray-200 outline-none focus:border-blue-500 tracking-widest text-center font-bold"
        />
        <button
          onClick={() => name.trim() && roomId.trim() && onJoin(roomId.trim(), name.trim(), emoji)}
          disabled={!name.trim() || !roomId.trim()}
          className="w-full border-2 font-bold py-3 rounded-2xl transition-colors disabled:opacity-40"
          style={{ borderColor: '#2563EB', color: '#2563EB' }}
        >
          Rejoindre
        </button>

        {error && <p className="text-red-500 text-sm text-center mt-4">{error}</p>}
      </div>
    </div>
  );
}

const bg = 'linear-gradient(135deg, #0F172A 0%, #1E3A8A 50%, #2563EB 100%)';
