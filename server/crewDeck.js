// Deck et distribution pour The Crew. Les fusées sont toujours 1-4,
// dans le jeu de base comme dans l'extension (seules les missions/tâches
// changent — cf. Mission Deep Sea, rulebook p.2 : "4 Submarine cards
// with the values 1-4").
const SUITS = ['bleu', 'rose', 'vert', 'jaune'];
const ROCKET_MAX = 4;

function cardId(card) {
  return `${card.suit}-${card.value}`;
}

function createDeck() {
  const deck = [];
  for (const suit of SUITS) {
    for (let value = 1; value <= 9; value++) deck.push({ suit, value });
  }
  for (let value = 1; value <= ROCKET_MAX; value++) deck.push({ suit: 'rocket', value });
  return deck;
}

function shuffle(arr) {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

// Distribue toutes les cartes à tour de rôle (round-robin) à partir d'un
// joueur de départ tiré au sort — reproduit fidèlement la règle "à 3
// joueurs, l'un d'eux reçoit une carte de plus" (celle-ci ne sera jamais
// jouée, cf. rulebook Deep Sea p.7).
function deal(playerIds, deck) {
  const hands = {};
  for (const id of playerIds) hands[id] = [];
  const shuffled = shuffle(deck);
  const startIndex = Math.floor(Math.random() * playerIds.length);
  for (let i = 0; i < shuffled.length; i++) {
    const playerIndex = (startIndex + i) % playerIds.length;
    hands[playerIds[playerIndex]].push(shuffled[i]);
  }
  for (const id of playerIds) {
    hands[id].sort((a, b) => (a.suit === b.suit ? a.value - b.value : a.suit.localeCompare(b.suit)));
  }
  return hands;
}

function findCommander(hands) {
  for (const [playerId, hand] of Object.entries(hands)) {
    if (hand.some((c) => c.suit === 'rocket' && c.value === ROCKET_MAX)) return playerId;
  }
  return null;
}

module.exports = { SUITS, ROCKET_MAX, cardId, createDeck, shuffle, deal, findCommander };
