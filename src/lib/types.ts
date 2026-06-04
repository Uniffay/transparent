export type Gender = 'homme' | 'femme';

export type Person = {
  id: string;
  src: string;
  name?: string;
  isTrans: boolean;
  gender: Gender;      // identité de genre actuelle (pour l'affichage résultats)
  birthSex: Gender;    // sexe de naissance = la bonne réponse du jeu
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

export type Answer = {
  personId: string;
  guessedTrans: boolean;
  correct: boolean;
};
