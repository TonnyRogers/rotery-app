import {Location} from '../../../utils/types';
import {LocationActions} from './actions';
import produce from 'immer';
import {AuthActions} from '../auth/actions';

type InitalState = {
  loading: boolean;
  locations: Location[];
};

const INITIAL_STATE: InitalState = {
  locations: [],
  loading: false,
};

interface ActionProps {
  type: string;
  payload: {
    locations: Location[];
    page: number;
  };
}

export default function locations(state = INITIAL_STATE, action: ActionProps) {
  return produce(state, (draft) => {
    switch (action.type) {
      case LocationActions.GET_LOCATION_FEED_REQUEST: {
        draft.loading = true;
        break;
      }
      case LocationActions.GET_LOCATION_FEED_SUCCESS: {
        if (action.payload.page === 1) {
          draft.locations = action.payload.locations;
        } else {
          draft.locations = [...draft.locations, ...action.payload.locations];
        }

        draft.loading = false;
        break;
      }
      case LocationActions.GET_LOCATION_FEED_FAILURE: {
        draft.loading = false;
        break;
      }
      case AuthActions.LOGOUT: {
        draft.locations = INITIAL_STATE.locations;
        draft.loading = INITIAL_STATE.loading;
        break;
      }
    }
  });
}
