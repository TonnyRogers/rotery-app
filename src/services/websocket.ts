import io, {Socket} from 'socket.io-client';

const wsConnection = __DEV__
  ? 'http://127.0.0.1:3333'
  : 'https://api.rotery.com.br';

export type SocketClient = Socket;

class WebSocket {
  private socket!: SocketClient;

  public init(userId: number, token: string): SocketClient {
    if (!this.socket) {
      this.socket = io(wsConnection, {
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
