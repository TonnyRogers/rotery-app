import api from '../../../services/api';
import NetInfo from '../../../services/netinfo';

import {
  getLocationFeedRequest,
  getLocationFeedFailure,
  getLocationFeedSuccess,
  LocationActions,
} from './actions';
import {call, put, all, takeLatest} from 'redux-saga/effects';
import {Location, PaginatedResponse} from '../../../utils/types';
import {AxiosResponse} from 'axios';
import Toast from 'react-native-toast-message';

export function* getLocationFeed({
  payload: {filter},
}: ReturnType<typeof getLocationFeedRequest>) {
  try {
    const info = yield call(NetInfo);

    if (!info.status) {
      yield put(getLocationFeedFailure());
      return;
    }

    const response: AxiosResponse<PaginatedResponse<Location>> = yield call(
      api.get,
      '/locations/feed',
      {params: filter},
    );

    yield put(getLocationFeedSuccess(response.data.items || null, filter.page));
  } catch (error) {
    yield put(getLocationFeedFailure());
    Toast.show({
      text1: 'Erro ao buscar feed.',
      position: 'bottom',
      type: 'error',
    });
  }
}

export default all([
  takeLatest(LocationActions.GET_LOCATION_FEED_REQUEST, getLocationFeed),
]);
