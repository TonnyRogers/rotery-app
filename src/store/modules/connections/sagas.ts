import {call, put, all, takeLatest} from 'redux-saga/effects';
import Toast from 'react-native-toast-message';

import api from '../../../services/api';
import NetInfo from '../../../services/netinfo';
import {setLoadingFalse} from '../auth/actions';
import {
  getConnectionsRequest,
  getConnectionsSuccess,
  getConnectionsFailure,
  makeConnectionRequest,
  makeConnectionSuccess,
  makeConnectionFailure,
  acceptConnectionRequest,
  acceptConnectionSuccess,
  acceptConnectionFailure,
  rejectConnectionRequest,
  rejectConnectionSuccess,
  rejectConnectionFailure,
  blockConnectionRequest,
  blockConnectionSuccess,
  blockConnectionFailure,
  unblockConnectionRequest,
  unblockConnectionSuccess,
  unblockConnectionFailure,
} from './actions';

export function* getConnections() {
  try {
    const info = yield call(NetInfo);

    if (!info.status) {
      yield put(setLoadingFalse());
      return;
    }

    const response = yield call(api.get, '/connections');

    const {connections, invites} = response.data;

    yield put(getConnectionsSuccess(connections, invites));
  } catch (error) {
    yield put(getConnectionsFailure());
    Toast.show({
      text1: 'Erro ao carregar conexões.',
      position: 'bottom',
      type: 'error',
    });
  }
}

export function* makeConnection({
  payload,
}: ReturnType<typeof makeConnectionRequest>) {
  try {
    const info = yield call(NetInfo);

    if (!info.status) {
      yield put(setLoadingFalse());
      return;
    }

    const {userId} = payload;
    yield call(api.post, `/users/${userId}/connect`);

    yield put(makeConnectionSuccess());
    yield put(getConnectionsRequest());

    Toast.show({
      text1: 'Conexão solicitada.',
      position: 'bottom',
      type: 'success',
    });
  } catch (error) {
    yield put(makeConnectionFailure());
    Toast.show({
      text1: 'Erro ao solicitar conexão.',
      position: 'bottom',
      type: 'error',
    });
  }
}

export function* acceptConnection({
  payload,
}: ReturnType<typeof acceptConnectionRequest>) {
  try {
    const info = yield call(NetInfo);

    if (!info.status) {
      yield put(setLoadingFalse());
      return;
    }

    const {userId} = payload;
    yield call(api.put, `/users/${userId}/accept`);

    yield put(acceptConnectionSuccess());
    yield put(getConnectionsRequest());
    Toast.show({
      text1: 'Conexão aceita.',
      position: 'bottom',
      type: 'success',
    });
  } catch (error) {
    yield put(acceptConnectionFailure());
    Toast.show({
      text1: 'Erro ao aceitar conexão.',
      position: 'bottom',
      type: 'error',
    });
  }
}

export function* rejectConnection({
  payload,
}: ReturnType<typeof rejectConnectionRequest>) {
  try {
    const info = yield call(NetInfo);

    if (!info.status) {
      yield put(setLoadingFalse());
      return;
    }

    const {userId} = payload;
    yield call(api.delete, `/users/${userId}/refuse`);

    yield put(rejectConnectionSuccess());
    yield put(getConnectionsRequest());
  } catch (error) {
    yield put(rejectConnectionFailure());
    Toast.show({
      text1: 'Erro ao cancelar conexão.',
      position: 'bottom',
      type: 'error',
    });
  }
}

export function* blockConnection({
  payload,
}: ReturnType<typeof blockConnectionRequest>) {
  try {
    const info = yield call(NetInfo);

    if (!info.status) {
      yield put(setLoadingFalse());
      return;
    }

    const {userId} = payload;
    yield call(api.post, `/users/${userId}/block`);

    yield put(blockConnectionSuccess());
    yield put(getConnectionsRequest());
  } catch (error) {
    yield put(blockConnectionFailure());
    Toast.show({
      text1: 'Erro ao bloquear conexão.',
      position: 'bottom',
      type: 'error',
    });
  }
}

export function* unblockConnection({
  payload,
}: ReturnType<typeof unblockConnectionRequest>) {
  try {
    const info = yield call(NetInfo);

    if (!info.status) {
      yield put(setLoadingFalse());
      return;
    }

    const {userId} = payload;
    yield call(api.put, `/users/${userId}/unblock`);

    yield put(unblockConnectionSuccess());
    yield put(getConnectionsRequest());
  } catch (error) {
    yield put(unblockConnectionFailure());
    Toast.show({
      text1: 'Erro ao desbloquear conexão.',
      position: 'bottom',
      type: 'error',
    });
  }
}

export default all([
  takeLatest('@connections/UNBLOCK_CONNECTION_REQUEST', unblockConnection),
  takeLatest('@connections/BLOCK_CONNECTION_REQUEST', blockConnection),
  takeLatest('@connections/REJECT_CONNECTION_REQUEST', rejectConnection),
  takeLatest('@connections/ACCEPT_CONNECTION_REQUEST', acceptConnection),
  takeLatest('@connections/MAKE_CONNECTION_REQUEST', makeConnection),
  takeLatest('@connections/GET_CONNECTIONS_REQUEST', getConnections),
]);
