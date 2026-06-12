'use client';

import { useState, useCallback, useEffect, useRef } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { LinkPerson } from '@/data/linkInBioGame';

type Phase = 'intro' | 'playing' | 'feedback';

const HS_KEY = 'link_in_bio_high_score';
const ACCENT = '#00AEEF';
const ACCENT2 = '#0A84FF';

function shuffle<T>(arr: T[]): T[] {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

export default function LinkInBioQuizGame({ people }: { people: LinkPerson[] }) {
  const [deck, setDeck] = useState<LinkPerson[]>(() => shuffle(people));
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
    (guessedYes: boolean) => {
      if (autoTimer.current) clearTimeout(autoTimer.current);
      const current = deck[index];
      const correct = guessedYes === current.hasAccount;
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
      <div className="flex flex-col items-center justify-center min-h-screen px-6 text-center" style={{ background: bg }}>
        <Decorations />
        <div className="z-10 bg-white/95 rounded-3xl p-10 shadow-xl max-w-md w-full">
          <div className="text-5xl mb-4">🥵</div>
          <h1 className="text-3xl font-black mb-2" style={{ color: ACCENT2 }}>Link in Bio ?</h1>
          <p className="text-gray-600 text-sm mb-2">
            A-t-il/elle un OnlyFans ou un MYM ? Devine.
          </p>
          <p className="text-gray-500 text-sm mb-2">
            Spoiler : ça ne se voit pas, et il n&apos;y a aucun souci à ça. Une erreur = score à zéro.
          </p>
          {highScore > 0 && (
            <div className="rounded-2xl px-4 py-3 mb-6 inline-block" style={{ background: 'rgba(0,174,239,0.12)' }}>
              <p className="text-sm text-gray-500">Ton record</p>
              <p className="text-3xl font-black" style={{ color: ACCENT2 }}>{highScore}</p>
            </div>
          )}
          {highScore === 0 && <div className="mb-6" />}
          <button
            onClick={() => setPhase('playing')}
            className="w-full text-white font-black text-lg py-4 rounded-2xl hover:opacity-90 hover:scale-[1.02] transition-all shadow-md"
            style={{ background: `linear-gradient(135deg, ${ACCENT}, ${ACCENT2})` }}
          >
            Commencer 🔗
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-screen px-6" style={{ background: bg }}>
      <Decorations />
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
                  A-t-il/elle un OnlyFans ou un MYM ?
                </p>
                <div className="grid grid-cols-2 gap-3">
                  <button
                    onClick={() => handleGuess(true)}
                    className="py-4 rounded-2xl font-black text-lg text-white shadow-md hover:scale-[1.03] active:scale-95 transition-all"
                    style={{ background: `linear-gradient(135deg, ${ACCENT}, ${ACCENT2})` }}
                  >
                    🔗 Oui
                  </button>
                  <button
                    onClick={() => handleGuess(false)}
                    className="py-4 rounded-2xl font-black text-lg text-white shadow-md hover:scale-[1.03] active:scale-95 transition-all"
                    style={{ background: 'linear-gradient(135deg, #64748b, #475569)' }}
                  >
                    Non
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
                  {current.name}{' '}
                  {current.hasAccount ? (
                    <span className="inline-block text-white text-xs font-bold px-2 py-0.5 rounded-full" style={{ background: ACCENT2 }}>a un compte 🔗</span>
                  ) : (
                    <span className="font-bold">n&apos;en a pas</span>
                  )}
                </p>
                {newRecord && (
                  <p className="text-center font-black text-sm mb-2" style={{ color: ACCENT2 }}>
                    🏆 Nouveau record !
                  </p>
                )}
                <p className="text-center text-gray-400 text-xs mb-4">
                  Score remis à zéro · Record : {highScore}
                </p>
                <button
                  onClick={advance}
                  className="w-full py-4 rounded-2xl font-black text-lg text-white shadow-md hover:opacity-90 active:scale-95 transition-all"
                  style={{ background: `linear-gradient(135deg, ${ACCENT}, ${ACCENT2})` }}
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

const bg = 'linear-gradient(135deg, #00AEEF 0%, #0A84FF 50%, #6D5BFF 100%)';

function Decorations() {
  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden opacity-10 select-none">
      <span className="absolute text-8xl" style={{ top: '6%', left: '10%' }}>🔗</span>
      <span className="absolute text-6xl" style={{ top: '22%', right: '8%' }}>📲</span>
      <span className="absolute text-7xl" style={{ bottom: '15%', left: '5%' }}>🔗</span>
      <span className="absolute text-5xl" style={{ bottom: '6%', right: '12%' }}>📲</span>
      <span className="absolute text-6xl" style={{ top: '52%', left: '2%' }}>♡</span>
      <span className="absolute text-5xl" style={{ top: '66%', right: '5%' }}>♡</span>
    </div>
  );
}
