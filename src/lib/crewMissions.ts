import { CrewMission } from './crewTypes';

// Miroir de server/crewMissions.js (données d'affichage côté client).
// Fusées toujours 1-4 dans les deux modes — seules les missions diffèrent.
const BASE_RAW = [
  { n: 1, taskCount: 1, ordered: false, desc: '1 tâche, pas de contrainte d\'ordre.' },
  { n: 2, taskCount: 2, ordered: false, desc: '2 tâches, pas de contrainte d\'ordre.' },
  { n: 3, taskCount: 2, ordered: true, desc: '2 tâches, à réaliser dans l\'ordre indiqué.' },
  { n: 4, taskCount: 3, ordered: false, desc: '3 tâches, pas de contrainte d\'ordre.' },
  { n: 5, taskCount: 3, ordered: true, desc: '3 tâches, à réaliser dans l\'ordre indiqué.' },
  { n: 6, taskCount: 4, ordered: false, desc: '4 tâches, pas de contrainte d\'ordre.' },
  { n: 7, taskCount: 4, ordered: true, desc: '4 tâches, à réaliser dans l\'ordre indiqué.' },
  { n: 8, taskCount: 5, ordered: false, desc: '5 tâches, pas de contrainte d\'ordre.' },
  { n: 9, taskCount: 5, ordered: true, desc: '5 tâches, à réaliser dans l\'ordre indiqué.' },
  { n: 10, taskCount: 6, ordered: false, desc: '6 tâches, pas de contrainte d\'ordre.' },
  { n: 11, taskCount: 6, ordered: true, desc: '6 tâches, à réaliser dans l\'ordre indiqué.' },
  { n: 12, taskCount: 7, ordered: false, desc: '7 tâches, pas de contrainte d\'ordre.' },
  { n: 13, taskCount: 7, ordered: true, desc: '7 tâches, à réaliser dans l\'ordre indiqué.' },
  { n: 14, taskCount: 8, ordered: true, desc: '8 tâches, à réaliser dans l\'ordre indiqué.' },
  { n: 15, taskCount: 9, ordered: true, desc: '9 tâches, à réaliser dans l\'ordre indiqué.' },
];

const EXT_RAW = [
  { n: 1, difficulty: 1, desc: 'Difficulté 1 : une seule tâche, simple.' },
  { n: 2, difficulty: 2, desc: 'Difficulté 2.' },
  { n: 3, difficulty: 3, desc: 'Difficulté 3.' },
  { n: 4, difficulty: 4, desc: 'Difficulté 4.' },
  { n: 5, difficulty: 5, desc: 'Difficulté 5.' },
  { n: 6, difficulty: 6, desc: 'Difficulté 6.' },
  { n: 7, difficulty: 7, desc: 'Difficulté 7.' },
  { n: 8, difficulty: 8, desc: 'Difficulté 8.' },
  { n: 9, difficulty: 9, desc: 'Difficulté 9.' },
  { n: 10, difficulty: 10, desc: 'Difficulté 10.' },
  { n: 11, difficulty: 11, desc: 'Difficulté 11.' },
  { n: 12, difficulty: 12, desc: 'Difficulté 12.' },
  { n: 13, difficulty: 13, desc: 'Difficulté 13.' },
  { n: 14, difficulty: 14, desc: 'Difficulté 14.' },
  { n: 15, difficulty: 16, desc: 'Difficulté 16 — la plus corsée.' },
];

export const CREW_MISSIONS: Record<'base' | 'extension', CrewMission[]> = {
  base: BASE_RAW.map((m) => ({ ...m, id: `base-${m.n}`, ruleset: 'base' })),
  extension: EXT_RAW.map((m) => ({ ...m, id: `ext-${m.n}`, ruleset: 'extension' })),
};
