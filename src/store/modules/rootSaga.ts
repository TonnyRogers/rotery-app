import {all} from 'redux-saga/effects';

import auth from './auth/sagas';
import favorites from './favorites/sagas';
import feed from './feed/sagas';
import profile from './profile/sagas';
import itineraries from './itineraries/sagas';
import nextItineraries from './nextItineraries/sagas';
import options from './options/sagas';

export default function* rootSaga() {
  return yield all([
    auth,
    favorites,
    feed,
    profile,
    itineraries,
    options,
    nextItineraries,
  ]);
}
