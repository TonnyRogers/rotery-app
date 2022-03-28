import {BankAccount, CreateBankAccountPayload} from '../../../utils/types';

export enum BankAccountActions {
  CREATE_REQUEST = '@bankAccount/CREATE_REQUEST',
  CREATE_SUCCESS = '@bankAccount/CREATE_SUCCESS',
  CREATE_FAILURE = '@bankAccount/CREATE_FAILURE',
  GET_REQUEST = '@bankAccount/GET_REQUEST',
  GET_SUCCESS = '@bankAccount/GET_SUCCESS',
  GET_FAILURE = '@bankAccount/GET_FAILURE',
  UPDATE_REQUEST = '@bankAccount/UPDATE_REQUEST',
  UPDATE_SUCCESS = '@bankAccount/UPDATE_SUCCESS',
  UPDATE_FAILURE = '@bankAccount/UPDATE_FAILURE',
}

export function createBankAccountRequest(payload: CreateBankAccountPayload) {
  return {
    type: BankAccountActions.CREATE_REQUEST,
    payload,
  };
}

export function createBankAccountSuccess(account: BankAccount) {
  return {
    type: BankAccountActions.CREATE_SUCCESS,
    payload: {account},
  };
}

export function createBankAccountFailure() {
  return {
    type: BankAccountActions.CREATE_FAILURE,
  };
}

export function getBankAccountRequest() {
  return {
    type: BankAccountActions.GET_REQUEST,
  };
}

export function getBankAccountSuccess(account: BankAccount) {
  return {
    type: BankAccountActions.GET_SUCCESS,
    payload: {account},
  };
}

export function getBankAccountFailure() {
  return {
    type: BankAccountActions.GET_FAILURE,
  };
}

export function updateBankAccountRequest(payload: CreateBankAccountPayload) {
  return {
    type: BankAccountActions.UPDATE_REQUEST,
    payload,
  };
}

export function updateBankAccountSuccess(account: BankAccount) {
  return {
    type: BankAccountActions.UPDATE_SUCCESS,
    payload: {account},
  };
}

export function updateBankAccountFailure() {
  return {
    type: BankAccountActions.UPDATE_FAILURE,
  };
}
