import {
  NotificationsProps,
  SendChatMessagePayload,
  ChatMessage,
} from '../../../utils/types';

export enum WsActions {
  NOTIFICATIONS = '@ws/NOTIFICATIONS',
  CHAT_MESSAGE = '@ws/CHAT_MESSAGE',
  CHAT_SUBSCRIBE = '@ws/CHAT_SUBSCRIBE',
  CHAT_BEGIN = '@ws/CHAT_BEGIN',
  CHAT_FINISH = '@ws/CHAT_FINISH',
  CLOSE_CHAT_CHANNEL = '@ws/CLOSE_CHAT_CHANNEL',
  SUBSCRIBE_USER = '@ws/SUBSCRIBE_USER_TO_NOTIFICATIONS',
  NEW_CONNECTION = '@ws/NEW_CONNECTION',
  NEW_MESSAGE = '@ws/NEW_MESSAGE',
  NEW_CHAT_NOTIFICATION = '@ws/NEW_CHAT_NOTIFICATION',
  CONNECTION_ACCEPTED = '@ws/CONNECTION_ACCEPTED',
  CONNECTION_BLOCK = '@ws/CONNECTION_BLOCK',
  CONNECTION_UNBLOCK = '@ws/CONNECTION_UNBLOCK',
  NEW_ITINERARY_MEMBER = '@ws/NEW_ITINERARY_MEMBER',
  MEMBER_ACCEPTED = '@ws/MEMBER_ACCEPTED',
  MEMBER_REJECTED = '@ws/MEMBER_REJECTED',
  MEMBER_PROMOTED = '@ws/MEMBER_PROMOTED',
  MEMBER_DEMOTED = '@ws/MEMBER_DEMOTED',
  ITINERARY_QUESTION = '@ws/ITINERARY_QUESTION',
  ITINERARY_ANSWER = '@ws/ITINERARY_ANSWER',
  ITINERARY_UPDATE = '@ws/ITINERARY_UPDATE',
  ITINERARY_DELETE = '@ws/ITINERARY_DELETE',
  ITINERARY_RATE = '@ws/ITINERARY_RATE',
  LOCATION_RATE_NOTIFICATION = '@ws/LOCATION_RATE_NOTIFICATION',
  SEND_CHAT_MESSAGE_REQUEST = '@ws/SEND_CHAT_MESSAGE_REQUEST',
  SEND_CHAT_MESSAGE_SUCCESS = '@ws/SEND_CHAT_MESSAGE_SUCCESS',
  LISTEN_SUBSCRIPTIONS = '@ws/LISTEN_SUBSCRIPTIONS',
}

export function wsNotifications() {
  return {
    type: WsActions.NOTIFICATIONS,
  };
}

export function wsNewChatNotification(notification: NotificationsProps<any>) {
  return {
    type: WsActions.NEW_CHAT_NOTIFICATION,
    payload: {notification},
  };
}

export function wsChatMessage(chatMessage: ChatMessage, authUserId: number) {
  // when message is received by user
  return {
    type: WsActions.CHAT_MESSAGE,
    payload: {chatMessage, authUserId},
  };
}

export function wsChatSubscribe(ownerId: number, targetId: number) {
  // when user enters in a chat room (if allowed)
  return {
    type: WsActions.CHAT_SUBSCRIBE,
    payload: {ownerId, targetId},
  };
}

export function wsCloseChatChannel(ownerId: number, targetId: number) {
  // when user leave an chat room (if allowed)
  return {
    type: WsActions.CLOSE_CHAT_CHANNEL,
    payload: {ownerId, targetId},
  };
}

export function wsChatBegin(chatMessage: ChatMessage) {
  // when message is received by user
  return {
    type: WsActions.CHAT_BEGIN,
    payload: {chatMessage},
  };
}

export function wsChatFininsh(chatMessage: ChatMessage) {
  // when message is received by user
  return {
    type: WsActions.CHAT_FINISH,
    payload: {chatMessage},
  };
}

export function wsSendChatMessageRequest(
  messagePayload: SendChatMessagePayload,
) {
  return {
    type: WsActions.SEND_CHAT_MESSAGE_REQUEST,
    payload: {
      messagePayload,
    },
  };
}

export function wsSendChatMessageSuccess(chatMessage: ChatMessage) {
  return {
    type: WsActions.SEND_CHAT_MESSAGE_SUCCESS,
    payload: {
      chatMessage,
    },
  };
}

export function wsSubscribeUserToNotifications() {
  return {
    type: WsActions.SUBSCRIBE_USER,
  };
}

export function wsNewConnectionNotification(
  notification: NotificationsProps<any>,
) {
  return {
    type: WsActions.NEW_CONNECTION,
    payload: {notification},
  };
}

export function wsConnectionAcceptedNotification(
  notification: NotificationsProps<any>,
) {
  return {
    type: WsActions.CONNECTION_ACCEPTED,
    payload: {notification},
  };
}

export function wsNewMessageNotification(
  notification: NotificationsProps<any>,
) {
  return {
    type: WsActions.NEW_MESSAGE,
    payload: {notification},
  };
}

export function wsNewItineraryMemeberNotification(
  notification: NotificationsProps<any>,
) {
  return {
    type: WsActions.NEW_ITINERARY_MEMBER,
    payload: {notification},
  };
}

export function wsAcceptedItineraryMemeberNotification(
  notification: NotificationsProps<any>,
) {
  return {
    type: WsActions.MEMBER_ACCEPTED,
    payload: {notification},
  };
}

export function wsRejectedItineraryMemeberNotification(
  notification: NotificationsProps<any>,
) {
  return {
    type: WsActions.MEMBER_REJECTED,
    payload: {notification},
  };
}

export function wsItineraryQuestionNotification(
  notification: NotificationsProps<any>,
) {
  return {
    type: WsActions.ITINERARY_QUESTION,
    payload: {notification},
  };
}

export function wsItineraryAnswerNotification(
  notification: NotificationsProps<any>,
) {
  return {
    type: WsActions.ITINERARY_ANSWER,
    payload: {notification},
  };
}

export function wsItineraryUpdateNotification(
  notification: NotificationsProps<any>,
) {
  return {
    type: WsActions.ITINERARY_UPDATE,
    payload: {notification},
  };
}

export function wsItineraryDeleteNotification(
  notification: NotificationsProps<any>,
) {
  return {
    type: WsActions.ITINERARY_DELETE,
    payload: {notification},
  };
}

export function wsConnectionBlockedNotification(
  notification: NotificationsProps<any>,
) {
  return {
    type: WsActions.CONNECTION_BLOCK,
    payload: {notification},
  };
}

export function wsConnectionUnblockedNotification(
  notification: NotificationsProps<any>,
) {
  return {
    type: WsActions.CONNECTION_UNBLOCK,
    payload: {notification},
  };
}

export function wsItineraryRateNotification(
  notification: NotificationsProps<any>,
) {
  return {
    type: WsActions.ITINERARY_RATE,
    payload: {notification},
  };
}

export function wsLocationRateNotification(
  notification: NotificationsProps<any>,
) {
  return {
    type: WsActions.LOCATION_RATE_NOTIFICATION,
    payload: {notification},
  };
}

export function wsListenSubscriptions() {
  return {
    type: WsActions.LISTEN_SUBSCRIPTIONS,
  };
}

/*
  para a atualização da conversa em tempo real
  necessario conectar no canal de chat
  e só receber atualizações na tela enquanto estiver lá
  algo como componentDidMount e componentWillUnmount
*/
