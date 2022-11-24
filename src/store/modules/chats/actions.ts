import {ChatMessage} from '../../../utils/types';

export enum ChatActions {
  GET_CHAT_MESSAGES_REQUEST = 'GET_CHAT_MESSAGES_REQUEST',
  GET_CHAT_MESSAGES_SUCCESS = 'GET_CHAT_MESSAGES_SUCCESS',
  GET_CHAT_MESSAGES_FAILURE = 'GET_CHAT_MESSAGES_FAILURE',
  GET_CURRENT_CHAT_REQUEST = 'GET_CURRENT_CHAT_REQUEST',
  GET_CURRENT_CHAT_SUCCESS = 'GET_CURRENT_CHAT_SUCCESS',
  GET_CURRENT_CHAT_FAILURE = 'GET_CURRENT_CHAT_FAILURE',
  BEGIN_CHAT_REQUEST = 'BEGIN_CHAT_REQUEST',
  BEGIN_CHAT_SUCCESS = 'BEGIN_CHAT_SUCCESS',
  BEGIN_CHAT_FAILURE = 'BEGIN_CHAT_FAILURE',
  FINISH_CHAT_REQUEST = 'FINISH_CHAT_REQUEST',
  FINISH_CHAT_SUCCESS = 'FINISH_CHAT_SUCCESS',
  FINISH_CHAT_FAILURE = 'FINISH_CHAT_FAILURE',
}

export type BeginChatPayload = {
  targetId: number;
  locationId: number;
  locationCityState: string;
  locationName: string;
};

export function getChatMessagesRequest() {
  return {
    type: ChatActions.GET_CHAT_MESSAGES_REQUEST,
  };
}

export function getChatMessagesSuccess(chatMessages: ChatMessage[]) {
  return {
    type: ChatActions.GET_CHAT_MESSAGES_SUCCESS,
    payload: {
      chatMessages,
    },
  };
}

export function getChatMessagesFailure() {
  return {
    type: ChatActions.GET_CHAT_MESSAGES_FAILURE,
  };
}

export function beginChatRequest(beginPayload: BeginChatPayload) {
  return {
    type: ChatActions.BEGIN_CHAT_REQUEST,
    payload: {
      beginPayload,
    },
  };
}

export function beginChatSuccess(chatMessage: ChatMessage) {
  return {
    type: ChatActions.BEGIN_CHAT_SUCCESS,
    payload: {
      chatMessage,
    },
  };
}

export function beginChatFailure() {
  return {
    type: ChatActions.BEGIN_CHAT_FAILURE,
  };
}

export function finishChatRequest(finishPayload: BeginChatPayload) {
  return {
    type: ChatActions.FINISH_CHAT_REQUEST,
    payload: {
      finishPayload,
    },
  };
}

export function finishChatSuccess(chatMessage: ChatMessage) {
  return {
    type: ChatActions.FINISH_CHAT_SUCCESS,
    payload: {
      chatMessage,
    },
  };
}

export function finishChatFailure() {
  return {
    type: ChatActions.FINISH_CHAT_FAILURE,
  };
}

export function getCurrentChatRequest(targetId: number) {
  return {
    type: ChatActions.GET_CURRENT_CHAT_REQUEST,
    payload: {
      targetId,
    },
  };
}

export function getCurrentChatSuccess(chatMessages: ChatMessage[]) {
  return {
    type: ChatActions.GET_CURRENT_CHAT_SUCCESS,
    payload: {
      chatMessages,
    },
  };
}

export function getCurrentChatFailure() {
  return {
    type: ChatActions.GET_CURRENT_CHAT_FAILURE,
  };
}
