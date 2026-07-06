// Système de tâches façon "The Crew: Mission Deep Sea".
// Chaque template a une difficulté qui varie selon le nombre de joueurs
// (index 0 = 3 joueurs, 1 = 4 joueurs, 2 = 5 joueurs), comme les vraies
// cartes-tâches (imprimées avec 3 valeurs au dos). On tire des tâches
// aléatoires jusqu'à atteindre exactement la difficulté cible de la mission.
const SUITS = ['bleu', 'rose', 'vert', 'jaune'];

function randInt(min, max) { return min + Math.floor(Math.random() * (max - min + 1)); }
function randSuit() { return SUITS[randInt(0, SUITS.length - 1)]; }
function randValue() { return randInt(1, 9); }
function pickTwoSuits() {
  const a = randSuit();
  let b = randSuit();
  while (b === a) b = randSuit();
  return [a, b];
}

function countSuit(cards, suit) { return cards.filter((c) => c.suit === suit).length; }

const TEMPLATES = [
  {
    kind: 'WIN_CARD',
    diff: () => [1, 1, 1],
    make: () => ({ suit: randSuit(), value: randValue() }),
    describe: (p) => `Je dois gagner la carte ${p.suit} ${p.value}.`,
    onTrick: (p, s, t, pid) => {
      const has = t.plays.some((pl) => pl.card.suit === p.suit && pl.card.value === p.value);
      if (!has) return null;
      return t.winnerId === pid ? 'done' : 'failed';
    },
  },
  {
    kind: 'WIN_ANY_OF_COLOR',
    diff: () => [1, 1, 1],
    make: () => ({ suit: randSuit() }),
    describe: (p) => `Je dois gagner au moins une carte ${p.suit} (n'importe laquelle).`,
    onTrick: (p, s, t, pid) => (countSuit(s.wonCardsByPlayer[pid], p.suit) > 0 ? 'done' : null),
    onEnd: (p, s, pid) => (countSuit(s.wonCardsByPlayer[pid], p.suit) > 0 ? 'done' : 'failed'),
  },
  {
    kind: 'WIN_ANY_ROCKET',
    diff: () => [1, 1, 1],
    make: () => ({}),
    describe: () => `Je dois gagner une fusée, peu importe laquelle.`,
    onTrick: (p, s, t, pid) => (countSuit(s.wonCardsByPlayer[pid], 'rocket') > 0 ? 'done' : null),
    onEnd: (p, s, pid) => (countSuit(s.wonCardsByPlayer[pid], 'rocket') > 0 ? 'done' : 'failed'),
  },
  {
    kind: 'WIN_EXACTLY_N_OF_COLOR',
    diff: (p) => (p.n <= 1 ? [1, 1, 1] : p.n === 2 ? [1, 2, 2] : [2, 3, 3]),
    make: () => ({ suit: randSuit(), n: randInt(1, 3) }),
    describe: (p) => `Je dois gagner exactement ${p.n} carte(s) ${p.suit}.`,
    onTrick: (p, s, t, pid) => (countSuit(s.wonCardsByPlayer[pid], p.suit) > p.n ? 'failed' : null),
    onEnd: (p, s, pid) => (countSuit(s.wonCardsByPlayer[pid], p.suit) === p.n ? 'done' : 'failed'),
  },
  {
    kind: 'WIN_AT_LEAST_N_OF_COLOR',
    diff: (p) => (p.n <= 1 ? [1, 1, 1] : p.n === 2 ? [1, 2, 2] : [2, 3, 3]),
    make: () => ({ suit: randSuit(), n: randInt(1, 3) }),
    describe: (p) => `Je dois gagner au moins ${p.n} carte(s) ${p.suit}.`,
    onTrick: (p, s, t, pid) => (countSuit(s.wonCardsByPlayer[pid], p.suit) >= p.n ? 'done' : null),
    onEnd: (p, s, pid) => 'failed',
  },
  {
    kind: 'WIN_NONE_OF_COLOR',
    diff: () => [1, 1, 2],
    make: () => ({ suit: randSuit() }),
    describe: (p) => `Je ne dois gagner aucune carte ${p.suit}.`,
    onTrick: (p, s, t, pid) => (countSuit(s.wonCardsByPlayer[pid], p.suit) > 0 ? 'failed' : null),
    onEnd: () => 'done',
  },
  {
    kind: 'WIN_NONE_OF_VALUE',
    diff: () => [1, 1, 2],
    make: () => ({ value: randValue() }),
    describe: (p) => `Je ne dois gagner aucune carte de valeur ${p.value} (toutes couleurs confondues, hors fusée).`,
    onTrick: (p, s, t, pid) => {
      const bad = s.wonCardsByPlayer[pid].some((c) => c.suit !== 'rocket' && c.value === p.value);
      return bad ? 'failed' : null;
    },
    onEnd: () => 'done',
  },
  {
    kind: 'WIN_FIRST_TRICK',
    diff: () => [1, 1, 1],
    make: () => ({}),
    describe: () => `Je dois gagner le premier pli.`,
    onTrick: (p, s, t, pid) => (t.index === 0 ? (t.winnerId === pid ? 'done' : 'failed') : null),
  },
  {
    kind: 'WIN_ONLY_FIRST_TRICK',
    diff: () => [2, 2, 3],
    make: () => ({}),
    describe: () => `Je dois gagner le premier pli, et uniquement celui-là.`,
    onTrick: (p, s, t, pid) => {
      if (t.index > 0 && t.winnerId === pid) return 'failed';
      if (t.index === 0 && t.winnerId !== pid) return 'failed';
      return null;
    },
    onEnd: (p, s, pid) => (s.trickWinners[0] === pid ? 'done' : 'failed'),
  },
  {
    kind: 'WIN_NONE_OF_FIRST_N',
    diff: (p) => (p.n <= 3 ? [1, 2, 2] : [2, 2, 3]),
    make: () => ({ n: randInt(2, 5) }),
    describe: (p) => `Je ne dois gagner aucun des ${p.n} premiers plis.`,
    onTrick: (p, s, t, pid) => (t.index < p.n && t.winnerId === pid ? 'failed' : null),
    onEnd: () => 'done',
  },
  {
    kind: 'WIN_LAST_TRICK',
    diff: () => [1, 1, 1],
    make: () => ({}),
    describe: () => `Je dois gagner le dernier pli.`,
    onTrick: (p, s, t, pid) => (t.index === s.totalTricks - 1 ? (t.winnerId === pid ? 'done' : 'failed') : null),
  },
  {
    kind: 'WIN_EXACTLY_N_TRICKS',
    diff: (p) => (p.n <= 1 ? [1, 1, 1] : p.n === 2 ? [1, 2, 2] : [2, 3, 3]),
    make: () => ({ n: randInt(1, 3) }),
    describe: (p) => `Je dois gagner exactement ${p.n} pli(s).`,
    onTrick: (p, s, t, pid) => (s.tricksWonByPlayer[pid] > p.n ? 'failed' : null),
    onEnd: (p, s, pid) => (s.tricksWonByPlayer[pid] === p.n ? 'done' : 'failed'),
  },
  {
    kind: 'WIN_AT_LEAST_N_TRICKS',
    diff: (p) => (p.n <= 1 ? [1, 1, 1] : p.n === 2 ? [1, 2, 2] : [2, 3, 3]),
    make: () => ({ n: randInt(1, 3) }),
    describe: (p) => `Je dois gagner au moins ${p.n} pli(s).`,
    onTrick: (p, s, t, pid) => (s.tricksWonByPlayer[pid] >= p.n ? 'done' : null),
    onEnd: () => 'failed',
  },
  {
    kind: 'WIN_N_IN_A_ROW',
    diff: (p) => (p.n <= 2 ? [1, 2, 2] : p.n === 3 ? [2, 3, 4] : [3, 4, 5]),
    make: () => ({ n: randInt(2, 4) }),
    describe: (p) => `Je dois gagner ${p.n} plis d'affilée.`,
    onTrick: (p, s, t, pid) => (s.currentStreak[pid] >= p.n ? 'done' : null),
    onEnd: () => 'failed',
  },
  {
    kind: 'FEWER_TRICKS_THAN_ANYONE',
    diff: () => [2, 2, 3],
    make: () => ({}),
    describe: () => `Je dois gagner strictement moins de plis que chacun des autres membres de l'équipage.`,
    onEnd: (p, s, pid) => {
      const mine = s.tricksWonByPlayer[pid];
      const others = Object.entries(s.tricksWonByPlayer).filter(([id]) => id !== pid).map(([, v]) => v);
      return others.every((v) => mine < v) ? 'done' : 'failed';
    },
  },
  {
    kind: 'MORE_TRICKS_THAN_CAPTAIN',
    diff: () => [2, 2, 3],
    make: () => ({}),
    describe: () => `Je dois gagner plus de plis que le capitaine.`,
    forbidCaptain: true,
    onEnd: (p, s, pid) => (s.tricksWonByPlayer[pid] > s.tricksWonByPlayer[s.commanderId] ? 'done' : 'failed'),
  },
  {
    kind: 'FEWER_TRICKS_THAN_CAPTAIN',
    diff: () => [2, 2, 3],
    make: () => ({}),
    describe: () => `Je dois gagner moins de plis que le capitaine.`,
    forbidCaptain: true,
    onEnd: (p, s, pid) => (s.tricksWonByPlayer[pid] < s.tricksWonByPlayer[s.commanderId] ? 'done' : 'failed'),
  },
  {
    kind: 'TRICK_VALUE_LESS_THAN',
    diff: () => [1, 2, 2],
    make: () => ({ n: randInt(6, 14) }),
    describe: (p) => `Je dois gagner un pli (sans fusée) dont la somme des valeurs est inférieure à ${p.n}.`,
    onTrick: (p, s, t, pid) => (!t.hasRocket && t.winnerId === pid && t.valueSum < p.n ? 'done' : null),
    onEnd: () => 'failed',
  },
  {
    kind: 'TRICK_VALUE_GREATER_THAN',
    diff: () => [1, 2, 2],
    make: () => ({ n: randInt(14, 22) }),
    describe: (p) => `Je dois gagner un pli (sans fusée) dont la somme des valeurs est supérieure à ${p.n}.`,
    onTrick: (p, s, t, pid) => (!t.hasRocket && t.winnerId === pid && t.valueSum > p.n ? 'done' : null),
    onEnd: () => 'failed',
  },
  {
    kind: 'TRICK_ALL_VALUES_GREATER_THAN',
    diff: () => [2, 2, 3],
    make: () => ({ n: randInt(3, 6) }),
    describe: (p) => `Je dois gagner un pli (sans fusée) dont toutes les valeurs sont supérieures à ${p.n}.`,
    onTrick: (p, s, t, pid) => {
      if (t.hasRocket || t.winnerId !== pid) return null;
      return t.plays.every((pl) => pl.card.value > p.n) ? 'done' : null;
    },
    onEnd: () => 'failed',
  },
  {
    kind: 'PREDICT',
    diff: () => [2, 3, 3],
    make: () => ({ secret: Math.random() < 0.5 }),
    describe: (p) => `Je prédis ${p.secret ? 'en secret' : 'à voix haute'} le nombre exact de plis que je vais gagner (à annoncer avant le premier pli).`,
    needsPrediction: true,
    onEnd: (p, s, pid) => (typeof p.predicted === 'number' && s.tricksWonByPlayer[pid] === p.predicted ? 'done' : 'failed'),
  },
  {
    kind: 'EQUAL_TWO_COLORS_IN_TRICK',
    diff: () => [2, 2, 3],
    make: () => { const [a, b] = pickTwoSuits(); return { a, b }; },
    describe: (p) => `Je dois gagner un pli contenant autant de cartes ${p.a} que de cartes ${p.b} (au moins une de chaque).`,
    onTrick: (p, s, t, pid) => {
      if (t.winnerId !== pid) return null;
      const a = countSuit(t.plays.map((pl) => pl.card), p.a);
      const b = countSuit(t.plays.map((pl) => pl.card), p.b);
      return a === b && a > 0 ? 'done' : null;
    },
    onEnd: () => 'failed',
  },
  {
    kind: 'MORE_OF_COLOR_A_THAN_B',
    diff: () => [1, 2, 2],
    make: () => { const [a, b] = pickTwoSuits(); return { a, b }; },
    describe: (p) => `Je dois gagner plus de cartes ${p.a} que de cartes ${p.b} au total (0 carte ${p.b} est accepté).`,
    onEnd: (p, s, pid) => (countSuit(s.wonCardsByPlayer[pid], p.a) > countSuit(s.wonCardsByPlayer[pid], p.b) ? 'done' : 'failed'),
  },
  {
    kind: 'ALL_OF_ONE_COLOR',
    diff: () => [2, 3, 3],
    make: () => ({}),
    describe: () => `Je dois gagner toutes les cartes (1 à 9) d'au moins une couleur.`,
    onEnd: (p, s, pid) => {
      const won = s.wonCardsByPlayer[pid];
      const ok = SUITS.some((suit) => {
        const values = new Set(won.filter((c) => c.suit === suit).map((c) => c.value));
        return [1, 2, 3, 4, 5, 6, 7, 8, 9].every((v) => values.has(v));
      });
      return ok ? 'done' : 'failed';
    },
  },
  {
    kind: 'ONE_OF_EACH_COLOR',
    diff: () => [1, 2, 2],
    make: () => ({}),
    describe: () => `Je dois gagner au moins une carte de chacune des 4 couleurs.`,
    onEnd: (p, s, pid) => (SUITS.every((suit) => countSuit(s.wonCardsByPlayer[pid], suit) > 0) ? 'done' : 'failed'),
  },
  {
    kind: 'TRICK_ALL_ODD',
    diff: () => [1, 2, 2],
    make: () => ({}),
    describe: () => `Je dois gagner un pli (sans fusée) composé uniquement de valeurs impaires.`,
    onTrick: (p, s, t, pid) => (!t.hasRocket && t.winnerId === pid && t.plays.every((pl) => pl.card.value % 2 === 1) ? 'done' : null),
    onEnd: () => 'failed',
  },
  {
    kind: 'TRICK_ALL_EVEN',
    diff: () => [1, 2, 2],
    make: () => ({}),
    describe: () => `Je dois gagner un pli (sans fusée) composé uniquement de valeurs paires.`,
    onTrick: (p, s, t, pid) => (!t.hasRocket && t.winnerId === pid && t.plays.every((pl) => pl.card.value % 2 === 0) ? 'done' : null),
    onEnd: () => 'failed',
  },
  {
    kind: 'NEVER_OPEN_WITH_COLOR',
    diff: () => [1, 2, 2],
    make: () => (Math.random() < 0.5 ? { suits: [randSuit()] } : { suits: pickTwoSuits() }),
    describe: (p) => `Je ne dois jamais entamer un pli avec une carte ${p.suits.join(' ou ')}.`,
    onTrick: (p, s, t, pid) => (t.openerId === pid && p.suits.includes(t.ledSuit) ? 'failed' : null),
    onEnd: () => 'done',
  },
];

