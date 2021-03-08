import produce from 'immer';

interface InitalStateProps {
  feedGuide: boolean;
  newItineraryGuide: boolean;
  myItineraryGuide: boolean;
}

interface ActionProps {
  type: string;
}

const INITIAL_PROPS: InitalStateProps = {
  feedGuide: false,
  newItineraryGuide: false,
  myItineraryGuide: false,
};

export default function guides(state = INITIAL_PROPS, action: ActionProps) {
  return produce(state, (draft) => {
    switch (action.type) {
      case '@guides/SHOW_FEED_GUIDE_SUCCESS': {
        draft.feedGuide = true;
        break;
      }
      case '@guides/SHOW_NEW_ITINERARY_GUIDE_SUCCESS': {
        draft.newItineraryGuide = true;
        break;
      }
      case '@guides/SHOW_MY_ITINERARY_GUIDE_SUCCESS': {
        draft.myItineraryGuide = true;
        break;
      }
      case '@guides/HIDE_FEED_GUIDE': {
        draft.feedGuide = false;
        break;
      }
      case '@guides/HIDE_NEW_ITINERARY_GUIDE': {
        draft.newItineraryGuide = false;
        break;
      }
      case '@guides/HIDE_MY_ITINERARY_GUIDE': {
        draft.myItineraryGuide = false;
        break;
      }
      default:
    }
  });
}
