'use client';

import { useState, useCallback } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Person, Answer } from '@/lib/types';

type Phase = 'intro' | 'playing' | 'feedback' | 'results';

function shuffle<T>(arr: T[]): T[] {
  return [...arr].sort(() => Math.random() - 0.5);
}

export default function QuizGame({ people, gameTitle }: { people: Person[]; gameTitle: string }) {
  const [shuffled] = useState(() => shuffle(people));
  const [phase, setPhase] = useState<Phase>('intro');
  const [index, setIndex] = useState(0);
  const [answers, setAnswers] = useState<Answer[]>([]);
  const [lastCorrect, setLastCorrect] = useState<boolean | null>(null);
  const [lastGuess, setLastGuess] = useState<boolean | null>(null);

  const current = shuffled[index];

  const handleGuess = useCallback(
    (guessedTrans: boolean) => {
      const correct = guessedTrans === current.isTrans;
      setLastCorrect(correct);
      setLastGuess(guessedTrans);
      setAnswers((prev) => [...prev, { personId: current.id, guessedTrans, correct }]);
      setPhase('feedback');
    },
    [current]
  );

  const handleNext = useCallback(() => {
    if (index + 1 >= shuffled.length) {
      setPhase('results');
    } else {
      setIndex((i) => i + 1);
      setPhase('playing');
      setLastCorrect(null);
      setLastGuess(null);
    }
  }, [index, shuffled.length]);

  const score = answers.filter((a) => a.correct).length;
  const transCount = shuffled.filter((p) => p.isTrans).length;

  if (phase === 'intro') {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen px-6 text-center" style={{ background: transBackground }}>
        <TransDecorations />
        <div className="z-10 bg-white/90 rounded-3xl p-10 shadow-xl max-w-md w-full">
          <div className="text-5xl mb-4">⚧</div>
          <h1 className="text-3xl font-black text-[#55CDFC] mb-2">{gameTitle}</h1>
          <p className="text-gray-600 mb-1">
            Pour chaque photo, devinez si la personne est trans ou non.
          </p>
          <p className="text-gray-500 text-sm mb-6">
            {shuffled.length} personnes à identifier.
          </p>
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

  if (phase === 'results') {
    const transAnswers = shuffled.map((p, i) => ({ person: p, answer: answers[i] }));
    return (
      <div className="flex flex-col items-center justify-center min-h-screen px-6 py-12" style={{ background: transBackground }}>
        <TransDecorations />
        <div className="z-10 bg-white/95 rounded-3xl p-8 shadow-xl max-w-lg w-full">
          <h2 className="text-3xl font-black text-center text-[#55CDFC] mb-1">Résultats</h2>
          <p className="text-center text-gray-500 text-sm mb-6">
            Score : {score}/{shuffled.length} correct{score > 1 ? 's' : ''}
          </p>

          <div className="bg-gradient-to-r from-[#55CDFC]/20 to-[#F7A8B8]/20 rounded-2xl p-5 mb-6 text-center">
            <p className="text-lg font-bold text-gray-700 mb-1">
              {transCount} personne{transCount > 1 ? 's' : ''} sur {shuffled.length}{' '}
              {transCount > 1 ? 'étaient' : 'était'} trans.
            </p>
            <p className="text-gray-500 text-sm">
              Impossible de le deviner visuellement. ♡
            </p>
          </div>

          <div className="flex flex-col gap-3 mb-6">
            {transAnswers.map(({ person, answer }) => (
              <div key={person.id} className="flex items-center gap-3 p-3 rounded-xl bg-gray-50">
                <div className="relative w-12 h-12 rounded-full overflow-hidden flex-shrink-0 bg-gray-200">
                  <Image src={person.src} alt={person.name ?? 'Photo'} fill className="object-cover" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="font-bold text-gray-800 truncate">{person.name ?? 'Inconnu·e'}</p>
                  <div className="flex items-center gap-1 flex-wrap">
                    {person.isTrans ? (
                      <span className="inline-block bg-[#F7A8B8] text-white text-[10px] font-bold px-2 py-0.5 rounded-full">
                        Trans ⚧
                      </span>
                    ) : (
                      <span className="inline-block bg-gray-200 text-gray-600 text-[10px] font-bold px-2 py-0.5 rounded-full">
                        Pas trans
                      </span>
                    )}
                    <span className="text-[10px] text-gray-400">
                      Vous avez dit : {answer?.guessedTrans ? 'Trans' : 'Pas trans'}
                    </span>
                  </div>
                </div>
                <span className="text-lg">{answer?.correct ? '✓' : '✗'}</span>
              </div>
            ))}
          </div>

          <div className="text-center text-gray-500 text-xs mb-6 italic">
            Une personne trans n&apos;est pas &quot;visible&quot;. Laissez-les vivre. 🏳️‍⚧️
          </div>

          <div className="flex gap-3">
            <button
              onClick={() => {
                setAnswers([]);
                setIndex(0);
                setPhase('intro');
                setLastCorrect(null);
                setLastGuess(null);
              }}
              className="flex-1 border-2 border-[#55CDFC] text-[#55CDFC] font-bold py-3 rounded-2xl hover:bg-[#55CDFC]/10 transition-colors"
            >
              Rejouer
            </button>
            <Link
              href="/"
              className="flex-1 bg-gradient-to-r from-[#55CDFC] to-[#F7A8B8] text-white font-bold py-3 rounded-2xl text-center hover:opacity-90 transition-opacity"
            >
              Menu ♡
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-screen px-6" style={{ background: transBackground }}>
      <TransDecorations />
      <div className="z-10 w-full max-w-sm">
        {/* Progress */}
        <div className="flex items-center justify-between mb-4 px-1">
          <Link href="/" className="text-white/70 hover:text-white text-sm transition-colors">
            ← Menu
          </Link>
          <span className="text-white/80 text-sm font-semibold">
            {index + 1} / {shuffled.length}
          </span>
        </div>

        {/* Progress bar */}
        <div className="w-full h-2 bg-white/30 rounded-full mb-6 overflow-hidden">
          <div
            className="h-full bg-white rounded-full transition-all duration-500"
            style={{ width: `${((index + 1) / shuffled.length) * 100}%` }}
          />
        </div>

        {/* Card */}
        <div className="bg-white rounded-3xl shadow-2xl overflow-hidden">
          {/* Image */}
          <div className="relative w-full aspect-square bg-gray-100">
            <Image
              src={current.src}
              alt="Qui est cette personne ?"
              fill
              className="object-cover"
              priority
            />

            {/* Feedback overlay */}
            {phase === 'feedback' && (
              <div
                className={`absolute inset-0 flex items-center justify-center text-7xl font-black ${
                  lastCorrect ? 'bg-green-500/30' : 'bg-red-400/30'
                }`}
              >
                {lastCorrect ? '✓' : '✗'}
              </div>
            )}
          </div>

          {/* Buttons */}
          <div className="p-5">
            {phase === 'playing' ? (
              <>
                <p className="text-center text-gray-500 text-sm mb-4 font-semibold">
                  Cette personne est-elle trans ?
                </p>
                <div className="grid grid-cols-2 gap-3">
                  <button
                    onClick={() => handleGuess(true)}
                    className="py-4 rounded-2xl font-black text-lg text-white shadow-md hover:scale-[1.03] transition-all"
                    style={{ background: 'linear-gradient(135deg, #F7A8B8, #e88fa0)' }}
                  >
                    ⚧ Trans
                  </button>
                  <button
                    onClick={() => handleGuess(false)}
                    className="py-4 rounded-2xl font-black text-lg text-white shadow-md hover:scale-[1.03] transition-all"
                    style={{ background: 'linear-gradient(135deg, #55CDFC, #3bb8e8)' }}
                  >
                    Pas trans
                  </button>
                </div>
              </>
            ) : (
              <>
                <p className={`text-center font-black text-xl mb-1 ${lastCorrect ? 'text-green-500' : 'text-red-400'}`}>
                  {lastCorrect ? 'Correct !' : 'Incorrect'}
                </p>
                <p className="text-center text-gray-500 text-sm mb-4">
                  {current.isTrans ? (
                    <span>
                      <span className="font-bold text-gray-700">{current.name}</span> est{' '}
                      <span className="inline-block bg-[#F7A8B8] text-white text-xs font-bold px-2 py-0.5 rounded-full">
                        Trans ⚧
                      </span>
                      {lastGuess === false && (
                        <span className="block text-xs text-gray-400 mt-1">
                          Impossible de le voir, non ?
                        </span>
                      )}
                    </span>
                  ) : (
                    <span>
                      <span className="font-bold text-gray-700">{current.name}</span> n&apos;est pas trans.
                    </span>
                  )}
                </p>
                <button
                  onClick={handleNext}
                  className="w-full py-4 rounded-2xl font-black text-lg text-white shadow-md hover:opacity-90 transition-opacity"
                  style={{ background: 'linear-gradient(135deg, #55CDFC, #F7A8B8)' }}
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
