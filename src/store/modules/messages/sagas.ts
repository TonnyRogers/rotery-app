import {all, call, put, takeLatest} from 'redux-saga/effects';
import Toast from 'react-native-toast-message';

import api from '../../../services/api';

import {
  getMessagesRequest,
  getMessagesSuccess,
  getMessagesFailure,
  sendMessageRequest,
  sendMessageSuccess,
  sendMessageFailure,
  getConversationRequest,
  getConversationSuccess,
  getConversationFailure,
} from './actions';
import {setLoadingTrue, setLoadingFalse} from '../auth/actions';

export function* getMessages() {
  try {
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
    const {message, userId} = payload;

    yield call(api.post, `/users/${userId}/message`, {
      message,
    });

    yield put(sendMessageSuccess());
    yield put(getConversationRequest(userId));
    yield put(getMessagesRequest());
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
  takeLatest('@ws/NOTIFICATION_MESSAGES', getMessages),
  takeLatest('@messages/SEND_MESSAGE_REQUEST', sendMessage),
  takeLatest('@messages/GET_CONVERSATION_REQUEST', getConversation),
  takeLatest('@messages/GET_MESSAGES_REQUEST', getMessages),
]);
