import {call, put, all, takeLatest} from 'redux-saga/effects';
import Toast from 'react-native-toast-message';
import {AxiosResponse} from 'axios';

import NetInfo from '../../../services/netinfo';
import api from '../../../services/api';

import {
  ChatActions,
  getChatMessagesFailure,
  getChatMessagesSuccess,
  getCurrentChatFailure,
  getCurrentChatSuccess,
  getCurrentChatRequest,
  beginChatRequest,
  beginChatFailure,
  beginChatSuccess,
  finishChatRequest,
} from './actions';
import {ChatMessage} from '../../../utils/types';

export function* getChats() {
  try {
    const info = yield call(NetInfo);

    if (!info.status) {
      yield put(getChatMessagesFailure());
      return;
    }

    const response: AxiosResponse<ChatMessage[]> = yield call(
      api.get,
      '/chats',
    );

    yield put(getChatMessagesSuccess(response.data));
  } catch (error) {
    yield put(getChatMessagesFailure());
    Toast.show({
      text1: 'Erro ao buscar chats.',
      position: 'bottom',
      type: 'error',
    });
  }
}

export function* getCurrentChat({
  payload: {targetId},
}: ReturnType<typeof getCurrentChatRequest>) {
  try {
    const info = yield call(NetInfo);

    if (!info.status) {
      yield put(getCurrentChatFailure());
      return;
    }

    const response: AxiosResponse<ChatMessage[]> = yield call(
      api.get,
      `/chats/user/${targetId}`,
    );

    yield put(getCurrentChatSuccess(response.data));
  } catch (error) {
    yield put(getCurrentChatFailure());
    Toast.show({
      text1: 'Erro ao carregar mensagens do chat.',
      position: 'bottom',
      type: 'error',
    });
  }
}

export function* beginChat({
  payload: {
    beginPayload: {locationCityState, locationId, locationName, targetId},
  },
}: ReturnType<typeof beginChatRequest>) {
  try {
    const info = yield call(NetInfo);

    if (!info.status) {
      yield put(beginChatFailure());
      return;
    }

    const response: AxiosResponse<ChatMessage> = yield call(
      api.post,
      `/chats/${targetId}/begin`,
      {
        locationCityState,
        locationName,
        locationId,
      },
    );

    yield put(beginChatSuccess(response.data));
  } catch (error) {
    yield put(beginChatFailure());
    Toast.show({
      text1: 'Erro ao iniciar chat.',
      text2: 'tente novamente',
      position: 'bottom',
      type: 'error',
    });
  }
}

export function* finishChat({
  payload: {
    finishPayload: {locationCityState, locationId, locationName, targetId},
  },
}: ReturnType<typeof finishChatRequest>) {
  try {
    const info = yield call(NetInfo);

    if (!info.status) {
      yield put(beginChatFailure());
      return;
    }

    const response: AxiosResponse<ChatMessage> = yield call(
      api.post,
      `/chats/${targetId}/end`,
      {
        locationCityState,
        locationName,
        locationId,
      },
    );

    yield put(beginChatSuccess(response.data));
  } catch (error) {
    yield put(beginChatFailure());
    Toast.show({
      text1: 'Erro ao finalizar chat.',
      text2: 'tente novamente',
      position: 'bottom',
      type: 'error',
    });
  }
}

export default all([
  takeLatest(ChatActions.GET_CHAT_MESSAGES_REQUEST, getChats),
  takeLatest(ChatActions.GET_CURRENT_CHAT_REQUEST, getCurrentChat),
  takeLatest(ChatActions.BEGIN_CHAT_REQUEST, beginChat),
  takeLatest(ChatActions.FINISH_CHAT_REQUEST, finishChat),
]);
