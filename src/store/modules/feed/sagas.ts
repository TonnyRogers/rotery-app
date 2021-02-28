import {takeLatest, put, call, all} from 'redux-saga/effects';
import Toast from 'react-native-toast-message';

import api from '../../../services/api';
import NetInfo from '../../../services/netinfo';
import {setLoadingTrue, setLoadingFalse} from '../auth/actions';
import {translateError} from '../../../lib/utils';

import {
  getFeedSuccess,
  getFeedFailure,
  getFeedFilteredRequest,
  getFeedFilteredSuccess,
  getFeedFilteredFailure,
  makeQuestionRequest,
  makeQuestionSuccess,
  makeQuestionFailure,
  joinRequest,
  joinSuccess,
  joinFailure,
  paginateFeedRequest,
  paginateFeedSuccess,
} from './actions';
import {updateDetailsRequest} from '../dynamicItinerary/actions';

export function* getItineraries() {
  try {
    const info = yield call(NetInfo);

    if (!info.status) {
      yield put(setLoadingFalse());
      return;
    }

    const response = yield call(api.get, '/feed');

    yield put(getFeedSuccess(response.data.data));
  } catch (error) {
    yield put(getFeedFailure());
    Toast.show({
      text1: 'Erro ao buscar seus roteiros.',
      position: 'bottom',
      type: 'error',
    });
  }
}

export function* getFilteredItineraries({
  payload,
}: ReturnType<typeof getFeedFilteredRequest>) {
  try {
    const info = yield call(NetInfo);

    if (!info.status) {
      yield put(setLoadingFalse());
      return;
    }

    const {filter} = payload;

    yield put(setLoadingTrue());

    const response = yield call(
      api.get,
      `/feed?begin=${filter.begin}&end=${filter.end}`,
    );

    if (response.data.data.length > 0) {
      yield put(getFeedFilteredSuccess(response.data.data));
    }

    yield put(setLoadingFalse());
  } catch (error) {
    yield put(getFeedFilteredFailure());
    yield put(setLoadingFalse());
    Toast.show({
      text1: 'Erro ao buscar seus roteiros.',
      position: 'bottom',
      type: 'error',
    });
  }
}

export function* makeQuestion({
  payload,
}: ReturnType<typeof makeQuestionRequest>) {
  try {
    const info = yield call(NetInfo);

    if (!info.status) {
      yield put(setLoadingFalse());
      return;
    }

    const {question, itineraryId} = payload;
    yield put(setLoadingTrue());
    yield call(api.post, `/itineraries/${itineraryId}/questions`, {question});

    yield put(updateDetailsRequest());
    yield put(makeQuestionSuccess());
    yield put(setLoadingFalse());
    Toast.show({
      text1: 'Pergunta enviada!',
      position: 'bottom',
      type: 'success',
    });
  } catch (error) {
    yield put(makeQuestionFailure());
    yield put(setLoadingFalse());
    Toast.show({
      text1: 'Erro ao criar pergunta.',
      position: 'bottom',
      type: 'error',
    });
  }
}

export function* joinItinerary({payload}: ReturnType<typeof joinRequest>) {
  try {
    const info = yield call(NetInfo);

    if (!info.status) {
      yield put(setLoadingFalse());
      return;
    }

    const {itineraryId, userId} = payload;
    const currentDate = new Date();

    yield put(setLoadingTrue());
    yield call(api.post, `/itineraries/${itineraryId}/join`, {
      user_id: userId,
      current_date: currentDate,
    });

    yield put(joinSuccess());
    yield put(updateDetailsRequest());
    yield put(setLoadingFalse());
    Toast.show({
      text1: 'Solicitação enviada!',
      position: 'bottom',
      type: 'success',
    });
  } catch (error) {
    yield put(joinFailure());
    yield put(setLoadingFalse());
    console.tron.log(error.response);
    Toast.show({
      text1: `${translateError(error.response.data[0].message)}`,
      position: 'bottom',
      type: 'error',
    });
  }
}

export function* getPaginatedItineraries({
  payload,
}: ReturnType<typeof paginateFeedRequest>) {
  try {
    const info = yield call(NetInfo);

    if (!info.status) {
      yield put(setLoadingFalse());
      return;
    }

    const {page, begin, end} = payload;

    yield put(setLoadingTrue());

    const response = yield call(
      api.get,
      `/feed?${begin ? `begin=${begin}&` : ''}${end ? `end=${end}&` : ''}page=${
        page || 1
      }`,
    );

    if (response.data.data.length > 0) {
      yield put(paginateFeedSuccess(response.data.data));
    }

    yield put(setLoadingFalse());
  } catch (error) {
    yield put(getFeedFilteredFailure());
    yield put(setLoadingFalse());
    Toast.show({
      text1: 'Erro ao buscar seus roteiros.',
      position: 'bottom',
      type: 'error',
    });
  }
}

export default all([
  takeLatest('@feed/PAGINATE_FEED_REQUEST', getPaginatedItineraries),
  takeLatest('@feed/JOIN_REQUEST', joinItinerary),
  takeLatest('@feed/GET_FEED_REQUEST', getItineraries),
  takeLatest('@feed/GET_FEED_FILTERED_REQUEST', getFilteredItineraries),
  takeLatest('@feed/MAKE_QUESTION_REQUEST', makeQuestion),
]);
