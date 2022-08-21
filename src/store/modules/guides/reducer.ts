import produce from 'immer';
import {GuidesActions} from './actions';

interface InitalStateProps {
  feedGuide: boolean;
  welcomeGuide: boolean;
  newItineraryGuide: boolean;
  myItineraryGuide: boolean;
  profileGuide: boolean;
  revenuesGuide: boolean;
  subscriptionGuide: boolean;
  itineraryPaymentGuide: boolean;
  exploreLocationsGuide: boolean;
}

interface ActionProps {
  type: string;
}

const INITIAL_PROPS: InitalStateProps = {
  feedGuide: true,
  newItineraryGuide: true,
  myItineraryGuide: true,
  profileGuide: true,
  revenuesGuide: false,
  subscriptionGuide: true,
  itineraryPaymentGuide: true,
  welcomeGuide: true,
  exploreLocationsGuide: true,
};

export default function guides(state = INITIAL_PROPS, action: ActionProps) {
  return produce(state, (draft) => {
    switch (action.type) {
      case GuidesActions.HIDE_FEED_GUIDE: {
        draft.feedGuide = false;
        break;
      }
      case GuidesActions.HIDE_NEW_ITINERARY_GUIDE: {
        draft.newItineraryGuide = false;
        break;
      }
      case GuidesActions.HIDE_MY_ITINERARY_GUIDE: {
        draft.myItineraryGuide = false;
        break;
      }
      case GuidesActions.HIDE_PROFILE_GUIDE: {
        draft.profileGuide = false;
        break;
      }
      case GuidesActions.SHOW_REVENUE_GUIDE: {
        draft.revenuesGuide = true;
        break;
      }
      case GuidesActions.HIDE_REVENUE_GUIDE: {
        draft.revenuesGuide = false;
        break;
      }
      case GuidesActions.HIDE_SUBSCRIPTION_GUIDE: {
        draft.subscriptionGuide = false;
        break;
      }
      case GuidesActions.SHOW_ITINERARY_PAYMENT_GUIDE_SUCCESS: {
        draft.itineraryPaymentGuide = true;
        break;
      }
      case GuidesActions.HIDE_ITINERARY_PAYMENT_GUIDE: {
        draft.itineraryPaymentGuide = false;
        break;
      }
      case GuidesActions.HIDE_WELCOME_GUIDE: {
        draft.welcomeGuide = false;
        break;
      }
      case GuidesActions.HIDE_EXPLORE_LOCATIONS_GUIDE: {
        draft.exploreLocationsGuide = false;
        break;
      }
      default:
    }
  });
}
