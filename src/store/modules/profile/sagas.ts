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
    const {name, birth, cpf, profission, phone, fileId} = payload;
    const response = yield call(api.put, '/profile', {
      name,
      birth,
      cpf,
      profission,
      phone,
      file_id: fileId > 0 ? fileId : null,
    });

    yield put(updateProfileSuccess(response.data));
  } catch (error) {
    Alert.alert('Erro ao atualizar dados');
    yield put(updateProfileFailure());
  }
}

export default all([
  takeLatest('@profile/UPDATE_PROFILE_REQUEST', updateProfile),
  takeLatest('@profile/GET_PROFILE_REQUEST', getProfile),
]);
