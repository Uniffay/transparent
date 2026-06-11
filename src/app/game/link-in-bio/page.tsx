import { linkPeople } from '@/data/linkInBioGame';
import LinkInBioQuizGame from '@/components/LinkInBioQuizGame';

export default function LinkInBioGamePage() {
  return <LinkInBioQuizGame people={linkPeople} />;
}
