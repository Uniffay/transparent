'use client';

import { useState, useCallback, useEffect, useRef } from 'react';
import Link from 'next/link';
import { Quote, QuoteAuthor } from '@/data/quoteGame';

type Phase = 'intro' | 'playing' | 'feedback';

const HS_KEY = 'qui_la_dit_high_score';

const OPTS: { key: QuoteAuthor; label: string; color: string }[] = [
  { key: 'trump',  label: 'Trump',  color: '#B91C1C' },
  { key: 'hitler', label: 'Hitler', color: '#3F3F46' },
  { key: 'autre',  label: 'Autre',  color: '#1D4ED8' },
];

function shuffle<T>(arr: T[]): T[] {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

export default function QuoteQuizGame({ quotes }: { quotes: Quote[] }) {
  const [deck, setDeck] = useState<Quote[]>(() => shuffle(quotes));
  const [index, setIndex] = useState(0);
  const [phase, setPhase] = useState<Phase>('intro');
  const [score, setScore] = useState(0);
  const [highScore, setHighScore] = useState(0);
  const [picked, setPicked] = useState<QuoteAuthor | null>(null);
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
        return shuffle(quotes);
      }
      setIndex(nextIndex);
      return prev;
    });
    setPhase('playing');
    setPicked(null);
    setNewRecord(false);
  }, [index, quotes]);

  const handleGuess = useCallback(
    (guess: QuoteAuthor) => {
      if (autoTimer.current) clearTimeout(autoTimer.current);
      const current = deck[index];
      const correct = guess === current.author;
      setPicked(guess);
      setPhase('feedback');

      if (correct) {
        const next = score + 1;
        setScore(next);
        saveHighScore(next);
        autoTimer.current = setTimeout(() => advance(), 900);
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
  const correct = picked !== null && picked === current.author;

  if (phase === 'intro') {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen px-6 text-center" style={{ background: bg }}>
        <div className="z-10 bg-white/95 rounded-3xl p-10 shadow-xl max-w-md w-full">
          <div className="text-5xl mb-4">🎙️</div>
          <h1 className="text-3xl font-black mb-2 text-gray-900">Trump, Hitler ou Autre ?</h1>
          <p className="text-gray-600 text-sm mb-2">
            Une citation s&apos;affiche. Qui l&apos;a vraiment dite ?
          </p>
          <p className="text-gray-500 text-sm mb-2">
            Une erreur = score remis à zéro. (Citations réelles et sourcées.)
          </p>
          {highScore > 0 && (
            <div className="rounded-2xl px-4 py-3 mb-6 inline-block bg-gray-100">
              <p className="text-sm text-gray-500">Ton record</p>
              <p className="text-3xl font-black text-gray-900">{highScore}</p>
            </div>
          )}
          {highScore === 0 && <div className="mb-6" />}
          <button
            onClick={() => setPhase('playing')}
            className="w-full text-white font-black text-lg py-4 rounded-2xl hover:opacity-90 hover:scale-[1.02] transition-all shadow-md"
            style={{ background: 'linear-gradient(90deg, #B91C1C, #1D4ED8)' }}
          >
            Commencer 🎙️
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-screen px-6 py-10" style={{ background: bg }}>
      <div className="z-10 w-full max-w-md">

        {/* Header scores */}
        <div className="flex items-center justify-between mb-4 px-1">
          <Link href="/" className="text-white/80 hover:text-white text-sm transition-colors drop-shadow">← Menu</Link>
          <div className="flex gap-4 items-center">
            <div className="text-center">
              <p className="text-white/70 text-[10px] uppercase tracking-widest drop-shadow">Score</p>
              <p className="text-white font-black text-2xl leading-none drop-shadow">{score}</p>
            </div>
            <div className="text-center">
              <p className="text-white/70 text-[10px] uppercase tracking-widest drop-shadow">Record</p>
              <p className="text-white/90 font-black text-2xl leading-none drop-shadow">{highScore}</p>
            </div>
          </div>
        </div>

        {/* Quote card */}
        <div className="bg-white rounded-3xl shadow-2xl overflow-hidden">
          <div className="p-7 min-h-[200px] flex items-center justify-center">
            <p className="text-center text-gray-900 text-xl font-semibold leading-relaxed">
              <span className="text-4xl text-gray-300 leading-none align-top mr-1">«</span>
              {current.text}
              <span className="text-4xl text-gray-300 leading-none align-bottom ml-1">»</span>
            </p>
          </div>

          <div className="px-5 pb-5">
            {phase === 'playing' ? (
              <div className="grid grid-cols-3 gap-2">
                {OPTS.map((o) => (
                  <button
                    key={o.key}
                    onClick={() => handleGuess(o.key)}
                    className="py-4 rounded-2xl font-black text-base text-white shadow-md hover:scale-[1.03] active:scale-95 transition-all"
                    style={{ background: o.color }}
                  >
                    {o.label}
                  </button>
                ))}
              </div>
            ) : (
              <>
                {/* Show which option was right/wrong */}
                <div className="grid grid-cols-3 gap-2 mb-4">
                  {OPTS.map((o) => {
                    const isAnswer = o.key === current.author;
                    const isPicked = o.key === picked;
                    return (
                      <div
                        key={o.key}
                        className="py-4 rounded-2xl font-black text-base text-center text-white relative"
                        style={{ background: o.color, opacity: isAnswer || isPicked ? 1 : 0.4 }}
                      >
                        {o.label}
                        {isAnswer && <span className="absolute -top-2 -right-2 text-lg">✅</span>}
                        {isPicked && !isAnswer && <span className="absolute -top-2 -right-2 text-lg">❌</span>}
                      </div>
                    );
                  })}
                </div>

                <p className="text-center font-black text-lg mb-1" style={{ color: correct ? '#16A34A' : '#DC2626' }}>
                  {correct ? 'Correct ! +1 ✓' : 'Raté !'}
                </p>
                <p className="text-center text-gray-700 text-sm mb-1">
                  C&apos;était <span className="font-black">{current.realAuthor}</span>
                </p>
                {current.source && (
                  <p className="text-center text-gray-400 text-xs mb-2 italic">{current.source}</p>
                )}
                {newRecord && (
                  <p className="text-center font-black text-sm mb-2 text-gray-800">🏆 Nouveau record !</p>
                )}
                {!correct && (
                  <p className="text-center text-gray-400 text-xs mb-3">Score remis à zéro · Record : {highScore}</p>
                )}

                <button
                  onClick={advance}
                  className="w-full py-4 rounded-2xl font-black text-lg text-white shadow-md hover:opacity-90 active:scale-95 transition-all"
                  style={{ background: 'linear-gradient(90deg, #B91C1C, #1D4ED8)' }}
                >
                  {correct ? 'Suivant…' : 'Continuer →'}
                </button>
              </>
            )}
          </div>
        </div>

        <p className="text-center text-white/50 text-[11px] mt-4 px-4">
          Citations réelles et sourcées · à but de réflexion sur la rhétorique, sans parti pris.
        </p>
      </div>
    </div>
  );
}

const bg = 'linear-gradient(135deg, #111827 0%, #1F2937 50%, #374151 100%)';
