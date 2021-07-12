import {NotificationsProps, MessageProps} from '../../../utils/types';

export enum WsActions {
  NOTIFICATIONS = '@ws/NOTIFICATIONS',
  CHAT_MESSAGE = '@ws/CHAT_MESSAGE',
  CHAT_SUBSCRIBE = '@ws/CHAT_SUBSCRIBE',
  CLOSE_CHAT_CHANNEL = '@ws/CLOSE_CHAT_CHANNEL',
  SUBSCRIBE_USER = '@ws/SUBSCRIBE_USER_TO_NOTIFICATIONS',
  NEW_CONNECTION = '@ws/NEW_CONNECTION',
  NEW_MESSAGE = '@ws/NEW_MESSAGE',
  CONNECTION_ACCEPTED = '@ws/CONNECTION_ACCEPTED',
  NEW_ITINERARY_MEMBER = '@ws/NEW_ITINERARY_MEMBER',
  MEMBER_ACCEPTED = '@ws/MEMBER_ACCEPTED',
  MEMBER_REJECTED = '@ws/MEMBER_REJECTED',
  ITINERARY_QUESTION = '@ws/ITINERARY_QUESTION',
  ITINERARY_ANSWER = '@ws/ITINERARY_ANSWER',
  SET_CONNECTED = '@ws/SET_CONNECTED',
  SET_DISCONNECTED = '@ws/SET_DISCONNECTED',
  ITINERARY_UPDATE = '@ws/ITINERARY_UPDATE',
  ITINERARY_DELETE = '@ws/ITINERARY_DELETE',
  ITINERARY_RATE = '@ws/ITINERARY_RATE',
}

export function wsSetConnected() {
  return {
    type: WsActions.SET_CONNECTED,
  };
}

export function wsSetDisconnected() {
  return {
    type: WsActions.SET_DISCONNECTED,
  };
}

export function wsNotifications() {
  return {
    type: WsActions.NOTIFICATIONS,
  };
}

export function wsChatMessage(message: MessageProps, authUserId: number) {
  return {
    type: WsActions.CHAT_MESSAGE,
    payload: {message, authUserId},
  };
}

export function wsChatSubscribe(ownerId: number, targetId: number) {
  return {
    type: WsActions.CHAT_SUBSCRIBE,
    payload: {ownerId, targetId},
  };
}

export function wsCloseChatChannel(ownerId: number, targetId: number) {
  return {
    type: WsActions.CLOSE_CHAT_CHANNEL,
    payload: {ownerId, targetId},
  };
}

export function wsSubscribeUserToNotifications() {
  return {
    type: WsActions.SUBSCRIBE_USER,
  };
}

export function wsNewConnectionNotification(notification: NotificationsProps) {
  return {
    type: WsActions.NEW_CONNECTION,
    payload: {notification},
  };
}

export function wsConnectionAcceptedNotification(
  notification: NotificationsProps,
) {
  return {
    type: WsActions.CONNECTION_ACCEPTED,
    payload: {notification},
  };
}

export function wsNewMessageNotification(notification: NotificationsProps) {
  return {
    type: WsActions.NEW_MESSAGE,
    payload: {notification},
  };
}

export function wsNewItineraryMemeberNotification(
  notification: NotificationsProps,
) {
  return {
    type: WsActions.NEW_ITINERARY_MEMBER,
    payload: {notification},
  };
}

export function wsAcceptedItineraryMemeberNotification(
  notification: NotificationsProps,
) {
  return {
    type: WsActions.MEMBER_ACCEPTED,
    payload: {notification},
  };
}

export function wsRejectedItineraryMemeberNotification(
  notification: NotificationsProps,
) {
  return {
    type: WsActions.MEMBER_REJECTED,
    payload: {notification},
  };
}

export function wsItineraryQuestionNotification(
  notification: NotificationsProps,
) {
  return {
    type: WsActions.ITINERARY_QUESTION,
    payload: {notification},
  };
}

export function wsItineraryAnswerNotification(
  notification: NotificationsProps,
) {
  return {
    type: WsActions.ITINERARY_ANSWER,
    payload: {notification},
  };
}

export function wsItineraryUpdateNotification(
  notification: NotificationsProps,
) {
  return {
    type: WsActions.ITINERARY_UPDATE,
    payload: {notification},
  };
}

export function wsItineraryDeleteNotification(
  notification: NotificationsProps,
) {
  return {
    type: WsActions.ITINERARY_DELETE,
    payload: {notification},
  };
}

export function wsItineraryRateNotification(notification: NotificationsProps) {
  return {
    type: WsActions.ITINERARY_RATE,
    payload: {notification},
  };
}

/*
  para a atualização da conversa em tempo real
  necessario conectar no canal de chat
  e só receber atualizações na tela enquanto estiver lá
  algo como componentDidMount e componentWillUnmount
*/
