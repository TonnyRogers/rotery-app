import {takeLatest, put, call, all} from 'redux-saga/effects';
import Toast from 'react-native-toast-message';

import api from '../../../providers/api';
import NetInfo from '../../../providers/netinfo';
import {
  getFavoritesSuccess,
  getFavoritesFailure,
  setFavoriteRequest,
  setFavoriteSuccess,
  setFavoriteFailure,
  removeFavoriteRequest,
  removeFavoriteSuccess,
  removeFavoriteFailure,
} from './actions';
import {AxiosResponse} from 'axios';
import {ItineraryProps} from '../../../utils/types';

export function* getFavoritedItineraries() {
  try {
    const info = yield call(NetInfo);

    if (!info.status) {
      yield put(getFavoritesFailure());
      return;
    }
    const response: AxiosResponse<ItineraryProps[]> = yield call(
      api.get,
      '/itineraries/favorites',
    );

    yield put(getFavoritesSuccess(response.data));
  } catch (error) {
    yield put(getFavoritesFailure());
    Toast.show({
      text1: 'Erro ao buscar favoritos.',
      position: 'bottom',
      type: 'error',
    });
  }
}

export function* favoriteItinerary({
  payload,
}: ReturnType<typeof setFavoriteRequest>) {
  try {
    const info = yield call(NetInfo);

    if (!info.status) {
      yield put(setFavoriteFailure());
      return;
    }

    const {itineraryId} = payload;

    const response: AxiosResponse<ItineraryProps> = yield call(
      api.post,
      `/itineraries/${itineraryId}/favorite`,
    );

    yield put(setFavoriteSuccess(response.data));
  } catch (error) {
    yield put(setFavoriteFailure());
    Toast.show({
      text1: 'Erro ao adicionar aos favoritos.',
      position: 'bottom',
      type: 'error',
    });
  }
}

export function* unfavoriteItinerary({
  payload,
}: ReturnType<typeof removeFavoriteRequest>) {
  try {
    const info = yield call(NetInfo);

    if (!info.status) {
      yield put(removeFavoriteFailure());
      return;
    }

    const {itineraryId} = payload;

    yield call(api.delete, `/itineraries/${itineraryId}/unfavorite`);

    yield put(removeFavoriteSuccess(itineraryId));
  } catch (error) {
    yield put(removeFavoriteFailure());
    Toast.show({
      text1: 'Erro ao remover dos favoritos.',
      position: 'bottom',
      type: 'error',
    });
  }
}

export default all([
  takeLatest('@favorites/SET_FAVORITE_REQUEST', favoriteItinerary),
  takeLatest('@favorites/REMOVE_FAVORITE_REQUEST', unfavoriteItinerary),
  takeLatest('@favorites/GET_FAVORITES_REQUEST', getFavoritedItineraries),
]);
