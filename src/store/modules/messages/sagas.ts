import {all, call, put, takeLatest} from 'redux-saga/effects';
import Toast from 'react-native-toast-message';

import api from '../../../services/api';
import NetInfo from '../../../services/netinfo';
import {
  getMessagesSuccess,
  getMessagesFailure,
  sendMessageRequest,
  sendMessageSuccess,
  sendMessageFailure,
  getConversationRequest,
  getConversationSuccess,
  getConversationFailure,
  MessageActions,
} from './actions';
import {AxiosResponse} from 'axios';
import {MessageProps} from '../../../utils/types';

export function* getMessages() {
  try {
    const info = yield call(NetInfo);

    if (!info.status) {
      return;
    }

    const response = yield call(api.get, '/messages');

    yield put(getMessagesSuccess(response.data));
  } catch (error) {
    yield put(getMessagesFailure());
    Toast.show({
      text1: 'Erro ao buscar novas mensagens.',
      position: 'bottom',
      type: 'error',
    });
  }
}

export function* getConversation({
  payload,
}: ReturnType<typeof getConversationRequest>) {
  try {
    const info = yield call(NetInfo);

    if (!info.status) {
      return;
    }

    const {userId} = payload;

    const response = yield call(api.get, `/users/${userId}/messages`);

    yield put(getConversationSuccess(response.data));
  } catch (error) {
    yield put(getConversationFailure());
    Toast.show({
      text1: 'Erro ao carregar conversa.',
      position: 'bottom',
      type: 'error',
    });
  }
}

export function* sendMessage({payload}: ReturnType<typeof sendMessageRequest>) {
  try {
    const info = yield call(NetInfo);

    if (!info.status) {
      return;
    }

    const {message, userId} = payload;

    const messagePayload: AxiosResponse<MessageProps> = yield call(
      api.post,
      `/users/${userId}/message`,
      {
        message,
      },
    );

    yield put(sendMessageSuccess(messagePayload.data));
  } catch (error) {
    yield put(sendMessageFailure());
    Toast.show({
      text1: 'Erro ao enviar mensagem.',
      position: 'bottom',
      type: 'error',
    });
  }
}

export default all([
  takeLatest(MessageActions.SEND_REQUEST, sendMessage),
  takeLatest(MessageActions.CONVERSATION_REQUEST, getConversation),
  takeLatest(MessageActions.GET_REQUEST, getMessages),
]);
