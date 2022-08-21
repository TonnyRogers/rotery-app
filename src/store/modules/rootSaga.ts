import {all} from 'redux-saga/effects';

import auth from './auth/sagas';
import bankAccount from './bankAccount/sagas';
import bottomSheet from './bottomsheet/sagas';
import connections from './connections/sagas';
import chats from './chats/sagas';
import dynamicItinerary from './dynamicItinerary/sagas';
import favorites from './favorites/sagas';
import feed from './feed/sagas';
import guides from './guides/sagas';
import locations from './locations/sagas';
import metadata from './metadata/sagas';
import profile from './profile/sagas';
import itineraries from './itineraries/sagas';
import nextItineraries from './nextItineraries/sagas';
import messages from './messages/sagas';
import notifications from './notifications/sagas';
import options from './options/sagas';
import websocket from './websocket/sagas';
import checkout from './checkout/sagas';
import subscription from './subscription/sagas';

export default function* rootSaga() {
  return yield all([
    auth,
    bankAccount,
    bottomSheet,
    connections,
    chats,
    checkout,
    dynamicItinerary,
    favorites,
    feed,
    guides,
    locations,
    metadata,
    profile,
    itineraries,
    messages,
    nextItineraries,
    notifications,
    options,
    subscription,
    websocket,
  ]);
}
