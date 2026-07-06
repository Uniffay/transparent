'use client';

import { io, Socket } from 'socket.io-client';

export const crewSocket: Socket = io('/crew', { path: '/socket.io', autoConnect: false });
