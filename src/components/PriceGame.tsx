'use client';

import { useState, useCallback } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { PriceItem } from '@/data/justePrixGame';

type Phase = 'intro' | 'playing' | 'reveal' | 'results';

const MIN = 1;
const MAX = 50000;
const LN_MIN = Math.log(MIN);
const LN_MAX = Math.log(MAX);
const STEPS = 1000;
const SCORE_K = 1.4;
const MAX_SCORE_PER_ITEM = 1000;

function shuffle<T>(arr: T[]): T[] {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

// slider position (0..STEPS) -> a "nice" rounded euro price (log-mapped)
function priceFromPos(pos: number): number {
  const v = Math.exp(LN_MIN + (pos / STEPS) * (LN_MAX - LN_MIN));
  let r: number;
  if (v < 20) r = Math.round(v);
  else if (v < 100) r = Math.round(v / 5) * 5;
  else if (v < 1000) r = Math.round(v / 10) * 10;
  else if (v < 10000) r = Math.round(v / 100) * 100;
  else r = Math.round(v / 500) * 500;
  return Math.max(MIN, r);
}

// euro price -> percent position on the log axis (for reveal markers)
function pctFromPrice(price: number): number {
  const p = Math.min(MAX, Math.max(MIN, price));
  return ((Math.log(p) - LN_MIN) / (LN_MAX - LN_MIN)) * 100;
}

function calcScore(guess: number, actual: number): number {
  const g = Math.max(1, guess);
  const a = Math.max(1, actual);
  return Math.max(0, Math.round(1000 * Math.exp(-Math.abs(Math.log(g / a)) * SCORE_K)));
}

function euro(n: number): string {
  return n.toLocaleString('fr-FR') + ' €';
}

export default function PriceGame({ items }: { items: PriceItem[] }) {
  const [shuffled] = useState(() => shuffle(items));
  const [phase, setPhase] = useState<Phase>('intro');
  const [index, setIndex] = useState(0);
  const [pos, setPos] = useState(500);
  const [totalScore, setTotalScore] = useState(0);
  const [lastScore, setLastScore] = useState(0);
  const [scores, setScores] = useState<number[]>([]);

  const current = shuffled[index];
  const guess = priceFromPos(pos);
  const maxTotal = shuffled.length * MAX_SCORE_PER_ITEM;

  const handleConfirm = useCallback(() => {
    const s = calcScore(priceFromPos(pos), current.price);
    setLastScore(s);
    setTotalScore((prev) => prev + s);
    setScores((prev) => [...prev, s]);
    setPhase('reveal');
  }, [pos, current]);

  const handleNext = useCallback(() => {
    if (index + 1 >= shuffled.length) {
      setPhase('results');
    } else {
      setIndex((i) => i + 1);
      setPos(500);
      setPhase('playing');
    }
  }, [index, shuffled.length]);

  const handleRestart = useCallback(() => {
    setIndex(0);
    setPos(500);
    setTotalScore(0);
    setLastScore(0);
    setScores([]);
    setPhase('intro');
  }, []);

  if (phase === 'intro') {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen px-6 text-center" style={{ background: bg }}>
        <div className="bg-white/95 rounded-3xl p-10 shadow-xl max-w-md w-full">
          <div className="text-5xl mb-4">💸</div>
          <h1 className="text-3xl font-black mb-2" style={{ color: '#0F7B3F' }}>Cash-ta-strophe</h1>
          <p className="text-gray-600 text-sm mb-2">
            Des objets insolites vraiment vendus. Devine leur prix !
          </p>
          <p className="text-gray-500 text-sm mb-6">
            Plus tu es proche (en proportion), plus tu marques.
          </p>
          <p className="text-gray-400 text-xs mb-6">{shuffled.length} objets · max {maxTotal.toLocaleString('fr-FR')} pts</p>
          <button
            onClick={() => setPhase('playing')}
            className="w-full text-white font-black text-lg py-4 rounded-2xl hover:opacity-90 transition-all shadow-md"
            style={{ background: 'linear-gradient(135deg, #0F7B3F, #16A34A)' }}
          >
            Commencer 💸
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
          <h2 className="text-3xl font-black text-center mb-1" style={{ color: '#0F7B3F' }}>Résultats</h2>
          <p className="text-center text-gray-500 text-sm mb-6">
            {totalScore.toLocaleString('fr-FR')} / {maxTotal.toLocaleString('fr-FR')} pts ({pct}%)
          </p>

          <div className="w-full h-4 bg-gray-100 rounded-full mb-6 overflow-hidden">
            <div className="h-full rounded-full transition-all duration-1000" style={{ width: `${pct}%`, background: 'linear-gradient(90deg, #0F7B3F, #16A34A)' }} />
          </div>

          <div className="flex flex-col gap-2 mb-6 max-h-64 overflow-y-auto">
            {shuffled.map((it, i) => (
              <div key={it.id} className="flex items-center gap-3 p-2 rounded-xl bg-gray-50">
                <div className="relative w-10 h-10 rounded-lg overflow-hidden flex-shrink-0 bg-white">
                  <Image src={it.src} alt={it.name} fill className="object-contain" unoptimized />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-bold text-gray-800 truncate">{it.name}</p>
                  <p className="text-xs text-gray-500">{euro(it.price)}</p>
                </div>
                <span className="text-sm font-black" style={{ color: '#0F7B3F' }}>
                  {(scores[i] ?? 0).toLocaleString('fr-FR')} pts
                </span>
              </div>
            ))}
          </div>

          <div className="flex gap-3">
            <button onClick={handleRestart} className="flex-1 border-2 font-bold py-3 rounded-2xl transition-colors" style={{ borderColor: '#0F7B3F', color: '#0F7B3F' }}>
              Rejouer
            </button>
            <Link href="/" className="flex-1 text-white font-bold py-3 rounded-2xl text-center hover:opacity-90 transition-opacity" style={{ background: 'linear-gradient(135deg, #0F7B3F, #16A34A)' }}>
              Menu
            </Link>
          </div>
        </div>
      </div>
    );
  }

  const guessPct = pctFromPrice(guess);
  const actualPct = pctFromPrice(current.price);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen px-6" style={{ background: bg }}>
      <div className="z-10 w-full max-w-sm">

        {/* Header */}
        <div className="flex items-center justify-between mb-4 px-1">
          <Link href="/" className="text-white/80 hover:text-white text-sm transition-colors drop-shadow">← Menu</Link>
          <div className="text-center">
            <p className="text-white/70 text-[10px] uppercase tracking-widest drop-shadow">Score</p>
            <p className="text-white font-black text-xl leading-none drop-shadow">{totalScore.toLocaleString('fr-FR')}</p>
          </div>
          <span className="text-white/80 text-sm drop-shadow">{index + 1}/{shuffled.length}</span>
        </div>

        {/* Progress */}
        <div className="w-full h-1.5 bg-white/30 rounded-full mb-5 overflow-hidden">
          <div className="h-full bg-white rounded-full transition-all duration-500" style={{ width: `${((index + 1) / shuffled.length) * 100}%` }} />
        </div>

        {/* Card */}
        <div className="bg-white rounded-3xl shadow-2xl overflow-hidden">
          <div className="relative w-full bg-gray-50" style={{ aspectRatio: '4/3', maxHeight: '320px' }}>
            <Image src={current.src} alt={current.name} fill className="object-contain p-3" unoptimized priority />
          </div>

          <div className="p-5">
            {/* Item name always shown */}
            <p className="text-center font-bold text-gray-800 text-base mb-4 leading-snug">{current.name}</p>

            {phase === 'playing' ? (
              <>
                <div className="text-center mb-4">
                  <span className="text-5xl font-black" style={{ color: '#0F7B3F' }}>{guess.toLocaleString('fr-FR')}</span>
                  <span className="text-xl text-gray-400 ml-1">€</span>
                </div>

                <input
                  type="range"
                  min={0} max={STEPS} step={1}
                  value={pos}
                  onChange={(e) => setPos(Number(e.target.value))}
                  className="w-full h-3 rounded-full appearance-none cursor-pointer mb-2"
                  style={{
                    background: `linear-gradient(to right, #0F7B3F ${(pos / STEPS) * 100}%, #E5E7EB ${(pos / STEPS) * 100}%)`,
                    accentColor: '#0F7B3F',
                  }}
                />
                <div className="flex justify-between text-xs text-gray-300 mb-4">
                  <span>1 €</span>
                  <span>50 000 €</span>
                </div>

                <button
                  onClick={handleConfirm}
                  className="w-full py-4 rounded-2xl font-black text-lg text-white shadow-md hover:opacity-90 active:scale-95 transition-all"
                  style={{ background: 'linear-gradient(135deg, #0F7B3F, #16A34A)' }}
                >
                  Confirmer 💸
                </button>
              </>
            ) : (
              <>
                <p className="text-center text-gray-500 text-sm mb-4">
                  Prix réel : <span className="font-black text-gray-800">{euro(current.price)}</span>
                  {' '}· Toi : <span className="font-semibold">{euro(guess)}</span>
                </p>

                {/* Visual log bar */}
                <div className="relative h-6 bg-gray-100 rounded-full mb-1 overflow-hidden">
                  <div className="absolute top-0 bottom-0 w-1 bg-green-500 rounded-full" style={{ left: `calc(${actualPct}% - 2px)` }} />
                  <div className="absolute top-0 bottom-0 w-1 rounded-full" style={{ left: `calc(${guessPct}% - 2px)`, background: '#9333EA' }} />
                </div>
                <div className="flex justify-between text-xs text-gray-300 mb-4">
                  <span>1 €</span>
                  <span className="flex gap-3">
                    <span><span className="inline-block w-2 h-2 rounded-full bg-green-500 mr-1" />Réel</span>
                    <span><span className="inline-block w-2 h-2 rounded-full mr-1" style={{ background: '#9333EA' }} />Toi</span>
                  </span>
                  <span>50 000 €</span>
                </div>

                {current.note && (
                  <p className="text-center text-gray-400 text-xs mb-3 italic">{current.note}</p>
                )}

                <div className="text-center mb-4 p-3 rounded-2xl" style={{ background: 'rgba(16,163,74,0.10)' }}>
                  <p className="text-3xl font-black" style={{ color: '#0F7B3F' }}>+{lastScore.toLocaleString('fr-FR')}</p>
                  <p className="text-xs text-gray-400">points sur 1 000</p>
                </div>

                <button
                  onClick={handleNext}
                  className="w-full py-4 rounded-2xl font-black text-lg text-white shadow-md hover:opacity-90 active:scale-95 transition-all"
                  style={{ background: 'linear-gradient(135deg, #0F7B3F, #16A34A)' }}
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

const bg = 'linear-gradient(135deg, #064E2B 0%, #0F7B3F 50%, #16A34A 100%)';
