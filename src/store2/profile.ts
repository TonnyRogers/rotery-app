import Toast from 'react-native-toast-message';
import {createSlice, PayloadAction, Dispatch} from '@reduxjs/toolkit';

import api from '../providers/api';
import {
  ProfileProps,
  ProfileLocationJson,
  GuideRelateValidation,
} from '../utils/types';
import {authActions} from './auth';
import {translateError} from '../lib/utils';

interface InitialStateProps {
  data: ProfileProps | null;
  loading: boolean;
}

type UpdateProfilePayload = {
  name: string;
  gender: string;
  birth: string;
  document: string;
  profission: string;
  phone: string;
  location: string;
  location_json?: ProfileLocationJson;
};

const initialState: InitialStateProps = {
  data: null,
  loading: false,
};

export const profileSlice = createSlice({
  name: 'profile',
  initialState,
  reducers: {
    setProfile: (state, action: PayloadAction<ProfileProps>) => {
      state.data = action.payload;
    },
    setProfileImage: (state, action: PayloadAction<ProfileProps>) => {
      const profileCopy = state.data;
      if (profileCopy?.file) {
        profileCopy.file = action.payload.file;
      }
      state.data = profileCopy;
    },
    initLoading: (state) => {
      state.loading = true;
    },
    endLoading: (state) => {
      state.loading = false;
    },
    setDeletedUser: (state) => {
      state;
    },
    setGuideValidateRelateToLocation: (
      state,
      action: PayloadAction<GuideRelateValidation>,
    ) => {
      state;
      action;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(authActions.handleLogout, (state) => {
      state.data = initialState.data;
    });
  },
});

const {setProfile, endLoading, initLoading, setProfileImage} =
  profileSlice.actions;
export const profileActions = profileSlice.actions;

export const getProfile = () => async (dispatch: Dispatch) => {
  try {
    dispatch(initLoading());
    const response = await api.get('/profile');

    dispatch(setProfile(response.data));
    dispatch(endLoading());
  } catch (error) {
    dispatch(endLoading());
  }
};

export const updateProfile =
  (payload: UpdateProfilePayload) => async (dispatch: Dispatch) => {
    try {
      dispatch(initLoading());
      let updatePayload: any = {};

      Object.entries(payload).forEach((item) => {
        if (item[1] !== undefined) {
          updatePayload = {
            ...updatePayload,
            [item[0]]: item[1],
          };
        }
      });

      updatePayload.birth = new Date(updatePayload.birth).toISOString();

      const response = await api.put<ProfileProps>(
        '/profile',
        Object.assign({}, updatePayload),
      );

      dispatch(setProfile(response.data));
      dispatch(endLoading());
      Toast.show({
        text1: 'Perfil atualizado',
        position: 'bottom',
        type: 'success',
      });
    } catch (error) {
      dispatch(endLoading());
      Toast.show({
        text1: `${translateError(error?.response.data.message)}`,
        position: 'bottom',
        type: 'error',
      });
    }
  };

export const updateProfileImage =
  (file_id: number) => async (dispatch: Dispatch) => {
    try {
      dispatch(initLoading());

      const response = await api.put<ProfileProps>('/profile/avatar', {
        file: file_id,
      });

      dispatch(setProfileImage(response.data));
      dispatch(endLoading());
    } catch (error) {
      dispatch(endLoading());
      Toast.show({
        text1: 'Erro ao atualizar imagem',
        position: 'bottom',
        type: 'error',
      });
    }
  };

export const deleteUser = () => async (dispatch: Dispatch) => {
  try {
    dispatch(initLoading());

    await api.delete('/users');

    dispatch(profileActions.setDeletedUser());
    dispatch(endLoading());
  } catch (error) {
    dispatch(endLoading());
    Toast.show({
      text1: 'Erro ao remover conta',
      position: 'bottom',
      type: 'error',
    });
  }
};

export const valideGuideLocationRelate = () => async (dispatch: Dispatch) => {
  try {
    dispatch(initLoading());

    const response = await api.get<GuideRelateValidation>(
      '/users/guide/is-active',
    );

    dispatch(profileActions.setGuideValidateRelateToLocation(response.data));
    dispatch(endLoading());
  } catch (error) {
    dispatch(endLoading());
  }
};

export default profileSlice.reducer;
