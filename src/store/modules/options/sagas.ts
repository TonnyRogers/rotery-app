import {takeLatest, all, put, call} from 'redux-saga/effects';
import Toast from 'react-native-toast-message';

import api from '../../../services/api';
import {
  getActivitiesSuccess,
  getActivitiesFailure,
  getLodgingsSuccess,
  getLodgingsFailure,
  getTransportsSuccess,
  getTransportsFailure,
} from './actions';
import {setLoadingFalse, setLoadingTrue} from '../auth/actions';

export function* getActivities() {
  try {
    yield put(setLoadingTrue());
    const response = yield call(api.get, '/activities');

    yield put(getActivitiesSuccess(response.data));
    yield put(setLoadingFalse());
  } catch (error) {
    yield put(setLoadingFalse());
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
    yield put(setLoadingTrue());
    const response = yield call(api.get, '/lodgings');

    yield put(getLodgingsSuccess(response.data));
    yield put(setLoadingFalse());
  } catch (error) {
    yield put(setLoadingFalse());
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
    yield put(setLoadingTrue());
    const response = yield call(api.get, '/transports');

    yield put(getTransportsSuccess(response.data));
    yield put(setLoadingFalse());
  } catch (error) {
    yield put(setLoadingFalse());
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
