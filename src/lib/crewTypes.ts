export type Suit = 'bleu' | 'rose' | 'vert' | 'jaune' | 'rocket';

export type CrewCard = { suit: Suit; value: number };

export type CrewPlayer = { id: string; name: string; emoji: string; ready: boolean };

export type CrewTask = {
  id: string;
  kind: string;
  params: Record<string, unknown>;
  difficulty: number;
  desc: string;
  order: number | null;
  forbidCaptain: boolean;
  needsPrediction: boolean;
  assignee: string | null;
  done: boolean;
};

export type CrewSignal = { card: CrewCard; type: 'haute' | 'basse' | 'only' };

export type CrewMission = {
  id: string;
  ruleset: 'base' | 'extension';
  n: number;
  desc: string;
  taskCount?: number;
  ordered?: boolean;
  difficulty?: number;
};

export type CrewResult = { outcome: 'won' | 'lost'; reason?: string };

export type CrewRoomUpdate = {
  roomId: string;
  state: 'lobby' | 'task-select' | 'predict' | 'playing' | 'result';
  mode: 'base' | 'extension';
  missionId: string;
  hostId: string | null;
  players: CrewPlayer[];
  minPlayers: number;
  maxPlayers: number;
};

export type CrewGameState = CrewRoomUpdate & {
  hand: CrewCard[];
  handCounts: Record<string, number>;
  commanderId: string | null;
  tasks: CrewTask[];
  currentChooserId: string | null;
  canPass: boolean;
  myPendingPredictionTaskIds: string[];
  signals: Record<string, CrewSignal>;
  signalsUsed: Record<string, boolean>;
  currentTrick: { playerId: string; card: CrewCard }[];
  trickLeaderId: string | null;
  currentPlayerId: string | null;
  tricksPlayed: number;
  totalTricks: number;
  result: CrewResult | null;
  mission: CrewMission | null;
};

export const SUIT_INFO: Record<Suit, { icon: string; color: string; label: string }> = {
  bleu: { icon: '🔵', color: '#2563EB', label: 'Bleu' },
  rose: { icon: '🌸', color: '#DB2777', label: 'Rose' },
  vert: { icon: '🟢', color: '#16A34A', label: 'Vert' },
  jaune: { icon: '🟡', color: '#CA8A04', label: 'Jaune' },
  rocket: { icon: '🚀', color: '#111827', label: 'Fusée' },
};

export function cardLabel(card: CrewCard): string {
  return `${SUIT_INFO[card.suit].icon} ${card.value}`;
}

export function legalCards(hand: CrewCard[], currentTrick: { card: CrewCard }[]): CrewCard[] {
  if (currentTrick.length === 0) return hand;
  const ledSuit = currentTrick[0].card.suit;
  const hasLed = hand.some((c) => c.suit === ledSuit);
  if (!hasLed) return hand;
  return hand.filter((c) => c.suit === ledSuit);
}

export function signalEligibleCards(hand: CrewCard[]): CrewCard[] {
  const bySuit: Record<string, CrewCard[]> = {};
  for (const c of hand) {
    if (c.suit === 'rocket') continue;
    (bySuit[c.suit] ??= []).push(c);
  }
  const eligible: CrewCard[] = [];
  for (const suit in bySuit) {
    const cards = bySuit[suit];
    if (cards.length === 1) { eligible.push(cards[0]); continue; }
    const max = Math.max(...cards.map((c) => c.value));
    const min = Math.min(...cards.map((c) => c.value));
    eligible.push(...cards.filter((c) => c.value === max || c.value === min));
  }
  return eligible;
}
