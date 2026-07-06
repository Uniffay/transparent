import { CrewMission } from './crewTypes';

// Miroir de server/crewMissions.js (données d'affichage côté client).
const BASE_RAW = [
  { n: 1, taskCount: 1, ordered: false, commTokens: 1, desc: '1 mission, pas de contrainte d\'ordre.' },
  { n: 2, taskCount: 2, ordered: false, commTokens: 1, desc: '2 missions, pas de contrainte d\'ordre.' },
  { n: 3, taskCount: 2, ordered: true, commTokens: 1, desc: '2 missions, à réaliser dans l\'ordre indiqué.' },
  { n: 4, taskCount: 3, ordered: false, commTokens: 1, desc: '3 missions, pas de contrainte d\'ordre.' },
  { n: 5, taskCount: 3, ordered: true, commTokens: 1, desc: '3 missions, à réaliser dans l\'ordre indiqué.' },
  { n: 6, taskCount: 4, ordered: false, commTokens: 1, desc: '4 missions, pas de contrainte d\'ordre.' },
  { n: 7, taskCount: 3, ordered: false, commTokens: 0, desc: '3 missions, aucune communication autorisée.' },
  { n: 8, taskCount: 4, ordered: true, commTokens: 1, desc: '4 missions, à réaliser dans l\'ordre indiqué.' },
  { n: 9, taskCount: 5, ordered: false, commTokens: 1, desc: '5 missions, pas de contrainte d\'ordre.' },
  { n: 10, taskCount: 4, ordered: false, commTokens: 0, desc: '4 missions, aucune communication autorisée.' },
  { n: 11, taskCount: 5, ordered: true, commTokens: 1, desc: '5 missions, à réaliser dans l\'ordre indiqué.' },
  { n: 12, taskCount: 5, ordered: false, commTokens: 0, desc: '5 missions, aucune communication autorisée.' },
  { n: 13, taskCount: 6, ordered: false, commTokens: 1, desc: '6 missions, pas de contrainte d\'ordre.' },
  { n: 14, taskCount: 6, ordered: true, commTokens: 1, desc: '6 missions, à réaliser dans l\'ordre indiqué.' },
  { n: 15, taskCount: 6, ordered: true, commTokens: 0, desc: '6 missions dans l\'ordre, aucune communication autorisée.' },
];

const EXT_RAW = [
  { n: 1, taskCount: 2, ordered: false, commTokens: 1, desc: '2 missions, 5 fusées dans le jeu au lieu de 4.' },
  { n: 2, taskCount: 3, ordered: false, commTokens: 1, desc: '3 missions, pas de contrainte d\'ordre.' },
  { n: 3, taskCount: 3, ordered: true, commTokens: 1, desc: '3 missions, à réaliser dans l\'ordre indiqué.' },
  { n: 4, taskCount: 4, ordered: false, commTokens: 1, desc: '4 missions, pas de contrainte d\'ordre.' },
  { n: 5, taskCount: 4, ordered: true, commTokens: 1, desc: '4 missions, à réaliser dans l\'ordre indiqué.' },
  { n: 6, taskCount: 4, ordered: false, commTokens: 0, desc: '4 missions, aucune communication autorisée.' },
  { n: 7, taskCount: 5, ordered: true, commTokens: 1, desc: '5 missions, à réaliser dans l\'ordre indiqué.' },
  { n: 8, taskCount: 5, ordered: false, commTokens: 0, desc: '5 missions, aucune communication autorisée.' },
  { n: 9, taskCount: 6, ordered: false, commTokens: 1, desc: '6 missions, pas de contrainte d\'ordre.' },
  { n: 10, taskCount: 6, ordered: true, commTokens: 1, desc: '6 missions, à réaliser dans l\'ordre indiqué.' },
  { n: 11, taskCount: 6, ordered: false, commTokens: 0, desc: '6 missions, aucune communication autorisée.' },
  { n: 12, taskCount: 7, ordered: false, commTokens: 1, desc: '7 missions, pas de contrainte d\'ordre.' },
  { n: 13, taskCount: 7, ordered: true, commTokens: 1, desc: '7 missions, à réaliser dans l\'ordre indiqué.' },
  { n: 14, taskCount: 7, ordered: true, commTokens: 0, desc: '7 missions dans l\'ordre, aucune communication autorisée.' },
  { n: 15, taskCount: 8, ordered: true, commTokens: 0, desc: '8 missions dans l\'ordre, aucune communication autorisée.' },
];

export const CREW_MISSIONS: Record<'base' | 'extension', CrewMission[]> = {
  base: BASE_RAW.map((m) => ({ ...m, id: `base-${m.n}`, ruleset: 'base', rocketMax: 4 })),
  extension: EXT_RAW.map((m) => ({ ...m, id: `ext-${m.n}`, ruleset: 'extension', rocketMax: 5 })),
};
