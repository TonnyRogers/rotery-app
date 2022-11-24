import produce from 'immer';
import {FirstStepResponseData} from '../../../utils/types';
import {MetadataActions} from './actions';

interface InitalStateProps {
  firstStep: FirstStepResponseData | null;
  loading: boolean;
}

interface Actions {
  type: MetadataActions;
  payload: {
    firstStep: FirstStepResponseData;
  };
}

const INITIAL_STATE: InitalStateProps = {
  firstStep: null,
  loading: false,
};

export default function metadata(state = INITIAL_STATE, action: Actions) {
  return produce(state, (draft) => {
    switch (action.type) {
      case MetadataActions.GET_FIRST_STEPS_REQUEST: {
        draft.loading = true;
        break;
      }
      case MetadataActions.GET_FIRST_STEPS_SUCCESS: {
        draft.loading = false;
        draft.firstStep = action.payload.firstStep;
        break;
      }
      case MetadataActions.GET_FIRST_STEPS_FAILURE: {
        draft.loading = false;
        break;
      }
      default:
        break;
    }
  });
}
