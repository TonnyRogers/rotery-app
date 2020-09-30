import {all} from 'redux-saga/effects';

import auth from './auth/sagas';
import profile from './profile/sagas';
import itineraries from './itineraries/sagas';
import nextItineraries from './nextItineraries/sagas';
import options from './options/sagas';

export default function* rootSaga() {
  return yield all([auth, profile, itineraries, options, nextItineraries]);
}
