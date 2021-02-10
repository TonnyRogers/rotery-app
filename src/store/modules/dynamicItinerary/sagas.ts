import {takeLatest, put, call, all} from 'redux-saga/effects';
import AsyncStorage from '@react-native-community/async-storage';
import Toast from 'react-native-toast-message';

import api from '../../../services/api';
import {
  getDetailsRequest,
  getDetailsSuccess,
  getDetailsFailure,
  updateDetailsSuccess,
  updateDetailsFailure,
} from './actions';

export function* getDetails({payload}: ReturnType<typeof getDetailsRequest>) {
  try {
    const {itineraryId} = payload;

    yield call(
      [AsyncStorage, 'setItem'],
      '@dynamicItinerary:id',
      String(itineraryId),
    );

    const response = yield call(api.get, `/itineraries/${itineraryId}/details`);

    yield put(getDetailsSuccess(response.data));
  } catch (error) {
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
  takeLatest('@dynamicItinerary/GET_DETAILS_REQUEST', getDetails),
  takeLatest('@dynamicItinerary/UPDATE_DETAILS_REQUEST', updateDetails),
  takeLatest('@ws/NOTIFICATION_MESSAGES', updateDetails),
]);
