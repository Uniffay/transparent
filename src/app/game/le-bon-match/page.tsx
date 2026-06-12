import { matchRounds } from '@/data/matchGame';
import MatchQuizGame from '@/components/MatchQuizGame';

export default function LeBonMatchGamePage() {
  return <MatchQuizGame rounds={matchRounds} />;
}
