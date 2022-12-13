import React, {useEffect, useState} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import AsyncStorage from '@react-native-community/async-storage';
import messaging, {
  FirebaseMessagingTypes,
} from '@react-native-firebase/messaging';
import {useSelector, useDispatch} from 'react-redux';

import {navigationRef} from '../RootNavigation';
import api from '../providers/api';
import * as RootNavigator from '../RootNavigation';
const Stack = createStackNavigator();

import SignIn from '../screens/SignIn';
import SignUp from '../screens/SignUp';
import Profile from '../screens/Profile';
import UserDetails from '../screens/UserDetails';
import SearchUsers from '../screens/SearchUsers';
import MyConnections from '../screens/MyConnections';
import DirectMessages from '../screens/DirectMessages';
import UserConversation from '../screens/UserConversation';
import RecoverPassword from '../screens/RecoverPassword';
import NewPassword from '../screens/NewPassword';
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

import {useSocket} from '../hooks/useSocket';
import {InvitesProps, NotificationAlias, ChatMessage} from '../utils/types';
import {RootState, store} from '../providers/store';
import {chatActions} from '../store2/chats';
import {conectionsActions} from '../store2/connections';
import {profileActions} from '../store2/profile';
import {LocalStorageKeys} from '../utils/enums';
import {getNotifications} from '../store2/notifications';

