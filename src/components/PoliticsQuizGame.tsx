'use client';

import { useState, useCallback, useEffect, useRef } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { PoliticalPerson } from '@/data/politiqueGame';

type Phase = 'intro' | 'playing' | 'feedback';

const HS_KEY = 'politiquement_correct_high_score';
const LEFT = '#C9243F';
const RIGHT = '#1E50A0';

function shuffle<T>(arr: T[]): T[] {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

export default function PoliticsQuizGame({ people }: { people: PoliticalPerson[] }) {
  const [deck, setDeck] = useState<PoliticalPerson[]>(() => shuffle(people));
  const [index, setIndex] = useState(0);
  const [phase, setPhase] = useState<Phase>('intro');
  const [score, setScore] = useState(0);
  const [highScore, setHighScore] = useState(0);
  const [lastCorrect, setLastCorrect] = useState<boolean | null>(null);
  const [newRecord, setNewRecord] = useState(false);
  const autoTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    const saved = parseInt(localStorage.getItem(HS_KEY) ?? '0', 10);
    setHighScore(isNaN(saved) ? 0 : saved);
  }, []);

  const saveHighScore = useCallback((newScore: number) => {
    setHighScore((prev) => {
      if (newScore > prev) {
        localStorage.setItem(HS_KEY, String(newScore));
        return newScore;
      }
      return prev;
    });
  }, []);

  const advance = useCallback(() => {
    setDeck((prev) => {
      const nextIndex = index + 1;
      if (nextIndex >= prev.length) {
        setIndex(0);
        return shuffle(people);
      }
      setIndex(nextIndex);
      return prev;
    });
    setPhase('playing');
    setLastCorrect(null);
    setNewRecord(false);
  }, [index, people]);

  const handleGuess = useCallback(
    (guessedLeft: boolean) => {
      if (autoTimer.current) clearTimeout(autoTimer.current);
      const current = deck[index];
      const correct = guessedLeft === current.isLeft;
      setLastCorrect(correct);
      setPhase('feedback');

      if (correct) {
        const next = score + 1;
        setScore(next);
        saveHighScore(next);
        autoTimer.current = setTimeout(() => advance(), 600);
      } else {
        setHighScore((prev) => {
          const isNew = score > prev;
          if (isNew) {
            localStorage.setItem(HS_KEY, String(score));
            setNewRecord(true);
            return score;
          }
          setNewRecord(false);
          return prev;
        });
        setScore(0);
      }
    },
    [deck, index, score, advance, saveHighScore]
  );

  useEffect(() => () => { if (autoTimer.current) clearTimeout(autoTimer.current); }, []);

  const current = deck[index];

  if (phase === 'intro') {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen px-6 text-center" style={{ background: politicsBackground }}>
        <PoliticsDecorations />
        <div className="z-10 bg-white/90 rounded-3xl p-10 shadow-xl max-w-md w-full">
          <div className="text-5xl mb-4">🗳️</div>
          <h1 className="text-3xl font-black mb-2 text-gray-800">Politiquement Correct</h1>
          <p className="text-gray-600 text-sm mb-2">
            Gauche ou droite ? Devine le bord politique.
          </p>
          <p className="text-gray-500 text-sm mb-2">
            Spoiler : ça ne se voit pas sur un visage. Une erreur = score à zéro.
          </p>
          {highScore > 0 && (
            <div className="rounded-2xl px-4 py-3 mb-6 inline-block" style={{ background: 'linear-gradient(90deg, rgba(201,36,63,0.12), rgba(30,80,160,0.12))' }}>
              <p className="text-sm text-gray-500">Ton record</p>
              <p className="text-3xl font-black text-gray-800">{highScore}</p>
            </div>
          )}
          {highScore === 0 && <div className="mb-6" />}
          <button
            onClick={() => setPhase('playing')}
            className="w-full text-white font-black text-lg py-4 rounded-2xl hover:opacity-90 hover:scale-[1.02] transition-all shadow-md"
            style={{ background: `linear-gradient(90deg, ${LEFT}, ${RIGHT})` }}
          >
            Commencer 🗳️
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-screen px-6" style={{ background: politicsBackground }}>
      <PoliticsDecorations />
      <div className="z-10 w-full max-w-sm">

        {/* Header scores */}
        <div className="flex items-center justify-between mb-4 px-1">
          <Link href="/" className="text-white/80 hover:text-white text-sm transition-colors drop-shadow">
            ← Menu
          </Link>
          <div className="flex gap-4 items-center">
            <div className="text-center">
              <p className="text-white/80 text-[10px] uppercase tracking-widest drop-shadow">Score</p>
              <p className="text-white font-black text-2xl leading-none drop-shadow">{score}</p>
            </div>
            <div className="text-center">
              <p className="text-white/80 text-[10px] uppercase tracking-widest drop-shadow">Record</p>
              <p className="text-white/90 font-black text-2xl leading-none drop-shadow">{highScore}</p>
            </div>
          </div>
        </div>

        {/* Card */}
        <div className="bg-white rounded-3xl shadow-2xl overflow-hidden">
          {/* Image */}
          <div className="relative w-full overflow-hidden" style={{ aspectRatio: '3/4', maxHeight: '420px' }}>
            <Image
              src={current.src}
              alt="Qui est cette personne ?"
              fill
              className="object-cover object-top"
              priority
              unoptimized
            />

            {/* Feedback overlay */}
            {phase === 'feedback' && (
              <div className={`absolute inset-0 flex items-center justify-center text-8xl font-black transition-opacity ${lastCorrect ? 'bg-green-500/30' : 'bg-red-400/40'}`}>
                {lastCorrect ? '✓' : '✗'}
              </div>
            )}
          </div>

          {/* Buttons / Feedback */}
          <div className="p-5">
            {phase === 'playing' ? (
              <>
                <p className="text-center text-gray-500 text-sm mb-4 font-semibold">
                  Quel est son bord politique ?
                </p>
                <div className="grid grid-cols-2 gap-3">
                  <button
                    onClick={() => handleGuess(true)}
                    className="py-4 rounded-2xl font-black text-lg text-white shadow-md hover:scale-[1.03] active:scale-95 transition-all"
                    style={{ background: LEFT }}
                  >
                    ⬅️ Gauche
                  </button>
                  <button
                    onClick={() => handleGuess(false)}
                    className="py-4 rounded-2xl font-black text-lg text-white shadow-md hover:scale-[1.03] active:scale-95 transition-all"
                    style={{ background: RIGHT }}
                  >
                    Droite ➡️
                  </button>
                </div>
              </>
            ) : lastCorrect ? (
              <p className="text-center text-green-500 font-black text-xl py-2">
                Correct ! +1 ✓
              </p>
            ) : (
              <>
                <p className="text-center font-black text-xl text-red-400 mb-1">
                  Raté !
                </p>
                <p className="text-center text-gray-500 text-sm mb-1">
                  {current.name} est classé·e{' '}
                  {current.isLeft ? (
                    <span className="inline-block text-white text-xs font-bold px-2 py-0.5 rounded-full" style={{ background: LEFT }}>à gauche ⬅️</span>
                  ) : (
                    <span className="inline-block text-white text-xs font-bold px-2 py-0.5 rounded-full" style={{ background: RIGHT }}>à droite ➡️</span>
                  )}
                </p>
                {newRecord && (
                  <p className="text-center font-black text-sm mb-2 text-gray-800">
                    🏆 Nouveau record !
                  </p>
                )}
                <p className="text-center text-gray-400 text-xs mb-4">
                  Score remis à zéro · Record : {highScore}
                </p>
                <button
                  onClick={advance}
                  className="w-full py-4 rounded-2xl font-black text-lg text-white shadow-md hover:opacity-90 active:scale-95 transition-all"
                  style={{ background: `linear-gradient(90deg, ${LEFT}, ${RIGHT})` }}
                >
                  Continuer →
                </button>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

const politicsBackground =
  `linear-gradient(90deg, ${LEFT} 0%, ${LEFT} 50%, ${RIGHT} 50%, ${RIGHT} 100%)`;

function PoliticsDecorations() {
  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden opacity-10 select-none">
      <span className="absolute text-8xl" style={{ top: '6%', left: '10%' }}>⬅️</span>
      <span className="absolute text-7xl" style={{ top: '20%', right: '8%' }}>➡️</span>
      <span className="absolute text-7xl" style={{ bottom: '15%', left: '5%' }}>🏛️</span>
      <span className="absolute text-5xl" style={{ bottom: '6%', right: '12%' }}>🗳️</span>
      <span className="absolute text-6xl" style={{ top: '52%', left: '2%' }}>🗳️</span>
      <span className="absolute text-5xl" style={{ top: '66%', right: '5%' }}>🏛️</span>
    </div>
  );
}
