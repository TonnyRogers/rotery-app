import {combineReducers} from 'redux';

import auth from './auth/reducer';
import profile from './profile/reducer';
import itineraries from './itineraries/reducer';
import nextItineraries from './nextItineraries/reducer';
import options from './options/reducer';

const rootReducer = combineReducers({
  auth,
  profile,
  itineraries,
  options,
  nextItineraries,
});

export type RootStateProps = ReturnType<typeof rootReducer>;

export default rootReducer;
