'use client';

import { useState, useCallback, useEffect, useRef } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { GayPerson } from '@/data/paggaieGame';

type Phase = 'intro' | 'playing' | 'feedback';

const HS_KEY = 'paggaie_high_score';

function shuffle<T>(arr: T[]): T[] {
  return [...arr].sort(() => Math.random() - 0.5);
}

export default function GayQuizGame({ people }: { people: GayPerson[] }) {
  const [deck, setDeck] = useState<GayPerson[]>(() => shuffle(people));
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
    (guessedGay: boolean) => {
      if (autoTimer.current) clearTimeout(autoTimer.current);
      const current = deck[index];
      const correct = guessedGay === current.isGay;
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
      <div className="flex flex-col items-center justify-center min-h-screen px-6 text-center" style={{ background: rainbowBackground }}>
        <RainbowDecorations />
        <div className="z-10 bg-white/90 rounded-3xl p-10 shadow-xl max-w-md w-full">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/pagaie.svg" alt="Pagaie multicolore" className="w-16 h-16 mx-auto mb-4" />
          <h1 className="text-3xl font-black mb-2" style={{ color: '#750787' }}>Gay ou Pagaie</h1>
          <p className="text-gray-600 text-sm mb-2">
            Gay ou pas gay ? Enchaîne les bonnes réponses.
          </p>
          <p className="text-gray-500 text-sm mb-2">
            Spoiler : on ne peut pas deviner. Une erreur = score à zéro.
          </p>
          {highScore > 0 && (
            <div className="rounded-2xl px-4 py-3 mb-6 inline-block" style={{ background: 'linear-gradient(90deg, rgba(228,3,3,0.12), rgba(117,7,135,0.12))' }}>
              <p className="text-sm text-gray-500">Ton record</p>
              <p className="text-3xl font-black" style={{ color: '#750787' }}>{highScore}</p>
            </div>
          )}
          {highScore === 0 && <div className="mb-6" />}
          <button
            onClick={() => setPhase('playing')}
            className="w-full text-white font-black text-lg py-4 rounded-2xl hover:opacity-90 hover:scale-[1.02] transition-all shadow-md"
            style={{ background: 'linear-gradient(90deg, #E40303, #FF8C00, #008026, #004DFF, #750787)' }}
          >
            Commencer 🏳️‍🌈
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-screen px-6" style={{ background: rainbowBackground }}>
      <RainbowDecorations />
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
                  Cette personne est-elle gay ?
                </p>
                <div className="grid grid-cols-2 gap-3">
                  <button
                    onClick={() => handleGuess(true)}
                    className="py-4 rounded-2xl font-black text-lg text-white shadow-md hover:scale-[1.03] active:scale-95 transition-all"
                    style={{ background: 'linear-gradient(135deg, #E40303, #FF8C00, #750787)' }}
                  >
                    🏳️‍🌈 Gay
                  </button>
                  <button
                    onClick={() => handleGuess(false)}
                    className="py-4 rounded-2xl font-black text-lg text-white shadow-md hover:scale-[1.03] active:scale-95 transition-all"
                    style={{ background: 'linear-gradient(135deg, #64748b, #475569)' }}
                  >
                    Pas gay
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
                  {current.name} est{' '}
                  {current.isGay ? (
                    <span className="inline-block text-white text-xs font-bold px-2 py-0.5 rounded-full" style={{ background: 'linear-gradient(90deg, #E40303, #FF8C00, #008026, #004DFF, #750787)' }}>Gay 🏳️‍🌈</span>
                  ) : (
                    <span className="font-bold">pas gay</span>
                  )}
                </p>
                {newRecord && (
                  <p className="text-center font-black text-sm mb-2" style={{ color: '#750787' }}>
                    🏆 Nouveau record !
                  </p>
                )}
                <p className="text-center text-gray-400 text-xs mb-4">
                  Score remis à zéro · Record : {highScore}
                </p>
                <button
                  onClick={advance}
                  className="w-full py-4 rounded-2xl font-black text-lg text-white shadow-md hover:opacity-90 active:scale-95 transition-all"
                  style={{ background: 'linear-gradient(90deg, #E40303, #FF8C00, #008026, #004DFF, #750787)' }}
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

const rainbowBackground =
  'linear-gradient(180deg, #E40303 0%, #E40303 16%, #FF8C00 16%, #FF8C00 33%, #FFED00 33%, #FFED00 50%, #008026 50%, #008026 66%, #004DFF 66%, #004DFF 83%, #750787 83%, #750787 100%)';

function RainbowDecorations() {
  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden opacity-10 select-none">
      <span className="absolute text-8xl" style={{ top: '5%', left: '10%' }}>🏳️‍🌈</span>
      <span className="absolute text-6xl" style={{ top: '22%', right: '8%' }}>♡</span>
      <span className="absolute text-7xl" style={{ bottom: '15%', left: '5%' }}>🏳️‍🌈</span>
      <span className="absolute text-5xl" style={{ bottom: '6%', right: '12%' }}>♡</span>
      <span className="absolute text-6xl" style={{ top: '52%', left: '2%' }}>★</span>
      <span className="absolute text-5xl" style={{ top: '66%', right: '5%' }}>★</span>
    </div>
  );
}
