import {all, takeLatest, call, put, select} from 'redux-saga/effects';
import AsyncStorage from '@react-native-community/async-storage';
import Toast from 'react-native-toast-message';
import messaging from '@react-native-firebase/messaging';

import api from '../../../services/api';
import {RootStateProps} from '../rootReducer';
import NetInfo from '../../../services/netinfo';
import {translateError} from '../../../lib/utils';
import * as RootNavigation from '../../../RootNavigation';

import {
  loginRequest,
  loginSuccess,
  loginFailure,
  registerRequest,
  registerSuccess,
  registerFailure,
  refreshTokenSuccess,
  refreshTokenFailure,
  setDeviceTokenRequest,
  setDeviceTokenSuccess,
} from './actions';
import {getProfileRequest} from '../profile/actions';
import {getItinerariesRequest} from '../itineraries/actions';
import {getConnectionsRequest} from '../connections/actions';
import {getMessagesRequest} from '../messages/actions';
import {getNextItinerariesRequest} from '../nextItineraries/actions';
import {getBankAccountRequest} from '../bankAccount/actions';
import {AxiosResponse} from 'axios';
import {UserProps} from '../../../utils/types';

export function* logUser({payload}: ReturnType<typeof loginRequest>) {
  try {
    const info = yield call(NetInfo);

    if (!info.status) {
      yield put(loginFailure());
      return;
    }

    const {email, password} = payload;

    const response: AxiosResponse<{access_token: string; user: UserProps}> =
      yield call(api.post, '/auth/login', {email, password});

    const {user, access_token} = response.data;

    if (!access_token) {
      Toast.show({
        text1: 'Email ou senha incorreto.',
        position: 'bottom',
        type: 'error',
      });

      yield put(loginFailure());
      return;
    }

    yield call([AsyncStorage, 'setItem'], '@auth:token', access_token);
    yield call([AsyncStorage, 'setItem'], '@auth:refreshToken', '');
    api.defaults.headers.Authorization = `Bearer ${access_token}`;

    yield put(loginSuccess(access_token, user));
    yield put(setDeviceTokenRequest());
    yield put(getProfileRequest(user.id));
    yield put(getConnectionsRequest());
    yield put(getNextItinerariesRequest());
    yield put(getMessagesRequest());

    if (user.isHost) {
      yield put(getItinerariesRequest());
      yield put(getBankAccountRequest());
    }
  } catch (error) {
    Toast.show({
      text1: `${translateError(error?.response.data.message)}`,
      position: 'bottom',
      type: 'error',
    });
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
    // yield put(refreshTokenRequest());
  }
}

export function* logout() {
  yield call([AsyncStorage, 'removeItem'], '@auth:token');
  api.defaults.headers.Authorization = 'Bearer ';
  // cancelNotifications();
}

export function* registerUser({payload}: ReturnType<typeof registerRequest>) {
  const info = yield call(NetInfo);

  if (!info.status) {
    yield put(registerFailure());
    return;
  }

  try {
    const {username, email, password, isHost} = payload;

    const response = yield call(api.post, '/users', {
      username,
      email,
      password,
      isHost,
    });

    const {id} = response.data;

    if (!id) {
      Toast.show({
        text1: 'Dados incorretos.',
        position: 'bottom',
        type: 'error',
      });

      yield put(registerFailure());
      return;
    }

    Toast.show({
      text1: 'Bem-vindo(a)! 🤙🥳',
      text2: 'Acesse o link enviado por e-mail para ativar seu cadastro.',
      position: 'bottom',
      type: 'success',
      visibilityTime: 5000,
    });

    yield put(registerSuccess(id));
    RootNavigation.goBack();
  } catch (error) {
    yield put(registerFailure());

    Toast.show({
      text1: `${translateError(error.response.data.message)}`,
      position: 'bottom',
      type: 'error',
    });
  }
}

export function* handleRefreshToken() {
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

export function* setDeviceToken() {
  try {
    let deviceToken = yield call(
      [AsyncStorage, 'getItem'],
      '@notification:token',
    );

    if (!deviceToken) {
      deviceToken = yield call([messaging(), 'getToken']);
    }

    yield call(api.put, '/users/device', {
      token: deviceToken,
    });
    yield put(setDeviceTokenSuccess());
  } catch (error) {
    Toast.show({
      text1: 'Erro ao registrar dispositivo',
      position: 'bottom',
      type: 'error',
    });
  }
}

export default all([
  takeLatest('@auth/SET_DEVICE_TOKEN_REQUEST', setDeviceToken),
  takeLatest('persist/REHYDRATE', setToken),
  takeLatest('@auth/REFRESH_TOKEN_REQUEST', handleRefreshToken),
  takeLatest('@auth/LOGIN_REQUEST', logUser),
  takeLatest('@auth/LOGOUT', logout),
  takeLatest('@auth/REGISTER_REQUEST', registerUser),
]);
