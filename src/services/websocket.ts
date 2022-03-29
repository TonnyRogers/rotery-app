import io, {Socket} from 'socket.io-client';
import {apiBaseUrl} from './api';

const wsConnectionType = __DEV__ ? 'ws://' : 'wss://';

export type SocketClient = Socket;

class WebSocket {
  private socket!: SocketClient;

  public init(userId: number, token: string): SocketClient {
    if (!this.socket) {
      this.socket = io(`${wsConnectionType}${apiBaseUrl}`, {
        query: {
          userId: String(userId),
        },
        extraHeaders: {
          authorization: token,
        },
        secure: true,
        autoConnect: true,
        timeout: 3000,
        transports: ['websocket'],
        reconnectionDelay: 5000,
      });
    }

    return this.socket;
  }

  public set client(newSocket: SocketClient) {
    this.socket = newSocket;
  }

  public get client() {
    return this.socket;
  }

  public kill() {
    if (this.socket) {
      this.socket.disconnect();
    }
  }
}

export default new WebSocket();
