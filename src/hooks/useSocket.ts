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
            switch (payload.alias) {
              case NotificationAlias.NEW_CONNECTION:
                dispatch(wsNewConnectionNotification(payload));
                break;
              case NotificationAlias.CONNECTION_ACCEPTED:
                dispatch(wsConnectionAcceptedNotification(payload));
                break;
              case NotificationAlias.NEW_MESSAGE:
                dispatch(wsNewMessageNotification(payload));
                break;
              case NotificationAlias.NEW_CHAT:
                dispatch(wsNewChatNotification(payload));
                break;
              case NotificationAlias.NEW_MEMBER:
                dispatch(wsNewItineraryMemeberNotification(payload));
                break;
              case NotificationAlias.MEMBER_ACCEPTED:
                const payloadResponse: ItineraryMemberAcceptWsResponse =
                  payload.jsonData;
                dispatch(getFeedDetailRequest(payloadResponse.itineraryId));
                dispatch(
                  getNextItineraryDetailsRequest(payloadResponse.itineraryId),
                );
                break;
              case NotificationAlias.MEMBER_REJECTED:
                dispatch(wsRejectedItineraryMemeberNotification(payload));
                break;
              case NotificationAlias.NEW_QUESTION:
                dispatch(wsItineraryQuestionNotification(payload));
                break;
              case NotificationAlias.NEW_ANSWER:
                dispatch(wsItineraryAnswerNotification(payload));
                break;
              case NotificationAlias.ITINERARY_UPDATED:
                dispatch(wsItineraryUpdateNotification(payload));
                break;
              case NotificationAlias.ITINERARY_DELETED:
                dispatch(wsItineraryDeleteNotification(payload));
                break;
              case NotificationAlias.RATE_ITINERARY:
                dispatch(wsItineraryRateNotification(payload));
                break;
              case NotificationAlias.RATE_LOCATION:
                dispatch(wsLocationRateNotification(payload));
                break;
              case NotificationAlias.CONNECTION_BLOCK:
                dispatch(wsConnectionBlockedNotification(payload));
                break;
              case NotificationAlias.CONNECTION_UNBLOCK:
                dispatch(wsConnectionUnblockedNotification(payload));
                break;

              default:
                break;
            }
          },
        );

        if (user.isHost) {
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
