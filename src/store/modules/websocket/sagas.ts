import {all, takeLatest, call, put, take, select} from 'redux-saga/effects';
import {eventChannel, END} from 'redux-saga';
import {Alert, Vibration} from 'react-native';
import Ws from '@adonisjs/websocket-client';

const protocol = __DEV__ ? 'ws' : 'wss';

import {
  wsNotificationMessages,
  wsChatSubscribe,
  wsCloseChatChannel,
} from './actions';
import {getConversationRequest} from '../messages/actions';
import {RootStateProps} from '../rootReducer';

let isConnected: boolean = false;
let chatConnection: boolean = false;
let notificationConnection: boolean = false;
let ws: any;

export function* subscribeUser() {
  const {user} = yield select((state: RootStateProps) => state.auth);

  return eventChannel((emitter) => {
    let channel: any;

    function initWebsocket() {
      if (!isConnected) {
        console.tron.log('Connection to ws');
        ws = Ws(`${protocol}://localhost:3333`, {reconnection: false});
        ws.connect();
        isConnected = true;
      }

      if (notificationConnection) {
        console.tron.log('Reconnection to notifications');
        channel = ws.getSubscription(`notifications:${user.id}`);
      } else {
        console.tron.log('Connection to notifications');
        channel = ws.subscribe(`notifications:${user.id}`);
      }

      channel.on('ready', () => {
        notificationConnection = true;
        channel.emit('message', 'connecting to channel');
      });

      channel.on('notify:message', async () => {
        Vibration.vibrate(200);
        return emitter(wsNotificationMessages());
      });

      channel.on('notify:requestConnection', async () => {
        return emitter(wsNotificationMessages());
      });

      channel.on('notify:connectionAccepted', async () => {
        Vibration.vibrate(200);
        return emitter(wsNotificationMessages());
      });

      channel.on('notify:newQuestion', async () => {
        Vibration.vibrate(200);
        return emitter(wsNotificationMessages());
      });

      channel.on('notify:newAnswer', async () => {
        Vibration.vibrate(200);
        return emitter(wsNotificationMessages());
      });

      channel.on('notify:newMember', async () => {
        Vibration.vibrate(200);
        return emitter(wsNotificationMessages());
      });

      channel.on('notify:memberAccepted', async () => {
        Vibration.vibrate(200);
        return emitter(wsNotificationMessages());
      });

      channel.on('notify:memberRejected', async () => {
        Vibration.vibrate(200);
        return emitter(wsNotificationMessages());
      });

      channel.on('notify:itineraryDeleted', async () => {
        Vibration.vibrate(200);
        return emitter(wsNotificationMessages());
      });

      channel.on('notify:itineraryRate', async () => {
        Vibration.vibrate(200);
        return emitter(wsNotificationMessages());
      });

      channel.on('error', () => {
        console.tron.log('Erro');
      });

      channel.on('close', (e: any) => {
        notificationConnection = false;
        console.tron.log('Close Notifications', e);
      });

      ws.on('close', (e: any) => {
        if (e._connectionState === 'terminated') {
          console.tron.log('Websocket terminated');
          return emitter(END);
        } else {
          console.tron.log('Websocket closed');
          isConnected = false;
          setTimeout(() => {
            initWebsocket();
          }, 10 * 1000);
        }
      });
    }
    initWebsocket();

    return () => {
      console.tron.log('Clear:Channel closed');
      channel.close();
    };
  });
}

export function* subscribeChat(ownerId: number, targetId: number) {
  return eventChannel((emitter) => {
    const channel =
      ws.getSubscription(`chat:${ownerId}on${targetId}`) ||
      ws.subscribe(`chat:${ownerId}on${targetId}`);

    channel.on('ready', () => {
      chatConnection = true;
      channel.emit('message', 'connecting to channel');
    });

    channel.on('chat:new', (data: number) => {
      return emitter(getConversationRequest(data));
    });

    channel.on('error', () => {
      Alert.alert('Erro');
    });

    channel.on('close', () => {
      chatConnection = false;
      Alert.alert('Close');
    });

    return () => {};
  });
}

export function* closeChatChannel({
  payload,
}: ReturnType<typeof wsCloseChatChannel>) {
  const {ownerId, targetId} = payload;
  const channel = ws.getSubscription(`chat:${ownerId}on${targetId}`);

  if (channel && chatConnection) {
    channel.close();
  }
}

export function* closeNotificationChanel() {
  const {user} = yield select((state: RootStateProps) => state.auth);
  const notifications = ws.getSubscription(`notifications:${user.id}`);

  if (notifications && notificationConnection) {
    notifications.close();
  }

  if (isConnected) {
    ws.close();
  }
}

export function* watchNotificationSbuscription() {
  const channel = yield call(subscribeUser);

  while (true) {
    const action = yield take(channel);
    yield put(action);
  }
}

export function* watchChatSbuscription({
  payload,
}: ReturnType<typeof wsChatSubscribe>) {
  const {ownerId, targetId} = payload;
  const chat = yield call(subscribeChat, ownerId, targetId);

  while (true) {
    const action = yield take(chat);
    yield put(action);
  }
}

export default all([
  takeLatest('@ws/CLOSE_CHAT_CHANNEL', closeChatChannel),
  takeLatest('@ws/CHAT_SUBSCRIBE', watchChatSbuscription),
  takeLatest('@auth/LOGOUT', closeNotificationChanel),
  takeLatest('@auth/LOGIN_SUCCESS', watchNotificationSbuscription),
  takeLatest('@ws/SUBSCRIBE_USER_TO_NOTIFICATIONS', subscribeUser),
]);
