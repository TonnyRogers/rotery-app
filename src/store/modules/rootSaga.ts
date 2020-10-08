import {all} from 'redux-saga/effects';

import auth from './auth/sagas';
import connections from './connections/sagas';
import favorites from './favorites/sagas';
import feed from './feed/sagas';
import profile from './profile/sagas';
import itineraries from './itineraries/sagas';
import nextItineraries from './nextItineraries/sagas';
import messages from './messages/sagas';
import notifications from './notifications/sagas';
import options from './options/sagas';
import websocket from './websocket/sagas';

export default function* rootSaga() {
  return yield all([
    auth,
    connections,
    favorites,
    feed,
    profile,
    itineraries,
    options,
    nextItineraries,
    notifications,
    messages,
    websocket,
  ]);
}
