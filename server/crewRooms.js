const { CrewRoom } = require('./crewRoom');

const rooms = new Map();

function getOrCreateRoom(id) {
  if (!rooms.has(id)) rooms.set(id, new CrewRoom(id));
  return rooms.get(id);
}

function deleteRoom(id) {
  rooms.delete(id);
}

function makeRoomCode() {
  const chars = 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789';
  let code;
  do {
    code = Array.from({ length: 5 }, () => chars[Math.floor(Math.random() * chars.length)]).join('');
  } while (rooms.has(code));
  return code;
}

function registerCrewSocket(io) {
  const nsp = io.of('/crew');

  nsp.on('connection', (socket) => {
    let currentRoom = null;

    function broadcastRoom(roomId) {
      const room = getOrCreateRoom(roomId);
      nsp.to(roomId).emit('room-update', {
        roomId,
        state: room.state,
        mode: room.mode,
        missionId: room.missionId,
        hostId: room.hostId,
        players: room.players,
        minPlayers: 3,
        maxPlayers: 5,
      });
    }

    function broadcastGame(roomId) {
      const room = getOrCreateRoom(roomId);
      for (const p of room.players) {
        const s = nsp.sockets.get(p.id);
        if (s) s.emit('game-state', room.publicState(p.id));
      }
    }

    function broadcast(roomId) {
      const room = getOrCreateRoom(roomId);
      if (room.state === 'lobby') broadcastRoom(roomId);
      else broadcastGame(roomId);
    }

    socket.on('create-room', (_, cb) => {
      const roomId = makeRoomCode();
      cb?.({ roomId });
    });

    socket.on('join-room', ({ roomId, name, emoji }) => {
      if (!roomId || !name?.trim()) return;
      const rid = roomId.toUpperCase();
      const room = getOrCreateRoom(rid);
      if (!room.addPlayer(socket.id, name.trim(), emoji)) {
        socket.emit('error', { message: 'Impossible de rejoindre cette salle (pleine, ou partie en cours).' });
        return;
      }
      currentRoom = rid;
      socket.join(rid);
      socket.emit('joined', { roomId: rid });
      broadcast(rid);
    });

    socket.on('set-ready', ({ ready }) => {
      if (!currentRoom) return;
      const room = getOrCreateRoom(currentRoom);
      room.setReady(socket.id, ready);
      if (room.allReady()) {
        const res = room.start();
        if (res.error) { socket.emit('error', res.error); return; }
        broadcastGame(currentRoom);
      } else {
        broadcastRoom(currentRoom);
      }
    });

    socket.on('set-mode', ({ mode }) => {
      if (!currentRoom) return;
      const room = getOrCreateRoom(currentRoom);
      if (room.hostId !== socket.id) return;
      room.setMode(mode);
      broadcastRoom(currentRoom);
    });

    socket.on('set-mission', ({ missionId }) => {
      if (!currentRoom) return;
      const room = getOrCreateRoom(currentRoom);
      if (room.hostId !== socket.id) return;
      room.setMission(missionId);
      broadcastRoom(currentRoom);
    });

    socket.on('update-emoji', ({ emoji }) => {
      if (!currentRoom) return;
      const room = getOrCreateRoom(currentRoom);
      const p = room.players.find((pl) => pl.id === socket.id);
      if (!p) return;
      p.emoji = emoji;
      broadcast(currentRoom);
    });

    socket.on('choose-task', ({ taskId }) => {
      if (!currentRoom) return;
      const room = getOrCreateRoom(currentRoom);
      const res = room.chooseTask(socket.id, taskId);
      if (res?.error) { socket.emit('error', res.error); return; }
      broadcastGame(currentRoom);
    });

    socket.on('pass-task', () => {
      if (!currentRoom) return;
      const room = getOrCreateRoom(currentRoom);
      const res = room.passTask(socket.id);
      if (res?.error) { socket.emit('error', res.error); return; }
      broadcastGame(currentRoom);
    });

    socket.on('set-prediction', ({ taskId, value }) => {
      if (!currentRoom) return;
      const room = getOrCreateRoom(currentRoom);
      const res = room.setPrediction(socket.id, taskId, value);
      if (res?.error) { socket.emit('error', res.error); return; }
      broadcastGame(currentRoom);
    });

    socket.on('play-card', ({ card }) => {
      if (!currentRoom) return;
      const room = getOrCreateRoom(currentRoom);
      const res = room.playCard(socket.id, card);
      if (res?.error) { socket.emit('error', res.error); return; }
      broadcastGame(currentRoom);
    });

    socket.on('send-signal', ({ card }) => {
      if (!currentRoom) return;
      const room = getOrCreateRoom(currentRoom);
      const res = room.sendSignal(socket.id, card);
      if (res?.error) { socket.emit('error', res.error); return; }
      broadcastGame(currentRoom);
    });

    socket.on('host-action', ({ action }) => {
      if (!currentRoom) return;
      const room = getOrCreateRoom(currentRoom);
      if (room.hostId !== socket.id) return;
      if (action === 'restart') {
        room.backToLobby();
        broadcastRoom(currentRoom);
      } else if (action === 'terminate') {
        nsp.to(currentRoom).emit('room-terminated');
        deleteRoom(currentRoom);
      }
    });

    socket.on('kick-player', ({ targetId }) => {
      if (!currentRoom) return;
      const room = getOrCreateRoom(currentRoom);
      if (room.hostId !== socket.id || targetId === socket.id) return;
      room.kick(targetId);
      const targetSocket = nsp.sockets.get(targetId);
      targetSocket?.emit('kicked');
      targetSocket?.leave(currentRoom);
      broadcast(currentRoom);
    });

    socket.on('leave-room', () => {
      if (!currentRoom) return;
      const room = getOrCreateRoom(currentRoom);
      room.kick(socket.id);
      socket.leave(currentRoom);
      if (room.players.length === 0) deleteRoom(currentRoom);
      else broadcast(currentRoom);
      currentRoom = null;
    });

    socket.on('disconnect', () => {
      if (!currentRoom) return;
      const room = getOrCreateRoom(currentRoom);
      room.kick(socket.id);
      if (room.players.length === 0) deleteRoom(currentRoom);
      else broadcast(currentRoom);
    });
  });
}

module.exports = { registerCrewSocket, getOrCreateRoom, deleteRoom };
