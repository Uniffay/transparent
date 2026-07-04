import Link from 'next/link';
import { getHappyFeetsData } from '@/data/happyFeetsGame';
import HappyFeetsGame from '@/components/HappyFeetsGame';

const bg = 'linear-gradient(135deg, #134E4A 0%, #0D9488 50%, #6D28D9 100%)';

export default function HappyFeetsPage() {
  const { people, missingChoice, missingFeet } = getHappyFeetsData();

  // Il faut au moins 4 personnes pour proposer 4 choix.
  if (people.length < 4) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen px-6 text-center" style={{ background: bg }}>
        <div className="z-10 bg-white/95 rounded-3xl p-10 shadow-xl max-w-md w-full text-left">
          <div className="text-5xl mb-4 text-center">🦶</div>
          <h1 className="text-3xl font-black mb-4 text-center" style={{ color: '#0D9488' }}>Happy Feets</h1>
          <p className="text-gray-600 text-sm mb-3">
            Le jeu se remplit tout seul à partir des photos. Il faut au moins <strong>4 personnes complètes</strong> ({people.length}/4 pour l&apos;instant) :
          </p>
          <ul className="text-gray-600 text-sm mb-3 list-disc pl-5 space-y-1">
            <li><code className="bg-gray-100 px-1 rounded">public/images/HappyFeets/feets/marie.jpg</code> — la photo des pieds</li>
            <li><code className="bg-gray-100 px-1 rounded">public/images/HappyFeets/choice/marie.jpg</code> — la photo de la personne</li>
          </ul>
          <p className="text-gray-500 text-xs mb-3">
            Même nom de fichier des deux côtés = même personne. Le nom affiché vient du fichier (<code className="bg-gray-100 px-1 rounded">lea-dupont.jpg</code> → « Lea Dupont »).
          </p>
          {missingChoice.length > 0 && (
            <p className="text-amber-700 text-xs mb-2">
              ⚠️ Pieds sans photo de personne dans <code>choice/</code> : {missingChoice.join(', ')}
            </p>
          )}
          {missingFeet.length > 0 && (
            <p className="text-amber-700 text-xs mb-2">
              ⚠️ Personnes sans photo de pieds dans <code>feets/</code> : {missingFeet.join(', ')}
            </p>
          )}
          <div className="text-center mt-6">
            <Link href="/" className="text-sm font-bold" style={{ color: '#0D9488' }}>← Retour au menu</Link>
          </div>
        </div>
      </div>
    );
  }

  return <HappyFeetsGame people={people} />;
}
