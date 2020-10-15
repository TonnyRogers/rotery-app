import {takeLatest, put, all, call} from 'redux-saga/effects';

import api from '../../../services/api';
import {
  getNotificationsSuccess,
  setNoticationReadedRequest,
  setNoticationReadedSuccess,
} from './actions';

export function* getNotifications() {
  try {
    const response = yield call(api.get, '/notifications');

    yield put(getNotificationsSuccess(response.data));
  } catch (error) {}
}

export function* setNotificationReaded({
  payload,
}: ReturnType<typeof setNoticationReadedRequest>) {
  try {
    const {notificationId} = payload;
    yield call(api.put, `/notifications/${notificationId}`);

    yield put(setNoticationReadedSuccess());
  } catch (error) {}
}

export default all([
  takeLatest(
    '@notifications/SET_NOTIFICATION_READED_SUCCESS',
    getNotifications,
  ),
  takeLatest(
    '@notifications/SET_NOTIFICATION_READED_REQUEST',
    setNotificationReaded,
  ),
  takeLatest('WS_NOTIFICATION_MESSAGES', getNotifications),
  takeLatest('@notifications/GET_NOTIFICATIONS_REQUEST', getNotifications),
]);
