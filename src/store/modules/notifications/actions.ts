import {NotificationsProps} from '../../../utils/types';

export enum NotificationsActions {
  NEW_NOTIFICATION = '@notifications/NEW_NOTIFICATION',
  SET_READED_REQUEST = '@notifications/SET_NOTIFICATION_READED_REQUEST',
  SET_READED_SUCESS = '@notifications/SET_NOTIFICATION_READED_SUCCESS',
  GET_REQUEST = '@notifications/GET_NOTIFICATIONS_REQUEST',
  GET_SUCCESS = '@notifications/GET_NOTIFICATIONS_SUCCESS',
}

export function getNotificationsRequest() {
  return {type: NotificationsActions.GET_REQUEST};
}

export function getNotificationsSuccess(
  notifications: NotificationsProps<any>[],
) {
  return {
    type: NotificationsActions.GET_SUCCESS,
    payload: {notifications},
  };
}

export function setNoticationReadedRequest(notificationId: number) {
  return {
    type: NotificationsActions.SET_READED_REQUEST,
    payload: {notificationId},
  };
}

export function setNoticationReadedSuccess(notificationId: number) {
  return {
    type: NotificationsActions.SET_READED_SUCESS,
    payload: {notificationId},
  };
}

export function newNotification(notification: NotificationsProps<any>) {
  return {
    type: NotificationsActions.NEW_NOTIFICATION,
    payload: {notification},
  };
}
