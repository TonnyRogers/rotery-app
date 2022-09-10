/* eslint-disable @typescript-eslint/no-unused-vars */
import React, {useEffect} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import AsyncStorage from '@react-native-community/async-storage';
import messaging from '@react-native-firebase/messaging';
import {useSelector, useDispatch} from 'react-redux';
import {Platform} from 'react-native';

import {navigationRef} from '../RootNavigation';
import * as RootNavigation from '../RootNavigation';
import api from '../services/api';
const Stack = createStackNavigator();

import SignIn from '../screens/SignIn';
import SignUp from '../screens/SignUp';
import Favorites from '../screens/Favorites';
import Feed from '../screens/Feed';
import FeedItineraryDetails from '../screens/FeedItineraryDetails';
import Profile from '../screens/Profile';
import NewItinerary from '../screens/NewItinerary';
import MyItineraries from '../screens/MyItineraries';
import MyItineraryDetails from '../screens/MyItineraryDetails';
import NextItineraries from '../screens/NextItineraries';
import NextItineraryDetails from '../screens/NextItineraryDetails';
import EditItinerary from '../screens/EditItinerary';
import UserDetails from '../screens/UserDetails';
import SearchUsers from '../screens/SearchUsers';
import MyConnections from '../screens/MyConnections';
import DirectMessages from '../screens/DirectMessages';
import UserConversation from '../screens/UserConversation';
import ItineraryRate from '../screens/ItineraryRate';
import RecoverPassword from '../screens/RecoverPassword';
import NewPassword from '../screens/NewPassword';
import DynamicItineraryDetais from '../screens/DynamicItineraryDetails';
import Checkout from '../screens/Checkout';
import Wallet from '../screens/Wallet';
import {Welcome} from '../screens/Welcome';
import TransactionDetail from '../screens/TransactionDetail';
import Revenues from '../screens/Revenues';
import RevenuesConfig from '../screens/RevenuesConfig';
import RevenueDetail from '../screens/RevenueDetail';
import HelpRequest from '../screens/HelpRequest';
import HostSubscription from '../screens/HostSubscription';
import {Disclaimer} from '../screens/Disclaimer';
import {ExploreLocations} from '../screens/ExploreLocations';
import {LocationFeed} from '../screens/LocationFeed';
import {LocationFeedDetails} from '../screens/LocationFeedDetails';
import {ChatMessages} from '../screens/ChatMessages';
import {Chat} from '../screens/Chat';
import {RateChat} from '../screens/RateChat';
import {BackpackerSubscription} from '../screens/BackpackerSubscription';

import {RootStateProps} from '../store/modules/rootReducer';
import {useSocket} from '../hooks/useSocket';
import {
  pushNotificationNewMessage,
  pushNotificationNewConnection,
  pushNotificationConnectionAccepted,
  pushNotificationItineraryQuestion,
  pushNotificationItineraryAnswer,
  pushNotificationItineraryNewMember,
  pushNotificationItineraryDeleted,
  pushNotificationItineraryRejectMember,
  pushNotificationConnectionUnblock,
  pushNotificationConnectionBlock,
  pushNotificationNewChat,
} from '../store/modules/pushNotifications/actions';
import {
  MessageProps,
  InvitesProps,
  QuestionProps,
  MemberProps,
  ItineraryMemberAcceptWsResponse,
  NotificationAlias,
  ChatMessage,
  RateChatNotificationJsonData,
} from '../utils/types';
import {getNextItineraryDetailsRequest} from '../store/modules/nextItineraries/actions';

interface RoutesProps {
  (arg: {isSigned: boolean}): any;
}

