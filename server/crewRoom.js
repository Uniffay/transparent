const { createDeck, deal, findCommander, cardId } = require('./crewDeck');
const { getMission } = require('./crewMissions');

const MIN_PLAYERS = 3;
const MAX_PLAYERS = 5;

function rotateToStart(arr, startId) {
  const idx = arr.indexOf(startId);
  if (idx === -1) return [...arr];
  return [...arr.slice(idx), ...arr.slice(0, idx)];
}

// Tire N cartes cibles distinctes (couleur+valeur, jamais fusée) pour les tâches.
function drawTaskCards(n) {
  const pool = [];
  const SUITS = ['bleu', 'rose', 'vert', 'jaune'];
  for (const suit of SUITS) for (let value = 1; value <= 9; value++) pool.push({ suit, value });
  for (let i = pool.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [pool[i], pool[j]] = [pool[j], pool[i]];
  }
  return pool.slice(0, n);
}

class CrewRoom {
  constructor(id) {
    this.id = id;
    this.players = []; // [{ id, name, emoji, ready }]
    this.state = 'lobby'; // lobby | playing | result
    this.mode = 'base'; // base | extension
    this.missionId = 'base-1';
    this.game = null;
  }

  get hostId() { return this.players[0]?.id ?? null; }

  addPlayer(id, name, emoji) {
    if (this.players.some((p) => p.id === id)) return true;
    if (this.state !== 'lobby') return false;
    if (this.players.length >= MAX_PLAYERS) return false;
    this.players.push({ id, name: name.slice(0, 20), emoji: emoji ?? '🚀', ready: false });
    return true;
  }

  removePlayer(id) {
    this.players = this.players.filter((p) => p.id !== id);
  }

  setReady(id, value) {
    const p = this.players.find((pl) => pl.id === id);
    if (p) p.ready = value;
  }

  allReady() {
    return this.players.length >= MIN_PLAYERS && this.players.length <= MAX_PLAYERS && this.players.every((p) => p.ready);
  }

  setMode(mode) {
    if (mode !== 'base' && mode !== 'extension') return;
    this.mode = mode;
    this.missionId = mode === 'base' ? 'base-1' : 'ext-1';
  }

  setMission(missionId) {
    const mission = getMission(this.mode, missionId);
    if (!mission) return;
    this.missionId = missionId;
  }

  // ── Démarrage d'une mission ────────────────────────────────────────────────
  start() {
    if (this.players.length < MIN_PLAYERS || this.players.length > MAX_PLAYERS) {
      return { error: { message: `The Crew se joue de ${MIN_PLAYERS} à ${MAX_PLAYERS} joueurs.` } };
    }
    const mission = getMission(this.mode, this.missionId);
    if (!mission) return { error: { message: 'Mission invalide.' } };

    const playerIds = this.players.map((p) => p.id);
    const deck = createDeck(mission.rocketMax);
    const hands = deal(playerIds, deck);
    const commanderId = findCommander(hands, mission.rocketMax);
    const orderedPlayerIds = rotateToStart(playerIds, commanderId);

    const taskCards = drawTaskCards(mission.taskCount);
    const tasks = taskCards.map((card, i) => ({
      card,
      order: mission.ordered ? i + 1 : null,
      assignee: orderedPlayerIds[i % orderedPlayerIds.length],
      done: false,
    }));

    this.game = {
      mission,
      hands,
      commanderId,
      tasks,
      signals: {}, // playerId -> { card, type }
      signalsUsed: {},
      currentTrick: [], // [{ playerId, card }]
      trickLeaderId: commanderId,
      turnOrder: rotateToStart(playerIds, commanderId),
      currentTurnIndex: 0,
      tricksPlayed: 0,
      totalTricks: hands[playerIds[0]].length,
      result: null,
    };
    this.state = 'playing';
    return {};
  }

  get currentPlayerId() {
    if (!this.game) return null;
    return this.game.turnOrder[this.game.currentTurnIndex];
  }

  // ── Signal (communication) ─────────────────────────────────────────────────
  sendSignal(playerId, card) {
    const g = this.game;
    if (!g || this.state !== 'playing') return { error: { message: 'Pas de partie en cours.' } };
    if (g.mission.commTokens < 1) return { error: { message: 'Communication désactivée pour cette mission.' } };
    if (g.signalsUsed[playerId]) return { error: { message: 'Signal déjà utilisé.' } };
    if (card.suit === 'rocket') return { error: { message: 'Impossible de signaler une fusée.' } };
    const hand = g.hands[playerId] ?? [];
    const owns = hand.some((c) => c.suit === card.suit && c.value === card.value);
    if (!owns) return { error: { message: 'Tu ne possèdes pas cette carte.' } };

    const sameSuit = hand.filter((c) => c.suit === card.suit);
    let type;
    if (sameSuit.length === 1) type = 'only';
    else if (card.value === Math.max(...sameSuit.map((c) => c.value))) type = 'haute';
    else if (card.value === Math.min(...sameSuit.map((c) => c.value))) type = 'basse';
    else return { error: { message: 'Tu ne peux signaler que ta carte la plus haute, la plus basse, ou unique dans sa couleur.' } };

    g.signals[playerId] = { card, type };
    g.signalsUsed[playerId] = true;
    return {};
  }

