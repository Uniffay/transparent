'use client';

import { useCallback, useEffect, useState } from 'react';
import { crewSocket } from '@/lib/crewSocket';
import { CrewCard, CrewGameState, CrewRoomUpdate } from '@/lib/crewTypes';
import CrewHome from './CrewHome';
import CrewLobby from './CrewLobby';
import CrewGameScreen from './CrewGameScreen';

type Screen = 'home' | 'lobby' | 'game';

export default function CrewApp() {
  const [screen, setScreen] = useState<Screen>('home');
  const [myId, setMyId] = useState('');
  const [roomData, setRoomData] = useState<CrewRoomUpdate | null>(null);
  const [gameState, setGameState] = useState<CrewGameState | null>(null);
  const [error, setError] = useState('');

  useEffect(() => {
    crewSocket.on('connect', () => setMyId(crewSocket.id ?? ''));
    crewSocket.on('joined', ({ roomId }: { roomId: string }) => {
      sessionStorage.setItem('crew-room', roomId);
      setError('');
    });
    crewSocket.on('room-update', (data: CrewRoomUpdate) => {
      setRoomData(data);
      setScreen('lobby');
    });
    crewSocket.on('game-state', (data: CrewGameState) => {
      setGameState(data);
      setScreen('game');
    });
    crewSocket.on('error', ({ message }: { message: string }) => setError(message));
    crewSocket.on('kicked', () => quit());
    crewSocket.on('room-terminated', () => quit());

    return () => {
      crewSocket.off('connect').off('joined').off('room-update').off('game-state').off('error').off('kicked').off('room-terminated');
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Auto-rejoin on refresh
  useEffect(() => {
    const savedRoom = sessionStorage.getItem('crew-room');
    const savedName = sessionStorage.getItem('crew-name');
    const savedEmoji = localStorage.getItem('crew-emoji') ?? '🚀';
    if (savedRoom && savedName) {
      crewSocket.connect();
      crewSocket.emit('join-room', { roomId: savedRoom, name: savedName, emoji: savedEmoji });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const quit = useCallback(() => {
    sessionStorage.removeItem('crew-room');
    sessionStorage.removeItem('crew-name');
    crewSocket.disconnect();
    setScreen('home');
    setRoomData(null);
    setGameState(null);
    setError('');
  }, []);

  const createRoom = useCallback((name: string, emoji: string) => {
    localStorage.setItem('crew-emoji', emoji);
    sessionStorage.setItem('crew-name', name);
    crewSocket.connect();
    crewSocket.emit('create-room', {}, ({ roomId }: { roomId: string }) => {
      crewSocket.emit('join-room', { roomId, name, emoji });
    });
  }, []);

  const joinRoom = useCallback((roomId: string, name: string, emoji: string) => {
    localStorage.setItem('crew-emoji', emoji);
    sessionStorage.setItem('crew-name', name);
    crewSocket.connect();
    crewSocket.emit('join-room', { roomId: roomId.toUpperCase(), name, emoji });
  }, []);

  const setReady = useCallback((ready: boolean) => crewSocket.emit('set-ready', { ready }), []);
  const setMode = useCallback((mode: 'base' | 'extension') => crewSocket.emit('set-mode', { mode }), []);
  const setMission = useCallback((missionId: string) => crewSocket.emit('set-mission', { missionId }), []);
  const kickPlayer = useCallback((targetId: string) => crewSocket.emit('kick-player', { targetId }), []);
  const playCard = useCallback((card: CrewCard) => crewSocket.emit('play-card', { card }), []);
  const sendSignal = useCallback((card: CrewCard) => crewSocket.emit('send-signal', { card }), []);
  const hostAction = useCallback((action: 'restart' | 'terminate') => crewSocket.emit('host-action', { action }), []);
  const leaveRoom = useCallback(() => {
    crewSocket.emit('leave-room');
    quit();
  }, [quit]);

  if (screen === 'home' || !roomData) {
    return <CrewHome onCreate={createRoom} onJoin={joinRoom} error={error} />;
  }

  if (screen === 'lobby' || !gameState) {
    return (
      <CrewLobby
        roomData={roomData}
        myId={myId}
        onSetMode={setMode}
        onSetMission={setMission}
        onSetReady={setReady}
        onKick={kickPlayer}
        onQuit={leaveRoom}
        error={error}
      />
    );
  }

  return (
    <CrewGameScreen
      gameState={gameState}
      myId={myId}
      onPlayCard={playCard}
      onSendSignal={sendSignal}
      onKick={kickPlayer}
      onHostAction={hostAction}
      onLeave={leaveRoom}
      error={error}
    />
  );
}
