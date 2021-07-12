import produce from 'immer';
import {ProfileActions} from './actions';
import {ProfileProps} from '../../../utils/types';

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
      case ProfileActions.GET_PROFILE_REQUEST: {
        draft.loading = true;
        break;
      }
      case ProfileActions.GET_PROFILE_SUCCESS: {
        draft.loading = false;
        draft.data = action.payload.profile;
        break;
      }
      case ProfileActions.GET_PROFILE_FAILURE: {
        draft.loading = false;
        break;
      }
      case ProfileActions.UPDATE_PROFILE_REQUEST: {
        draft.loading = true;
        break;
      }
      case ProfileActions.UPDATE_PROFILE_SUCCESS: {
        draft.loading = false;
        draft.data = action.payload.profile;
        break;
      }
      case ProfileActions.UPDATE_PROFILE_FAILURE: {
        draft.loading = false;
        break;
      }
      case ProfileActions.UPDATE_PROFILE_IMAGE_REQUEST: {
        draft.loading = true;
        break;
      }
      case ProfileActions.UPDATE_PROFILE_IMAGE_SUCCESS: {
        draft.loading = false;
        draft.data = action.payload.profile;
        break;
      }
      case ProfileActions.UPDATE_PROFILE_IMAGE_FAILURE: {
        draft.loading = false;
        break;
      }
      default:
    }
  });
}
