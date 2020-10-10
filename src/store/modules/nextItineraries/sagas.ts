import {Alert} from 'react-native';
import {takeLatest, put, call, all} from 'redux-saga/effects';

import api from '../../../services/api';
import {
  getNextItinerariesRequest,
  getNextItinerariesSuccess,
  getNextItinerariesFailure,
  makeQuestionRequest,
  makeQuestionSuccess,
  makeQuestionFailure,
} from './actions';
import {setLoadingTrue, setLoadingFalse} from '../auth/actions';

export function* getItineraries() {
  try {
    yield put(setLoadingTrue());

    const response = yield call(api.get, '/members/itineraries');

    yield put(getNextItinerariesSuccess(response.data));
    yield put(setLoadingFalse());
  } catch (error) {
    yield put(getNextItinerariesFailure());
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

    yield put(getNextItinerariesRequest());
    yield put(makeQuestionSuccess());
    yield put(setLoadingFalse());
    Alert.alert('Pergunta enviada!');
  } catch (error) {
    yield put(makeQuestionFailure());
    yield put(setLoadingFalse());
    Alert.alert('Erro ao criar pergunta');
  }
}

export default all([
  takeLatest('WS_NOTIFICATION_MESSAGES', getItineraries),
  takeLatest('@nextItineraries/MAKE_QUESTION_REQUEST', makeQuestion),
  takeLatest('@nextItineraries/GET_NEXTITINERARIES_REQUEST', getItineraries),
]);
