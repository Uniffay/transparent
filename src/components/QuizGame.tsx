'use client';

import { useState, useCallback, useEffect, useRef } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Person } from '@/lib/types';

type Phase = 'intro' | 'playing' | 'feedback';

const HS_KEY = 'transparent_high_score';

function shuffle<T>(arr: T[]): T[] {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

export default function QuizGame({ people, gameTitle }: { people: Person[]; gameTitle: string }) {
  const [deck, setDeck] = useState<Person[]>(() => shuffle(people));
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
        // Reshuffle pour boucle infinie
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
    (guessedTrans: boolean) => {
      if (autoTimer.current) clearTimeout(autoTimer.current);
      const current = deck[index];
      const correct = guessedTrans === current.isTrans;
      setLastCorrect(correct);
      setPhase('feedback');

      if (correct) {
        const next = score + 1;
        setScore(next);
        saveHighScore(next);
        // Auto-advance après 600ms sur bonne réponse
        autoTimer.current = setTimeout(() => advance(), 600);
      } else {
        // Mauvaise réponse : on check le record AVANT reset
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
      <div className="flex flex-col items-center justify-center min-h-screen px-6 text-center" style={{ background: transBackground }}>
        <TransDecorations />
        <div className="z-10 bg-white/90 rounded-3xl p-10 shadow-xl max-w-md w-full">
          <div className="text-5xl mb-4">⚧</div>
          <h1 className="text-3xl font-black text-[#55CDFC] mb-2">{gameTitle}</h1>
          <p className="text-gray-600 text-sm mb-2">
            Trans ou pas trans ? Enchaîne les bonnes réponses.
          </p>
          <p className="text-gray-500 text-sm mb-2">
            Une erreur = score remis à zéro.
          </p>
          {highScore > 0 && (
            <div className="bg-gradient-to-r from-[#55CDFC]/20 to-[#F7A8B8]/20 rounded-2xl px-4 py-3 mb-6 inline-block">
              <p className="text-sm text-gray-500">Ton record</p>
              <p className="text-3xl font-black text-[#55CDFC]">{highScore}</p>
            </div>
          )}
          {highScore === 0 && <div className="mb-6" />}
          <button
            onClick={() => setPhase('playing')}
            className="w-full bg-gradient-to-r from-[#55CDFC] to-[#F7A8B8] text-white font-black text-lg py-4 rounded-2xl hover:opacity-90 hover:scale-[1.02] transition-all shadow-md"
          >
            Commencer ♡
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-screen px-6" style={{ background: transBackground }}>
      <TransDecorations />
      <div className="z-10 w-full max-w-sm">

        {/* Header scores */}
        <div className="flex items-center justify-between mb-4 px-1">
          <Link href="/" className="text-white/70 hover:text-white text-sm transition-colors">
            ← Menu
          </Link>
          <div className="flex gap-4 items-center">
            <div className="text-center">
              <p className="text-white/60 text-[10px] uppercase tracking-widest">Score</p>
              <p className="text-white font-black text-2xl leading-none">{score}</p>
            </div>
            <div className="text-center">
              <p className="text-white/60 text-[10px] uppercase tracking-widest">Record</p>
              <p className="text-white/80 font-black text-2xl leading-none">{highScore}</p>
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
                  Cette personne est-elle trans ?
                </p>
                <div className="grid grid-cols-2 gap-3">
                  <button
                    onClick={() => handleGuess(true)}
                    className="py-4 rounded-2xl font-black text-lg text-white shadow-md hover:scale-[1.03] active:scale-95 transition-all"
                    style={{ background: 'linear-gradient(135deg, #F7A8B8, #e88fa0)' }}
                  >
                    ⚧ Trans
                  </button>
                  <button
                    onClick={() => handleGuess(false)}
                    className="py-4 rounded-2xl font-black text-lg text-white shadow-md hover:scale-[1.03] active:scale-95 transition-all"
                    style={{ background: 'linear-gradient(135deg, #55CDFC, #3bb8e8)' }}
                  >
                    Pas trans
                  </button>
                </div>
              </>
            ) : lastCorrect ? (
              /* Bonne réponse — auto-advance */
              <p className="text-center text-green-500 font-black text-xl py-2">
                Correct ! +1 ✓
              </p>
            ) : (
              /* Mauvaise réponse */
              <>
                <p className="text-center font-black text-xl text-red-400 mb-1">
                  Raté !
                </p>
                <p className="text-center text-gray-500 text-sm mb-1">
                  {current.name} est{' '}
                  {current.isTrans ? (
                    <span className="inline-block bg-[#F7A8B8] text-white text-xs font-bold px-2 py-0.5 rounded-full">Trans ⚧</span>
                  ) : (
                    <span className="font-bold">pas trans</span>
                  )}
                </p>
                {newRecord && (
                  <p className="text-center text-[#55CDFC] font-black text-sm mb-2">
                    🏆 Nouveau record !
                  </p>
                )}
                <p className="text-center text-gray-400 text-xs mb-4">
                  Score remis à zéro · Record : {highScore}
                </p>
                <button
                  onClick={advance}
                  className="w-full py-4 rounded-2xl font-black text-lg text-white shadow-md hover:opacity-90 active:scale-95 transition-all"
                  style={{ background: 'linear-gradient(135deg, #55CDFC, #F7A8B8)' }}
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

const transBackground =
  'linear-gradient(180deg, #55CDFC 0%, #55CDFC 20%, #F7A8B8 20%, #F7A8B8 40%, #FFFFFF 40%, #FFFFFF 60%, #F7A8B8 60%, #F7A8B8 80%, #55CDFC 80%, #55CDFC 100%)';

function TransDecorations() {
  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden opacity-10 select-none">
      <span className="absolute text-8xl" style={{ top: '5%', left: '10%' }}>⚧</span>
      <span className="absolute text-6xl" style={{ top: '20%', right: '8%' }}>♀</span>
      <span className="absolute text-7xl" style={{ bottom: '15%', left: '5%' }}>♂</span>
      <span className="absolute text-5xl" style={{ bottom: '5%', right: '12%' }}>⚧</span>
      <span className="absolute text-6xl" style={{ top: '50%', left: '2%' }}>♀</span>
      <span className="absolute text-5xl" style={{ top: '65%', right: '5%' }}>♂</span>
    </div>
  );
}
