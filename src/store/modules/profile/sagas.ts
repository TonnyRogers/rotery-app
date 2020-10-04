import {all, takeLatest, put, call} from 'redux-saga/effects';
import {Alert} from 'react-native';

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
} from './actions';

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
    Alert.alert('Perfil atualizado');
  } catch (error) {
    console.tron.log(error);
    Alert.alert('Erro ao atualizar dados');
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
    console.tron.log(error);
    Alert.alert('Erro ao atualizar imagem');
    yield put(updateProfileImageFailure());
  }
}

export default all([
  takeLatest('@profile/UPDATE_PROFILE_IMAGE_REQUEST', updateProfileImage),
  takeLatest('@profile/UPDATE_PROFILE_REQUEST', updateProfile),
  takeLatest('@profile/GET_PROFILE_REQUEST', getProfile),
]);
