'use client';

import { useState } from 'react';
import { CrewRoomUpdate } from '@/lib/crewTypes';
import { CREW_MISSIONS } from '@/lib/crewMissions';

export default function CrewLobby({
  roomData,
  myId,
  onSetMode,
  onSetMission,
  onSetReady,
  onKick,
  onQuit,
  error,
}: {
  roomData: CrewRoomUpdate;
  myId: string;
  onSetMode: (mode: 'base' | 'extension') => void;
  onSetMission: (missionId: string) => void;
  onSetReady: (ready: boolean) => void;
  onKick: (targetId: string) => void;
  onQuit: () => void;
  error: string;
}) {
  const [ready, setReady] = useState(false);
  const isHost = roomData.hostId === myId;
  const missions = CREW_MISSIONS[roomData.mode];
  const currentMission = missions.find((m) => m.id === roomData.missionId) ?? missions[0];

  function toggleReady() {
    const next = !ready;
    setReady(next);
    onSetReady(next);
  }

  const canStart = roomData.players.length >= roomData.minPlayers && roomData.players.length <= roomData.maxPlayers;

  return (
    <div className="flex flex-col items-center justify-center min-h-screen px-6 py-10" style={{ background: bg }}>
      <div className="bg-white/95 rounded-3xl p-6 shadow-xl max-w-lg w-full">
        <p className="text-center text-xs uppercase tracking-widest text-gray-400">Code de la salle</p>
        <p className="text-center text-3xl font-black tracking-widest text-gray-800 mb-1">{roomData.roomId}</p>
        <p className="text-center text-xs text-gray-400 mb-5">Partage ce code à ton équipage</p>

        {/* Mode selector */}
        <p className="text-xs font-bold uppercase tracking-widest text-gray-400 mb-2">
          Mode {!isHost && <span className="normal-case font-normal">(chef seulement)</span>}
        </p>
        <div className="grid grid-cols-2 gap-2 mb-5">
          {(['base', 'extension'] as const).map((m) => (
            <button
              key={m}
              onClick={() => isHost && onSetMode(m)}
              disabled={!isHost}
              className={`py-3 rounded-xl font-bold text-sm transition-all ${roomData.mode === m ? 'text-white' : 'bg-gray-100 text-gray-500'} disabled:opacity-60`}
              style={roomData.mode === m ? { background: 'linear-gradient(135deg, #1E3A8A, #2563EB)' } : {}}
            >
              {m === 'base' ? '🚀 Jeu de base' : '🌌 Extension'}
              <span className="block text-[10px] font-normal opacity-80">
                {m === 'base' ? 'Tâches simples' : 'Missions Deep Sea, tâches variées'}
              </span>
            </button>
          ))}
        </div>

        {/* Mission selector */}
        <p className="text-xs font-bold uppercase tracking-widest text-gray-400 mb-2">
          Mission {!isHost && <span className="normal-case font-normal">(chef seulement)</span>}
        </p>
        <div className="grid grid-cols-5 gap-1.5 mb-2">
          {missions.map((m) => (
            <button
              key={m.id}
              onClick={() => isHost && onSetMission(m.id)}
              disabled={!isHost}
              className={`py-2 rounded-lg font-black text-sm transition-all ${roomData.missionId === m.id ? 'text-white' : 'bg-gray-100 text-gray-500'} disabled:opacity-60`}
              style={roomData.missionId === m.id ? { background: '#2563EB' } : {}}
            >
              {m.n}
            </button>
          ))}
        </div>
        <p className="text-xs text-gray-500 text-center mb-5 min-h-[2.5em]">{currentMission?.desc}</p>

        {/* Player list */}
        <p className="text-xs font-bold uppercase tracking-widest text-gray-400 mb-2">
          Équipage ({roomData.players.length}/{roomData.maxPlayers})
        </p>
        <div className="flex flex-col gap-2 mb-4">
          {roomData.players.map((p) => (
            <div key={p.id} className="flex items-center justify-between bg-gray-50 border border-gray-200 rounded-xl px-3 py-2">
              <span className="font-semibold flex items-center gap-2 text-gray-800">
                <span className="text-xl">{p.emoji}</span>
                {p.name} {p.id === myId && <span className="text-gray-400 font-normal">(toi)</span>}
                {p.id === roomData.hostId && <span className="text-[10px] bg-blue-100 text-blue-600 px-1.5 py-0.5 rounded-full font-bold">CHEF</span>}
              </span>
              <div className="flex items-center gap-2">
                <span className={`text-xs font-semibold ${p.ready ? 'text-green-500' : 'text-gray-400'}`}>
                  {p.ready ? '✓ Prêt' : 'En attente'}
                </span>
                {isHost && p.id !== myId && (
                  <button onClick={() => onKick(p.id)} className="text-red-500 bg-red-50 border border-red-200 rounded-lg px-2 py-0.5 text-xs font-bold">
                    ✕
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>

        {!canStart && (
          <p className="text-center text-gray-400 text-sm mb-4">
            Il faut entre {roomData.minPlayers} et {roomData.maxPlayers} joueurs pour lancer la partie.
          </p>
        )}

        <button
          onClick={toggleReady}
          disabled={!canStart}
          className="w-full text-white font-black py-4 rounded-2xl hover:opacity-90 transition-all shadow-md disabled:opacity-40 mb-3"
          style={{ background: 'linear-gradient(135deg, #1E3A8A, #2563EB)' }}
        >
          {ready ? 'Annuler' : 'Je suis prêt !'}
        </button>

        <button onClick={onQuit} className="w-full border-2 border-red-300 text-red-500 font-bold py-3 rounded-2xl">
          Quitter
        </button>

        {error && <p className="text-red-500 text-sm text-center mt-4">{error}</p>}
      </div>
    </div>
  );
}

const bg = 'linear-gradient(135deg, #0F172A 0%, #1E3A8A 50%, #2563EB 100%)';
