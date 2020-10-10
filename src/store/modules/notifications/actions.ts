import {NotificationsProps} from './reducer';

export function getNotificationsRequest() {
  return {type: '@notifications/GET_NOTIFICATIONS_REQUEST'};
}

export function getNotificationsSuccess(notifications: NotificationsProps) {
  return {
    type: '@notifications/GET_NOTIFICATIONS_SUCCESS',
    payload: {notifications},
  };
}

export function setNoticationReadedRequest(notificationId: number) {
  return {
    type: '@notifications/SET_NOTIFICATION_READED_REQUEST',
    payload: {notificationId},
  };
}

export function setNoticationReadedSuccess() {
  return {
    type: '@notifications/SET_NOTIFICATION_READED_SUCCESS',
  };
}