function templateByKind(kind) {
  return TEMPLATES.find((t) => t.kind === kind);
}

function playerCountIndex(n) {
  return n <= 3 ? 0 : n === 4 ? 1 : 2;
}

let taskSeq = 0;
function nextTaskId() { taskSeq += 1; return `t${Date.now()}${taskSeq}`; }

// Tire des tâches jusqu'à atteindre exactement la difficulté cible.
function drawExtensionTasks(targetDifficulty, playerCount) {
  const idx = playerCountIndex(playerCount);
  const tasks = [];
  let sum = 0;
  let guard = 0;
  const signature = new Set();
  while (sum < targetDifficulty && guard < 400) {
    guard += 1;
    const template = TEMPLATES[randInt(0, TEMPLATES.length - 1)];
    const params = template.make();
    const d = template.diff(params)[idx];
    if (sum + d > targetDifficulty) continue;
    const sig = `${template.kind}:${JSON.stringify(params)}`;
    if (signature.has(sig)) continue;
    signature.add(sig);
    sum += d;
    tasks.push({
      id: nextTaskId(),
      kind: template.kind,
      params,
      difficulty: d,
      desc: template.describe(params),
      forbidCaptain: !!template.forbidCaptain,
      needsPrediction: !!template.needsPrediction,
      assignee: null,
      done: false,
    });
  }
  // Garde-fou : si l'algorithme n'a pas atteint la cible exacte (cas rare),
  // on complète avec des tâches WIN_CARD (toujours difficulté 1).
  const cardTemplate = templateByKind('WIN_CARD');
  while (sum < targetDifficulty) {
    const params = cardTemplate.make();
    sum += 1;
    tasks.push({
      id: nextTaskId(), kind: 'WIN_CARD', params, difficulty: 1,
      desc: cardTemplate.describe(params), forbidCaptain: false, needsPrediction: false,
      assignee: null, done: false,
    });
  }
  return tasks;
}

function evaluateOnTrick(task, stats, trickInfo, playerId) {
  const template = templateByKind(task.kind);
  if (!template.onTrick) return null;
  return template.onTrick(task.params, stats, trickInfo, playerId);
}

function evaluateOnEnd(task, stats, playerId) {
  const template = templateByKind(task.kind);
  if (!template.onEnd) return 'failed';
  return template.onEnd(task.params, stats, playerId);
}

module.exports = { TEMPLATES, templateByKind, drawExtensionTasks, evaluateOnTrick, evaluateOnEnd, playerCountIndex };
