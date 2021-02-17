import 'react-native-gesture-handler';
import React from 'react';
import {StatusBar} from 'react-native';
import {PersistGate} from 'redux-persist/integration/react';
import {Provider} from 'react-redux';
import {ThemeProvider} from 'styled-native-components';
import './services/window';
import AsyncStorage from '@react-native-community/async-storage';
import Toast from 'react-native-toast-message';
import messaging from '@react-native-firebase/messaging';
import * as RootNavigation from './RootNavigation';

import './config/ReactotronConfig';
import {store, persistor} from './store';
import Routes from './routes';
import CodePush from 'react-native-code-push';

// LogBox.ignoreAllLogs(true);

class App extends React.PureComponent {
  constructor(props: any) {
    super(props);
  }

  componentWillUnmount() {}

  componentDidMount() {
    async function check() {
      const token = await messaging().getToken();
      console.log('Device Token: ', token);
      await AsyncStorage.setItem('@notification:token', token);
    }

    this.requestUserPermission();
    check();

    messaging().onNotificationOpenedApp((remoteMessage) => {
      this.notificationActions(remoteMessage);
      console.log(
        'Notification caused app to open from background state:',
        remoteMessage,
      );
    });

    messaging()
      .getInitialNotification()
      .then((remoteMessage) => {
        if (remoteMessage) {
          this.notificationActions(remoteMessage);
          console.log(
            'Notification caused app to open from quit state:',
            remoteMessage,
          );
        }
      });

    messaging().setBackgroundMessageHandler(async (remoteMessage) => {
      this.notificationActions(remoteMessage);
      console.log('Notification background', remoteMessage);
    });
  }

  // disparada quando app esta aberto
  onReceived = (data) => {};

  // disparada quando clicar numa notificação
  onOpened = (notification: any) => {
    // console.tron.log('On Opened', notification);
  };

  async notificationActions(notification: any) {
    const token = await AsyncStorage.getItem('@auth:token');

    console.log('ON NOTIFICATION:', notification);

    if (token && notification) {
      switch (notification.data.alias) {
        case 'new_message': {
          RootNavigation.navigate('DirectMessagesTabs');
          break;
        }
        case 'rate_itinerary': {
          RootNavigation.navigate('ItineraryRate', {
            id: notification.data.json_data.id,
          });
          break;
        }
        case 'new_connection': {
          RootNavigation.navigate('Connections');
          break;
        }
        case 'new_connection_accepted': {
          RootNavigation.navigate('Connections');
          break;
        }
        case 'itinerary_update': {
          RootNavigation.navigate('DynamicItineraryDetails', {
            id: notification.data.json_data.id,
          });
          break;
        }
        case 'itinerary_question': {
          RootNavigation.navigate('DynamicItineraryDetails', {
            id: notification.data.json_data.itinerary_id,
          });
          break;
        }
        case 'itinerary_member_request': {
          RootNavigation.navigate('DynamicItineraryDetails', {
            id: notification.data.json_data.itinerary_id,
          });
          break;
        }
        case 'itinerary_answer': {
          RootNavigation.navigate('DynamicItineraryDetails', {
            id: notification.data.json_data.itinerary_id,
          });
          break;
        }
        case 'itinerary_member_accepted': {
          RootNavigation.navigate('DynamicItineraryDetails', {
            id: notification.data.json_data.itinerary_id,
          });
          break;
        }
        case 'itinerary_updated': {
          RootNavigation.navigate('DynamicItineraryDetails', {
            id: notification.data.json_data.id,
          });
          break;
        }
        default:
      }
    }
  }

  // quando usuario faz registro no serviço de notificaçao
  onIds = (id) => {};

  async requestUserPermission() {
    await messaging().requestPermission({
      sound: true,
      alert: true,
    });
  }

  render() {
    const theme = {
      rem: 10,
      colors: {
        accent: '#11C5D9',
        background: '#141417',
        text: '#D2D2D6',
      },
      elevation: (value) => ({
        shadowColor: 'black',
        shadowOffset: {width: 0, height: value},
        shadowRadius: value * 2.5,
        shadowOpacity: 0.3,
        elevation: value,
        zIndex: value,
      }),
    };

    return (
      <Provider store={store}>
        <PersistGate persistor={persistor}>
          <StatusBar barStyle="dark-content" backgroundColor="#FFF" />
          <ThemeProvider theme={theme}>
            <Routes />
            <Toast ref={(ref) => Toast.setRef(ref)} visibilityTime={3000} />
          </ThemeProvider>
        </PersistGate>
      </Provider>
    );
  }
}

export default CodePush({
  checkFrequency: CodePush.CheckFrequency.ON_APP_RESUME,
})(App);
