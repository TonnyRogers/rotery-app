import {takeLatest, put, all, call, select} from 'redux-saga/effects';
import {AxiosResponse} from 'axios';

import {
  NotificationAlias,
  NotificationsProps,
  ItineraryMemberAcceptWsResponse,
} from '../../../utils/types';
import api from '../../../services/api';
import {
  getNotificationsSuccess,
  setNoticationReadedRequest,
  setNoticationReadedSuccess,
  newNotification,
} from './actions';
import {
  WsActions,
  wsNewConnectionNotification,
  wsConnectionAcceptedNotification,
  wsNewMessageNotification,
  wsNewItineraryMemeberNotification,
  wsItineraryQuestionNotification,
  wsRejectedItineraryMemeberNotification,
  wsItineraryRateNotification,
  wsItineraryUpdateNotification,
  wsItineraryDeleteNotification,
  wsItineraryAnswerNotification,
} from '../websocket/actions';
import {NotificationsActions} from './actions';
import {RootStateProps} from '../rootReducer';
import {getFeedDetailRequest} from '../feed/actions';
import {getNextItineraryDetailsRequest} from '../nextItineraries/actions';

export function* getNotifications() {
  const {signed} = yield select((state: RootStateProps) => state.auth);

  if (!signed) {
    return;
  }
  try {
    const response: AxiosResponse<NotificationsProps<any>[]> = yield call(
      api.get,
      '/notifications',
    );

    const nonReadedNotifications: NotificationsProps<any>[] =
      response.data.filter((item) => item.isReaded === false);

    for (const iterator of nonReadedNotifications) {
      switch (iterator.alias) {
        case NotificationAlias.CONNECTION_ACCEPTED:
          yield put(wsConnectionAcceptedNotification(iterator));
          break;
        case NotificationAlias.NEW_MEMBER:
          yield put(wsNewItineraryMemeberNotification(iterator));
          break;
        case NotificationAlias.NEW_MESSAGE:
          yield put(wsNewMessageNotification(iterator));
          break;
        case NotificationAlias.NEW_QUESTION:
          yield put(wsItineraryQuestionNotification(iterator));
          break;
        case NotificationAlias.MEMBER_ACCEPTED:
          const payloadResponse: ItineraryMemberAcceptWsResponse =
            iterator.jsonData;
          yield put(getFeedDetailRequest(payloadResponse.itineraryId));
          yield put(
            getNextItineraryDetailsRequest(payloadResponse.itineraryId),
          );
          break;
        case NotificationAlias.MEMBER_REJECTED:
          yield put(wsRejectedItineraryMemeberNotification(iterator));
          break;
        case NotificationAlias.NEW_CONNECTION:
          yield put(wsNewConnectionNotification(iterator));
          break;
        case NotificationAlias.RATE_ITINERARY:
          yield put(wsItineraryRateNotification(iterator));
          break;
        case NotificationAlias.ITINERARY_UPDATED:
          yield put(wsItineraryUpdateNotification(iterator));
          break;
        case NotificationAlias.ITINERARY_DELETED:
          yield put(wsItineraryDeleteNotification(iterator));
          break;
        case NotificationAlias.NEW_ANSWER:
          yield put(wsItineraryAnswerNotification(iterator));
          break;
        default:
          break;
      }
    }

    yield put(getNotificationsSuccess(response.data));
  } catch (error) {}
}

export function* setNotificationReaded({
  payload,
}: ReturnType<typeof setNoticationReadedRequest>) {
  try {
    const {notificationId} = payload;
    yield call(api.delete, `/notifications/${notificationId}`);

    yield put(setNoticationReadedSuccess(Number(notificationId)));
  } catch (error) {}
}

export function* setNewNotification({
  payload,
}: ReturnType<typeof newNotification>) {
  yield put(newNotification(payload.notification));
}

export default all([
  takeLatest('persist/REHYDRATE', getNotifications),
  takeLatest(NotificationsActions.SET_READED_REQUEST, setNotificationReaded),
  takeLatest(WsActions.NOTIFICATIONS, getNotifications),
  takeLatest(NotificationsActions.GET_REQUEST, getNotifications),
  takeLatest(WsActions.NEW_MESSAGE, setNewNotification),
  takeLatest(WsActions.NEW_ITINERARY_MEMBER, setNewNotification),
  takeLatest(WsActions.MEMBER_ACCEPTED, setNewNotification),
  takeLatest(WsActions.MEMBER_REJECTED, setNewNotification),
  takeLatest(WsActions.NEW_CONNECTION, setNewNotification),
  takeLatest(WsActions.CONNECTION_ACCEPTED, setNewNotification),
  takeLatest(WsActions.ITINERARY_QUESTION, setNewNotification),
  takeLatest(WsActions.ITINERARY_ANSWER, setNewNotification),
  takeLatest(WsActions.ITINERARY_UPDATE, setNewNotification),
  takeLatest(WsActions.ITINERARY_DELETE, setNewNotification),
  takeLatest(WsActions.ITINERARY_RATE, setNewNotification),
]);
