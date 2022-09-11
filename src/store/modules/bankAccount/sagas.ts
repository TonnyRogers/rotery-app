/* eslint-disable no-undef */
import {takeLatest, put, call, all} from 'redux-saga/effects';
import {AxiosResponse} from 'axios';
import Toast from 'react-native-toast-message';

import {
  BankAccountActions,
  createBankAccountRequest,
  createBankAccountSuccess,
  createBankAccountFailure,
  updateBankAccountRequest,
  getBankAccountSuccess,
  getBankAccountFailure,
  updateBankAccountFailure,
  updateBankAccountSuccess,
} from './actions';
import {BankAccount} from '../../../utils/types';
import api from '../../../providers/api';
import {translateError} from '../../../lib/utils';
import NetInfo from '../../../providers/netinfo';

export function* createBankAccount({
  payload,
}: ReturnType<typeof createBankAccountRequest>) {
  try {
    const info = yield call(NetInfo);

    if (!info.status) {
      yield put(createBankAccountFailure());
      return;
    }
    const response: AxiosResponse<BankAccount> = yield call(
      api.post,
      '/bank-accounts',
      payload,
    );

    yield put(createBankAccountSuccess(response.data));

    Toast.show({
      text1: 'Tudo certo 🤙',
      position: 'bottom',
      type: 'success',
      autoHide: true,
    });
  } catch (error) {
    yield put(createBankAccountFailure());
    Toast.show({
      text1: `${translateError(error.response.data.message)}`,
      position: 'bottom',
      type: 'error',
    });
  }
}

export function* getBankAccount() {
  try {
    const info = yield call(NetInfo);

    if (!info.status) {
      yield put(getBankAccountFailure());
      return;
    }
    const response: AxiosResponse<BankAccount> = yield call(
      api.get,
      '/bank-accounts',
    );

    yield put(getBankAccountSuccess(response.data));
  } catch (error) {
    yield put(getBankAccountFailure());
    Toast.show({
      text1: `${translateError(error.response.data.message)}`,
      position: 'bottom',
      type: 'error',
    });
  }
}

export function* updateBankAccount({
  payload,
}: ReturnType<typeof updateBankAccountRequest>) {
  try {
    const info = yield call(NetInfo);

    if (!info.status) {
      yield put(updateBankAccountFailure());
      return;
    }
    const response: AxiosResponse<BankAccount> = yield call(
      api.put,
      '/bank-accounts',
      payload,
    );

    yield put(updateBankAccountSuccess(response.data));

    Toast.show({
      text1: 'Dados Atualizados 🤙',
      position: 'bottom',
      type: 'success',
      autoHide: true,
    });
  } catch (error) {
    yield put(updateBankAccountFailure());
    Toast.show({
      text1: `${translateError(error.response.data.message)}`,
      position: 'bottom',
      type: 'error',
    });
  }
}

export default all([
  takeLatest(BankAccountActions.CREATE_REQUEST, createBankAccount),
  takeLatest(BankAccountActions.UPDATE_REQUEST, updateBankAccount),
  takeLatest(BankAccountActions.GET_REQUEST, getBankAccount),
]);
