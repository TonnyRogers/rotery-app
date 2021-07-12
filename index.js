/**
 * @format
 */

import {AppRegistry} from 'react-native';
import App from './src';
import {name as appName} from './app.json';
import firebase from '@react-native-firebase/app';

//   'Notification when app is in background ou terminated'
firebase.messaging().setBackgroundMessageHandler(async (remoteMessage) => {
  //   console.tron.log('Background: ', remoteMessage);
  //   Ex: utilizar o payload da notificação para atualizar o store
  //   evitando a necessidade de fazer um get para pegar novos dados
});

AppRegistry.registerComponent(appName, () => App);
