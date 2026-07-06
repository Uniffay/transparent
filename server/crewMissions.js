// Missions pour The Crew. Les cartes-missions cibles (couleur+valeur) sont tirées
// aléatoirement à chaque partie (comme dans le jeu physique) — seule la "forme"
// de la mission (nombre de tâches, ordre imposé ou non, jetons de communication)
// est définie ici. Contenu original, inspiré de la progression de difficulté du
// jeu de base et de la variante "extension" (atouts 1-5 au lieu de 1-4).

const BASE_MISSIONS = [
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
].map((m) => ({ ...m, id: `base-${m.n}`, ruleset: 'base', rocketMax: 4 }));

const EXTENSION_MISSIONS = [
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
].map((m) => ({ ...m, id: `ext-${m.n}`, ruleset: 'extension', rocketMax: 5 }));

const MISSIONS_BY_RULESET = { base: BASE_MISSIONS, extension: EXTENSION_MISSIONS };

function getMission(ruleset, missionId) {
  const list = MISSIONS_BY_RULESET[ruleset] ?? [];
  return list.find((m) => m.id === missionId) ?? null;
}

module.exports = { BASE_MISSIONS, EXTENSION_MISSIONS, MISSIONS_BY_RULESET, getMission };
