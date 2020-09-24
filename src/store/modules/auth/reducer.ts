import produce from 'immer';

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
  user: UserProps | null;
}

const INITIAL_STATE: InitialStateProps = {
  authChecked: false,
  token: null,
  refreshToken: null,
  signed: false,
  loading: false,
  user: null,
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
      case '@auth/LOGIN_REQUEST': {
        draft.loading = true;
        break;
      }
      case '@auth/LOGIN_SUCCESS': {
        draft.loading = false;
        draft.token = action.payload.token;
        draft.refreshToken = action.payload.refreshToken;
        draft.user = action.payload.user;
        draft.signed = true;
        break;
      }
      case '@auth/LOGIN_FAILURE': {
        draft.loading = false;
        break;
      }
      case '@auth/LOGOUT': {
        draft.token = null;
        draft.refreshToken = null;
        draft.signed = false;
        break;
      }
      case '@auth/REGISTER_REQUEST': {
        draft.loading = true;
        break;
      }
      case '@auth/REGISTER_SUCCESS': {
        draft.loading = false;
        break;
      }
      case '@auth/REGISTER_FAILURE': {
        draft.loading = false;
        break;
      }
      case '@auth/REFRESH_TOKEN_REQUEST': {
        draft.loading = true;
        break;
      }
      case '@auth/REFRESH_TOKEN_SUCCESS': {
        draft.loading = false;
        draft.token = action.payload.token;
        draft.refreshToken = action.payload.refreshToken;
        break;
      }
      case '@auth/REFRESH_TOKEN_FAILURE': {
        draft.loading = false;
        break;
      }
      default:
    }
  });
}
