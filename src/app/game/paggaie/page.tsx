import { gayPeople } from '@/data/paggaieGame';
import GayQuizGame from '@/components/GayQuizGame';

export default function PaggaieGamePage() {
  return <GayQuizGame people={gayPeople} />;
}
