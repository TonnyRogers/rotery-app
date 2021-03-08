import {combineReducers} from 'redux';

import auth from './auth/reducer';
import bottomSheet from './bottomsheet/reducer';
import connections from './connections/reducer';
import dynamicItinerary from './dynamicItinerary/reducer';
import favorites from './favorites/reducer';
import feed from './feed/reducer';
import guides from './guides/reducer';
import profile from './profile/reducer';
import itineraries from './itineraries/reducer';
import messages from './messages/reducer';
import nextItineraries from './nextItineraries/reducer';
import notifications from './notifications/reducer';
import options from './options/reducer';
import websocket from './websocket/reducer';

const rootReducer = combineReducers({
  auth,
  bottomSheet,
  connections,
  dynamicItinerary,
  favorites,
  feed,
  guides,
  profile,
  itineraries,
  options,
  messages,
  notifications,
  nextItineraries,
  websocket,
});

export type RootStateProps = ReturnType<typeof rootReducer>;

export default rootReducer;
