// Deck et distribution pour The Crew.
const SUITS = ['bleu', 'rose', 'vert', 'jaune'];

function cardId(card) {
  return `${card.suit}-${card.value}`;
}

function createDeck(rocketMax) {
  const deck = [];
  for (const suit of SUITS) {
    for (let value = 1; value <= 9; value++) deck.push({ suit, value });
  }
  for (let value = 1; value <= rocketMax; value++) deck.push({ suit: 'rocket', value });
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

// Distribue toutes les cartes à tour de rôle en partant du joueur donné (round-robin).
function deal(playerIds, deck, startIndex = 0) {
  const hands = {};
  for (const id of playerIds) hands[id] = [];
  const shuffled = shuffle(deck);
  for (let i = 0; i < shuffled.length; i++) {
    const playerIndex = (startIndex + i) % playerIds.length;
    hands[playerIds[playerIndex]].push(shuffled[i]);
  }
  for (const id of playerIds) {
    hands[id].sort((a, b) => (a.suit === b.suit ? a.value - b.value : a.suit.localeCompare(b.suit)));
  }
  return hands;
}

function findCommander(hands, rocketMax) {
  for (const [playerId, hand] of Object.entries(hands)) {
    if (hand.some((c) => c.suit === 'rocket' && c.value === rocketMax)) return playerId;
  }
  return null;
}

module.exports = { SUITS, cardId, createDeck, shuffle, deal, findCommander };
