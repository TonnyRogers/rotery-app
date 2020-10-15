import {all, takeLatest, call, put, select} from 'redux-saga/effects';
import AsyncStorage from '@react-native-community/async-storage';
import {Alert} from 'react-native';

import api from '../../../services/api';
import {RootStateProps} from '../rootReducer';

import {
  loginRequest,
  loginSuccess,
  loginFailure,
  registerRequest,
  registerSuccess,
  registerFailure,
  refreshTokenRequest,
  refreshTokenSuccess,
  refreshTokenFailure,
} from './actions';
import {
  getActivitiesRequest,
  getLodgingsRequest,
  getTransportsRequest,
} from '../options/actions';
import {getProfileRequest} from '../profile/actions';
import {getItinerariesRequest} from '../itineraries/actions';
import {getConnectionsRequest} from '../connections/actions';
import {getNotificationsRequest} from '../notifications/actions';
import {getMessagesRequest} from '../messages/actions';

export function* logUser({payload}: ReturnType<typeof loginRequest>) {
  try {
    const {email, password} = payload;

    const response = yield call(api.post, '/sessions', {email, password});

    const {token, refreshToken} = response.data.token;
    const {user} = response.data;

    if (!token) {
      Alert.alert('Email ou senha incorreto.');
      yield put(loginFailure());
      return;
    }

    yield call([AsyncStorage, 'setItem'], '@auth:token', token);
    yield call([AsyncStorage, 'setItem'], '@auth:refreshToken', refreshToken);
    api.defaults.headers.Authorization = `Bearer ${token}`;

    yield put(loginSuccess(token, refreshToken, user));
    yield put(getProfileRequest(user.id));
    yield put(getActivitiesRequest());
    yield put(getLodgingsRequest());
    yield put(getTransportsRequest());
    yield put(getConnectionsRequest());
    yield put(getItinerariesRequest());
    yield put(getNotificationsRequest());
    yield put(getMessagesRequest());
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
    yield put(refreshTokenRequest());
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

export function* refreshToken() {
  const {token} = yield select((state: RootStateProps) => state.auth);

  if (!token) {
    return;
  }

  try {
    const response = yield call(api.get, '/sessions');

    if (response.status === 401) {
      yield put(refreshTokenFailure());
    }

    yield put(refreshTokenFailure());
  } catch (error) {
    const refreshTokenSTR = yield call(
      [AsyncStorage, 'getItem'],
      '@auth:refreshToken',
    );

    const renewToken = yield call(api.put, '/sessions', {
      refresh_token: refreshTokenSTR,
    });

    const {token, refreshToken} = renewToken.data;

    yield call([AsyncStorage, 'removeItem'], '@auth:refreshToken');
    yield call([AsyncStorage, 'removeItem'], '@auth:token');

    yield call([AsyncStorage, 'setItem'], '@auth:token', token);
    yield call([AsyncStorage, 'setItem'], '@auth:refreshToken', refreshToken);

    yield put(refreshTokenSuccess(token, refreshToken));

    api.defaults.headers.Authorization = `Bearer ${token}`;
  }
}

export default all([
  takeLatest('persist/REHYDRATE', setToken),
  takeLatest('@auth/REFRESH_TOKEN_REQUEST', refreshToken),
  takeLatest('@auth/LOGIN_REQUEST', logUser),
  takeLatest('@auth/LOGOUT', logout),
  takeLatest('@auth/REGISTER_REQUEST', registerUser),
]);
