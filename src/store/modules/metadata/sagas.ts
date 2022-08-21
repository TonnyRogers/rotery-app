import {all, takeLatest, call, put} from 'redux-saga/effects';
import Toast from 'react-native-toast-message';

import {
  MetadataActions,
  getFirstStepsFailure,
  getFirstStepsSuccess,
} from './actions';
import NetInfo from '../../../services/netinfo';
import api from '../../../services/api';

function* getFirstStep() {
  const info = yield call(NetInfo);

  if (!info.status) {
    yield put(getFirstStepsFailure());
    return;
  }

  try {
    const response = yield call(api.get, 'metadata/first-steps');
    yield put(getFirstStepsSuccess(response.data));
  } catch (error) {
    yield put(getFirstStepsFailure());
    Toast.show({
      text1: 'Erro ao buscar dados.',
      position: 'bottom',
      type: 'error',
    });
  }
}

export default all([
  takeLatest(MetadataActions.GET_FIRST_STEPS_REQUEST, getFirstStep),
]);
