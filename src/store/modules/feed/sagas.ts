import {Alert} from 'react-native';
import {takeLatest, put, call, all} from 'redux-saga/effects';

import api from '../../../services/api';
import {setLoadingTrue, setLoadingFalse} from '../auth/actions';
import {
  getFeedRequest,
  getFeedSuccess,
  getFeedFailure,
  makeQuestionRequest,
  makeQuestionSuccess,
  makeQuestionFailure,
  joinRequest,
  joinSuccess,
  joinFailure,
} from './actions';

export function* getItineraries() {
  try {
    yield put(setLoadingTrue());

    const response = yield call(api.get, '/feed');

    yield put(getFeedSuccess(response.data));
    yield put(setLoadingFalse());
  } catch (error) {
    yield put(getFeedFailure());
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
    const currentDate = new Date('now');

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

export default all([
  takeLatest('@feed/JOIN_REQUEST', joinItinerary),
  takeLatest('@feed/GET_FEED_REQUEST', getItineraries),
  takeLatest('@feed/MAKE_QUESTION_REQUEST', makeQuestion),
]);
