import {takeLatest, put, call, all} from 'redux-saga/effects';
import Toast from 'react-native-toast-message';

import api from '../../../services/api';
import NetInfo from '../../../services/netinfo';
import {setLoadingTrue, setLoadingFalse} from '../auth/actions';
import {
  getFavoritesRequest,
  getFavoritesSuccess,
  getFavoritesFailure,
  setFavoriteRequest,
  setFavoriteSuccess,
  setFavoriteFailure,
  removeFavoriteRequest,
  removeFavoriteSuccess,
  removeFavoriteFailure,
} from './actions';

export function* getFavoritedItineraries() {
  try {
    const info = yield call(NetInfo);

    if (!info.status) {
      yield put(setLoadingFalse());
      return;
    }

    yield put(setLoadingTrue());

    const response = yield call(api.get, '/favorites');

    yield put(getFavoritesSuccess(response.data));
    yield put(setLoadingFalse());
  } catch (error) {
    yield put(getFavoritesFailure());
    yield put(setLoadingFalse());
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
      yield put(setLoadingFalse());
      return;
    }

    const {itineraryId} = payload;

    yield call(api.post, `/itineraries/${itineraryId}/favorite`);

    yield put(setFavoriteSuccess());
    yield put(getFavoritesRequest());
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
      yield put(setLoadingFalse());
      return;
    }

    const {itineraryId} = payload;

    yield call(api.delete, `/itineraries/${itineraryId}/unfavorite`);

    yield put(removeFavoriteSuccess());
    yield put(getFavoritesRequest());
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
