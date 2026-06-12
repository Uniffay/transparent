import { quotes } from '@/data/quoteGame';
import QuoteQuizGame from '@/components/QuoteQuizGame';

export default function QuiLaDitGamePage() {
  return <QuoteQuizGame quotes={quotes} />;
}
