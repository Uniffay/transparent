'use client';

import { useMemo, useState } from 'react';
import { CrewGameState, CrewCard, SUIT_INFO, legalCards, signalEligibleCards } from '@/lib/crewTypes';

function CardChip({ card, size = 'md', dim = false }: { card: CrewCard; size?: 'sm' | 'md' | 'lg'; dim?: boolean }) {
  const info = SUIT_INFO[card.suit];
  const dims = size === 'sm' ? 'w-9 h-12 text-xs' : size === 'lg' ? 'w-14 h-20 text-lg' : 'w-11 h-16 text-sm';
  return (
    <div
      className={`${dims} rounded-lg flex flex-col items-center justify-center font-black shadow-md flex-shrink-0 ${dim ? 'opacity-35' : ''}`}
      style={{ background: card.suit === 'rocket' ? '#111827' : 'white', border: `2px solid ${info.color}`, color: card.suit === 'rocket' ? '#FBBF24' : info.color }}
    >
      <span>{info.icon}</span>
      <span>{card.value}</span>
    </div>
  );
}

const SIGNAL_ICON: Record<string, string> = { haute: '⬆️', basse: '⬇️', only: '🔹' };

export default function CrewGameScreen({
  gameState,
  myId,
  onPlayCard,
  onSendSignal,
  onKick,
  onHostAction,
  onLeave,
  error,
}: {
  gameState: CrewGameState;
  myId: string;
  onPlayCard: (card: CrewCard) => void;
  onSendSignal: (card: CrewCard) => void;
  onKick: (targetId: string) => void;
  onHostAction: (action: 'restart' | 'terminate') => void;
  onLeave: () => void;
  error: string;
}) {
  const [signalMode, setSignalMode] = useState(false);
  const isHost = gameState.hostId === myId;
  const isMyTurn = gameState.currentPlayerId === myId && gameState.state === 'playing';
  const iSignaled = gameState.signalsUsed[myId] ?? false;
  const canSignal = gameState.commTokens > 0 && !iSignaled && gameState.state === 'playing';

  const legal = useMemo(() => legalCards(gameState.hand, gameState.currentTrick), [gameState.hand, gameState.currentTrick]);
  const eligibleForSignal = useMemo(() => signalEligibleCards(gameState.hand), [gameState.hand]);

  function playerLabel(id: string) {
    const p = gameState.players.find((pl) => pl.id === id);
    return p ? `${p.emoji} ${p.name}` : '?';
  }

  function handleCardClick(card: CrewCard) {
    if (gameState.state !== 'playing') return;
    if (signalMode) {
      onSendSignal(card);
      setSignalMode(false);
      return;
    }
    if (!isMyTurn) return;
    onPlayCard(card);
  }

  return (
    <div className="min-h-screen px-4 py-5 flex flex-col" style={{ background: bg }}>
      {/* Header */}
      <div className="flex items-center justify-between mb-3 px-1">
        <button onClick={onLeave} className="text-white/80 hover:text-white text-sm">← Quitter</button>
        <div className="text-center">
          <p className="text-white/60 text-[10px] uppercase tracking-widest">
            {gameState.mode === 'base' ? 'Jeu de base' : 'Extension'} · Mission {gameState.mission?.n}
          </p>
          <p className="text-white font-bold text-sm">{gameState.roomId}</p>
        </div>
        <span className="text-white/70 text-xs">Plis {gameState.tricksPlayed}/{gameState.totalTricks}</span>
      </div>

      {/* Task board */}
      <div className="bg-white/95 rounded-2xl p-3 mb-3 overflow-x-auto">
        <p className="text-[10px] font-bold uppercase tracking-widest text-gray-400 mb-2">Missions</p>
        <div className="flex gap-3">
          {gameState.tasks.map((t, i) => (
            <div key={i} className={`flex flex-col items-center gap-1 flex-shrink-0 ${t.done ? 'opacity-50' : ''}`}>
              <div className="relative">
                <CardChip card={t.card} size="sm" />
                {t.order != null && (
                  <span className="absolute -top-1.5 -left-1.5 bg-gray-800 text-white text-[10px] font-black rounded-full w-4 h-4 flex items-center justify-center">
                    {t.order}
                  </span>
                )}
                {t.done && <span className="absolute -top-1.5 -right-1.5 bg-green-500 text-white text-[10px] rounded-full w-4 h-4 flex items-center justify-center">✓</span>}
              </div>
              <span className="text-[10px] text-gray-500 text-center leading-tight">{playerLabel(t.assignee)}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Other players */}
      <div className="flex flex-wrap gap-2 justify-center mb-3">
        {gameState.players.filter((p) => p.id !== myId).map((p) => (
          <div
            key={p.id}
            className={`bg-white/90 rounded-xl px-3 py-2 flex flex-col items-center gap-1 ${gameState.currentPlayerId === p.id ? 'ring-2 ring-yellow-400' : ''}`}
          >
            <span className="text-xl">{p.emoji}</span>
            <span className="text-xs font-bold text-gray-700 flex items-center gap-1">
              {p.name}
              {p.id === gameState.commanderId && <span title="Commandant">👑</span>}
            </span>
            <span className="text-[10px] text-gray-400">{gameState.handCounts[p.id] ?? 0} cartes</span>
            {gameState.signals[p.id] && (
              <div className="flex items-center gap-1 bg-blue-50 rounded-lg px-1.5 py-0.5">
                <CardChip card={gameState.signals[p.id].card} size="sm" />
                <span className="text-xs">{SIGNAL_ICON[gameState.signals[p.id].type]}</span>
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Current trick */}
      <div className="flex-1 flex items-center justify-center mb-3">
        <div className="bg-white/10 rounded-3xl p-6 flex gap-4 items-center min-h-[120px]">
          {gameState.currentTrick.length === 0 && (
            <p className="text-white/50 text-sm">
              {gameState.trickLeaderId ? `${playerLabel(gameState.trickLeaderId)} entame le pli` : ''}
            </p>
          )}
          {gameState.currentTrick.map((play, i) => (
            <div key={i} className="flex flex-col items-center gap-1">
              <CardChip card={play.card} size="lg" />
              <span className="text-white/70 text-[10px]">{playerLabel(play.playerId)}</span>
            </div>
          ))}
        </div>
      </div>

      {/* My signal */}
      {gameState.signals[myId] && (
        <div className="flex justify-center mb-2">
          <div className="flex items-center gap-1 bg-white/20 rounded-lg px-2 py-1">
            <span className="text-white text-xs">Mon signal :</span>
            <CardChip card={gameState.signals[myId].card} size="sm" />
            <span className="text-xs">{SIGNAL_ICON[gameState.signals[myId].type]}</span>
          </div>
        </div>
      )}

      {/* Turn indicator */}
      <p className="text-center text-white font-bold text-sm mb-2">
        {gameState.state === 'playing' ? (isMyTurn ? "À toi de jouer !" : `Au tour de ${playerLabel(gameState.currentPlayerId ?? '')}`) : ''}
      </p>

      {/* My hand */}
      <div className="bg-white/95 rounded-2xl p-3 mb-2">
        <div className="flex items-center justify-between mb-2 px-1">
          <p className="text-[10px] font-bold uppercase tracking-widest text-gray-400">Ma main</p>
          {canSignal && (
            <button
              onClick={() => setSignalMode((s) => !s)}
              className={`text-xs font-bold px-2 py-1 rounded-lg ${signalMode ? 'bg-blue-600 text-white' : 'bg-blue-50 text-blue-600'}`}
            >
              📡 {signalMode ? 'Annuler' : 'Signaler'}
            </button>
          )}
          {!canSignal && gameState.commTokens > 0 && iSignaled && (
            <span className="text-[10px] text-gray-400">Signal déjà utilisé</span>
          )}
        </div>
        <div className="flex flex-wrap gap-1.5 justify-center">
          {gameState.hand.map((card, i) => {
            const isLegal = signalMode ? eligibleForSignal.some((c) => c.suit === card.suit && c.value === card.value)
              : isMyTurn && legal.some((c) => c.suit === card.suit && c.value === card.value);
            return (
              <button key={i} onClick={() => handleCardClick(card)} disabled={!isLegal} className="disabled:cursor-not-allowed">
                <CardChip card={card} dim={!isLegal} />
              </button>
            );
          })}
        </div>
      </div>

      {error && <p className="text-red-300 text-sm text-center mb-2">{error}</p>}

      {/* Result overlay */}
      {gameState.state === 'result' && gameState.result && (
        <div className="fixed inset-0 bg-black/60 flex items-center justify-center px-6 z-50">
          <div className="bg-white rounded-3xl p-8 max-w-sm w-full text-center">
            <div className="text-5xl mb-3">{gameState.result.outcome === 'won' ? '🎉' : '💥'}</div>
            <h2 className="text-2xl font-black mb-2" style={{ color: gameState.result.outcome === 'won' ? '#16A34A' : '#DC2626' }}>
              {gameState.result.outcome === 'won' ? 'Mission réussie !' : 'Mission échouée'}
            </h2>
            {gameState.result.reason && <p className="text-gray-500 text-sm mb-6">{gameState.result.reason}</p>}
            {isHost ? (
              <button
                onClick={() => onHostAction('restart')}
                className="w-full text-white font-black py-4 rounded-2xl shadow-md"
                style={{ background: 'linear-gradient(135deg, #1E3A8A, #2563EB)' }}
              >
                Retour au salon
              </button>
            ) : (
              <p className="text-gray-400 text-sm">En attente du chef d&apos;équipage…</p>
            )}
          </div>
        </div>
      )}

      {isHost && gameState.state === 'playing' && (
        <div className="flex justify-center gap-2 mt-1">
          {gameState.players.filter((p) => p.id !== myId).map((p) => (
            <button key={p.id} onClick={() => onKick(p.id)} className="text-[10px] text-white/50 hover:text-red-300">
              Expulser {p.name}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}

const bg = 'linear-gradient(135deg, #0F172A 0%, #1E3A8A 50%, #2563EB 100%)';
