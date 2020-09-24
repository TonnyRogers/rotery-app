import {Alert} from 'react-native';
import {takeLatest, put, call, all} from 'redux-saga/effects';

import api from '../../../services/api';
import {
  getItinerariesSuccess,
  createItineraryRequest,
  createItinerarySuccess,
  createItineraryFailure,
} from './actions';

export function* getItineraries() {
  try {
    const response = yield call(api.get, '/itineraries');

    yield put(getItinerariesSuccess(response.data));
  } catch (error) {
    console.tron.log(error);
    Alert.alert('Erro ao buscar seus roteiros');
  }
}

export function* createItinerary({
  payload,
}: ReturnType<typeof createItineraryRequest>) {
  try {
    const {
      name,
      dateBegin,
      dateEnd,
      dateLimit,
      location,
      capacity,
      description,
      images,
      lodgings,
      activities,
      transports,
    } = payload;

    const response = yield call(api.post, '/itineraries', {
      name,
      description,
      dateBegin,
      dateEnd,
      dateLimit,
      capacity,
      location,
      lodgings,
      activities,
      transports,
    });

    console.tron.log(response);

    yield put(createItinerarySuccess(response.data));
  } catch (error) {
    console.tron.log(error);
    Alert.alert('Erro ao criar roteiro.');
    yield put(createItineraryFailure());
  }
}

export default all([
  takeLatest('@itineraries/CREATE_ITINERARY_REQUEST', createItinerary),
  takeLatest('@itineraries/GET_ITINERARIES_REQUEST', getItineraries),
]);
