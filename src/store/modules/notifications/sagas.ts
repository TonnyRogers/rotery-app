import {takeLatest, put, all, call, select} from 'redux-saga/effects';
import {AxiosResponse} from 'axios';

import {
  NotificationAlias,
  NotificationsProps,
  ItineraryMemberAcceptWsResponse,
} from '../../../utils/types';
import api from '../../../providers/api';
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
  wsNewChatNotification,
  wsGuideActivatedNotivication,
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
      if (iterator.alias === NotificationAlias.CONNECTION_ACCEPTED) {
        yield put(wsConnectionAcceptedNotification(iterator));
      }
      if (iterator.alias === NotificationAlias.NEW_MEMBER) {
        yield put(wsNewItineraryMemeberNotification(iterator));
      }
      if (iterator.alias === NotificationAlias.NEW_MESSAGE) {
        yield put(wsNewMessageNotification(iterator));
      }
      if (iterator.alias === NotificationAlias.NEW_CHAT) {
        yield put(wsNewChatNotification(iterator));
      }
      if (iterator.alias === NotificationAlias.NEW_QUESTION) {
        yield put(wsItineraryQuestionNotification(iterator));
      }
      if (iterator.alias === NotificationAlias.MEMBER_ACCEPTED) {
        const payloadResponse: ItineraryMemberAcceptWsResponse =
          iterator.jsonData;
        yield put(getFeedDetailRequest(payloadResponse.itineraryId));
        yield put(getNextItineraryDetailsRequest(payloadResponse.itineraryId));
      }
      if (iterator.alias === NotificationAlias.MEMBER_REJECTED) {
        yield put(wsRejectedItineraryMemeberNotification(iterator));
      }
      if (iterator.alias === NotificationAlias.NEW_CONNECTION) {
        yield put(wsNewConnectionNotification(iterator));
      }
      if (iterator.alias === NotificationAlias.RATE_ITINERARY) {
        yield put(wsItineraryRateNotification(iterator));
      }
      if (iterator.alias === NotificationAlias.ITINERARY_UPDATED) {
        yield put(wsItineraryUpdateNotification(iterator));
      }
      if (iterator.alias === NotificationAlias.ITINERARY_DELETED) {
        yield put(wsItineraryDeleteNotification(iterator));
      }
      if (iterator.alias === NotificationAlias.NEW_ANSWER) {
        yield put(wsItineraryAnswerNotification(iterator));
      }
      if (iterator.alias === NotificationAlias.GUIDE_ACTIVATED) {
        yield put(wsGuideActivatedNotivication(iterator));
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
  takeLatest(NotificationsActions.GET_REQUEST, getNotifications),
  takeLatest(WsActions.NEW_MESSAGE, setNewNotification),
  takeLatest(WsActions.NEW_CHAT_NOTIFICATION, setNewNotification),
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
  takeLatest(WsActions.GUIDE_ACTIVATED, setNewNotification),
]);
