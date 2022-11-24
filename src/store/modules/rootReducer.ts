import {combineReducers} from 'redux';

import auth from './auth/reducer';
import bankAccount from './bankAccount/reducer';
import bottomSheet from './bottomsheet/reducer';
import connections from './connections/reducer';
import dynamicItinerary from './dynamicItinerary/reducer';
import favorites from './favorites/reducer';
import feed from './feed/reducer';
import guides from './guides/reducer';
import locations from './locations/reducer';
import metadata from './metadata/reducer';
import profile from './profile/reducer';
import itineraries from './itineraries/reducer';
import messages from './messages/reducer';
import nextItineraries from './nextItineraries/reducer';
import notifications from './notifications/reducer';
import options from './options/reducer';
import websocket from './websocket/reducer';
import checkout from './checkout/reducer';
import chats from './chats/reducer';
import subscription from './subscription/reducer';

const rootReducer = combineReducers({
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
  notifications,
  nextItineraries,
  options,
  subscription,
  websocket,
});

export type RootStateProps = ReturnType<typeof rootReducer>;

export default rootReducer;
