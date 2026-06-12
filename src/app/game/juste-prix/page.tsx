import { priceItems } from '@/data/justePrixGame';
import PriceGame from '@/components/PriceGame';

export default function JustePrixGamePage() {
  return <PriceGame items={priceItems} />;
}
