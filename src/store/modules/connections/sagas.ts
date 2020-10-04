import {Alert} from 'react-native';
import {call, put, all, takeLatest} from 'redux-saga/effects';

import api from '../../../services/api';
import {setLoadingTrue, setLoadingFalse} from '../auth/actions';
import {
  getConnectionsRequest,
  getConnectionsSuccess,
  getConnectionsFailure,
} from './actions';

export function* getConnections() {
  try {
    yield put(setLoadingTrue());
    const response = yield call(api.get, '/connections');

    yield put(getConnectionsSuccess(response.data));
    yield put(setLoadingTrue());
  } catch (error) {
    yield put(getConnectionsFailure());
    yield put(setLoadingFalse());
    Alert.alert('Erro ao carregar conexões');
  }
}

export default all(['@connections/GET_CONNECTIONS_REQUEST', getConnections]);
