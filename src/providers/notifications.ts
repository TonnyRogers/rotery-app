// import PushNotification from 'react-native-push-notification';

// const wsChannelId = 'ws-local-notifications';

// PushNotification.createChannel(
//   {
//     channelId: wsChannelId, // (required)
//     channelName: 'WS Notifications', // (required)
//     channelDescription: 'Websocket Notifications', // (optional) default: undefined.
//     soundName: 'default', // (optional) See `soundName` parameter of `localNotification` function
//     importance: 4, // (optional) default: 4. Int value of the Android notification importance
//     vibrate: true, // (optional) default: true. Creates the default vibration patten if true.
//   },
//   (/** created */) => {},
// );

// export const localNotification = (
//   title: string,
//   message: string,
//   data = {},
//   bigText = '',
//   actions: string[],
// ) => {
//   PushNotification.localNotification({
//     channelId: wsChannelId,
//     autoCancel: true,
//     smallIcon: 'ic_notification',
//     bigText: bigText,
//     title: title,
//     message: message,
//     userInfo: {...data},
//     largeIconUrl: '',
//     vibrate: true,
//     vibration: 300,
//     playSound: true,
//     soundName: 'default',
//     actions: `[${actions}]`,
//     invokeApp: true,
//   });
// };

// export const scheduledNotification = () => {
//   PushNotification.localNotificationSchedule({
//     channelId: wsChannelId,
//     autoCancel: true,
//     bigText:
//       'This is local notification demo in React Native app. Only shown, when expanded.',
//     subText: 'Local Notification Demo',
//     title: 'Local Notification Title',
//     message: 'Expand me to see more',
//     vibrate: true,
//     vibration: 300,
//     playSound: true,
//     date: new Date(Date.now() + 5 * 1000),
//     soundName: 'default',
//     actions: '["Yes", "No"]',
//   });
// };

// export const cancelNotifications = () => {
//   PushNotification.cancelAllLocalNotifications();
// };
