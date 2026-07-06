const { createDeck, deal, findCommander, SUITS } = require('./crewDeck');
const { getMission } = require('./crewMissions');
const { drawExtensionTasks, evaluateOnTrick, evaluateOnEnd } = require('./crewTasks');

const MIN_PLAYERS = 3;
const MAX_PLAYERS = 5;

function rotateToStart(arr, startId) {
  const idx = arr.indexOf(startId);
  if (idx === -1) return [...arr];
  return [...arr.slice(idx), ...arr.slice(0, idx)];
}

function shuffleArr(arr) {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

// Tire N cartes-cibles distinctes (couleur+valeur) pour les tâches simples du jeu de base.
function drawBaseTaskCards(n) {
  const pool = [];
  for (const suit of SUITS) for (let value = 1; value <= 9; value++) pool.push({ suit, value });
  return shuffleArr(pool).slice(0, n);
}

class CrewRoom {
  constructor(id) {
    this.id = id;
    this.players = []; // [{ id, name, emoji, ready }]
    this.state = 'lobby'; // lobby | task-select | predict | playing | result
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

  // ── Démarrage d'une mission : distribution + tirage des tâches ────────────
  start() {
    if (this.players.length < MIN_PLAYERS || this.players.length > MAX_PLAYERS) {
      return { error: { message: `The Crew se joue de ${MIN_PLAYERS} à ${MAX_PLAYERS} joueurs.` } };
    }
    const mission = getMission(this.mode, this.missionId);
    if (!mission) return { error: { message: 'Mission invalide.' } };

    const playerIds = this.players.map((p) => p.id);
    const deck = createDeck();
    const hands = deal(playerIds, deck);
    const commanderId = findCommander(hands);
    const totalTricks = Math.min(...playerIds.map((id) => hands[id].length));

    let tasks;
    if (this.mode === 'extension') {
      tasks = drawExtensionTasks(mission.difficulty, this.players.length);
    } else {
      const cards = drawBaseTaskCards(mission.taskCount);
      tasks = cards.map((card, i) => ({
        id: `b${i}`,
        kind: 'WIN_CARD',
        params: { suit: card.suit, value: card.value },
        difficulty: 1,
        desc: `Je dois gagner la carte ${card.suit} ${card.value}.`,
        order: mission.ordered ? i + 1 : null,
        forbidCaptain: false,
        needsPrediction: false,
        assignee: null,
        done: false,
      }));
    }

    const selectionOrder = rotateToStart(playerIds, commanderId);

    this.game = {
      mission,
      hands,
      commanderId,
      tasks,
      selectionOrder,
      selectionPos: 0,
      passingAllowed: tasks.length < playerIds.length,
      signals: {}, // playerId -> { card, type }
      signalsUsed: {},
      currentTrick: [],
      trickLeaderId: commanderId,
      turnOrder: selectionOrder,
      currentTurnIndex: 0,
      tricksPlayed: 0,
      totalTricks,
      result: null,
      stats: null,
    };
    this.state = tasks.length > 0 ? 'task-select' : 'playing';
    if (this.state === 'playing') this._initStats();
    return {};
  }

  _initStats() {
    const playerIds = this.players.map((p) => p.id);
    const stats = {
      wonCardsByPlayer: {},
      tricksWonByPlayer: {},
      currentStreak: {},
      trickWinners: [],
      openedSuitsByPlayer: {},
      commanderId: this.game.commanderId,
      totalTricks: this.game.totalTricks,
    };
    for (const id of playerIds) {
      stats.wonCardsByPlayer[id] = [];
      stats.tricksWonByPlayer[id] = 0;
      stats.currentStreak[id] = 0;
      stats.openedSuitsByPlayer[id] = new Set();
    }
    this.game.stats = stats;
  }

  get currentChooserId() {
    const g = this.game;
    if (!g || g.selectionOrder.length === 0) return null;
    return g.selectionOrder[g.selectionPos % g.selectionOrder.length];
  }

  canPassNow(playerId) {
    const g = this.game;
    if (!g || this.state !== 'task-select') return false;
    if (this.currentChooserId !== playerId) return false;
    if (!g.passingAllowed) return false;
    if (g.selectionPos >= g.selectionOrder.length) return false;
    const remainingTasks = g.tasks.filter((t) => !t.assignee).length;
    const remainingActorsAfterThis = g.selectionOrder.length - g.selectionPos - 1;
    return remainingTasks <= remainingActorsAfterThis;
  }

  chooseTask(playerId, taskId) {
    const g = this.game;
    if (!g || this.state !== 'task-select') return { error: { message: 'Pas de sélection de tâche en cours.' } };
    if (this.currentChooserId !== playerId) return { error: { message: "Ce n'est pas ton tour de choisir." } };
    const task = g.tasks.find((t) => t.id === taskId);
    if (!task || task.assignee) return { error: { message: 'Tâche invalide.' } };
    if (task.forbidCaptain && playerId === g.commanderId) {
      return { error: { message: 'Le capitaine ne peut pas prendre cette tâche.' } };
    }
    task.assignee = playerId;
    g.selectionPos += 1;
    this._afterSelectionStep();
    return {};
  }

  passTask(playerId) {
    const g = this.game;
    if (!this.canPassNow(playerId)) return { error: { message: 'Impossible de passer maintenant.' } };
    g.selectionPos += 1;
    this._afterSelectionStep();
    return {};
  }

  _afterSelectionStep() {
    const g = this.game;
    if (g.tasks.every((t) => t.assignee)) {
      const needsPrediction = g.tasks.filter((t) => t.needsPrediction && t.params.predicted === undefined);
      if (needsPrediction.length > 0) {
        this.state = 'predict';
      } else {
        this.state = 'playing';
        this._initStats();
      }
    }
  }

  setPrediction(playerId, taskId, value) {
    const g = this.game;
    if (!g || this.state !== 'predict') return { error: { message: 'Pas de prédiction attendue.' } };
    const task = g.tasks.find((t) => t.id === taskId);
    if (!task || task.assignee !== playerId || !task.needsPrediction) return { error: { message: 'Tâche invalide.' } };
    if (task.params.predicted !== undefined) return { error: { message: 'Prédiction déjà faite.' } };
    if (!Number.isInteger(value) || value < 0 || value > g.totalTricks) return { error: { message: 'Valeur invalide.' } };
    task.params.predicted = value;
    task.desc = `${task.desc} (prédiction : ${value})`;
    const stillPending = g.tasks.some((t) => t.needsPrediction && t.params.predicted === undefined);
    if (!stillPending) {
      this.state = 'playing';
      this._initStats();
    }
    return {};
  }

  get currentPlayerId() {
    if (!this.game) return null;
    return this.game.turnOrder[this.game.currentTurnIndex];
  }

  // ── Signal (communication) — une fois par joueur et par mission ───────────
  sendSignal(playerId, card) {
    const g = this.game;
    if (!g || this.state !== 'playing') return { error: { message: 'Pas de partie en cours.' } };
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
    const s = g.stats;
    const ledSuit = g.currentTrick[0].card.suit;
    const openerId = g.currentTrick[0].playerId;
    const rockets = g.currentTrick.filter((play) => play.card.suit === 'rocket');
    let winningPlay;
    if (rockets.length > 0) {
      winningPlay = rockets.reduce((best, p) => (p.card.value > best.card.value ? p : best));
    } else {
      const ledPlays = g.currentTrick.filter((play) => play.card.suit === ledSuit);
      winningPlay = ledPlays.reduce((best, p) => (p.card.value > best.card.value ? p : best));
    }
    const winnerId = winningPlay.playerId;
    const hasRocket = rockets.length > 0;
    const valueSum = g.currentTrick.filter((p) => p.card.suit !== 'rocket').reduce((sum, p) => sum + p.card.value, 0);

    // Mise à jour des statistiques
    for (const p of this.players) {
      s.currentStreak[p.id] = p.id === winnerId ? s.currentStreak[p.id] + 1 : 0;
    }
    s.wonCardsByPlayer[winnerId].push(...g.currentTrick.map((p) => p.card));
    s.tricksWonByPlayer[winnerId] += 1;
    s.trickWinners.push(winnerId);
    s.openedSuitsByPlayer[openerId]?.add(ledSuit);

    const trickInfo = {
      index: g.tricksPlayed,
      winnerId,
      plays: g.currentTrick,
      ledSuit,
      openerId,
      hasRocket,
      valueSum,
    };

    if (this.mode === 'extension') {
      for (const task of g.tasks) {
        if (task.done) continue;
        const res = evaluateOnTrick(task, s, trickInfo, task.assignee);
        if (res === 'failed') {
          this.state = 'result';
          g.result = { outcome: 'lost', reason: task.desc };
          return;
        }
        if (res === 'done') task.done = true;
      }
    } else {
      for (const play of g.currentTrick) {
        const task = g.tasks.find((t) => t.params.suit === play.card.suit && t.params.value === play.card.value);
        if (!task || task.done) continue;
        if (task.assignee !== winnerId) {
          this.state = 'result';
          g.result = { outcome: 'lost', reason: task.desc };
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
    }

    if (g.tasks.every((t) => t.done)) {
      this.state = 'result';
      g.result = { outcome: 'won' };
      return;
    }

    g.tricksPlayed += 1;
    g.currentTrick = [];
    g.trickLeaderId = winnerId;
    g.turnOrder = rotateToStart(g.turnOrder, winnerId);
    g.currentTurnIndex = 0;

    if (g.tricksPlayed >= g.totalTricks) {
      let failReason = null;
      for (const task of g.tasks) {
        if (task.done) continue;
        const res = this.mode === 'extension' ? evaluateOnEnd(task, s, task.assignee) : 'failed';
        if (res === 'done') task.done = true;
        else if (!failReason) failReason = task.desc;
      }
      this.state = 'result';
      g.result = g.tasks.every((t) => t.done) ? { outcome: 'won' } : { outcome: 'lost', reason: failReason ?? 'Missions non terminées.' };
    }
  }

  backToLobby() {
    this.state = 'lobby';
    this.game = null;
    for (const p of this.players) p.ready = false;
  }

  kick(targetId) {
    this.removePlayer(targetId);
    if ((this.state === 'playing' || this.state === 'task-select' || this.state === 'predict') && this.game) {
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
      currentChooserId: this.currentChooserId,
      canPass: g && forPlayerId ? this.canPassNow(forPlayerId) : false,
      myPendingPredictionTaskIds: g ? g.tasks.filter((t) => t.needsPrediction && t.assignee === forPlayerId && t.params.predicted === undefined).map((t) => t.id) : [],
      signals: g?.signals ?? {},
      signalsUsed: g?.signalsUsed ?? {},
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
