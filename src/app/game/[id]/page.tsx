import { notFound } from 'next/navigation';
import { games } from '@/data/games';
import QuizGame from '@/components/QuizGame';

export default async function GamePage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const game = games.find((g) => g.id === id);

  if (!game || !game.available || !game.people || game.people.length === 0) {
    notFound();
  }

  return <QuizGame people={game.people} gameTitle={game.title} />;
}

export function generateStaticParams() {
  return games
    .filter((g) => g.available)
    .map((g) => ({ id: g.id }));
}