const Routes = () => {
  const {signed, user} = useSelector((state: RootStateProps) => state.auth);
  const dispatch = useDispatch();
  useSocket();

  useEffect(() => {
    check();

    messaging().onTokenRefresh(
      async (token) => await AsyncStorage.setItem('@notification:token', token),
    );

    //   'Notification caused app to open from background state:'
    messaging().onNotificationOpenedApp((remoteMessage) => {
      notificationActions(remoteMessage);
    });

    //   'Notification caused app to open from quit state:'
    messaging()
      .getInitialNotification()
      .then((remoteMessage) => {
        if (remoteMessage) {
          notificationActions(remoteMessage);
        }
      });

    //   'Notification when app is in background or terminated'
    messaging().setBackgroundMessageHandler(async (remoteMessage: any) => {
      // this.notificationActions(remoteMessage);
    });

    messaging().onTokenRefresh(async (token) => {
      await api.post('/users/device', {
        token,
      });
    });

    if (Platform.OS === 'android') {
      messaging.NotificationAndroidPriority.PRIORITY_HIGH;
    }

    if (Platform.OS === 'ios') {
      requestUserPermission();
    }
  });

  async function check() {
    const localToken = await AsyncStorage.getItem('@notification:token');
    if (!localToken) {
      const token = await messaging().getToken();
      await AsyncStorage.setItem('@notification:token', token);
    }
  }

  async function requestUserPermission() {
    await messaging().requestPermission({
      sound: true,
      alert: true,
    });
  }

  async function notificationActions(notification: any) {
    const token = await AsyncStorage.getItem('@auth:token');

    if (token && notification) {
      // called when user click in pushNotification
      switch (notification.data.alias) {
        case NotificationAlias.NEW_MESSAGE: {
          const jsonData: MessageProps = JSON.parse(
            notification.data.json_data,
          );
          dispatch(pushNotificationNewMessage(jsonData));
          RootNavigation.replace('DirectMessagesTabs');
          break;
        }
        case NotificationAlias.NEW_CHAT: {
          const jsonData: ChatMessage = JSON.parse(notification.data.json_data);
          dispatch(pushNotificationNewChat(jsonData));
          RootNavigation.replace('ChatMessages');
          break;
        }
        case NotificationAlias.RATE_ITINERARY: {
          const jsonData: {id: number} = JSON.parse(
            notification.data.json_data,
          );
          RootNavigation.navigate('ItineraryRate', {
            id: jsonData.id,
          });
          break;
        }
        case NotificationAlias.RATE_LOCATION: {
          const jsonData: RateChatNotificationJsonData = JSON.parse(
            notification.data.json_data,
          );
          RootNavigation.navigate<RateChatNotificationJsonData>(
            'RateChat',
            jsonData,
          );
          break;
        }
        case NotificationAlias.NEW_CONNECTION: {
          const jsonData: InvitesProps = JSON.parse(
            notification.data.json_data,
          );
          dispatch(pushNotificationNewConnection(jsonData));
          RootNavigation.replace('Connections');
          break;
        }
        case NotificationAlias.CONNECTION_ACCEPTED: {
          const jsonData: InvitesProps = JSON.parse(
            notification.data.json_data,
          );
          dispatch(pushNotificationConnectionAccepted(jsonData));
          RootNavigation.replace('Connections');
          break;
        }
        case NotificationAlias.NEW_QUESTION: {
          const jsonData: QuestionProps = JSON.parse(
            notification.data.json_data,
          );
          dispatch(pushNotificationItineraryQuestion(jsonData));
          RootNavigation.navigate('MyItineraryDetails', {
            id: jsonData.itinerary,
          });
          break;
        }
        case NotificationAlias.NEW_MEMBER: {
          const jsonData: MemberProps = JSON.parse(notification.data.json_data);
          dispatch(pushNotificationItineraryNewMember(jsonData));
          RootNavigation.navigate('MyItineraryDetails', {
            id: jsonData.itinerary,
          });
          break;
        }
        case NotificationAlias.NEW_ANSWER: {
          const jsonData: QuestionProps = JSON.parse(
            notification.data.json_data,
          );
          dispatch(pushNotificationItineraryAnswer(jsonData));
          RootNavigation.navigate('FeedItineraryDetails', {
            id: jsonData.itinerary,
          });
          break;
        }
        case NotificationAlias.MEMBER_ACCEPTED: {
          const jsonData: ItineraryMemberAcceptWsResponse = JSON.parse(
            notification.data.json_data,
          );
          dispatch(getNextItineraryDetailsRequest(jsonData.itineraryId));
          RootNavigation.navigate('NextItineraryDetails', {
            id: jsonData.itineraryId,
          });
          break;
        }
        case NotificationAlias.MEMBER_REJECTED: {
          const jsonData: ItineraryMemberAcceptWsResponse = JSON.parse(
            notification.data.json_data,
          );
          dispatch(pushNotificationItineraryRejectMember(jsonData));
          break;
        }
        case NotificationAlias.ITINERARY_UPDATED: {
          const jsonData: {id: number} = JSON.parse(
            notification.data.json_data,
          );
          dispatch(getNextItineraryDetailsRequest(jsonData.id));
          RootNavigation.navigate('NextItineraryDetails', {
            id: jsonData.id,
          });
          break;
        }
        case NotificationAlias.ITINERARY_DELETED: {
          const jsonData: {id: number} = JSON.parse(
            notification.data.json_data,
          );
          dispatch(pushNotificationItineraryDeleted(jsonData));
          break;
        }
        case NotificationAlias.CONNECTION_UNBLOCK: {
          const jsonData: InvitesProps = JSON.parse(
            notification.data.json_data,
          );
          dispatch(pushNotificationConnectionUnblock(jsonData));
          break;
        }
        case NotificationAlias.CONNECTION_BLOCK: {
          const jsonData: InvitesProps = JSON.parse(
            notification.data.json_data,
          );
          dispatch(pushNotificationConnectionBlock(jsonData));
          break;
        }
        default:
      }
    }
  }

  return (
    <>
      <NavigationContainer ref={navigationRef}>
        <Stack.Navigator
          detachInactiveScreens
          screenOptions={{
            headerShown: false,
            gestureEnabled: false,
          }}
          initialRouteName={signed ? 'Welcome' : 'SignIn'}>
          {signed ? (
            <>
              <Stack.Screen name="Feed" component={Feed} />
              <Stack.Screen name="Favorites" component={Favorites} />
              <Stack.Screen
                name="FeedItineraryDetails"
                component={FeedItineraryDetails}
              />
              <Stack.Screen name="Profile" component={Profile} />
              <Stack.Screen name="NewItinerary" component={NewItinerary} />
              <Stack.Screen name="MyItineraries" component={MyItineraries} />
              <Stack.Screen
                name="NextItineraries"
                component={NextItineraries}
              />
              <Stack.Screen
                name="NextItineraryDetails"
                component={NextItineraryDetails}
              />
              <Stack.Screen
                name="MyItineraryDetails"
                component={MyItineraryDetails}
              />
              <Stack.Screen name="EditItinerary" component={EditItinerary} />
              <Stack.Screen name="UserDetails" component={UserDetails} />
              <Stack.Screen name="Connections" component={MyConnections} />
              <Stack.Screen name="SearchUsers" component={SearchUsers} />
              <Stack.Screen
                name="DirectMessagesTabs"
                component={DirectMessages}
              />
              <Stack.Screen
                name="UserConversation"
                component={UserConversation}
              />
              <Stack.Screen name="ItineraryRate" component={ItineraryRate} />
              <Stack.Screen
                name="DynamicItineraryDetails"
                component={DynamicItineraryDetais}
              />
              <Stack.Screen name="Checkout" component={Checkout} />
              <Stack.Screen name="Wallet" component={Wallet} />
              <Stack.Screen
                name="TransactionDetail"
                component={TransactionDetail}
              />
              <Stack.Screen name="Revenues" component={Revenues} />
              <Stack.Screen name="RevenuesConfig" component={RevenuesConfig} />
              <Stack.Screen name="RevenueDetail" component={RevenueDetail} />
              <Stack.Screen name="HelpRequest" component={HelpRequest} />
              <Stack.Screen
                name="HostSubscription"
                component={HostSubscription}
              />
              <Stack.Screen name="Disclaimer" component={Disclaimer} />
              <Stack.Screen
                name="ExploreLocations"
                component={ExploreLocations}
              />
              <Stack.Screen name="LocationFeed" component={LocationFeed} />
              <Stack.Screen
                name="LocationFeedDetails"
                component={LocationFeedDetails}
              />
              <Stack.Screen name="ChatMessages" component={ChatMessages} />
              <Stack.Screen name="Chat" component={Chat} />
              <Stack.Screen name="RateChat" component={RateChat} />
              <Stack.Screen name="Welcome" component={Welcome} />
              <Stack.Screen
                name="BackpackerSubscription"
                component={BackpackerSubscription}
              />
            </>
          ) : (
            <>
              <Stack.Screen name="SignIn" component={SignIn} />
              <Stack.Screen name="SignUp" component={SignUp} />
              <Stack.Screen
                name="RecoverPassword"
                component={RecoverPassword}
              />
              <Stack.Screen name="NewPassword" component={NewPassword} />
            </>
          )}
        </Stack.Navigator>
      </NavigationContainer>
    </>
  );
};

export default Routes;
