import produce from 'immer';

interface InitialStateProps {
  token: string | null;
  loading: boolean;
  authChecked: boolean;
  signed: boolean;
  user: [] | null;
}

const INITIAL_STATE: InitialStateProps = {
  authChecked: false,
  token: null,
  signed: false,
  loading: false,
  user: [],
};

export interface ActionProps {
  type: string;
  payload: {
    token: string;
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
        draft.signed = true;
        break;
      }
      case '@auth/LOGIN_FAILURE': {
        draft.loading = false;
        break;
      }
      case '@auth/LOGOUT': {
        draft.token = null;
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
      default:
    }
  });
}
