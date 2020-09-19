import {all, takeLatest, call, put} from 'redux-saga/effects';
import AsyncStorage from '@react-native-community/async-storage';
import {Alert} from 'react-native';

import api from '../../../services/api';

import {
  loginRequest,
  loginSuccess,
  loginFailure,
  registerRequest,
  registerSuccess,
  registerFailure,
} from './actions';
import {getProfileRequest} from '../profile/actions';

export function* logUser({payload}: ReturnType<typeof loginRequest>) {
  try {
    const {email, password} = payload;

    const response = yield call(api.post, '/sessions', {email, password});

    const {token} = response.data.token;
    const {user} = response.data;

    if (!token) {
      Alert.alert('Email ou senha incorreto.');
      yield put(loginFailure());
      return;
    }

    yield call([AsyncStorage, 'setItem'], '@auth:token', token);
    api.defaults.headers.Authorization = `Bearer ${token}`;

    yield put(loginSuccess(token, user));
    yield put(getProfileRequest(user.id));
  } catch (error) {
    Alert.alert('Erro ao efetuar login.');
    yield put(loginFailure());
  }
}

export function* setToken({payload}: any) {
  if (!payload) {
    return;
  }

  const {token} = payload.auth;

  if (token) {
    api.defaults.headers.Authorization = `Bearer ${token}`;
  }
}

export function* logout() {
  yield call([AsyncStorage, 'removeItem'], '@auth:token');
  api.defaults.headers.Authorization = 'Bearer ';
}

export function* registerUser({payload}: ReturnType<typeof registerRequest>) {
  try {
    const {username, email, password} = payload;

    const response = yield call(api.post, '/users', {
      username,
      email,
      password,
    });

    const {id} = response.data;

    if (!id) {
      Alert.alert('Dados incorretos.');
      yield put(registerFailure());
      return;
    }

    yield put(registerSuccess(id));
    yield put(loginRequest(email, password));
  } catch (error) {
    Alert.alert(error.response.data[0].message);
    yield put(registerFailure());
  }
}

export default all([
  takeLatest('persist/REHYDRATE', setToken),
  takeLatest('@auth/LOGIN_REQUEST', logUser),
  takeLatest('@auth/LOGOUT', logout),
  takeLatest('@auth/REGISTER_REQUEST', registerUser),
]);
