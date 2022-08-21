import {all, call, put, takeLatest} from 'redux-saga/effects';
import AsyncStorage from '@react-native-community/async-storage';
import {showItineraryPaymentGuideSuccess, GuidesActions} from './actions';

export function* handleShowItineraryPaymentViewed() {
  const hasViewed = yield call(
    [AsyncStorage, 'getItem'],
    '@guide:itineraryPayment',
  );

  if (!hasViewed) {
    yield put(showItineraryPaymentGuideSuccess());
  }
}

export function* setItineraryPaymentViewed() {
  yield call([AsyncStorage, 'setItem'], '@guide:itineraryPayment', 'true');
}

export default all([
  takeLatest(
    GuidesActions.HIDE_ITINERARY_PAYMENT_GUIDE,
    setItineraryPaymentViewed,
  ),
]);
