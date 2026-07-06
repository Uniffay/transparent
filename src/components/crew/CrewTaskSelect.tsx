'use client';

import { CrewGameState } from '@/lib/crewTypes';

export default function CrewTaskSelect({
  gameState,
  myId,
  onChooseTask,
  onPassTask,
}: {
  gameState: CrewGameState;
  myId: string;
  onChooseTask: (taskId: string) => void;
  onPassTask: () => void;
}) {
  const isMyTurn = gameState.currentChooserId === myId;

  function playerLabel(id: string | null) {
    if (!id) return '';
    const p = gameState.players.find((pl) => pl.id === id);
    return p ? `${p.emoji} ${p.name}` : '?';
  }

  return (
    <div className="min-h-screen px-4 py-6 flex flex-col items-center" style={{ background: bg }}>
      <div className="bg-white/95 rounded-3xl p-6 shadow-xl max-w-lg w-full">
        <h2 className="text-xl font-black text-gray-800 text-center mb-1">Répartition des missions</h2>
        <p className="text-center text-gray-500 text-sm mb-5">
          {gameState.commanderId === myId ? 'Tu es le capitaine 👑, tu choisis en premier.' : `Le capitaine : ${playerLabel(gameState.commanderId)}`}
        </p>

        <div className="flex flex-col gap-2 mb-5">
          {gameState.tasks.map((t) => (
            <div
              key={t.id}
              className={`rounded-xl border px-4 py-3 flex items-center justify-between gap-3 ${t.assignee ? 'bg-gray-50 border-gray-200 opacity-60' : 'bg-blue-50 border-blue-200'}`}
            >
              <div className="flex-1">
                <p className="text-sm text-gray-800 font-medium">{t.desc}</p>
                <p className="text-[10px] text-gray-400 uppercase tracking-widest">Difficulté {t.difficulty}{t.order != null ? ` · ordre ${t.order}` : ''}</p>
              </div>
              {t.assignee ? (
                <span className="text-xs font-bold text-gray-500 flex-shrink-0">{playerLabel(t.assignee)}</span>
              ) : isMyTurn ? (
                <button
                  onClick={() => onChooseTask(t.id)}
                  className="flex-shrink-0 text-white text-xs font-black px-3 py-2 rounded-xl"
                  style={{ background: 'linear-gradient(135deg, #1E3A8A, #2563EB)' }}
                >
                  Prendre
                </button>
              ) : null}
            </div>
          ))}
        </div>

        <p className="text-center text-sm font-bold mb-3" style={{ color: isMyTurn ? '#2563EB' : '#9CA3AF' }}>
          {isMyTurn ? 'À toi de choisir une mission !' : `Au tour de ${playerLabel(gameState.currentChooserId)}`}
        </p>

        {isMyTurn && gameState.canPass && (
          <button onClick={onPassTask} className="w-full border-2 border-gray-300 text-gray-500 font-bold py-3 rounded-2xl">
            Passer (aucune mission)
          </button>
        )}
      </div>
    </div>
  );
}

const bg = 'linear-gradient(135deg, #0F172A 0%, #1E3A8A 50%, #2563EB 100%)';
