import produce from 'immer';

import {ItineraryProps} from '../../../utils/types';

interface InitialStateProps {
  itinerary: ItineraryProps | null;
  loading: boolean;
}

interface ActionProps {
  type: string;
  payload: {
    itinerary: ItineraryProps;
  };
}

const INITIAL_STATE: InitialStateProps = {
  itinerary: null,
  loading: false,
};

export default function dynamicItinerary(
  state = INITIAL_STATE,
  action: ActionProps,
) {
  return produce(state, (draft) => {
    switch (action.type) {
      case '@dynamicItinerary/GET_DETAILS_REQUEST': {
        draft.loading = true;
        break;
      }
      case '@dynamicItinerary/GET_DETAILS_SUCCESS': {
        draft.itinerary = action.payload.itinerary;
        draft.loading = false;
        break;
      }
      case '@dynamicItinerary/GET_DETAILS_FAILURE': {
        draft.loading = false;
        break;
      }
      case '@dynamicItinerary/UPDATE_DETAILS_REQUEST': {
        draft.loading = true;
        break;
      }
      case '@dynamicItinerary/UPDATE_DETAILS_SUCCESS': {
        draft.itinerary = action.payload.itinerary;
        draft.loading = false;
        break;
      }
      case '@dynamicItinerary/UPDATE_DETAILS_FAILURE': {
        draft.loading = false;
        break;
      }
      default:
    }
  });
}
