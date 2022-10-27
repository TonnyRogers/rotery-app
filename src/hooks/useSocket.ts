import {useRef, useEffect} from 'react';
import websocket, {SocketClient} from '../providers/websocket';
import {useSelector, useDispatch} from 'react-redux';
import {RootStateProps} from '../store/modules/rootReducer';
import {
  wsNewMessageNotification,
  wsNewItineraryMemeberNotification,
  wsRejectedItineraryMemeberNotification,
  wsNewConnectionNotification,
  wsConnectionAcceptedNotification,
  wsItineraryQuestionNotification,
  wsItineraryAnswerNotification,
  wsItineraryUpdateNotification,
  wsItineraryDeleteNotification,
  wsItineraryRateNotification,
  wsConnectionBlockedNotification,
  wsConnectionUnblockedNotification,
  wsListenSubscriptions,
  wsNewChatNotification,
  wsLocationRateNotification,
  wsGuideActivatedNotivication,
} from '../store/modules/websocket/actions';
import {
  NotificationsProps,
  NotificationAlias,
  ItineraryMemberAcceptWsResponse,
} from '../utils/types';
import {getFeedDetailRequest} from '../store/modules/feed/actions';
import {getNextItineraryDetailsRequest} from '../store/modules/nextItineraries/actions';
import {useVibration} from './useVibration';

interface useSocketProps {
  listeners?: () => void;
  emmiters?: () => void;
}

export const useSocket = () => {
  const dispatch = useDispatch();
  const {alternated} = useVibration();
  const {user, signed, token} = useSelector(
    (state: RootStateProps) => state.auth,
  );
  const socket = useRef<SocketClient>(websocket.client);

  useEffect(() => {
    if (signed && user) {
      if (!socket.current) {
        socket.current = websocket.init(user.id, String(token));

        socket.current.on(
          `notify:${user.id}`,
          (payload: NotificationsProps<any>) => {
            alternated();
            if (payload.alias === NotificationAlias.NEW_CONNECTION) {
              dispatch(wsNewConnectionNotification(payload));
            }
            if (payload.alias === NotificationAlias.CONNECTION_ACCEPTED) {
              dispatch(wsConnectionAcceptedNotification(payload));
            }
            if (payload.alias === NotificationAlias.NEW_MESSAGE) {
              dispatch(wsNewMessageNotification(payload));
            }
            if (payload.alias === NotificationAlias.NEW_CHAT) {
              dispatch(wsNewChatNotification(payload));
            }
            if (payload.alias === NotificationAlias.NEW_MEMBER) {
              dispatch(wsNewItineraryMemeberNotification(payload));
            }
            if (payload.alias === NotificationAlias.MEMBER_ACCEPTED) {
              const payloadResponse: ItineraryMemberAcceptWsResponse =
                payload.jsonData;
              dispatch(getFeedDetailRequest(payloadResponse.itineraryId));
              dispatch(
                getNextItineraryDetailsRequest(payloadResponse.itineraryId),
              );
            }
            if (payload.alias === NotificationAlias.MEMBER_REJECTED) {
              dispatch(wsRejectedItineraryMemeberNotification(payload));
            }
            if (payload.alias === NotificationAlias.NEW_QUESTION) {
              dispatch(wsItineraryQuestionNotification(payload));
            }
            if (payload.alias === NotificationAlias.NEW_ANSWER) {
              dispatch(wsItineraryAnswerNotification(payload));
            }
            if (payload.alias === NotificationAlias.ITINERARY_UPDATED) {
              dispatch(wsItineraryUpdateNotification(payload));
            }
            if (payload.alias === NotificationAlias.ITINERARY_DELETED) {
              dispatch(wsItineraryDeleteNotification(payload));
            }
            if (payload.alias === NotificationAlias.RATE_ITINERARY) {
              dispatch(wsItineraryRateNotification(payload));
            }
            if (payload.alias === NotificationAlias.RATE_LOCATION) {
              dispatch(wsLocationRateNotification(payload));
            }
            if (payload.alias === NotificationAlias.CONNECTION_BLOCK) {
              dispatch(wsConnectionBlockedNotification(payload));
            }
            if (payload.alias === NotificationAlias.CONNECTION_UNBLOCK) {
              dispatch(wsConnectionUnblockedNotification(payload));
            }
            if (payload.alias === NotificationAlias.GUIDE_ACTIVATED) {
              dispatch(wsGuideActivatedNotivication(payload));
            }
          },
        );

        if (user.isGuide) {
          socket.current.emit(NotificationAlias.HOST_SUBSCRIPTION, user.id);
          dispatch(wsListenSubscriptions());
        }
      }
      if (socket.current.disconnect()) {
        socket.current.open();
      }
    }

    return () => {
      if (socket.current && socket.current.connected) {
        socket.current.close();
      }
    };
  }, [signed, user, dispatch, token, alternated]);

  return {socket: socket.current};
};
