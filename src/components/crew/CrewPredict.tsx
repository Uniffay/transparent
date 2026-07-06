'use client';

import { useState } from 'react';
import { CrewGameState } from '@/lib/crewTypes';

export default function CrewPredict({
  gameState,
  onSetPrediction,
}: {
  gameState: CrewGameState;
  onSetPrediction: (taskId: string, value: number) => void;
}) {
  const taskId = gameState.myPendingPredictionTaskIds[0];
  const task = gameState.tasks.find((t) => t.id === taskId);
  const [value, setValue] = useState(0);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen px-6" style={{ background: bg }}>
      <div className="bg-white/95 rounded-3xl p-8 shadow-xl max-w-sm w-full text-center">
        {task ? (
          <>
            <div className="text-4xl mb-3">🔮</div>
            <h2 className="text-lg font-black text-gray-800 mb-2">Fais ta prédiction</h2>
            <p className="text-gray-500 text-sm mb-6">{task.desc}</p>
            <p className="text-5xl font-black mb-2" style={{ color: '#2563EB' }}>{value}</p>
            <input
              type="range"
              min={0}
              max={gameState.totalTricks}
              value={value}
              onChange={(e) => setValue(Number(e.target.value))}
              className="w-full mb-6"
            />
            <button
              onClick={() => onSetPrediction(task.id, value)}
              className="w-full text-white font-black py-4 rounded-2xl shadow-md"
              style={{ background: 'linear-gradient(135deg, #1E3A8A, #2563EB)' }}
            >
              Valider ma prédiction
            </button>
          </>
        ) : (
          <>
            <div className="text-4xl mb-3">⏳</div>
            <p className="text-gray-500 text-sm">En attente des prédictions des autres membres de l&apos;équipage…</p>
          </>
        )}
      </div>
    </div>
  );
}

const bg = 'linear-gradient(135deg, #0F172A 0%, #1E3A8A 50%, #2563EB 100%)';