const Routes = () => {
  const {signed, token} = useSelector((state: RootState) => state.auth);
  const [isUIBlockedByNotification, setIsUIBlockedByNotification] =
    useState(true);
  const dispatch = useDispatch();

  useSocket();

  useEffect(() => {
    if (store.getState().auth.signed) {
      store.dispatch(getNotifications());
    }
  }, []);

  useEffect(() => {
    check();

    //   'Notification caused app to open from background state:'
    messaging().onNotificationOpenedApp(
      (remoteMessage: FirebaseMessagingTypes.RemoteMessage) => {
        if (remoteMessage) {
          console.log('onNotificationOpenedApp', remoteMessage);
          notificationDispatches(remoteMessage);
        }
      },
    );

    //   'Notification caused app to open from quit state:'
    messaging()
      .getInitialNotification()
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      .then((remoteMessage: FirebaseMessagingTypes.RemoteMessage | null) => {
        setIsUIBlockedByNotification(false);
      });

    messaging().onTokenRefresh(async (deviceToken) => {
      await AsyncStorage.setItem('@notification:token', deviceToken);
      await api.post('/users/device', {
        token: deviceToken,
      });
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  messaging().requestPermission({
    sound: true,
    alert: true,
    badge: true,
  });

  async function check() {
    const localToken = await AsyncStorage.getItem(
      LocalStorageKeys.NOTIFICATION_TOKEN,
    );
    if (!localToken) {
      const deviceToken = await messaging().getToken();
      await AsyncStorage.setItem(
        LocalStorageKeys.NOTIFICATION_TOKEN,
        deviceToken,
      );
    }
  }

  async function notificationDispatches(
    notification: FirebaseMessagingTypes.RemoteMessage,
  ) {
    if (token && notification && notification.data) {
      // called when user click in pushNotification
      if (notification.data.alias === NotificationAlias.NEW_CHAT) {
        // const jsonData: ChatMessage = JSON.parse(notification.data.json_data);
        // dispatch(pushNotificationNewChat(jsonData));
        const chatMessageNotification: ChatMessage = JSON.parse(
          notification.data.json_data,
        );
        // dispatch(setNotificationsAction(payload));
        dispatch(
          chatActions.setChatNotificationMessage(chatMessageNotification),
        );
        RootNavigator.replace('ChatMessages');
      }
      if (notification.data.alias === NotificationAlias.RATE_LOCATION) {
        //empty
      }
      if (notification.data.alias === NotificationAlias.NEW_CONNECTION) {
        const jsonData: InvitesProps = JSON.parse(notification.data.json_data);
        // dispatch(pushNotificationNewConnection(jsonData));
        dispatch(conectionsActions.setNotificationConnection(jsonData));
        RootNavigator.replace('Connections');
      }
      if (notification.data.alias === NotificationAlias.CONNECTION_ACCEPTED) {
        const jsonData: InvitesProps = JSON.parse(notification.data.json_data);
        // dispatch(pushNotificationConnectionAccepted(jsonData));
        dispatch(conectionsActions.setNotificationConnection(jsonData));
        RootNavigator.replace('Connections');
      }
      if (notification.data.alias === NotificationAlias.CONNECTION_UNBLOCK) {
        const jsonData: InvitesProps = JSON.parse(notification.data.json_data);
        // dispatch(pushNotificationConnectionUnblock(jsonData));
        dispatch(
          conectionsActions.unblockConnection({
            userId: jsonData.target.id,
          }),
        );
      }
      if (notification.data.alias === NotificationAlias.CONNECTION_BLOCK) {
        const jsonData: InvitesProps = JSON.parse(notification.data.json_data);
        // dispatch(pushNotificationConnectionBlock(jsonData));
        dispatch(
          conectionsActions.blockConnection({
            userId: jsonData.target.id,
          }),
        );
      }
      if (notification.data.alias === NotificationAlias.GUIDE_ACTIVATED) {
        // dispatch(pushNotificationGuideActivated());
        dispatch(
          profileActions.setGuideValidateRelateToLocation({
            isActive: true,
            message: '',
          }),
        );
      }
      // if (notification.data.alias === NotificationAlias.NEW_QUESTION) {
      //   const jsonData: QuestionProps = JSON.parse(notification.data.json_data);
      //   dispatch(pushNotificationItineraryQuestion(jsonData));
      //   RootNavigation.navigate('MyItineraryDetails', {
      //     id: jsonData.itinerary,
      //   });
      // }
      // if (notification.data.alias === NotificationAlias.NEW_MEMBER) {
      //   const jsonData: MemberProps = JSON.parse(notification.data.json_data);
      //   dispatch(pushNotificationItineraryNewMember(jsonData));
      //   RootNavigation.navigate('MyItineraryDetails', {
      //     id: jsonData.itinerary,
      //   });
      // }
      // if (notification.data.alias === NotificationAlias.NEW_ANSWER) {
      //   const jsonData: QuestionProps = JSON.parse(notification.data.json_data);
      //   dispatch(pushNotificationItineraryAnswer(jsonData));
      //   RootNavigation.navigate('FeedItineraryDetails', {
      //     id: jsonData.itinerary,
      //   });
      // }
      // if (notification.data.alias === NotificationAlias.MEMBER_ACCEPTED) {
      //   const jsonData: ItineraryMemberAcceptWsResponse = JSON.parse(
      //     notification.data.json_data,
      //   );
      //   dispatch(getNextItineraryDetailsRequest(jsonData.itineraryId));
      //   RootNavigation.navigate('NextItineraryDetails', {
      //     id: jsonData.itineraryId,
      //   });
      // }
      // if (notification.data.alias === NotificationAlias.MEMBER_REJECTED) {
      //   const jsonData: ItineraryMemberAcceptWsResponse = JSON.parse(
      //     notification.data.json_data,
      //   );
      //   dispatch(pushNotificationItineraryRejectMember(jsonData));
      // }
      // if (notification.data.alias === NotificationAlias.ITINERARY_UPDATED) {
      //   const jsonData: {id: number} = JSON.parse(notification.data.json_data);
      //   dispatch(getNextItineraryDetailsRequest(jsonData.id));
      //   RootNavigation.navigate('NextItineraryDetails', {
      //     id: jsonData.id,
      //   });
      // }
      // if (notification.data.alias === NotificationAlias.ITINERARY_DELETED) {
      //   const jsonData: {id: number} = JSON.parse(notification.data.json_data);
      //   dispatch(pushNotificationItineraryDeleted(jsonData));
      // }
      // if (notification.data.alias === NotificationAlias.RATE_ITINERARY) {
      //   const jsonData: {id: number} = JSON.parse(notification.data.json_data);
      //   RootNavigation.navigate('ItineraryRate', {
      //     id: jsonData.id,
      //   });
      // }
      // if (notification.data.alias === NotificationAlias.NEW_MESSAGE) {
      //   const jsonData: MessageProps = JSON.parse(notification.data.json_data);
      //   dispatch(pushNotificationNewMessage(jsonData));
      //   RootNavigation.replace('DirectMessagesTabs');
      // }
    }
  }

  if (isUIBlockedByNotification) {
    return null;
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
              <Stack.Screen name="Profile" component={Profile} />
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
              {/* <Stack.Screen name="Feed" component={Feed} /> */}
              {/* <Stack.Screen name="Favorites" component={Favorites} /> */}
              {/* <Stack.Screen
                name="FeedItineraryDetails"
                component={FeedItineraryDetails}
              /> */}
              {/* <Stack.Screen name="NewItinerary" component={NewItinerary} /> */}
              {/* <Stack.Screen name="MyItineraries" component={MyItineraries} /> */}
              {/* <Stack.Screen
                name="NextItineraries"
                component={NextItineraries}
              /> */}
              {/* <Stack.Screen
                name="NextItineraryDetails"
                component={NextItineraryDetails}
              /> */}
              {/* <Stack.Screen
                name="MyItineraryDetails"
                component={MyItineraryDetails}
              /> */}
              {/* <Stack.Screen name="EditItinerary" component={EditItinerary} /> */}
              {/* <Stack.Screen name="ItineraryRate" component={ItineraryRate} /> */}
              {/* <Stack.Screen
                name="DynamicItineraryDetails"
                component={DynamicItineraryDetais}
              /> */}
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
