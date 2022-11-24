import {Middleware, MiddlewareAPI, Dispatch, AnyAction} from 'redux';
import {SocketClient, wsConnectionType} from '../providers/websocket';
import {RootState} from '../providers/store';
import {chatActions} from '../store2/chats';
import {WsSendChatMessageResponse} from '../store/modules/websocket/sagas';
import {ChatMessage} from '../utils/types';
import {formatChatName} from '../lib/utils';
import {io} from 'socket.io-client';
import {apiBaseUrl} from '../providers/api';

export const chatMiddleware: Middleware = (
  store: MiddlewareAPI<Dispatch<AnyAction>, RootState>,
) => {
  let socketClient: SocketClient;
  return (next) => (action: {payload: any; type: string}) => {
    const isConnectionEstablished = store.getState().chats.isConnected;
    const {user, token} = store.getState().auth;

    if (chatActions.startConnecting.match(action) && user && token) {
      const {ownerId, targetId} = action.payload;
      // socketClient = websocket.init(user.id, token);
      socketClient = io(`${wsConnectionType}${apiBaseUrl}`, {
        query: {
          userId: String(user.id),
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
      const roomName = formatChatName(targetId, ownerId);

      socketClient.emit('joinChat', {ownerId, userId: targetId});

      socketClient.on('connect', () => {
        store.dispatch(chatActions.connectionEstablished());
      });

      socketClient.on(roomName, async (response: ChatMessage) => {
        next(chatActions.setChatMessage(response));
      });

      socketClient.on(
        `${roomName}:${user.id}sended`,
        async (response: WsSendChatMessageResponse) => {
          if (response.statusCode === 201) {
            next(chatActions.setChatMessageSended(response.payload));
          }
        },
      );

      socketClient.on(`${roomName}:begin`, async (response: ChatMessage) => {
        next(chatActions.setChatMessageSended(response));
      });

      socketClient.on(`${roomName}:end`, async (response: ChatMessage) => {
        next(chatActions.setChatMessageSended(response));
      });
    }

    if (chatActions.sendChatMessage.match(action) && isConnectionEstablished) {
      socketClient.emit('sendChat', action.payload);
    }

    if (chatActions.endConnection.match(action) && isConnectionEstablished) {
      const {ownerId, targetId} = action.payload;
      socketClient.emit('leaveChat', {ownerId, userId: targetId});
      socketClient.off(formatChatName(targetId, ownerId));
      socketClient.disconnect();
    }

    next(action);
  };
};
