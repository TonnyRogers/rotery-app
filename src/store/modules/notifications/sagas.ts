import {takeLatest, put, all, call} from 'redux-saga/effects';

import api from '../../../services/api';
import {getNotificationsSuccess} from './actions';

export function* getNotifications() {
  try {
    const response = yield call(api.get, '/notifications');

    yield put(getNotificationsSuccess(response.data));
  } catch (error) {}
}

export default all([takeLatest('WS_NOTIFICATION_MESSAGES', getNotifications)]);
