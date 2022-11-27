import axios from 'axios';
import * as RNLocalize from 'react-native-localize';
import {API_URL} from '@env';
import AsyncStorage from '@react-native-community/async-storage';
import {LocalStorageKeys} from '../utils/enums';
import {AuthUser, authActions} from '../store2/auth';
import {logout} from '../store2/auth';
import Toast from 'react-native-toast-message';

type AuthLoginResponse = {
  access_token: string;
  user: AuthUser;
  expires: number;
};

let store: {
  getState: any;
  dispatch: any;
};

export const injectStore = (_store: any) => {
  store = _store;
};

export const apiBaseUrl = API_URL;

const httpType = __DEV__ ? 'https://' : 'https://';

const timezoneName = RNLocalize.getTimeZone();

const api = axios.create({
  baseURL: `${httpType}${apiBaseUrl}`,
  withCredentials: true,
  headers: {
    'User-TimezoneName': timezoneName,
    Accept: 'application/json',
    'Content-Type': 'application/json',
  },
});

api.interceptors.request.use(async (config) => {
  const cookie = await AsyncStorage.getItem(LocalStorageKeys.AUTH_REFRESH);
  const authToken = await AsyncStorage.getItem(LocalStorageKeys.AUTH_TOKEN);

  if (cookie) {
    config.headers.Cookie = cookie;
    config.headers.Authorization = `Bearer ${authToken}`;
  }

  return config;
});

api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const {signed} = store.getState().auth;
    async function setAuth(authTk: string) {
      api.defaults.headers.Authorization = `Bearer ${authTk}`;
    }

    const status = error.response ? error.response.data.message.name : null;
    if (status === 'TokenExpiredError') {
      const cookie = await AsyncStorage.getItem(LocalStorageKeys.AUTH_REFRESH);

      const refresh = axios.create({
        baseURL: `${httpType}${apiBaseUrl}`,
        withCredentials: true,
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
          cookie,
        },
      });

      try {
        const refreshResponse = await refresh.post<
          Omit<AuthLoginResponse, 'user'>
        >('/auth/refresh');

        await AsyncStorage.setItem(
          LocalStorageKeys.AUTH_TOKEN,
          refreshResponse.data.access_token,
        );

        store.dispatch(
          authActions.setToken({token: refreshResponse.data.access_token}),
        );

        await setAuth(refreshResponse.data.access_token);

        if (signed) {
          return api.request(error.config);
        }
      } catch (error2) {
        store.dispatch(logout());
        Toast.show({
          text1: 'Erro de autenticação',
          text2: 'faça o login novamente.',
          position: 'bottom',
          type: 'error',
          visibilityTime: 3000,
        });
      }
    }

    throw error;
  },
);

export default api;
