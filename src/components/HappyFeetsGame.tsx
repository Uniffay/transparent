'use client';

import { useState, useCallback, useEffect, useRef } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import type { FeetPerson } from '@/data/happyFeetsGame';

type Phase = 'intro' | 'playing' | 'feedback';

type Round = {
  person: FeetPerson;
  options: FeetPerson[]; // 4 propositions, dont la bonne
  answer: number;        // index de la bonne dans options
};

const HS_KEY = 'happy_feets_high_score';

function shuffle<T>(arr: T[]): T[] {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

// Une manche par personne, distracteurs et ordre tirés au hasard à chaque cycle.
function buildRounds(people: FeetPerson[]): Round[] {
  return shuffle(people).map((person) => {
    const distractors = shuffle(people.filter((p) => p !== person)).slice(0, 3);
    const options = shuffle([person, ...distractors]);
    return { person, options, answer: options.indexOf(person) };
  });
}

export default function HappyFeetsGame({ people }: { people: FeetPerson[] }) {
  const [rounds, setRounds] = useState<Round[]>(() => buildRounds(people));
  const [index, setIndex] = useState(0);
  const [phase, setPhase] = useState<Phase>('intro');
  const [score, setScore] = useState(0);
  const [highScore, setHighScore] = useState(0);
  const [picked, setPicked] = useState<number | null>(null);
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
    setRounds((prev) => {
      const nextIndex = index + 1;
      if (nextIndex >= prev.length) {
        setIndex(0);
        return buildRounds(people);
      }
      setIndex(nextIndex);
      return prev;
    });
    setPhase('playing');
    setPicked(null);
    setNewRecord(false);
  }, [index, people]);

  const handlePick = useCallback(
    (i: number) => {
      if (autoTimer.current) clearTimeout(autoTimer.current);
      const current = rounds[index];
      const correct = i === current.answer;
      setPicked(i);
      setPhase('feedback');

      if (correct) {
        const next = score + 1;
        setScore(next);
        saveHighScore(next);
        autoTimer.current = setTimeout(() => advance(), 1200);
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
    [rounds, index, score, advance, saveHighScore]
  );

  useEffect(() => () => { if (autoTimer.current) clearTimeout(autoTimer.current); }, []);

  const current = rounds[index];
  const correct = picked !== null && picked === current.answer;

  if (phase === 'intro') {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen px-6 text-center" style={{ background: bg }}>
        <div className="z-10 bg-white/95 rounded-3xl p-10 shadow-xl max-w-md w-full">
          <div className="text-5xl mb-4">🦶</div>
          <h1 className="text-3xl font-black mb-2" style={{ color: '#0D9488' }}>Happy Feets</h1>
          <p className="text-gray-600 text-sm mb-2">
            Une photo de pieds s&apos;affiche. À qui appartiennent-ils ? Clique sur la bonne personne parmi les 4.
          </p>
          <p className="text-gray-500 text-sm mb-2">
            Une erreur = score remis à zéro.
          </p>
          {highScore > 0 && (
            <div className="rounded-2xl px-4 py-3 mb-6 inline-block bg-teal-50">
              <p className="text-sm text-gray-500">Ton record</p>
              <p className="text-3xl font-black" style={{ color: '#0D9488' }}>{highScore}</p>
            </div>
          )}
          {highScore === 0 && <div className="mb-6" />}
          <button
            onClick={() => setPhase('playing')}
            className="w-full text-white font-black text-lg py-4 rounded-2xl hover:opacity-90 hover:scale-[1.02] transition-all shadow-md"
            style={{ background: 'linear-gradient(135deg, #0D9488, #7C3AED)' }}
          >
            Commencer 🦶
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-screen px-6 py-8" style={{ background: bg }}>
      <div className="z-10 w-full max-w-md">

        {/* Header scores */}
        <div className="flex items-center justify-between mb-3 px-1">
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

        {/* Photo de pieds */}
        <div className="bg-white rounded-2xl shadow-xl overflow-hidden mb-3">
          <div className="relative w-full bg-gray-50" style={{ aspectRatio: '4/3', maxHeight: '240px' }}>
            <Image src={current.person.feet} alt="À qui sont ces pieds ?" fill className="object-contain p-2" unoptimized priority />
          </div>
        </div>

        <p className="text-center text-white/90 text-sm font-semibold mb-3 drop-shadow">
          {phase === 'playing'
            ? 'À qui sont ces pieds ?'
            : correct
              ? `Correct, c'est bien ${current.person.name} ! +1 ✓`
              : `Raté ! C'était ${current.person.name}.`}
        </p>

        {/* 4 propositions */}
        <div className="grid grid-cols-2 gap-3">
          {current.options.map((option, i) => {
            const isAnswer = i === current.answer;
            const isPicked = i === picked;
            let ring = 'ring-2 ring-transparent';
            if (phase === 'feedback') {
              if (isAnswer) ring = 'ring-4 ring-green-400';
              else if (isPicked) ring = 'ring-4 ring-red-400';
              else ring = 'ring-2 ring-transparent opacity-50';
            }
            return (
              <button
                key={option.name}
                disabled={phase !== 'playing'}
                onClick={() => handlePick(i)}
                className={`relative rounded-2xl overflow-hidden bg-white shadow-lg transition-all ${ring} ${phase === 'playing' ? 'hover:scale-[1.03] active:scale-95 cursor-pointer' : 'cursor-default'}`}
                style={{ aspectRatio: '1/1' }}
              >
                <Image src={option.choice} alt={option.name} fill className="object-cover" unoptimized />
                <span className="absolute bottom-0 inset-x-0 bg-black/55 text-white text-xs font-bold py-1 px-2 truncate">
                  {option.name}
                </span>
                {phase === 'feedback' && isAnswer && (
                  <span className="absolute top-1 right-1 text-2xl drop-shadow">✅</span>
                )}
                {phase === 'feedback' && isPicked && !isAnswer && (
                  <span className="absolute top-1 right-1 text-2xl drop-shadow">❌</span>
                )}
              </button>
            );
          })}
        </div>

        {/* Feedback footer */}
        {phase === 'feedback' && (
          <div className="mt-4">
            {newRecord && <p className="text-center text-white font-black text-sm mb-2 drop-shadow">🏆 Nouveau record !</p>}
            {!correct && <p className="text-center text-white/70 text-xs mb-3">Score remis à zéro · Record : {highScore}</p>}
            {!correct && (
              <button
                onClick={advance}
                className="w-full py-4 rounded-2xl font-black text-lg text-white shadow-md hover:opacity-90 active:scale-95 transition-all"
                style={{ background: 'linear-gradient(135deg, #0D9488, #7C3AED)' }}
              >
                Continuer →
              </button>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

const bg = 'linear-gradient(135deg, #134E4A 0%, #0D9488 50%, #6D28D9 100%)';
