import {UserProps} from './reducer';

export function loginRequest(email: string, password: string) {
  return {
    type: '@auth/LOGIN_REQUEST',
    payload: {email, password},
  };
}

export function loginSuccess(
  token: string,
  refreshToken: string,
  user: UserProps,
) {
  return {
    type: '@auth/LOGIN_SUCCESS',
    payload: {token, refreshToken, user},
  };
}

export function loginFailure() {
  return {
    type: '@auth/LOGIN_FAILURE',
  };
}

export function logout() {
  return {
    type: '@auth/LOGOUT',
  };
}

export function registerRequest(
  username: string,
  email: string,
  password: string,
) {
  return {
    type: '@auth/REGISTER_REQUEST',
    payload: {username, email, password},
  };
}

export function registerSuccess(id: number) {
  return {
    type: '@auth/REGISTER_SUCCESS',
    payload: {id},
  };
}

export function registerFailure() {
  return {
    type: '@auth/REGISTER_FAILURE',
  };
}

export function refreshTokenRequest() {
  return {
    type: '@auth/REFRESH_TOKEN_REQUEST',
  };
}

export function refreshTokenSuccess(token: string, refreshToken: string) {
  return {
    type: '@auth/REFRESH_TOKEN_SUCCESS',
    payload: {token, refreshToken},
  };
}

export function refreshTokenFailure() {
  return {
    type: '@auth/REFRESH_TOKEN_FAILURE',
  };
}

export function setLoadingTrue() {
  return {
    type: '@auth/SET_LOADING_TRUE',
  };
}

export function setLoadingFalse() {
  return {
    type: '@auth/SET_LOADING_FALSE',
  };
}
