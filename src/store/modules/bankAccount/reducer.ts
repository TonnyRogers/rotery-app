import produce from 'immer';
import {BankAccount} from '../../../utils/types';
import {BankAccountActions} from './actions';
import {AuthActions} from '../auth/actions';

interface InitialStateProps {
  data: BankAccount | null;
  loading: boolean;
}

interface ActionProps {
  type: string;
  payload: {
    account: BankAccount;
  };
}

const INITIAL_STATE: InitialStateProps = {
  data: null,
  loading: false,
};

export default function bankAccount(
  state = INITIAL_STATE,
  action: ActionProps,
) {
  return produce(state, (draft) => {
    switch (action.type) {
      case BankAccountActions.CREATE_REQUEST: {
        draft.loading = true;
        break;
      }
      case BankAccountActions.CREATE_SUCCESS: {
        draft.data = action.payload.account;
        draft.loading = false;
        break;
      }
      case BankAccountActions.CREATE_FAILURE: {
        draft.loading = false;
        break;
      }
      case BankAccountActions.GET_REQUEST: {
        draft.loading = true;
        break;
      }
      case BankAccountActions.GET_SUCCESS: {
        draft.data = action.payload.account || null;
        draft.loading = false;
        break;
      }
      case BankAccountActions.GET_FAILURE: {
        draft.loading = false;
        break;
      }
      case BankAccountActions.UPDATE_REQUEST: {
        draft.loading = true;
        break;
      }
      case BankAccountActions.UPDATE_SUCCESS: {
        draft.data = action.payload.account;
        draft.loading = false;
        break;
      }
      case BankAccountActions.UPDATE_FAILURE: {
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
