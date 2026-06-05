import { weightPeople } from '@/data/weightGame';
import WeightGame from '@/components/WeightGame';

export default function WeightGamePage() {
  return <WeightGame people={weightPeople} />;
}
