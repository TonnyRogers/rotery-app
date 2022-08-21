import {all, takeLatest, put, call} from 'redux-saga/effects';
import Toast from 'react-native-toast-message';
import {AxiosResponse} from 'axios';

import api from '../../../services/api';
import NetInfo from '../../../services/netinfo';
import {
  getProfileSuccess,
  getProfileFail,
  updateProfileRequest,
  updateProfileSuccess,
  updateProfileFailure,
  updateProfileImageRequest,
  updateProfileImageSuccess,
  updateProfileImageFailure,
  removeUserSuccess,
  removeUserFailure,
} from './actions';
import {logout} from '../auth/actions';
import {ProfileProps} from '../../../utils/types';

import {getFirstStepsRequest} from '../metadata/actions';

export function* getProfile() {
  try {
    const info = yield call(NetInfo);

    if (!info.status) {
      yield put(getProfileFail());
      return;
    }

    const response: AxiosResponse<ProfileProps> = yield call(
      api.get,
      '/profile',
    );

    yield put(getProfileSuccess(response.data));
  } catch (error) {
    yield put(getProfileFail());
  }
}

export function* updateProfile({
  payload,
}: ReturnType<typeof updateProfileRequest>) {
  try {
    const info = yield call(NetInfo);

    if (!info.status) {
      yield put(updateProfileFailure());
      return;
    }

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

    const response: AxiosResponse<ProfileProps> = yield call(
      api.put,
      '/profile',
      Object.assign({}, updatePayload),
    );

    yield put(updateProfileSuccess(response.data));
    yield put(getFirstStepsRequest());
    Toast.show({
      text1: 'Perfil atualizado',
      position: 'bottom',
      type: 'success',
    });
  } catch (error) {
    Toast.show({
      text1: 'Erro ao atualizar dados',
      position: 'bottom',
      type: 'error',
    });
    yield put(updateProfileFailure());
  }
}

export function* updateProfileImage({
  payload,
}: ReturnType<typeof updateProfileImageRequest>) {
  try {
    const info = yield call(NetInfo);

    if (!info.status) {
      yield put(updateProfileImageFailure());
      return;
    }

    const {file_id} = payload;
    const response = yield call(api.put, '/profile/avatar', {
      file: file_id,
    });

    yield put(updateProfileImageSuccess(response.data));
  } catch (error) {
    Toast.show({
      text1: 'Erro ao atualizar imagem',
      position: 'bottom',
      type: 'error',
    });
    yield put(updateProfileImageFailure());
  }
}

export function* deleteUser() {
  try {
    const info = yield call(NetInfo);

    if (!info.status) {
      yield put(removeUserFailure());
      return;
    }

    yield call(api.delete, '/users');

    yield put(logout());
    yield put(removeUserSuccess());
  } catch (error) {
    yield put(removeUserFailure());
    Toast.show({
      text1: 'Erro ao remover conta',
      position: 'bottom',
      type: 'error',
    });
  }
}

export default all([
  takeLatest('@profile/REMOVE_USER_REQUEST', deleteUser),
  takeLatest('@profile/UPDATE_PROFILE_IMAGE_REQUEST', updateProfileImage),
  takeLatest('@profile/UPDATE_PROFILE_REQUEST', updateProfile),
  takeLatest('@profile/GET_PROFILE_REQUEST', getProfile),
]);
