import produce from 'immer';

export interface ProfileProps {
  id: number;
  name: string | null;
  gender: string | null;
  birth: string | null;
  cpf: number | null;
  profission: string | null;
  phone: number | null;
  user_id: number;
  created_at: string;
  updated_at: string;
  file_id: number | null;
  file: {
    url: string;
  };
}

interface InitialStateProps {
  data: ProfileProps | null;
  loading: boolean;
}

const INITIAL_STATE: InitialStateProps = {
  data: null,
  loading: false,
};

export interface ActionProps {
  type: string;
  payload: {
    profile: ProfileProps;
  };
}

export default function profile(state = INITIAL_STATE, action: ActionProps) {
  return produce(state, (draft) => {
    switch (action.type) {
      case '@profile/GET_PROFILE_REQUEST': {
        draft.loading = true;
        break;
      }
      case '@profile/GET_PROFILE_SUCCESS': {
        draft.loading = false;
        draft.data = action.payload.profile;
        break;
      }
      case '@profile/GET_PROFILE_FAILURE': {
        draft.loading = false;
        break;
      }
      case '@profile/UPDATE_PROFILE_REQUEST': {
        draft.loading = true;
        break;
      }
      case '@profile/UPDATE_PROFILE_SUCCESS': {
        draft.loading = false;
        draft.data = action.payload.profile;
        break;
      }
      case '@profile/UPDATE_PROFILE_FAILURE': {
        draft.loading = false;
        break;
      }
      case '@profile/UPDATE_PROFILE_IMAGE_REQUEST': {
        draft.loading = true;
        break;
      }
      case '@profile/UPDATE_PROFILE_IMAGE_SUCCESS': {
        draft.loading = false;
        draft.data = action.payload.profile;
        break;
      }
      case '@profile/UPDATE_PROFILE_IMAGE_FAILURE': {
        draft.loading = false;
        break;
      }
      default:
    }
  });
}
