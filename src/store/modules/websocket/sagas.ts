import {all, takeLatest, call, put, take, select} from 'redux-saga/effects';
import {eventChannel, END} from 'redux-saga';

import {
  wsChatSubscribe,
  wsCloseChatChannel,
  wsChatMessage,
  wsSendChatMessageRequest,
  WsActions,
} from './actions';
import {RootStateProps} from '../rootReducer';
import websocket from '../../../services/websocket';
import {formatChatName} from '../../../lib/utils';
import {MessageProps} from '../../../utils/types';
import {sendMessageSuccess} from '../messages/actions';

export interface WsSendMessageResponse {
  message: string;
  statusCode: number;
  payload: MessageProps;
}

function* watchChat(socket: typeof websocket.client, roomName: string) {
  const {user} = yield select((state: RootStateProps) => state.auth);

  return eventChannel((emitter) => {
    socket.on(roomName, async (response: MessageProps) => {
      return emitter(wsChatMessage(response, user.id));
    });

    socket.on(
      `${roomName}:${user.id}sended`,
      async (response: WsSendMessageResponse) => {
        if (response.statusCode === 201) {
          return emitter(sendMessageSuccess(response.payload));
        }
      },
    );

    return () => {
      socket.off(roomName);
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
  takeLatest('@ws/CLOSE_CHAT_CHANNEL', closeChatChannel),
  takeLatest('@ws/CHAT_SUBSCRIBE', subscribeChat),
]);
