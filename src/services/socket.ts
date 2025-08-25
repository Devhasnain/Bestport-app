import { io, Socket } from 'socket.io-client';
import { socketUrl } from '@api/index';
import { store } from '@store/index';


let socket: Socket | null = null;


export const connectSocket = () => {
    if (!socket) {
        socket = io(socketUrl, {
            autoConnect: false,
            auth: { token: store.getState()?.auth?.token },
            query: { token: store.getState()?.auth?.token },
            withCredentials: true,
            transports: ["websocket"],
            extraHeaders:{
                "access-key": "12345"
            }
        });
    }
    return socket;
};

export const getSocket = () => {
    if (!socket) {
        socket = connectSocket();
    } else {
        return socket
    }
};