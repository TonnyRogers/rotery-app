import {all, takeLatest, put, call} from 'redux-saga/effects';
import Toast from 'react-native-toast-message';

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
import {setLoadingFalse, setLoadingTrue} from '../auth/actions';

export function* getProfile() {
  try {
    const info = yield call(NetInfo);

    if (!info.status) {
      yield put(setLoadingFalse());
      return;
    }

    const response = yield call(api.get, '/profile');

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
    const info = yield call(NetInfo);

    if (!info.status) {
      yield put(setLoadingFalse());
      return;
    }

    const {name, gender, birth, cpf, profission, phone} = payload;
    yield put(setLoadingTrue());
    const response = yield call(api.put, '/profile', {
      name,
      gender,
      birth,
      cpf,
      profission,
      phone,
    });
    yield put(updateProfileSuccess(response.data));
    yield put(setLoadingFalse());
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
    yield put(setLoadingFalse());
    yield put(updateProfileFailure());
  }
}

export function* updateProfileImage({
  payload,
}: ReturnType<typeof updateProfileImageRequest>) {
  try {
    const info = yield call(NetInfo);

    if (!info.status) {
      yield put(setLoadingFalse());
      return;
    }

    const {file_id} = payload;
    yield put(setLoadingTrue());
    const response = yield call(api.put, '/profile/image', {
      file_id,
    });

    yield put(updateProfileImageSuccess(response.data));
    yield put(setLoadingFalse());
  } catch (error) {
    Toast.show({
      text1: 'Erro ao atualizar imagem',
      position: 'bottom',
      type: 'error',
    });
    yield put(updateProfileImageFailure());
    yield put(setLoadingFalse());
  }
}

export function* deleteUser() {
  try {
    const info = yield call(NetInfo);

    if (!info.status) {
      yield put(setLoadingFalse());
      return;
    }

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
