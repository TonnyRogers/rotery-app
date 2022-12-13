import {createSlice, PayloadAction, Dispatch} from '@reduxjs/toolkit';
import Toast from 'react-native-toast-message';
import AsyncStorage from '@react-native-community/async-storage';
import messaging from '@react-native-firebase/messaging';

import api from '../providers/api';
import {LocalStorageKeys, ContentGuideTourKeys} from '../utils/enums';
import * as RootNavigation from '../RootNavigation';
import {translateError} from '../lib/utils';
import {unauthenticate} from '../providers/google-oauth';
import {GuideRelateValidation, UserProps} from '../utils/types';
import {getProfile, profileActions} from './profile';
import {getConnections} from './connections';
import {getNotifications} from './notifications';
import {getGuides} from './guides';
import {getBankAccount} from './bankAccount';

export interface AuthUser extends Omit<UserProps, 'profile'> {
  profile: number;
}

interface InitialStateProps {
  token: string | null;
  loading: boolean;
  authChecked: boolean;
  signed: boolean;
  user: AuthUser | null;
}

type LoginResponsePayload = {
  access_token: string;
  user: AuthUser;
};

type RegisterUserPayload = {
  username: string;
  email: string;
  password: string;
  isGuide: boolean;
};

const initialState: InitialStateProps = {
  authChecked: false,
  token: null,
  signed: false,
  loading: false,
  user: null,
};

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setLoggedUser: (state, action: PayloadAction<LoginResponsePayload>) => {
      state.user = action.payload.user;
      state.token = action.payload.access_token;
      state.signed = true;
    },
    handleLogout: (state) => {
      state.authChecked = initialState.authChecked;
      state.loading = initialState.loading;
      state.signed = initialState.signed;
      state.token = initialState.token;
      state.user = initialState.user;
    },
    initLoading: (state) => {
      state.loading = true;
    },
    endLoading: (state) => {
      state.loading = false;
    },
    setToken: (state, action: PayloadAction<{token: string}>) => {
      state.token = action.payload.token;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(profileActions.setDeletedUser, (state) => {
      state.authChecked = initialState.authChecked;
      state.loading = initialState.loading;
      state.signed = initialState.signed;
      state.token = initialState.token;
      state.user = initialState.user;
    });
    builder.addCase(
      profileActions.setGuideValidateRelateToLocation,
      (state, action: PayloadAction<GuideRelateValidation>) => {
        if (state.user) {
          state.user = {
            ...state.user,
            canRelateLocation: action.payload.isActive,
          };
        }
      },
    );
  },
});

export const authActions = authSlice.actions;
const {endLoading, initLoading} = authActions;

export const loginRequest =
  (payload: {email: string; password: string}) =>
  async (dispatch: Dispatch) => {
    const {email, password} = payload;
    try {
      dispatch(initLoading());
      const response = await api.post<LoginResponsePayload>('/auth/login', {
        email,
        password,
      });

      if (!response.data.access_token) {
        dispatch(endLoading());
        Toast.show({
          text1: 'Email ou senha incorreto.',
          position: 'bottom',
          type: 'error',
        });

        return;
      }

      const isGuide = response.data.user.isGuide;

      await AsyncStorage.setItem(
        LocalStorageKeys.AUTH_TOKEN,
        response.data.access_token,
      );
      await AsyncStorage.setItem(
        LocalStorageKeys.AUTH_REFRESH,
        response.headers['set-cookie'][0],
      );

      dispatch(authActions.setLoggedUser(response.data));
      dispatch(
        getGuides({
          chatKey: isGuide
            ? ContentGuideTourKeys.GUIDE_CHAT
            : ContentGuideTourKeys.BACKPACKER_CHAT,
          locationDetailingKey: isGuide
            ? ContentGuideTourKeys.GUIDE_LOCATION_DETALING
            : ContentGuideTourKeys.BACKPACKER_LOCATION_DETALING,
          profileKey: isGuide
            ? ContentGuideTourKeys.GUIDE_PROFILE
            : ContentGuideTourKeys.BACKPACKER_PROFILE,
          subscriptionKey: isGuide
            ? ContentGuideTourKeys.GUIDE_SUBSCRIPTION
            : ContentGuideTourKeys.BACKPACKER_SUBSCRIPTION,
          welcomeKey: isGuide
            ? ContentGuideTourKeys.GUIDE_WELCOME
            : ContentGuideTourKeys.BACKPACKER_WELCOME,
        }) as any,
      );

      if (response.data.user.isGuide) {
        dispatch(getBankAccount() as any);
      }

      dispatch(setDeviceToken() as any);
      dispatch(getProfile() as any);
      dispatch(getConnections() as any);
      dispatch(getNotifications() as any);
      dispatch(endLoading());
      RootNavigation.replace('Welcome');
    } catch (error) {
      dispatch(endLoading());
      Toast.show({
        text1: `${translateError(error?.response.data.message)}`,
        position: 'bottom',
        type: 'error',
      });
    }
  };

export const registerUser =
  (payload: RegisterUserPayload) => async (dispatch: Dispatch) => {
    const {email, isGuide, password, username} = payload;
    try {
      dispatch(initLoading());
      const response = await api.post<{id: number}>('/users', {
        email,
        password,
        isGuide,
        username,
      });

      if (!response.data.id) {
        dispatch(endLoading());
        Toast.show({
          text1: 'Dados incorretos.',
          position: 'bottom',
          type: 'error',
        });
        return;
      }

      Toast.show({
        text1: 'Bem-vindo(a)! 🤙🥳',
        text2: 'Acesse o link enviado por e-mail para ativar seu cadastro.',
        position: 'bottom',
        type: 'success',
        visibilityTime: 5000,
      });

      dispatch(endLoading());
      RootNavigation.goBack();
    } catch (error) {
      dispatch(endLoading());
      Toast.show({
        text1: `${translateError(error?.response.data.message)}`,
        position: 'bottom',
        type: 'error',
      });
    }
  };

export const setDeviceToken = () => async (dispatch: Dispatch) => {
  try {
    let deviceToken = await AsyncStorage.getItem(
      LocalStorageKeys.NOTIFICATION_TOKEN,
    );

    if (!deviceToken) {
      deviceToken = await messaging().getToken();
    }

    dispatch(initLoading());
    await api.put('/users/device', {
      token: deviceToken,
    });

    dispatch(endLoading());
  } catch (error) {
    dispatch(endLoading());
    Toast.show({
      text1: 'Erro ao registrar dispositivo',
      position: 'bottom',
      type: 'error',
    });
  }
};

export const logout = () => async (dispatch: Dispatch) => {
  let deviceToken = await AsyncStorage.getItem(
    LocalStorageKeys.NOTIFICATION_TOKEN,
  );

  if (!deviceToken) {
    deviceToken = await messaging().getToken();
  }

  await api.get(`/auth/logout/${deviceToken}`);

  await AsyncStorage.removeItem(LocalStorageKeys.AUTH_TOKEN);
  await AsyncStorage.removeItem(LocalStorageKeys.AUTH_REFRESH);
  unauthenticate();
  dispatch(authActions.handleLogout());
};

export default authSlice.reducer;
