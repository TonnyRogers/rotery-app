import {MessageProps} from './reducer';

export function getMessagesRequest() {
  return {
    type: '@messages/GET_MESSAGES_REQUEST',
  };
}

export function getMessagesSuccess(messages: MessageProps) {
  return {
    type: '@messages/GET_MESSAGES_SUCCESS',
    payload: {messages},
  };
}

export function getMessagesFailure() {
  return {
    type: '@messages/GET_MESSAGES_FAILURE',
  };
}

export function sendMessageRequest(userId: number, message: string) {
  return {
    type: '@messages/SEND_MESSAGE_REQUEST',
    payload: {userId, message},
  };
}

export function sendMessageSuccess() {
  return {
    type: '@messages/SEND_MESSAGE_SUCCESS',
  };
}

export function sendMessageFailure() {
  return {
    type: '@messages/SEND_MESSAGE_FAILURE',
  };
}

export function getConversationRequest(userId: number) {
  return {
    type: '@messages/GET_CONVERSATION_REQUEST',
    payload: {userId},
  };
}

export function getConversationSuccess(messages: MessageProps) {
  return {
    type: '@messages/GET_CONVERSATION_SUCCESS',
    payload: {messages},
  };
}

export function getConversationFailure() {
  return {
    type: '@messages/GET_CONVERSATION_FAILURE',
  };
}
