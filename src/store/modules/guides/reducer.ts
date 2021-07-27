import produce from 'immer';
import {GuidesActions} from './actions';

interface InitalStateProps {
  feedGuide: boolean;
  newItineraryGuide: boolean;
  myItineraryGuide: boolean;
  profileGuide: boolean;
}

interface ActionProps {
  type: string;
}

const INITIAL_PROPS: InitalStateProps = {
  feedGuide: false,
  newItineraryGuide: false,
  myItineraryGuide: false,
  profileGuide: false,
};

export default function guides(state = INITIAL_PROPS, action: ActionProps) {
  return produce(state, (draft) => {
    switch (action.type) {
      case GuidesActions.SHOW_FEED_GUIDE_SUCCESS: {
        draft.feedGuide = true;
        break;
      }
      case GuidesActions.HIDE_FEED_GUIDE: {
        draft.feedGuide = false;
        break;
      }
      case GuidesActions.SHOW_NEW_ITINERARY_GUIDE_SUCCESS: {
        draft.newItineraryGuide = true;
        break;
      }
      case GuidesActions.HIDE_NEW_ITINERARY_GUIDE: {
        draft.newItineraryGuide = false;
        break;
      }
      case GuidesActions.SHOW_MY_ITINERARY_GUIDE_SUCCESS: {
        draft.myItineraryGuide = true;
        break;
      }
      case GuidesActions.HIDE_MY_ITINERARY_GUIDE: {
        draft.myItineraryGuide = false;
        break;
      }
      case GuidesActions.SHOW_PROFILE_GUIDE_SUCCESS: {
        draft.profileGuide = true;
        break;
      }
      case GuidesActions.HIDE_PROFILE_GUIDE: {
        draft.profileGuide = false;
        break;
      }
      default:
    }
  });
}
