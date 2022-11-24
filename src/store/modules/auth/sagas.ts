import {all, takeLatest, call, put, select} from 'redux-saga/effects';
import AsyncStorage from '@react-native-community/async-storage';
import Toast from 'react-native-toast-message';
// import messaging from '@react-native-firebase/messaging';

import api from '../../../providers/api';
import {RootStateProps} from '../rootReducer';
import NetInfo from '../../../providers/netinfo';
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
  setDeviceTokenRequest,
  setDeviceTokenSuccess,
  logout as logoutAction,
} from './actions';
import {getProfileRequest} from '../profile/actions';
import {getConnectionsRequest} from '../connections/actions';
import {AxiosResponse} from 'axios';
import {getNotificationsRequest} from '../notifications/actions';
import {getBankAccountRequest} from '../bankAccount/actions';
import {unauthenticate} from '../../../providers/google-oauth';
import {AuthUser} from './reducer';
import {LocalStorageKeys} from '../../../utils/enums';

type AuthLoginResponse = {
  access_token: string;
  user: AuthUser;
  expires: number;
};

export function* logUser({payload}: ReturnType<typeof loginRequest>) {
  try {
    const info = yield call(NetInfo);

    if (!info.status) {
      yield put(loginFailure());
      return;
    }

    const {email, password} = payload;

    const response: AxiosResponse<AuthLoginResponse> = yield call(
      api.post,
      '/auth/login',
      {email, password},
    );

    const {user, access_token, expires} = response.data;

    if (!access_token) {
      Toast.show({
        text1: 'Email ou senha incorreto.',
        position: 'bottom',
        type: 'error',
      });

      yield put(loginFailure());
      return;
    }

    yield call(
      [AsyncStorage, 'setItem'],
      LocalStorageKeys.AUTH_TOKEN,
      access_token,
    );

    yield call(
      [AsyncStorage, 'setItem'],
      LocalStorageKeys.AUTH_REFRESH,
      response.headers['set-cookie'][0],
    );

    yield put(loginSuccess(access_token, user, expires));
    RootNavigation.replace('Welcome');
    yield put(setDeviceTokenRequest());
    yield put(getProfileRequest(user.id));
    yield put(getConnectionsRequest());
    yield put(getNotificationsRequest());
    // yield put(getNextItinerariesRequest());
    // yield put(getMessagesRequest());

    if (user.isGuide) {
      // yield put(getItinerariesRequest());
      yield put(getBankAccountRequest());
    }
  } catch (error) {
    yield put(loginFailure());
    Toast.show({
      text1: `${translateError(error?.response.data.message)}`,
      position: 'bottom',
      type: 'error',
    });
  }
}

export function* logout() {
  try {
    yield call(api.get, '/auth/logout');
  } catch (error) {}

  yield call([AsyncStorage, 'removeItem'], LocalStorageKeys.AUTH_TOKEN);
  yield call([AsyncStorage, 'removeItem'], LocalStorageKeys.AUTH_REFRESH);
  unauthenticate();
  // cancelNotifications();
}

export function* registerUser({payload}: ReturnType<typeof registerRequest>) {
  const info = yield call(NetInfo);

  if (!info.status) {
    yield put(registerFailure());
    return;
  }

  try {
    const {username, email, password, isGuide} = payload;

    const response = yield call(api.post, '/users', {
      username,
      email,
      password,
      isGuide,
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

  const info = yield call(NetInfo);

  if (!info.status) {
    yield put(loginFailure());
    return;
  }

  try {
    yield call(api.get, '/profile');
  } catch (error) {
    try {
      const response: AxiosResponse<Omit<AuthLoginResponse, 'user'>> =
        yield call(api.post, '/auth/refresh');

      const {access_token, expires} = response.data;

      yield call([AsyncStorage, 'removeItem'], LocalStorageKeys.AUTH_TOKEN);

      yield call(
        [AsyncStorage, 'setItem'],
        LocalStorageKeys.AUTH_TOKEN,
        access_token,
      );

      yield put(refreshTokenSuccess(access_token, expires));
    } catch (error1) {
      yield put(logoutAction());
      Toast.show({
        text1: 'Erro de autenticação',
        text2: 'faça o login novamente.',
        position: 'bottom',
        type: 'error',
        visibilityTime: 3000,
      });
    }
  }
}

export function* setDeviceToken() {
  try {
    let deviceToken = yield call(
      [AsyncStorage, 'getItem'],
      '@notification:token',
    );

    if (!deviceToken) {
      // deviceToken = yield call([messaging(), 'getToken']);
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
  // takeLatest('persist/REHYDRATE', handleRefreshToken),
  takeLatest('@auth/SET_DEVICE_TOKEN_REQUEST', setDeviceToken),
  takeLatest('@auth/REFRESH_TOKEN_REQUEST', handleRefreshToken),
  takeLatest('@auth/LOGIN_REQUEST', logUser),
  takeLatest('@auth/LOGOUT', logout),
  takeLatest('@auth/REGISTER_REQUEST', registerUser),
]);
