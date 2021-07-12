import {takeLatest, all, put, call} from 'redux-saga/effects';
import Toast from 'react-native-toast-message';

import api from '../../../services/api';
import NetInfo from '../../../services/netinfo';
import {
  getActivitiesSuccess,
  getActivitiesFailure,
  getLodgingsSuccess,
  getLodgingsFailure,
  getTransportsSuccess,
  getTransportsFailure,
} from './actions';

export function* getActivities() {
  try {
    const info = yield call(NetInfo);

    if (!info.status) {
      return;
    }

    const response = yield call(api.get, '/activities');

    yield put(getActivitiesSuccess(response.data));
  } catch (error) {
    yield put(getActivitiesFailure());
    Toast.show({
      text1: 'Erro ao carregar atividades.',
      position: 'bottom',
      type: 'error',
    });
  }
}

export function* getLodgings() {
  try {
    const info = yield call(NetInfo);

    if (!info.status) {
      return;
    }

    const response = yield call(api.get, '/lodgings');

    yield put(getLodgingsSuccess(response.data));
  } catch (error) {
    yield put(getLodgingsFailure());
    Toast.show({
      text1: 'Erro ao carregar hospedagens.',
      position: 'bottom',
      type: 'error',
    });
  }
}

export function* getTransports() {
  try {
    const info = yield call(NetInfo);

    if (!info.status) {
      return;
    }

    const response = yield call(api.get, '/transports');

    yield put(getTransportsSuccess(response.data));
  } catch (error) {
    yield put(getTransportsFailure());
    Toast.show({
      text1: 'Erro ao carregar transportes.',
      position: 'bottom',
      type: 'error',
    });
  }
}

export default all([
  takeLatest('@options/GET_ACTIVITIES_REQUEST', getActivities),
  takeLatest('@options/GET_LODGINGS_REQUEST', getLodgings),
  takeLatest('@options/GET_TRANSPORTS_REQUEST', getTransports),
]);
