import {all, takeLatest, call, put, take, select} from 'redux-saga/effects';
import {eventChannel, END} from 'redux-saga';

import {
  wsChatSubscribe,
  wsCloseChatChannel,
  wsChatMessage,
  wsSendChatMessageRequest,
  WsActions,
  wsChatBegin,
  wsChatFininsh,
  wsSendChatMessageSuccess,
} from './actions';
import {RootStateProps} from '../rootReducer';
import websocket from '../../../providers/websocket';
import {formatChatName} from '../../../lib/utils';
import {Subscription, ChatMessage} from '../../../utils/types';
import {getSubscriptionSuccess} from '../subscription/actions';

export interface WsSendChatMessageResponse {
  message: string;
  statusCode: number;
  payload: ChatMessage;
}

function* watchChat(socket: typeof websocket.client, roomName: string) {
  const {user} = yield select((state: RootStateProps) => state.auth);

  return eventChannel((emitter) => {
    socket.on(roomName, async (response: ChatMessage) => {
      return emitter(wsChatMessage(response, user.id));
    });

    socket.on(
      `${roomName}:${user.id}sended`,
      async (response: WsSendChatMessageResponse) => {
        if (response.statusCode === 201) {
          return emitter(wsSendChatMessageSuccess(response.payload));
        }
      },
    );

    socket.on(`${roomName}:begin`, async (response: ChatMessage) => {
      return emitter(wsChatBegin(response));
    });

    socket.on(`${roomName}:end`, async (response: ChatMessage) => {
      return emitter(wsChatFininsh(response));
    });

    return () => {
      socket.off(roomName);
      return emitter(END);
    };
  });
}

function* watchSubscription(socket: typeof websocket.client) {
  return eventChannel((emitter) => {
    socket.on('subscription-updates', (payload: Subscription) => {
      return emitter(getSubscriptionSuccess(payload));
    });

    return () => {
      socket.off('subscription-updates');
      return emitter(END);
    };
  });
}

export function* subscribeChat({payload}: ReturnType<typeof wsChatSubscribe>) {
  const {ownerId, targetId} = payload;
  const client = websocket.client;
  client.emit('joinChat', {ownerId, userId: targetId});
  const chatChannel = yield call(
    watchChat,
    client,
    formatChatName(targetId, ownerId),
  );

  while (true) {
    try {
      const chatAction = yield take(chatChannel);
      yield put(chatAction);
    } catch (error) {
      console.error(error);
    }
  }
}

export function* subscribeSubscriptions() {
  const client = websocket.client;
  const subscriptionChannel = yield call(watchSubscription, client);

  while (true) {
    try {
      const subscriptionAction = yield take(subscriptionChannel);
      yield put(subscriptionAction);
    } catch (error) {
      console.error(error);
    }
  }
}

export function* sendChatMessage({
  payload,
}: ReturnType<typeof wsSendChatMessageRequest>) {
  const {message, receiver} = payload.messagePayload;
  const client = websocket.client;
  client.emit('sendChat', {receiver, message});
}

export function* closeChatChannel({
  payload,
}: ReturnType<typeof wsCloseChatChannel>) {
  const {ownerId, targetId} = payload;

  const client = websocket.client;
  client.emit('leaveChat', {ownerId, userId: targetId});
  client.off(formatChatName(targetId, ownerId));
}

export default all([
  takeLatest(WsActions.SEND_CHAT_MESSAGE_REQUEST, sendChatMessage),
  takeLatest(WsActions.CLOSE_CHAT_CHANNEL, closeChatChannel),
  takeLatest(WsActions.CHAT_SUBSCRIBE, subscribeChat),
  takeLatest(WsActions.LISTEN_SUBSCRIPTIONS, subscribeSubscriptions),
]);
