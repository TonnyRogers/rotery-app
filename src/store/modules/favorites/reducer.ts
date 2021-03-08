import produce from 'immer';

import {ItineraryProps} from '../../../utils/types';

interface InitialStateProps {
  itineraries: ItineraryProps[] | null;
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
};

export default function feed(state = INITIAL_STATE, action: ActionProps) {
  return produce(state, (draft) => {
    switch (action.type) {
      case '@favorites/GET_FAVORITES_SUCCESS': {
        draft.itineraries = action.payload.itineraries;
        break;
      }
      default:
    }
  });
}
