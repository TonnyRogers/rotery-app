import produce from 'immer';

import {ItineraryProps} from '../../../utils/types';
interface InitialStateProps {
  itineraries: ItineraryProps[] | [];
}

interface ActionProps {
  type: string;
  payload: {
    itineraries: [];
    itinerary: {};
  };
}

const INITIAL_STATE: InitialStateProps = {
  itineraries: [],
};

export default function feed(state = INITIAL_STATE, action: ActionProps) {
  return produce(state, (draft) => {
    switch (action.type) {
      case '@feed/GET_FEED_SUCCESS': {
        draft.itineraries = action.payload.itineraries;
        break;
      }
      case '@feed/GET_FEED_FILTERED_SUCCESS': {
        draft.itineraries = action.payload.itineraries;
        break;
      }
      case '@feed/PAGINATE_FEED_SUCCESS': {
        const itineraries = [
          ...draft.itineraries,
          ...action.payload.itineraries,
        ];

        draft.itineraries = itineraries;
        break;
      }
      default:
    }
  });
}
