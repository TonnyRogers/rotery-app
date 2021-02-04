import {all, takeLatest, put, call} from 'redux-saga/effects';
import Toast from 'react-native-toast-message';

import api from '../../../services/api';

import {
  getProfileRequest,
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
import {setLoadingFalse, setLoadingTrue} from '../auth/actions';

export function* getProfile({payload}: ReturnType<typeof getProfileRequest>) {
  try {
    const {userId} = payload;
    const response = yield call(api.get, `/profile/${userId}`);

    const profile = response.data;

    yield put(getProfileSuccess(profile));
  } catch (error) {
    yield put(getProfileFail());
  }
}

export function* updateProfile({
  payload,
}: ReturnType<typeof updateProfileRequest>) {
  try {
    const {name, gender, birth, cpf, profission, phone} = payload;
    const response = yield call(api.put, '/profile', {
      name,
      gender,
      birth,
      cpf,
      profission,
      phone,
    });

    yield put(updateProfileSuccess(response.data));
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
    const {file_id} = payload;
    const response = yield call(api.put, '/profile/image', {
      file_id,
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
    yield put(setLoadingTrue());
    yield call(api.delete, '/users');

    yield put(removeUserSuccess());
    yield put(setLoadingFalse());
    yield put(logout());
  } catch (error) {
    yield put(removeUserFailure());
    yield put(setLoadingFalse());
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
