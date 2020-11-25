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
  feedGuide: true,
  newItineraryGuide: true,
  myItineraryGuide: true,
};

export default function guides(state = INITIAL_PROPS, action: ActionProps) {
  return produce(state, (draft) => {
    switch (action.type) {
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
