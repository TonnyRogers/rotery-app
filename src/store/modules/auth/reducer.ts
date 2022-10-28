import produce from 'immer';
import {AuthActions} from './actions';
import {UserProps, GuideRelateValidation} from '../../../utils/types';
import {ProfileActions} from '../profile/actions';
import {PushNotificationsActions} from '../pushNotifications/actions';
import {WsActions} from '../websocket/actions';

export interface AuthUser extends Omit<UserProps, 'profile'> {
  profile: number;
}

export type RefreshUser = {
  email: string | null;
  password: string | null;
};

interface InitialStateProps {
  token: string | null;
  loading: boolean;
  authChecked: boolean;
  signed: boolean;
  user: AuthUser | null;
  expires: number;
}

const INITIAL_STATE: InitialStateProps = {
  authChecked: false,
  token: null,
  signed: false,
  loading: false,
  user: null,
  expires: 0,
};

export interface ActionProps {
  type: string;
  payload: {
    access_token: string;
    user: AuthUser;
    guideLocationValidation: GuideRelateValidation;
    refreshUser: RefreshUser;
    expires: number;
  };
}

export default function auth(state = INITIAL_STATE, action: ActionProps) {
  return produce(state, (draft) => {
    switch (action.type) {
      case AuthActions.LOGIN_REQUEST: {
        draft.loading = true;
        break;
      }
      case AuthActions.LOGIN_SUCCESS: {
        draft.loading = false;
        draft.token = action.payload.access_token;
        draft.user = action.payload.user;
        draft.signed = true;
        draft.expires = action.payload.expires;
        break;
      }
      case AuthActions.LOGIN_FAILURE: {
        draft.loading = false;
        break;
      }
      case AuthActions.LOGOUT: {
        draft.user = INITIAL_STATE.user;
        draft.token = INITIAL_STATE.token;
        draft.signed = INITIAL_STATE.signed;
        draft.loading = INITIAL_STATE.loading;
        draft.expires = INITIAL_STATE.expires;
        break;
      }
      case AuthActions.REGISTER_REQUEST: {
        draft.loading = true;
        break;
      }
      case AuthActions.REGISTER_SUCCESS: {
        draft.loading = false;
        break;
      }
      case AuthActions.REGISTER_FAILURE: {
        draft.loading = false;
        break;
      }
      case AuthActions.REFRESH_TOKEN_SUCCESS: {
        draft.token = action.payload.access_token;
        draft.expires = action.payload.expires;
        break;
      }
      case AuthActions.SET_LOADING_TRUE: {
        draft.loading = true;
        break;
      }
      case AuthActions.SET_LOADING_FALSE: {
        draft.loading = false;
        break;
      }
      case WsActions.GUIDE_ACTIVATED: {
        if (draft.user) {
          draft.user = {
            ...draft.user,
            canRelateLocation: true,
          };
        }
        break;
      }
      case PushNotificationsActions.GUIDE_ACTIVATED: {
        if (draft.user) {
          draft.user = {
            ...draft.user,
            canRelateLocation: true,
          };
        }
        break;
      }
      case ProfileActions.GUIDE_VALIDATE_RELATE_TO_LOCATION_SUCCESS: {
        const {isActive} = action.payload.guideLocationValidation;

        if (draft.user) {
          draft.user = {
            ...draft.user,
            canRelateLocation: isActive,
          };
        }
        break;
      }
      default:
    }
  });
}
