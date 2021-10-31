import {takeLatest, put, call, all} from 'redux-saga/effects';
import Toast from 'react-native-toast-message';

import api from '../../../services/api';
import NetInfo from '../../../services/netinfo';
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
  paginateFeedFailure,
  getFeedDetailRequest,
  getFeedDetailSuccess,
  getFeedDetailFailure,
  FeedActions,
} from './actions';
import {AxiosResponse} from 'axios';
import {MemberProps, FeedItineraryProps} from '../../../utils/types';

interface ExceptionRequest {
  response: string;
  status: number;
  message: string;
  name: string;
}

export function* getFeedDetail({
  payload,
}: ReturnType<typeof getFeedDetailRequest>) {
  try {
    const info = yield call(NetInfo);

    if (!info.status) {
      yield put(getFeedFailure());
      return;
    }

    const {itineraryId} = payload;
    const response: AxiosResponse<FeedItineraryProps> = yield call(
      api.get,
      `/itineraries/${itineraryId}/details`,
    );

    yield put(getFeedDetailSuccess(response.data));
  } catch (error) {
    yield put(getFeedDetailFailure());
    Toast.show({
      text1: 'Erro ao buscar seus roteiros.',
      position: 'bottom',
      type: 'error',
    });
  }
}

export function* getItineraries() {
  try {
    const info = yield call(NetInfo);

    if (!info.status) {
      yield put(getFeedFailure());
      return;
    }

    const response: AxiosResponse<{items: FeedItineraryProps[]; meta: any}> =
      yield call(api.get, '/feed?page=1&limit=10');

    yield put(getFeedSuccess(response.data.items));
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
      yield put(getFeedFilteredFailure());
      return;
    }

    const {filter} = payload;

    const response = yield call(
      api.get,
      `/feed?page=1&begin=${filter.begin}&end=${filter.end}${
        filter.location
          ? `&city=${filter.location.city}&state=${filter.location.state}`
          : ''
      }`,
    );

    yield put(getFeedFilteredSuccess(response.data.data));
  } catch (error) {
    yield put(getFeedFilteredFailure());
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

export function* joinItinerary({payload}: ReturnType<typeof joinRequest>) {
  try {
    const info = yield call(NetInfo);

    if (!info.status) {
      yield put(joinFailure());
      return;
    }

    const {itineraryId} = payload;
    const currentDate = new Date();

    const response: AxiosResponse<MemberProps> = yield call(
      api.post,
      `/itineraries/${itineraryId}/join`,
      {
        currentDate: currentDate,
      },
    );

    yield put(joinSuccess(response.data));

    Toast.show({
      text1: 'Solicitação enviada!',
      position: 'bottom',
      type: 'success',
    });
  } catch (error) {
    yield put(joinFailure());
    Toast.show({
      text1: `${translateError(error.response.data.message)}`,
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
      yield put(getFeedFilteredFailure());
      return;
    }

    const {
      filter: {page, begin, end, location, limit},
    } = payload;

    const url = `/feed?page=${page || 1}&limit=${limit || 10}${
      begin ? `&begin=${begin}` : ''
    }${end ? `&end=${end}` : ''}${
      location ? `&city=${location.city}&state=${location.state}` : ''
    }`;

    // TRIM and sanization
    // url.replace(/\s+/g, '').trim()

    const response = yield call(api.get, url);

    if (response.data.items.length > 0) {
      yield put(paginateFeedSuccess(response.data.items));
    } else {
      yield put(paginateFeedFailure());
    }
  } catch (error) {
    yield put(getFeedFilteredFailure());
    Toast.show({
      text1: 'Erro ao buscar seus roteiros.',
      position: 'bottom',
      type: 'error',
    });
  }
}

export default all([
  takeLatest(FeedActions.GET_FEED_DETAIL_REQUEST, getFeedDetail),
  takeLatest('@feed/PAGINATE_FEED_REQUEST', getPaginatedItineraries),
  takeLatest('@feed/JOIN_REQUEST', joinItinerary),
  takeLatest('@feed/GET_FEED_REQUEST', getItineraries),
  takeLatest('@feed/GET_FEED_FILTERED_REQUEST', getFilteredItineraries),
  takeLatest('@feed/MAKE_QUESTION_REQUEST', makeQuestion),
]);
