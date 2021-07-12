import produce from 'immer';
import {AuthActions} from './actions';

export interface UserProps {
  id: number;
  username: string;
  email: string;
}

interface InitialStateProps {
  token: string | null;
  refreshToken: string | null;
  loading: boolean;
  authChecked: boolean;
  signed: boolean;
  user: UserProps | any;
}

const INITIAL_STATE: InitialStateProps = {
  authChecked: false,
  token: null,
  refreshToken: null,
  signed: false,
  loading: false,
  user: [],
};

export interface ActionProps {
  type: string;
  payload: {
    token: string;
    refreshToken: string;
    user: UserProps;
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
        draft.token = action.payload.token;
        draft.refreshToken = action.payload.refreshToken;
        draft.user = action.payload.user;
        draft.signed = true;
        break;
      }
      case AuthActions.LOGIN_FAILURE: {
        draft.loading = false;
        break;
      }
      case AuthActions.LOGOUT: {
        draft.token = null;
        draft.refreshToken = null;
        draft.signed = false;
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
      case AuthActions.REFRESH_TOKEN_REQUEST: {
        draft.loading = true;
        break;
      }
      case AuthActions.REFRESH_TOKEN_SUCCESS: {
        draft.loading = false;
        draft.token = action.payload.token;
        draft.refreshToken = action.payload.refreshToken;
        break;
      }
      case AuthActions.REFRESH_TOKEN_FAILURE: {
        draft.loading = false;
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
      default:
    }
  });
}
