import {takeLatest, put, call, all} from 'redux-saga/effects';
import Toast from 'react-native-toast-message';

import api from '../../../services/api';
import NetInfo from '../../../services/netinfo';
import {
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
  leaveItineraryFailure,
  NextItinerariesActions,
  getNextItineraryDetailsRequest,
  getNextItineraryDetailsFailure,
  getNextItineraryDetailsSuccess,
} from './actions';
import * as RootNavigation from '../../../RootNavigation';
import {AxiosResponse} from 'axios';
import {ItineraryProps} from '../../../utils/types';

const delay = (time: number) =>
  new Promise((resolve) => setTimeout(resolve, time));

export function* getNextItineraryDetails({
  payload,
}: ReturnType<typeof getNextItineraryDetailsRequest>) {
  try {
    const {itineraryId} = payload;
    const info = yield call(NetInfo);

    if (!info.status) {
      yield put(getNextItinerariesFailure());
      return;
    }

    const response: AxiosResponse<ItineraryProps> = yield call(
      api.get,
      `/itineraries/${itineraryId}/details`,
    );

    yield put(getNextItineraryDetailsSuccess(response.data));
  } catch (error) {
    yield put(getNextItineraryDetailsFailure());
    Toast.show({
      text1: 'Erro ao buscar novas mensagens.',
      position: 'bottom',
      type: 'error',
    });
  }
}

export function* getItineraries() {
  try {
    const info = yield call(NetInfo);

    if (!info.status) {
      yield put(getNextItinerariesFailure());
      return;
    }

    const response: AxiosResponse<ItineraryProps[]> = yield call(
      api.get,
      '/itineraries/member',
    );

    yield put(getNextItinerariesSuccess(response.data));
  } catch (error) {
    yield put(getNextItinerariesFailure());
    Toast.show({
      text1: 'Erro ao buscar novas mensagens.',
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
      yield put(makeQuestionFailure());
      return;
    }

    const {question, itineraryId} = payload;
    const response = yield call(
      api.post,
      `/itineraries/${itineraryId}/questions`,
      {question},
    );

    yield put(makeQuestionSuccess(response.data));
    Toast.show({
      text1: 'Pergunta enviada!',
      position: 'bottom',
      type: 'success',
    });
  } catch (error) {
    yield put(makeQuestionFailure());
    Toast.show({
      text1: 'Erro ao criar pergunta.',
      position: 'bottom',
      type: 'error',
    });
  }
}

export function* rateItinerary({
  payload,
}: ReturnType<typeof rateItineraryRequest>) {
  try {
    const info = yield call(NetInfo);

    if (!info.status) {
      yield put(rateItineraryFailure());
      return;
    }

    const {
      userId,
      itineraryId,
      itineraryRate,
      userRate,
      itineraryDescription,
      userDescription,
    } = payload;

    yield call(api.post, `/users/${userId}/rate`, {
      rate: userRate,
      description: userDescription,
    });

    yield call(api.post, `/itineraries/${itineraryId}/rate`, {
      rate: itineraryRate,
      description: itineraryDescription,
    });

    Toast.show({
      text1: 'Avaliação enviada!',
      text2: 'Obrigado 🥳🤙',
      position: 'bottom',
      type: 'success',
    });

    yield put(rateItinerarySuccess());
    RootNavigation.replace('NextItineraries');
  } catch (error) {
    yield put(rateItineraryFailure());
    Toast.show({
      text1: 'Erro ao avaliar roteiro.',
      position: 'bottom',
      type: 'error',
    });
  }
}

export function* leaveItinerary({
  payload,
}: ReturnType<typeof leaveItineraryRequest>) {
  try {
    const info = yield call(NetInfo);

    if (!info.status) {
      yield put(leaveItineraryFailure());
      return;
    }

    const {itineraryId} = payload;

    RootNavigation.replace('NextItineraries');
    yield call(delay, 250);
    yield call(api.post, `/itineraries/${itineraryId}/leave`);
    yield put(leaveItinerarySuccess());
  } catch (error) {
    yield put(leaveItineraryFailure());
    Toast.show({
      text1: 'Erro ao sair do roteiro.',
      position: 'bottom',
      type: 'error',
    });
  }
}

export default all([
  takeLatest(
    NextItinerariesActions.GET_NEXTITINERARIES_DETAILS_REQUEST,
    getNextItineraryDetails,
  ),
  takeLatest(NextItinerariesActions.LEAVE_ITINERARY_REQUEST, leaveItinerary),
  takeLatest(NextItinerariesActions.RATE_ITINERARY_REQUEST, rateItinerary),
  takeLatest(NextItinerariesActions.MAKE_QUESTION_REQUEST, makeQuestion),
  takeLatest(
    NextItinerariesActions.GET_NEXTITINERARIES_REQUEST,
    getItineraries,
  ),
]);
