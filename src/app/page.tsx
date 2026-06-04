import Link from 'next/link';
import { games } from '@/data/games';

const hearts = ['♡', '♥', '💕', '♡', '♥', '💗'];

export default function HomePage() {
  return (
    <main
      className="min-h-screen relative overflow-hidden flex flex-col items-center justify-center px-4 py-12"
      style={{
        background: 'linear-gradient(135deg, #FFB7D5 0%, #FF69B4 40%, #E91E8C 100%)',
      }}
    >
      {/* Floating hearts (decorative) */}
      <span className="absolute select-none pointer-events-none text-2xl text-pink-300 animate-float-1" style={{ top: '8%', left: '5%' }}>{hearts[0]}</span>
      <span className="absolute select-none pointer-events-none text-3xl text-pink-400 animate-float-2" style={{ top: '15%', right: '8%' }}>{hearts[1]}</span>
      <span className="absolute select-none pointer-events-none text-xl text-pink-200 animate-float-3" style={{ top: '40%', left: '3%' }}>{hearts[2]}</span>
      <span className="absolute select-none pointer-events-none text-2xl text-pink-300 animate-float-4" style={{ top: '60%', right: '5%' }}>{hearts[3]}</span>
      <span className="absolute select-none pointer-events-none text-3xl text-pink-400 animate-float-5" style={{ top: '75%', left: '8%' }}>{hearts[4]}</span>
      <span className="absolute select-none pointer-events-none text-xl text-pink-200 animate-float-6" style={{ top: '85%', right: '10%' }}>{hearts[5]}</span>

      {/* Header */}
      <div className="text-center mb-12 z-10">
        <h1
          className="text-6xl md:text-7xl text-white drop-shadow-lg mb-3"
          style={{ fontFamily: 'var(--font-pacifico)' }}
        >
          TransParent
        </h1>
        <p className="text-white/90 text-xl font-semibold tracking-wide">
          uwu ~ pouvez-vous deviner ? ♡
        </p>
        <p className="text-white/70 text-sm mt-2">
          Probablement pas... et c&apos;est tout le message 🌸
        </p>
      </div>

      {/* Game grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 w-full max-w-2xl z-10">
        {games.map((game) =>
          game.available ? (
            <Link
              key={game.id}
              href={`/game/${game.id}`}
              className="group bg-white/90 backdrop-blur rounded-3xl p-6 shadow-lg border-2 border-pink-200 hover:border-pink-400 hover:shadow-xl hover:-translate-y-1 transition-all duration-200 flex flex-col gap-2"
            >
              <div className="text-4xl">{game.emoji}</div>
              <h2 className="text-xl font-black text-pink-600 group-hover:text-pink-700">
                {game.title}
              </h2>
              <p className="text-pink-400 text-sm">{game.description}</p>
              <div className="mt-2">
                <span className="inline-block bg-pink-500 text-white text-xs font-bold px-3 py-1 rounded-full group-hover:bg-pink-600 transition-colors">
                  Jouer ♡
                </span>
              </div>
            </Link>
          ) : (
            <div
              key={game.id}
              className="bg-white/40 backdrop-blur rounded-3xl p-6 border-2 border-white/30 flex flex-col gap-2 opacity-60 cursor-not-allowed"
            >
              <div className="text-4xl grayscale">{game.emoji}</div>
              <h2 className="text-xl font-black text-white/70">{game.title}</h2>
              <p className="text-white/50 text-sm">{game.description}</p>
              <div className="mt-2">
                <span className="inline-block bg-white/30 text-white/60 text-xs font-bold px-3 py-1 rounded-full">
                  Bientôt... 🔒
                </span>
              </div>
            </div>
          )
        )}
      </div>

      {/* Footer */}
      <p className="mt-12 text-white/50 text-xs z-10 text-center max-w-sm">
        Les personnes trans sont invisibles. Laissez-les tranquilles. ♡
      </p>
    </main>
  );
}
