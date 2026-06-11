import Link from 'next/link';

const hearts = ['♡', '♥', '💕', '♡', '♥', '💗'];

const games = [
  {
    id: 'celebrities',
    title: 'TransParent',
    description: 'Trans ou pas trans ? Enchaîne les bonnes réponses sans te tromper.',
    available: true,
    emoji: '⚧',
    tag: 'Streak',
    accent: 'from-[#55CDFC] to-[#F7A8B8]',
  },
  {
    id: 'weight',
    title: 'Juste Poids',
    description: 'Estimez le poids de chaque personne. Plus vous êtes proche, plus vous gagnez de points.',
    available: true,
    emoji: '⚖️',
    tag: 'Score',
    accent: 'from-[#7C3AED] to-[#A855F7]',
  },
  {
    id: 'paggaie',
    title: 'Gay ou Pagaie 🛶',
    description: 'Gay ou pas gay ? Enchaîne les bonnes réponses. Spoiler : on ne peut pas deviner.',
    available: true,
    emoji: '🏳️‍🌈',
    tag: 'Streak',
    accent: 'from-[#E40303] to-[#750787]',
  },
  {
    id: 'politique',
    title: 'Politiquement Correct',
    description: 'Gauche ou droite ? Devine le bord politique. Spoiler : ça ne se voit pas sur un visage.',
    available: true,
    emoji: '🗳️',
    tag: 'Streak',
    accent: 'from-[#C9243F] to-[#1E50A0]',
  },
  {
    id: 'link-in-bio',
    title: 'Link in Bio ?',
    description: 'A-t-il/elle un OnlyFans ou un MYM ? Devine. Spoiler : ça ne se voit pas, et aucun souci à ça.',
    available: true,
    emoji: '🔗',
    tag: 'Streak',
    accent: 'from-[#00AEEF] to-[#6D5BFF]',
  },
  {
    id: null,
    title: 'Bientôt...',
    description: 'Un nouveau jeu arrive.',
    available: false,
    emoji: '🎮',
    tag: null,
    accent: null,
  },
];

export default function HomePage() {
  return (
    <main
      className="min-h-screen relative overflow-hidden flex flex-col items-center justify-center px-4 py-12"
      style={{
        background: 'linear-gradient(135deg, #FFB7D5 0%, #FF69B4 40%, #E91E8C 100%)',
      }}
    >
      {/* Floating hearts */}
      <span className="absolute select-none pointer-events-none text-2xl text-pink-300 animate-float-1" style={{ top: '8%', left: '5%' }}>{hearts[0]}</span>
      <span className="absolute select-none pointer-events-none text-3xl text-pink-400 animate-float-2" style={{ top: '15%', right: '8%' }}>{hearts[1]}</span>
      <span className="absolute select-none pointer-events-none text-xl text-pink-200 animate-float-3" style={{ top: '40%', left: '3%' }}>{hearts[2]}</span>
      <span className="absolute select-none pointer-events-none text-2xl text-pink-300 animate-float-4" style={{ top: '60%', right: '5%' }}>{hearts[3]}</span>
      <span className="absolute select-none pointer-events-none text-3xl text-pink-400 animate-float-5" style={{ top: '75%', left: '8%' }}>{hearts[4]}</span>
      <span className="absolute select-none pointer-events-none text-xl text-pink-200 animate-float-6" style={{ top: '85%', right: '10%' }}>{hearts[5]}</span>

      {/* Header */}
      <div className="text-center mb-10 z-10">
        <h1
          className="text-6xl md:text-7xl text-white drop-shadow-lg mb-2"
          style={{ fontFamily: 'var(--font-pacifico)' }}
        >
          UniGames
        </h1>
        <p className="text-white/80 text-lg font-semibold tracking-wide">
          uwu ~ des jeux pour tout le monde ♡
        </p>
      </div>

      {/* Game grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 w-full max-w-4xl z-10">
        {games.map((game, i) =>
          game.available && game.id ? (
            <Link
              key={i}
              href={`/game/${game.id}`}
              className="group bg-white/90 backdrop-blur rounded-3xl overflow-hidden shadow-lg border-2 border-pink-200 hover:border-pink-400 hover:shadow-xl hover:-translate-y-1 transition-all duration-200 flex flex-col"
            >
              {/* Accent bar */}
              <div className={`h-1.5 w-full bg-gradient-to-r ${game.accent}`} />
              <div className="p-6 flex flex-col gap-2 flex-1">
                <div className="flex items-start justify-between">
                  {game.id === 'paggaie' ? (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img src="/pagaie.svg" alt="Pagaie multicolore" className="w-11 h-11" />
                  ) : (
                    <span className="text-4xl">{game.emoji}</span>
                  )}
                  {game.tag && (
                    <span className={`text-[10px] font-black uppercase tracking-widest text-white px-2 py-0.5 rounded-full bg-gradient-to-r ${game.accent}`}>
                      {game.tag}
                    </span>
                  )}
                </div>
                <h2 className="text-xl font-black text-gray-800 group-hover:text-pink-600 transition-colors">
                  {game.title}
                </h2>
                <p className="text-gray-500 text-sm flex-1">{game.description}</p>
                <div className="mt-3">
                  <span className="inline-block bg-pink-500 text-white text-xs font-bold px-4 py-1.5 rounded-full group-hover:bg-pink-600 transition-colors">
                    Jouer ♡
                  </span>
                </div>
              </div>
            </Link>
          ) : (
            <div
              key={i}
              className="bg-white/20 backdrop-blur rounded-3xl p-6 border-2 border-white/20 flex flex-col gap-2 opacity-50 cursor-not-allowed"
            >
              <div className="text-4xl grayscale opacity-50">{game.emoji}</div>
              <h2 className="text-lg font-black text-white/60">{game.title}</h2>
              <p className="text-white/40 text-sm">{game.description}</p>
              <div className="mt-2">
                <span className="inline-block bg-white/20 text-white/40 text-xs font-bold px-3 py-1 rounded-full">
                  Bientôt 🔒
                </span>
              </div>
            </div>
          )
        )}
      </div>

      <p className="mt-10 text-white/40 text-xs z-10">UniGames ♡</p>
    </main>
  );
}
