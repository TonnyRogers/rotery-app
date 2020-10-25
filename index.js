/**
 * @format
 */

import {AppRegistry} from 'react-native';
import App from './src';
import {name as appName} from './app.json';
import PushNotification from 'react-native-push-notification';
import {Platform} from 'react-native';
import * as RootNavigation from './src/RootNavigation';

PushNotification.configure({
  onRegister: function (token) {
    console.log('TOKEN:', token);
  },

  onNotification: function (notification) {
    console.log('ON NOTIFICATION:', notification);

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
        RootNavigation.navigate('NextItineraryDetails', {
          id: notification.data.json_data.id,
        });
        break;
      }
      case 'itinerary_question': {
        RootNavigation.navigate('MyItineraryDetails', {
          id: notification.data.json_data.itinerary_id,
        });
        break;
      }
      case 'itinerary_member_request': {
        RootNavigation.navigate('MyItineraryDetails', {
          id: notification.data.json_data.itinerary_id,
        });
        break;
      }
      case 'itinerary_answer': {
        RootNavigation.navigate('NextItineraryDetails', {
          id: notification.data.json_data.itinerary_id,
        });
        break;
      }
      case 'itinerary_member_accepted': {
        RootNavigation.navigate('NextItineraryDetails', {
          id: notification.data.json_data.itinerary_id,
        });
        break;
      }
      case 'itinerary_updated': {
        RootNavigation.navigate('NextItineraryDetails', {
          id: notification.data.json_data.id,
        });
        break;
      }
      default:
    }
  },

  onAction: function (notification) {
    console.log('ACTION:', notification.action);
    console.log('NOTIFICATION:', notification);
  },
  onRegistrationError: function (err) {
    console.error(err.message, err);
  },
  permissions: {
    alert: true,
    badge: true,
    sound: true,
  },
  popInitialNotification: true,
  requestPermissions: Platform.OS === 'ios',
});

AppRegistry.registerComponent(appName, () => App);
