import Ws from '@adonisjs/websocket-client';

const protocol = __DEV__ ? 'ws' : 'wss';
const ws = Ws(`${protocol}://localhost:3333`);

ws.connect();

export default ws;
