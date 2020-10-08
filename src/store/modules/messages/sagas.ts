import {all, call, put, takeLatest} from 'redux-saga/effects';

import api from '../../../services/api';
import {Alert} from 'react-native';

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
    Alert.alert('Erro ao buscar novas mensagens.');
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
    Alert.alert('Erro ao carregar conversa.');
  }
}

export function* sendMessage({payload}: ReturnType<typeof sendMessageRequest>) {
  try {
    const {message, userId} = payload;

    yield put(setLoadingTrue());
    yield call(api.post, `/users/${userId}/message`, {
      message,
    });

    yield put(sendMessageSuccess());
    yield put(getConversationRequest(userId));
    yield put(getMessagesRequest());
    yield put(setLoadingFalse());
  } catch (error) {
    yield put(sendMessageFailure());
    yield put(setLoadingFalse());
    Alert.alert('Erro ao enviar mensagem.');
  }
}

export default all([
  takeLatest('@messages/SEND_MESSAGE_REQUEST', sendMessage),
  takeLatest('@messages/GET_CONVERSATION_REQUEST', getConversation),
  takeLatest('WS_NOTIFICATION_MESSAGES', getMessages),
  takeLatest('@messages/GET_MESSAGES_REQUEST', getMessages),
]);
