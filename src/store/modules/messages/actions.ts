import {MessageProps} from '../../../utils/types';

export enum MessageActions {
  GET_REQUEST = '@messages/GET_MESSAGES_REQUEST',
  GET_SUCCESS = '@messages/GET_MESSAGES_SUCCESS',
  GET_FAILURE = '@messages/GET_MESSAGES_FAILURE',
  SEND_REQUEST = '@messages/SEND_MESSAGE_REQUEST',
  SEND_SUCCESS = '@messages/SEND_MESSAGE_SUCCESS',
  SEND_FAILURE = '@messages/SEND_MESSAGE_FAILURE',
  CONVERSATION_REQUEST = '@messages/GET_CONVERSATION_REQUEST',
  CONVERSATION_SUCCESS = '@messages/GET_CONVERSATION_SUCCESS',
  CONVERSATION_FAILURE = '@messages/GET_CONVERSATION_FAILURE',
}

export function getMessagesRequest() {
  return {
    type: MessageActions.GET_REQUEST,
  };
}

export function getMessagesSuccess(messages: MessageProps[]) {
  return {
    type: MessageActions.GET_SUCCESS,
    payload: {messages},
  };
}

export function getMessagesFailure() {
  return {
    type: MessageActions.GET_FAILURE,
  };
}

export function sendMessageRequest(userId: number, message: string) {
  return {
    type: MessageActions.SEND_REQUEST,
    payload: {userId, message},
  };
}

export function sendMessageSuccess(message: MessageProps) {
  return {
    type: MessageActions.SEND_SUCCESS,
    payload: {message},
  };
}

export function sendMessageFailure() {
  return {
    type: MessageActions.SEND_FAILURE,
  };
}

export function getConversationRequest(userId: number) {
  return {
    type: MessageActions.CONVERSATION_REQUEST,
    payload: {userId},
  };
}

export function getConversationSuccess(
  messages: MessageProps[],
  ownerId: number,
) {
  return {
    type: MessageActions.CONVERSATION_SUCCESS,
    payload: {messages, ownerId},
  };
}

export function getConversationFailure() {
  return {
    type: MessageActions.CONVERSATION_FAILURE,
  };
}
