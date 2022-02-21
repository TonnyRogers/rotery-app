import produce from 'immer';

import {Subscription} from '../../../utils/types';
import {SubscriptionActions} from './actions';
import {AuthActions} from '../auth/actions';

interface InitialStateProps {
  data: Subscription | null;
  loading: boolean;
}

interface ActionProps {
  type: string;
  payload: {
    subscription: Subscription;
  };
}

const INITIAL_STATE: InitialStateProps = {
  data: null,
  loading: false,
};

export default function subscription(
  state = INITIAL_STATE,
  action: ActionProps,
) {
  return produce(state, (draft) => {
    switch (action.type) {
      case SubscriptionActions.GET_SUBSCRIPTION_REQUEST: {
        draft.loading = true;
        break;
      }
      case SubscriptionActions.GET_SUBSCRIPTION_SUCCESS: {
        draft.data = action.payload.subscription || null;
        draft.loading = false;
        break;
      }
      case SubscriptionActions.GET_SUBSCRIPTION_FAILURE: {
        draft.loading = false;
        break;
      }
      case SubscriptionActions.CREATE_SUBSCRIPTION_REQUEST: {
        draft.loading = true;
        break;
      }
      case SubscriptionActions.CREATE_SUBSCRIPTION_SUCCESS: {
        draft.data = action.payload.subscription;
        draft.loading = false;
        break;
      }
      case SubscriptionActions.CREATE_SUBSCRIPTION_FAILURE: {
        draft.loading = false;
        break;
      }
      case SubscriptionActions.CANCEL_SUBSCRIPTION_REQUEST: {
        draft.loading = true;
        break;
      }
      case SubscriptionActions.CANCEL_SUBSCRIPTION_SUCCESS: {
        draft.data = INITIAL_STATE.data;
        draft.loading = false;
        break;
      }
      case SubscriptionActions.CANCEL_SUBSCRIPTION_FAILURE: {
        draft.loading = false;
        break;
      }
      case SubscriptionActions.CHANGE_SUBSCRIPTION_CARD_REQUEST: {
        draft.loading = true;
        break;
      }
      case SubscriptionActions.CHANGE_SUBSCRIPTION_CARD_SUCCESS: {
        draft.loading = false;
        break;
      }
      case SubscriptionActions.CHANGE_SUBSCRIPTION_CARD_FAILURE: {
        draft.loading = false;
        break;
      }
      case AuthActions.LOGOUT: {
        draft.data = INITIAL_STATE.data;
        draft.loading = INITIAL_STATE.loading;
        break;
      }
      default:
        break;
    }
  });
}
