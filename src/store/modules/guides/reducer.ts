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
  subscriptionCheckoutGuide: boolean;
  exploreLocationsGuide: boolean;
  locationDetailsGuide: boolean;
  chatsGuide: boolean;
}

interface ActionProps {
  type: string;
}

const INITAL_STATE: InitalStateProps = {
  feedGuide: true,
  newItineraryGuide: true,
  myItineraryGuide: true,
  profileGuide: true,
  revenuesGuide: false,
  subscriptionGuide: true,
  subscriptionCheckoutGuide: true,
  welcomeGuide: true,
  exploreLocationsGuide: true,
  chatsGuide: true,
  locationDetailsGuide: true,
};

export default function guides(state = INITAL_STATE, action: ActionProps) {
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
      case GuidesActions.HIDE_SUBSCRIPTION_CHECKOUT_GUIDE: {
        draft.subscriptionCheckoutGuide = false;
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
      case GuidesActions.HIDE_LOCATION_DETAILS_GUIDE: {
        draft.locationDetailsGuide = false;
        break;
      }
      case GuidesActions.HIDE_CHATS_GUIDE: {
        draft.chatsGuide = false;
        break;
      }
      default:
    }
  });
}
