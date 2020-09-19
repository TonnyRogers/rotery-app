import {UserProps} from './reducer';

export function loginRequest(email: string, password: string) {
  return {
    type: '@auth/LOGIN_REQUEST',
    payload: {email, password},
  };
}

export function loginSuccess(token: string, user: UserProps) {
  return {
    type: '@auth/LOGIN_SUCCESS',
    payload: {token, user},
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
