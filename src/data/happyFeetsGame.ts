import fs from 'node:fs';
import path from 'node:path';

export type FeetPerson = {
  name: string;   // "Margot Robbie" (dérivé du nom de fichier)
  feet: string;   // /images/HappyFeets/feets/margot-robbie.jpg
  choice: string; // /images/HappyFeets/choice/margot-robbie.jpg
};

export type HappyFeetsData = {
  people: FeetPerson[];
  // Fichiers présents d'un seul côté (pour aider à compléter le contenu)
  missingChoice: string[];
  missingFeet: string[];
};

const HAPPY_FEETS_DIR = path.join(process.cwd(), 'public', 'images', 'HappyFeets');
const IMAGE_EXTENSIONS = new Set(['.jpg', '.jpeg', '.png', '.webp', '.avif', '.gif']);

function listImages(dir: string): Map<string, string> {
  if (!fs.existsSync(dir)) return new Map();
  const bySlug = new Map<string, string>();
  for (const file of fs.readdirSync(dir)) {
    const { name, ext } = path.parse(file);
    if (IMAGE_EXTENSIONS.has(ext.toLowerCase())) bySlug.set(name, file);
  }
  return bySlug;
}

function displayName(slug: string): string {
  return slug
    .replace(/[-_]+/g, ' ')
    .trim()
    .replace(/\p{L}[\p{L}']*/gu, (word) => word.charAt(0).toUpperCase() + word.slice(1));
}

/**
 * Construit la liste des personnes à partir de public/images/HappyFeets.
 * Convention : feets/<slug>.jpg (photo de pieds) + choice/<slug>.jpg (photo de
 * la personne). Le même <slug> relie les deux ; il sert aussi de nom affiché.
 */
export function getHappyFeetsData(): HappyFeetsData {
  const feets = listImages(path.join(HAPPY_FEETS_DIR, 'feets'));
  const choices = listImages(path.join(HAPPY_FEETS_DIR, 'choice'));

  const people: FeetPerson[] = [];
  const missingChoice: string[] = [];

  for (const [slug, feetFile] of [...feets.entries()].sort()) {
    const choiceFile = choices.get(slug);
    if (!choiceFile) {
      missingChoice.push(feetFile);
      continue;
    }
    people.push({
      name: displayName(slug),
      feet: `/images/HappyFeets/feets/${feetFile}`,
      choice: `/images/HappyFeets/choice/${choiceFile}`,
    });
  }

  const missingFeet = [...choices.entries()]
    .filter(([slug]) => !feets.has(slug))
    .map(([, file]) => file)
    .sort();

  return { people, missingChoice, missingFeet };
}
