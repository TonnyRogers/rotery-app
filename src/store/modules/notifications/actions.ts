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
