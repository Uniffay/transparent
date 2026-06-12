import { fontaineItems } from '@/data/theoremeFontaineGame';
import TheoremeFontaineQuizGame from '@/components/TheoremeFontaineQuizGame';

export default function TheoremeFontaineGamePage() {
  return <TheoremeFontaineQuizGame items={fontaineItems} />;
}
