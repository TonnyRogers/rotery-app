import {Alert} from 'react-native';
import {call, put, all, takeLatest} from 'redux-saga/effects';

import api from '../../../services/api';
import {setLoadingTrue, setLoadingFalse} from '../auth/actions';
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
    yield put(setLoadingTrue());
    const response = yield call(api.get, '/connections');

    const {connections, invites} = response.data;

    yield put(getConnectionsSuccess(connections, invites));
    yield put(setLoadingFalse());
  } catch (error) {
    yield put(getConnectionsFailure());
    yield put(setLoadingFalse());
    Alert.alert('Erro ao carregar conexões');
  }
}

export function* makeConnection({
  payload,
}: ReturnType<typeof makeConnectionRequest>) {
  try {
    const {userId} = payload;
    yield put(setLoadingTrue());
    yield call(api.post, `/users/${userId}/connect`);

    yield put(makeConnectionSuccess());
    yield put(getConnectionsRequest());
    yield put(setLoadingFalse());
    Alert.alert('Conexão solicitada.');
  } catch (error) {
    yield put(makeConnectionFailure());
    yield put(setLoadingFalse());
    Alert.alert('Erro ao solicitar conexão.');
  }
}

export function* acceptConnection({
  payload,
}: ReturnType<typeof acceptConnectionRequest>) {
  try {
    const {userId} = payload;
    yield put(setLoadingTrue());
    yield call(api.put, `/users/${userId}/accept`);

    yield put(acceptConnectionSuccess());
    yield put(getConnectionsRequest());
    yield put(setLoadingFalse());
    Alert.alert('Conexão aceita.');
  } catch (error) {
    yield put(acceptConnectionFailure());
    yield put(setLoadingFalse());
    Alert.alert('Erro ao aceitar conexão.');
  }
}

export function* rejectConnection({
  payload,
}: ReturnType<typeof rejectConnectionRequest>) {
  try {
    const {userId} = payload;
    yield put(setLoadingTrue());
    yield call(api.delete, `/users/${userId}/refuse`);

    yield put(rejectConnectionSuccess());
    yield put(getConnectionsRequest());
    yield put(setLoadingFalse());
  } catch (error) {
    yield put(rejectConnectionFailure());
    yield put(setLoadingFalse());
    Alert.alert('Erro ao cancelar conexão.');
  }
}

export function* blockConnection({
  payload,
}: ReturnType<typeof blockConnectionRequest>) {
  try {
    const {userId} = payload;
    yield put(setLoadingTrue());
    yield call(api.post, `/users/${userId}/block`);

    yield put(blockConnectionSuccess());
    yield put(getConnectionsRequest());
    yield put(setLoadingFalse());
  } catch (error) {
    yield put(blockConnectionFailure());
    yield put(setLoadingFalse());
    Alert.alert('Erro ao bloquear conexão.');
  }
}

export function* unblockConnection({
  payload,
}: ReturnType<typeof unblockConnectionRequest>) {
  try {
    const {userId} = payload;
    yield put(setLoadingTrue());
    yield call(api.put, `/users/${userId}/unblock`);

    yield put(unblockConnectionSuccess());
    yield put(getConnectionsRequest());
    yield put(setLoadingFalse());
  } catch (error) {
    yield put(unblockConnectionFailure());
    yield put(setLoadingFalse());
    Alert.alert('Erro ao desbloquear conexão.');
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
