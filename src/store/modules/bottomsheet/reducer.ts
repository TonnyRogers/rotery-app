import produce from 'immer';

import {BottomSheetData} from '../../../utils/types';
import {BottomSheetActions} from './actions';

interface DataType {
  type: string;
  id: number;
}

interface InitialStateProps {
  visibility: boolean;
  componentType: string;
  data: DataType | null;
}

interface ActionProps {
  type: string;
  payload: BottomSheetData;
}

const INITIAL_STATE: InitialStateProps = {
  visibility: false,
  componentType: '',
  data: null,
};

export default function bottomSheet(
  state = INITIAL_STATE,
  action: ActionProps,
) {
  return produce(state, (draft) => {
    switch (action.type) {
      case BottomSheetActions.SHOW_BOTTOM_SHEET: {
        draft.visibility = true;
        draft.data = {id: action.payload.id, type: action.payload.type};
        draft.componentType = action.payload.componentype;
        break;
      }
      case BottomSheetActions.HIDE_BOTTOM_SHEET: {
        draft.visibility = false;
        draft.data = null;
        draft.componentType = '';
        break;
      }
      default:
    }
  });
}
