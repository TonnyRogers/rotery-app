import {all, takeLatest, call, put, take, select} from 'redux-saga/effects';
import {eventChannel, END} from 'redux-saga';
import {Alert, Vibration} from 'react-native';
import ws from '../../../services/websocket';

import {
  wsNotificationMessages,
  wsChatSubscribe,
  wsCloseChatChannel,
} from './actions';
import {getConversationRequest} from '../messages/actions';
import {RootStateProps} from '../rootReducer';

export function* subscribeUser() {
  const {user} = yield select((state: RootStateProps) => state.auth);
  return eventChannel((emitter) => {
    function initWebsocket() {
      ws.connect();

      const channel =
        ws.getSubscription(`notifications:${user.id}`) ||
        ws.subscribe(`notifications:${user.id}`);

      channel.on('ready', () => {
        channel.emit('message', 'connecting to channel');
      });

      channel.on('notify:message', async () => {
        Vibration.vibrate(200);
        return emitter(wsNotificationMessages());
      });

      channel.on('notify:requestConnection', async () => {
        Vibration.vibrate(200);
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
        Alert.alert('Erro');
      });

      channel.on('close', () => {
        Alert.alert('Close Notifications');
      });

      ws.on('close', (e: any) => {
        if (e._connectionState == 'terminated') {
          return emitter(END);
        } else {
          initWebsocket();
        }
        Alert.alert('Close Websocket');
      });
    }
    initWebsocket();

    return () => {
      ws.close();
    };
  });
}

export function* subscribeChat(ownerId: number, targetId: number) {
  return eventChannel((emitter) => {
    const channel =
      ws.getSubscription(`chat:${ownerId}on${targetId}`) ||
      ws.subscribe(`chat:${ownerId}on${targetId}`);

    channel.on('ready', () => {
      channel.emit('message', 'connecting to channel');
    });

    channel.on('chat:new', (data: number) => {
      return emitter(getConversationRequest(data));
    });

    channel.on('error', () => {
      Alert.alert('Erro');
    });

    channel.on('close', () => {
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

  if (channel) {
    channel.close();
  }
}

export function* closeNotificationChanel() {
  const {user} = yield select((state: RootStateProps) => state.auth);
  const notifications = ws.getSubscription(`notifications:${user.id}`);

  if (notifications) {
    notifications.close();
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
  takeLatest('WS_CLOSE_CHAT_CHANNEL', closeChatChannel),
  takeLatest('WS_CHAT_SUBSCRIBE', watchChatSbuscription),
  takeLatest('@auth/LOGOUT', closeNotificationChanel),
  takeLatest('@auth/LOGIN_SUCCESS', watchNotificationSbuscription),
]);

// function connect() {
//   return eventChannel(() => {
//     ws.connect();

//     return () => {
//       ws.close();
//     };
//   });
// }

// export function* subscribeUser() {
//   connect();
//   return eventChannel((emitter) => {
//     const chanel = ws.getSubscription('chat') || ws.subscribe('chat');

//     // chanel.on('logout', ({forced} = {forced: false}) => {
//     //   if (!forced) {
//     //     Alert.alert('Login realizado em outro navegador');
//     //   }

//     //   return emitter({type: 'SIGN_OUT'});
//     // });

//     chanel.on('ready', () => {
//       // chanel.emit('message', 'hello friends');
//     });

//     chanel.on('message', (message: any) => {
//       Alert.alert(message);
//       return emitter(showMessageSuccess(message));
//     });

//     return chanel.close();
//   });
// }
