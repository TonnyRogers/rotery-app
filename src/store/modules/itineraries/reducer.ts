import produce from 'immer';

import {ItineraryProps} from '../../../utils/types';

interface InitialStateProps {
  itineraries: ItineraryProps[] | null;
  loading: boolean;
}

interface ActionProps {
  type: string;
  payload: {
    itineraries: [];
    itinerary: {};
  };
}

const INITIAL_STATE: InitialStateProps = {
  itineraries: null,
  loading: false,
};

export default function itineraries(
  state = INITIAL_STATE,
  action: ActionProps,
) {
  return produce(state, (draft) => {
    switch (action.type) {
      case '@itineraries/GET_ITINERARIES_REQUEST': {
        draft.loading = true;
        break;
      }
      case '@itineraries/GET_ITINERARIES_SUCCESS': {
        draft.loading = false;
        draft.itineraries = action.payload.itineraries;
        break;
      }
      case '@itineraries/GET_ITINERARIES_FAILURE': {
        draft.loading = false;
        break;
      }
      case '@itineraries/CREATE_ITINERARY_REQUEST': {
        draft.loading = true;
        break;
      }
      case '@itineraries/CREATE_ITINERARY_SUCCESS': {
        draft.loading = false;
        break;
      }
      case '@itineraries/CREATE_ITINERARY_FAILURE': {
        draft.loading = false;
        break;
      }
      default:
    }
  });
}
