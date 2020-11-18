import {Alert} from 'react-native';
import {takeLatest, put, call, all} from 'redux-saga/effects';

import api from '../../../services/api';
import {setLoadingTrue, setLoadingFalse} from '../auth/actions';
import {
  getFeedRequest,
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

export function* getItineraries() {
  try {
    yield put(setLoadingTrue());

    const response = yield call(api.get, '/feed');

    yield put(getFeedSuccess(response.data.data));
    yield put(setLoadingFalse());
  } catch (error) {
    yield put(getFeedFailure());
    yield put(setLoadingFalse());
    Alert.alert('Erro ao buscar seus roteiros');
  }
}

export function* getFilteredItineraries({
  payload,
}: ReturnType<typeof getFeedFilteredRequest>) {
  try {
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
    Alert.alert('Erro ao buscar seus roteiros');
  }
}

export function* makeQuestion({
  payload,
}: ReturnType<typeof makeQuestionRequest>) {
  try {
    const {question, itineraryId} = payload;
    yield put(setLoadingTrue());
    yield call(api.post, `/itineraries/${itineraryId}/questions`, {question});

    yield put(getFeedRequest());
    yield put(makeQuestionSuccess());
    yield put(setLoadingFalse());
    Alert.alert('Pergunta enviada!');
  } catch (error) {
    yield put(makeQuestionFailure());
    yield put(setLoadingFalse());
    Alert.alert('Erro ao criar pergunta');
  }
}

export function* joinItinerary({payload}: ReturnType<typeof joinRequest>) {
  try {
    const {itineraryId, userId} = payload;
    const currentDate = new Date();

    yield put(setLoadingTrue());
    yield call(api.post, `/itineraries/${itineraryId}/join`, {
      user_id: userId,
      current_date: currentDate,
    });

    yield put(joinSuccess());
    yield put(getFeedRequest());
    yield put(setLoadingFalse());
    Alert.alert('Solicitação enviada.');
  } catch (error) {
    yield put(joinFailure());
    yield put(setLoadingFalse());
    Alert.alert('Erro ao solicitar participação.');
  }
}

export function* getPaginatedItineraries({
  payload,
}: ReturnType<typeof paginateFeedRequest>) {
  try {
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
    Alert.alert('Erro ao buscar seus roteiros');
  }
}

export default all([
  takeLatest('@feed/PAGINATE_FEED_REQUEST', getPaginatedItineraries),
  takeLatest('@feed/JOIN_REQUEST', joinItinerary),
  takeLatest('@feed/GET_FEED_REQUEST', getItineraries),
  takeLatest('@feed/GET_FEED_FILTERED_REQUEST', getFilteredItineraries),
  takeLatest('@feed/MAKE_QUESTION_REQUEST', makeQuestion),
]);
