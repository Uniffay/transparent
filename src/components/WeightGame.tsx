'use client';

import { useState, useCallback } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { WeightPerson } from '@/data/weightGame';

type Phase = 'intro' | 'playing' | 'reveal' | 'results';

function shuffle<T>(arr: T[]): T[] {
  return [...arr].sort(() => Math.random() - 0.5);
}

function calcScore(guess: number, actual: number): number {
  const diff = Math.abs(guess - actual);
  return Math.max(0, Math.round(1000 * Math.exp(-diff / 15)));
}

const MAX_SCORE_PER_PERSON = 1000;

export default function WeightGame({ people }: { people: WeightPerson[] }) {
  const [shuffled] = useState(() => shuffle(people));
  const [phase, setPhase] = useState<Phase>('intro');
  const [index, setIndex] = useState(0);
  const [guess, setGuess] = useState(80);
  const [totalScore, setTotalScore] = useState(0);
  const [lastScore, setLastScore] = useState(0);
  const [scores, setScores] = useState<number[]>([]);

  const current = shuffled[index];
  const maxTotal = shuffled.length * MAX_SCORE_PER_PERSON;

  const handleConfirm = useCallback(() => {
    const s = calcScore(guess, current.weight);
    setLastScore(s);
    setTotalScore((prev) => prev + s);
    setScores((prev) => [...prev, s]);
    setPhase('reveal');
  }, [guess, current]);

  const handleNext = useCallback(() => {
    if (index + 1 >= shuffled.length) {
      setPhase('results');
    } else {
      setIndex((i) => i + 1);
      setGuess(80);
      setPhase('playing');
    }
  }, [index, shuffled.length]);

  const handleRestart = useCallback(() => {
    setIndex(0);
    setGuess(80);
    setTotalScore(0);
    setLastScore(0);
    setScores([]);
    setPhase('intro');
  }, []);

  if (phase === 'intro') {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen px-6 text-center" style={{ background: bg }}>
        <div className="bg-white/90 rounded-3xl p-10 shadow-xl max-w-md w-full">
          <div className="text-5xl mb-4">⚖️</div>
          <h1 className="text-3xl font-black mb-2" style={{ color: '#7C3AED' }}>Juste Poids</h1>
          <p className="text-gray-600 text-sm mb-2">
            Estimez le poids de chaque personne.
          </p>
          <p className="text-gray-500 text-sm mb-6">
            Plus vous êtes proche, plus vous gagnez de points.<br />
            Tous les corps ont leur place. ♡
          </p>
          <p className="text-gray-400 text-xs mb-6">{shuffled.length} personnes · max {maxTotal.toLocaleString()} pts</p>
          <button
            onClick={() => setPhase('playing')}
            className="w-full text-white font-black text-lg py-4 rounded-2xl hover:opacity-90 transition-all shadow-md"
            style={{ background: 'linear-gradient(135deg, #7C3AED, #A855F7)' }}
          >
            Commencer ⚖️
          </button>
        </div>
      </div>
    );
  }

  if (phase === 'results') {
    const pct = Math.round((totalScore / maxTotal) * 100);
    return (
      <div className="flex flex-col items-center justify-center min-h-screen px-6 py-12" style={{ background: bg }}>
        <div className="bg-white/95 rounded-3xl p-8 shadow-xl max-w-lg w-full">
          <h2 className="text-3xl font-black text-center mb-1" style={{ color: '#7C3AED' }}>Résultats</h2>
          <p className="text-center text-gray-500 text-sm mb-6">
            {totalScore.toLocaleString()} / {maxTotal.toLocaleString()} pts ({pct}%)
          </p>

          <div className="w-full h-4 bg-gray-100 rounded-full mb-6 overflow-hidden">
            <div
              className="h-full rounded-full transition-all duration-1000"
              style={{ width: `${pct}%`, background: 'linear-gradient(90deg, #7C3AED, #A855F7)' }}
            />
          </div>

          <div className="flex flex-col gap-2 mb-6 max-h-64 overflow-y-auto">
            {shuffled.map((p, i) => (
              <div key={p.id} className="flex items-center gap-3 p-2 rounded-xl bg-gray-50">
                <div className="relative w-10 h-10 rounded-full overflow-hidden flex-shrink-0 bg-gray-200">
                  <Image src={p.src} alt={p.name} fill className="object-cover object-top" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-bold text-gray-800 truncate">{p.name}</p>
                  <p className="text-xs text-gray-500">{p.weight} kg réel</p>
                </div>
                <span className="text-sm font-black" style={{ color: '#7C3AED' }}>
                  {(scores[i] ?? 0).toLocaleString()} pts
                </span>
              </div>
            ))}
          </div>

          <div className="flex gap-3">
            <button
              onClick={handleRestart}
              className="flex-1 border-2 font-bold py-3 rounded-2xl transition-colors"
              style={{ borderColor: '#7C3AED', color: '#7C3AED' }}
            >
              Rejouer
            </button>
            <Link
              href="/"
              className="flex-1 text-white font-bold py-3 rounded-2xl text-center hover:opacity-90 transition-opacity"
              style={{ background: 'linear-gradient(135deg, #7C3AED, #A855F7)' }}
            >
              Menu ♡
            </Link>
          </div>
        </div>
      </div>
    );
  }

  const diff = guess - current.weight;
  const guessPercent = ((guess - 40) / (300 - 40)) * 100;
  const actualPercent = ((current.weight - 40) / (300 - 40)) * 100;

  return (
    <div className="flex flex-col items-center justify-center min-h-screen px-6" style={{ background: bg }}>
      <div className="z-10 w-full max-w-sm">

        {/* Header */}
        <div className="flex items-center justify-between mb-4 px-1">
          <Link href="/" className="text-white/70 hover:text-white text-sm transition-colors">← Menu</Link>
          <div className="text-center">
            <p className="text-white/60 text-[10px] uppercase tracking-widest">Score</p>
            <p className="text-white font-black text-xl leading-none">{totalScore.toLocaleString()}</p>
          </div>
          <span className="text-white/70 text-sm">{index + 1}/{shuffled.length}</span>
        </div>

        {/* Progress */}
        <div className="w-full h-1.5 bg-white/30 rounded-full mb-5 overflow-hidden">
          <div
            className="h-full bg-white rounded-full transition-all duration-500"
            style={{ width: `${((index + 1) / shuffled.length) * 100}%` }}
          />
        </div>

        {/* Card */}
        <div className="bg-white rounded-3xl shadow-2xl overflow-hidden">
          {/* Image full body */}
          <div className="relative w-full bg-gray-50" style={{ aspectRatio: '3/4', maxHeight: '420px' }}>
            <Image src={current.src} alt={current.name} fill className="object-contain" unoptimized priority />
          </div>

          <div className="p-5">
            {phase === 'playing' ? (
              <>
                {/* Hint */}
                <div className="flex items-center justify-between mb-4">
                  <span className="text-xs text-gray-400 font-semibold uppercase tracking-widest">{current.hint}</span>
                  <span className="text-xs text-gray-300">Qui est-ce ?</span>
                </div>

                {/* Weight display */}
                <div className="text-center mb-4">
                  <span className="text-5xl font-black" style={{ color: '#7C3AED' }}>{guess}</span>
                  <span className="text-xl text-gray-400 ml-1">kg</span>
                </div>

                {/* Slider */}
                <input
                  type="range"
                  min={40} max={300} step={1}
                  value={guess}
                  onChange={(e) => setGuess(Number(e.target.value))}
                  className="w-full h-3 rounded-full appearance-none cursor-pointer mb-2"
                  style={{
                    background: `linear-gradient(to right, #7C3AED ${((guess - 40) / 260) * 100}%, #E5E7EB ${((guess - 40) / 260) * 100}%)`,
                    accentColor: '#7C3AED',
                  }}
                />
                <div className="flex justify-between text-xs text-gray-300 mb-4">
                  <span>40 kg</span>
                  <span>300 kg</span>
                </div>

                <button
                  onClick={handleConfirm}
                  className="w-full py-4 rounded-2xl font-black text-lg text-white shadow-md hover:opacity-90 active:scale-95 transition-all"
                  style={{ background: 'linear-gradient(135deg, #7C3AED, #A855F7)' }}
                >
                  Confirmer ⚖️
                </button>
              </>
            ) : (
              <>
                {/* Reveal */}
                <p className="text-center font-black text-xl mb-1" style={{ color: '#7C3AED' }}>
                  {current.name}
                </p>
                <p className="text-center text-gray-500 text-sm mb-4">
                  Poids réel : <span className="font-black text-gray-800">{current.weight} kg</span>
                  {' '}· Votre estimation : <span className="font-semibold">{guess} kg</span>
                  {' '}·{' '}
                  <span className={diff === 0 ? 'text-green-500' : 'text-orange-500'}>
                    {diff > 0 ? '+' : ''}{diff} kg
                  </span>
                </p>

                {/* Visual bar */}
                <div className="relative h-6 bg-gray-100 rounded-full mb-1 overflow-hidden">
                  {/* Actual weight marker */}
                  <div
                    className="absolute top-0 bottom-0 w-1 bg-green-400 rounded-full"
                    style={{ left: `calc(${actualPercent}% - 2px)` }}
                  />
                  {/* Guess marker */}
                  <div
                    className="absolute top-0 bottom-0 w-1 rounded-full"
                    style={{ left: `calc(${guessPercent}% - 2px)`, background: '#7C3AED' }}
                  />
                </div>
                <div className="flex justify-between text-xs text-gray-300 mb-4">
                  <span>40 kg</span>
                  <span className="flex gap-3">
                    <span><span className="inline-block w-2 h-2 rounded-full bg-green-400 mr-1" />Réel</span>
                    <span><span className="inline-block w-2 h-2 rounded-full mr-1" style={{ background: '#7C3AED' }} />Vous</span>
                  </span>
                  <span>300 kg</span>
                </div>

                {/* Points */}
                <div className="text-center mb-4 p-3 rounded-2xl bg-purple-50">
                  <p className="text-3xl font-black" style={{ color: '#7C3AED' }}>+{lastScore.toLocaleString()}</p>
                  <p className="text-xs text-gray-400">points sur 1 000</p>
                </div>

                <button
                  onClick={handleNext}
                  className="w-full py-4 rounded-2xl font-black text-lg text-white shadow-md hover:opacity-90 active:scale-95 transition-all"
                  style={{ background: 'linear-gradient(135deg, #7C3AED, #A855F7)' }}
                >
                  {index + 1 >= shuffled.length ? 'Voir les résultats →' : 'Suivant →'}
                </button>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

const bg = 'linear-gradient(135deg, #4C1D95 0%, #6D28D9 50%, #8B5CF6 100%)';
