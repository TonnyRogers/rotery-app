import {all, takeLatest, call, put, take, select} from 'redux-saga/effects';
import {eventChannel, END} from 'redux-saga';
import {Alert} from 'react-native';
import ws from '../../../services/websocket';

import {wsNotificationMessages} from './actions';

export function* subscribeUser() {
  return eventChannel((emitter) => {
    ws.connect();
    const channel =
      ws.getSubscription('notifications:1') || ws.subscribe('notifications:1');

    channel.on('ready', () => {
      channel.emit('message', 'connecting to channel');
    });

    channel.on('notify:message', async () => {
      return emitter(wsNotificationMessages());
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

export function* subscribeChat() {
  return eventChannel((emitter) => {
    ws.connect();
    const channel = ws.getSubscription('chat:1') || ws.subscribe('chat:1');

    channel.on('ready', () => {
      channel.emit('message', 'connecting to channel');
    });

    channel.on('cast', (data) => {
      Alert.alert(`cast:${data}`);
    });

    channel.on('newMessage', async () => {
      return emitter(wsNotificationMessages());
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

export function* closeUserChanel() {
  // const {user} = yield select((state) => state.auth);

  const channel = ws.getSubscription('chat:1');
  const notifications = ws.getSubscription('notifications:1');

  if (channel) {
    channel.close();
  }

  if (notifications) {
    notifications.close();
    ws.close();
  }
}

export function* watchUserSbuscription() {
  const channel = yield call(subscribeUser);

  while (true) {
    const action = yield take(channel);
    yield put(action);
  }
}

export default all([
  takeLatest('@auth/LOGOUT', closeUserChanel),
  takeLatest('@auth/LOGIN_SUCCESS', watchUserSbuscription),
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
