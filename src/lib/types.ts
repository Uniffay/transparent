export type Gender = 'homme' | 'femme';

export type Person = {
  id: string;
  src: string;
  name?: string;
  isTrans: boolean;
  gender: Gender;
  birthSex: Gender;
  source?: string;
};

export type GameDefinition = {
  id: string;
  title: string;
  description: string;
  available: boolean;
  emoji: string;
  people?: Person[];
};
