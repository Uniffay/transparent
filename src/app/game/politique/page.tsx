import { politicalPeople } from '@/data/politiqueGame';
import PoliticsQuizGame from '@/components/PoliticsQuizGame';

export default function PolitiqueGamePage() {
  return <PoliticsQuizGame people={politicalPeople} />;
}
