import {combineReducers} from 'redux';

import auth from './auth/reducer';
import profile from './profile/reducer';
import itineraries from './itineraries/reducer';

export default combineReducers({
  auth,
  profile,
  itineraries,
});