  // ── Jouer une carte ─────────────────────────────────────────────────────────
  playCard(playerId, card) {
    const g = this.game;
    if (!g || this.state !== 'playing') return { error: { message: 'Pas de partie en cours.' } };
    if (this.currentPlayerId !== playerId) return { error: { message: "Ce n'est pas ton tour." } };
    const hand = g.hands[playerId] ?? [];
    const idx = hand.findIndex((c) => c.suit === card.suit && c.value === card.value);
    if (idx === -1) return { error: { message: 'Carte absente de ta main.' } };

    if (g.currentTrick.length > 0) {
      const ledSuit = g.currentTrick[0].card.suit;
      if (card.suit !== ledSuit) {
        const hasLedSuit = hand.some((c) => c.suit === ledSuit);
        if (hasLedSuit) return { error: { message: `Tu dois suivre la couleur (${ledSuit}).` } };
      }
    }

    hand.splice(idx, 1);
    g.currentTrick.push({ playerId, card });
    g.currentTurnIndex = (g.currentTurnIndex + 1) % g.turnOrder.length;

    if (g.currentTrick.length === g.turnOrder.length) {
      this._resolveTrick();
    }
    return {};
  }

  _resolveTrick() {
    const g = this.game;
    const ledSuit = g.currentTrick[0].card.suit;
    const rockets = g.currentTrick.filter((play) => play.card.suit === 'rocket');
    let winningPlay;
    if (rockets.length > 0) {
      winningPlay = rockets.reduce((best, p) => (p.card.value > best.card.value ? p : best));
    } else {
      const ledPlays = g.currentTrick.filter((play) => play.card.suit === ledSuit);
      winningPlay = ledPlays.reduce((best, p) => (p.card.value > best.card.value ? p : best));
    }
    const winnerId = winningPlay.playerId;

    for (const play of g.currentTrick) {
      const task = g.tasks.find((t) => t.card.suit === play.card.suit && t.card.value === play.card.value);
      if (!task || task.done) continue;
      if (task.assignee !== winnerId) {
        this.state = 'result';
        g.result = { outcome: 'lost', reason: `${play.card.suit} ${play.card.value} devait être gagnée par sa/son responsable.` };
        return;
      }
      if (task.order != null) {
        const blockedBy = g.tasks.find((t) => t.order != null && t.order < task.order && !t.done);
        if (blockedBy) {
          this.state = 'result';
          g.result = { outcome: 'lost', reason: `Ordre non respecté : la tâche n°${blockedBy.order} devait être finie avant.` };
          return;
        }
      }
      task.done = true;
    }

    if (this.state === 'result') return;

    g.tricksPlayed += 1;
    g.currentTrick = [];
    g.trickLeaderId = winnerId;
    g.turnOrder = rotateToStart(g.turnOrder, winnerId);
    g.currentTurnIndex = 0;

    if (g.tasks.every((t) => t.done)) {
      this.state = 'result';
      g.result = { outcome: 'won' };
    } else if (g.tricksPlayed >= g.totalTricks) {
      this.state = 'result';
      g.result = { outcome: 'lost', reason: 'Toutes les cartes ont été jouées sans finir les missions.' };
    }
  }

  backToLobby() {
    this.state = 'lobby';
    this.game = null;
    for (const p of this.players) p.ready = false;
  }

  kick(targetId) {
    this.removePlayer(targetId);
    if (this.state === 'playing' && this.game) {
      this.state = 'result';
      this.game.result = { outcome: 'lost', reason: 'Un·e joueur·se a quitté la partie.' };
    }
  }

  publicState(forPlayerId) {
    const g = this.game;
    return {
      roomId: this.id,
      state: this.state,
      mode: this.mode,
      missionId: this.missionId,
      hostId: this.hostId,
      players: this.players,
      minPlayers: MIN_PLAYERS,
      maxPlayers: MAX_PLAYERS,
      hand: g?.hands?.[forPlayerId] ?? [],
      handCounts: g ? Object.fromEntries(Object.entries(g.hands).map(([id, h]) => [id, h.length])) : {},
      commanderId: g?.commanderId ?? null,
      tasks: g?.tasks ?? [],
      signals: g?.signals ?? {},
      signalsUsed: g?.signalsUsed ?? {},
      commTokens: g?.mission?.commTokens ?? 1,
      currentTrick: g?.currentTrick ?? [],
      trickLeaderId: g?.trickLeaderId ?? null,
      currentPlayerId: this.currentPlayerId,
      tricksPlayed: g?.tricksPlayed ?? 0,
      totalTricks: g?.totalTricks ?? 0,
      result: g?.result ?? null,
      mission: g?.mission ?? null,
    };
  }
}

module.exports = { CrewRoom, MIN_PLAYERS, MAX_PLAYERS };
