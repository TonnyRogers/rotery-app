import {createSlice, PayloadAction, Dispatch} from '@reduxjs/toolkit';
import Toast from 'react-native-toast-message';
import api from '../providers/api';
import {BankAccount, CreateBankAccountPayload} from '../utils/types';
import {translateError} from '../lib/utils';
import {authActions} from './auth';

export interface InitialStateProps {
  data: BankAccount | null;
  loading: boolean;
}

const initialState: InitialStateProps = {
  data: null,
  loading: false,
};

export const bankAccountSlice = createSlice({
  name: 'bankAccount',
  initialState,
  reducers: {
    setBankAccount: (state, action: PayloadAction<BankAccount>) => {
      state.data = action.payload;
    },
    initLoading: (state) => {
      state.loading = true;
    },
    endLoading: (state) => {
      state.loading = false;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(authActions.handleLogout, (state) => {
      state.data = initialState.data;
    });
  },
});

export const bankAccountActions = bankAccountSlice.actions;
const {endLoading, initLoading} = bankAccountActions;

export const createBankAccount =
  (payload: CreateBankAccountPayload) => async (dispatch: Dispatch) => {
    try {
      dispatch(initLoading());
      const response = await api.post<BankAccount>('/bank-accounts', payload);

      dispatch(bankAccountActions.setBankAccount(response.data));
      dispatch(endLoading());
      Toast.show({
        text1: 'Tudo certo 🤙',
        position: 'bottom',
        type: 'success',
        autoHide: true,
      });
    } catch (error) {
      dispatch(endLoading());
      Toast.show({
        text1: `${translateError(error.response.data.message)}`,
        position: 'bottom',
        type: 'error',
      });
    }
  };

export const getBankAccount = () => async (dispatch: Dispatch) => {
  try {
    dispatch(initLoading());
    const response = await api.get<BankAccount>('/bank-accounts');

    dispatch(bankAccountActions.setBankAccount(response.data));
    dispatch(endLoading());
  } catch (error) {
    dispatch(endLoading());
    Toast.show({
      text1: `${translateError(error.response.data.message)}`,
      position: 'bottom',
      type: 'error',
    });
  }
};

export const updateBankAccount =
  (payload: CreateBankAccountPayload) => async (dispatch: Dispatch) => {
    try {
      dispatch(initLoading());
      const response = await api.put<BankAccount>('/bank-accounts', payload);

      dispatch(bankAccountActions.setBankAccount(response.data));
      dispatch(endLoading());
      Toast.show({
        text1: 'Dados Atualizados 🤙',
        position: 'bottom',
        type: 'success',
        autoHide: true,
      });
    } catch (error) {
      dispatch(endLoading());
      Toast.show({
        text1: `${translateError(error.response.data.message)}`,
        position: 'bottom',
        type: 'error',
      });
    }
  };

export default bankAccountSlice.reducer;
