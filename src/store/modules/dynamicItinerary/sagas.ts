import {takeLatest, put, call, all} from 'redux-saga/effects';
import AsyncStorage from '@react-native-community/async-storage';
import Toast from 'react-native-toast-message';

import api from '../../../providers/api';
import NetInfo from '../../../providers/netinfo';
import * as RootNavigation from '../../../RootNavigation';
import {
  getDetailsRequest,
  getDetailsSuccess,
  getDetailsFailure,
  updateDetailsSuccess,
  updateDetailsFailure,
} from './actions';
import {setLoadingTrue, setLoadingFalse} from '../auth/actions';

export function* getDetails({payload}: ReturnType<typeof getDetailsRequest>) {
  try {
    const info = yield call(NetInfo);

    if (!info.status) {
      yield put(setLoadingFalse());
      RootNavigation.goBack();
      return;
    }

    const {itineraryId} = payload;

    yield call(
      [AsyncStorage, 'setItem'],
      '@dynamicItinerary:id',
      String(itineraryId),
    );

    yield put(setLoadingTrue());

    const response = yield call(api.get, `/itineraries/${itineraryId}/details`);

    yield put(setLoadingFalse());

    yield put(getDetailsSuccess(response.data));
  } catch (error) {
    yield put(setLoadingFalse());
    yield put(getDetailsFailure());
    Toast.show({
      text1: 'Erro ao buscar roteiro.',
      position: 'bottom',
      type: 'error',
    });
  }
}

export function* updateDetails() {
  try {
    const info = yield call(NetInfo);

    if (!info.status) {
      yield put(setLoadingFalse());
      return;
    }

    const itineraryId = yield call(
      [AsyncStorage, 'getItem'],
      '@dynamicItinerary:id',
    );

    if (!itineraryId) {
      return false;
    }

    const response = yield call(api.get, `/itineraries/${itineraryId}/details`);

    yield put(updateDetailsSuccess(response.data));
  } catch (error) {
    yield put(updateDetailsFailure());
    yield call([AsyncStorage, 'removeItem'], '@dynamicItinerary:id');
  }
}

export default all([
  // takeLatest('@dynamicItinerary/GET_DETAILS_REQUEST', getDetails),
  // takeLatest('@dynamicItinerary/UPDATE_DETAILS_REQUEST', updateDetails),
]);
