import {AuthUser} from './reducer';

export enum AuthActions {
  LOGIN_REQUEST = '@auth/LOGIN_REQUEST',
  LOGIN_SUCCESS = '@auth/LOGIN_SUCCESS',
  LOGIN_FAILURE = '@auth/LOGIN_FAILURE',
  LOGOUT = '@auth/LOGOUT',
  REGISTER_REQUEST = '@auth/REGISTER_REQUEST',
  REGISTER_SUCCESS = '@auth/REGISTER_SUCCESS',
  REGISTER_FAILURE = '@auth/REGISTER_FAILURE',
  REFRESH_TOKEN_REQUEST = '@auth/REFRESH_TOKEN_REQUEST',
  REFRESH_TOKEN_SUCCESS = '@auth/REFRESH_TOKEN_SUCCESS',
  REFRESH_TOKEN_FAILURE = '@auth/REFRESH_TOKEN_FAILURE',
  SET_LOADING_TRUE = '@auth/SET_LOADING_TRUE',
  SET_LOADING_FALSE = '@auth/SET_LOADING_FALSE',
  SET_DEVICE_TOKEN_REQUEST = '@auth/SET_DEVICE_TOKEN_REQUEST',
  SET_DEVICE_TOKEN_SUCCESS = '@auth/SET_DEVICE_TOKEN_SUCCESS',
}

export function loginRequest(email: string, password: string) {
  return {
    type: AuthActions.LOGIN_REQUEST,
    payload: {email, password},
  };
}

export function loginSuccess(access_token: string, user: AuthUser) {
  return {
    type: AuthActions.LOGIN_SUCCESS,
    payload: {access_token, user},
  };
}

export function loginFailure() {
  return {
    type: AuthActions.LOGIN_FAILURE,
  };
}

export function logout() {
  return {
    type: AuthActions.LOGOUT,
  };
}

export function registerRequest(
  username: string,
  email: string,
  password: string,
  isGuide: boolean,
) {
  return {
    type: AuthActions.REGISTER_REQUEST,
    payload: {username, email, password, isGuide},
  };
}

export function registerSuccess(id: number) {
  return {
    type: AuthActions.REGISTER_SUCCESS,
    payload: {id},
  };
}

export function registerFailure() {
  return {
    type: AuthActions.REGISTER_FAILURE,
  };
}

export function refreshTokenRequest() {
  return {
    type: AuthActions.REFRESH_TOKEN_REQUEST,
  };
}

export function refreshTokenSuccess(token: string, refreshToken: string) {
  return {
    type: AuthActions.REFRESH_TOKEN_SUCCESS,
    payload: {token, refreshToken},
  };
}

export function refreshTokenFailure() {
  return {
    type: AuthActions.REFRESH_TOKEN_FAILURE,
  };
}

export function setLoadingTrue() {
  return {
    type: AuthActions.SET_LOADING_TRUE,
  };
}

export function setLoadingFalse() {
  return {
    type: AuthActions.SET_LOADING_FALSE,
  };
}

export function setDeviceTokenRequest() {
  return {
    type: AuthActions.SET_DEVICE_TOKEN_REQUEST,
  };
}

export function setDeviceTokenSuccess() {
  return {
    type: AuthActions.SET_DEVICE_TOKEN_SUCCESS,
  };
}
