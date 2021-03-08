import {takeLatest, all, put, call} from 'redux-saga/effects';
import AsyncStorage from '@react-native-community/async-storage';

import {
  showFeedGuideSuccess,
  showMyItineraryGuideSuccess,
  showNewItineraryGuideSuccess,
} from './actions';

export function* handleShowFeed() {
  const isVisible = yield call([AsyncStorage, 'getItem'], '@guide:feed');

  if (!isVisible) {
    yield put(showFeedGuideSuccess());
    yield call([AsyncStorage, 'setItem'], '@guide:feed', 'true');
  }
}

export function* handleShowNewItinerary() {
  const isVisible = yield call(
    [AsyncStorage, 'getItem'],
    '@guide:newItinerary',
  );

  if (!isVisible) {
    yield put(showNewItineraryGuideSuccess());
    yield call([AsyncStorage, 'setItem'], '@guide:newItinerary', 'true');
  }
}

export function* handleShowMyItinerary() {
  const isVisible = yield call([AsyncStorage, 'getItem'], '@guide:myItinerary');

  if (!isVisible) {
    yield put(showMyItineraryGuideSuccess());
    yield call([AsyncStorage, 'setItem'], '@guide:myItinerary', 'true');
  }
}

export default all([
  takeLatest('@guides/SHOW_FEED_GUIDE', handleShowFeed),
  takeLatest('@guides/SHOW_NEW_ITINERARY_GUIDE', handleShowNewItinerary),
  takeLatest('@guides/SHOW_MY_ITINERARY_GUIDE', handleShowMyItinerary),
]);
