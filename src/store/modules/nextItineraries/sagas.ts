import {Alert} from 'react-native';
import {takeLatest, put, call, all} from 'redux-saga/effects';
import {eventChannel, END} from 'redux-saga';

import api from '../../../services/api';
import {
  getNextItinerariesRequest,
  getNextItinerariesSuccess,
  getNextItinerariesFailure,
  makeQuestionRequest,
  makeQuestionSuccess,
  makeQuestionFailure,
  rateItineraryRequest,
  rateItinerarySuccess,
  rateItineraryFailure,
  leaveItineraryRequest,
  leaveItinerarySuccess,
} from './actions';
import {setLoadingTrue, setLoadingFalse} from '../auth/actions';
import * as RootNavigation from '../../../RootNavigation';

const delay = (time: number) =>
  new Promise((resolve) => setTimeout(resolve, time));

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

export function* rateItinerary({
  payload,
}: ReturnType<typeof rateItineraryRequest>) {
  try {
    const {
      userId,
      itineraryId,
      itineraryRate,
      userRate,
      itineraryDescription,
      userDescription,
    } = payload;

    yield put(setLoadingTrue());

    yield call(api.post, `/users/${userId}/rate`, {
      rate: userRate,
      description: userDescription,
    });

    yield call(api.post, `/itineraries/${itineraryId}/rate`, {
      rate: itineraryRate,
      description: itineraryDescription,
    });

    yield put(rateItinerarySuccess());
    yield put(setLoadingFalse());
    RootNavigation.navigate('MyItineraries', {});
  } catch (error) {
    yield put(rateItineraryFailure());
    yield put(setLoadingFalse());
    Alert.alert('Erro ao avaliar roteiro');
  }
}

export function* leaveItinerary({
  payload,
}: ReturnType<typeof leaveItineraryRequest>) {
  try {
    const {itineraryId} = payload;

    RootNavigation.navigate('NextItineraries');
    yield put(setLoadingTrue());
    yield call(api.post, `/itineraries/${itineraryId}/leave`);
    yield put(leaveItinerarySuccess());
    yield put(setLoadingFalse());
    yield call(delay, 250);
    yield put(getNextItinerariesRequest());
  } catch (error) {
    yield put(setLoadingFalse());
    Alert.alert('Erro ao sair do roteiro.');
  }
}

export default all([
  takeLatest('@nextItineraries/LEAVE_ITINERARY_REQUEST', leaveItinerary),
  takeLatest('@nextItineraries/RATE_ITINERARY_REQUEST', rateItinerary),
  takeLatest('@ws/NOTIFICATION_MESSAGES', getItineraries),
  takeLatest('@nextItineraries/MAKE_QUESTION_REQUEST', makeQuestion),
  takeLatest('@nextItineraries/GET_NEXTITINERARIES_REQUEST', getItineraries),
]);
