import {useRef, useEffect} from 'react';
import websocket, {SocketClient} from '../providers/websocket';
import {useSelector, useDispatch} from 'react-redux';
import {wsListenSubscriptions} from '../store/modules/websocket/actions';
import {
  NotificationsProps,
  NotificationAlias,
  Subscription,
  InvitesProps,
  ChatMessage,
} from '../utils/types';
import {useVibration} from './useVibration';
import {RootState} from '../providers/store';
import {notificationsActions} from '../store2/notifications';
import {subscriptionsActions} from '../store2/subscription';
import {conectionsActions} from '../store2/connections';
import {chatActions} from '../store2/chats';

export const useSocket = () => {
  const dispatch = useDispatch();
  const {alternated} = useVibration();
  const {user, signed, token} = useSelector((state: RootState) => state.auth);
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
              dispatch(notificationsActions.setNotification(payload));
              dispatch(
                conectionsActions.setNotificationConnection(
                  payload.jsonData as InvitesProps,
                ),
              );
            }
            if (payload.alias === NotificationAlias.CONNECTION_ACCEPTED) {
              dispatch(notificationsActions.setNotification(payload));
              dispatch(
                conectionsActions.setNotificationConnection(
                  payload.jsonData as InvitesProps,
                ),
              );
            }
            if (payload.alias === NotificationAlias.NEW_CHAT) {
              const chatMessageNotification: ChatMessage = payload.jsonData;
              dispatch(notificationsActions.setNotification(payload));
              dispatch(
                chatActions.setChatNotificationMessage(chatMessageNotification),
              );
            }
            if (payload.alias === NotificationAlias.RATE_LOCATION) {
              dispatch(notificationsActions.setNotification(payload));
            }
            if (payload.alias === NotificationAlias.CONNECTION_BLOCK) {
              const connectionNotification: InvitesProps = payload.jsonData;
              dispatch(notificationsActions.setNotification(payload));
              dispatch(
                conectionsActions.blockConnection({
                  userId: connectionNotification.target.id,
                }),
              );
            }
            if (payload.alias === NotificationAlias.CONNECTION_UNBLOCK) {
              const connectionNotification: InvitesProps = payload.jsonData;
              dispatch(notificationsActions.setNotification(payload));
              dispatch(
                conectionsActions.unblockConnection({
                  userId: connectionNotification.target.id,
                }),
              );
            }
            if (payload.alias === NotificationAlias.GUIDE_ACTIVATED) {
              dispatch(notificationsActions.setNotification(payload));
            }
            // if (payload.alias === NotificationAlias.NEW_MESSAGE) {
            //   dispatch(setNotificationsAction(payload));
            // }
            // if (payload.alias === NotificationAlias.NEW_MEMBER) {
            //   dispatch(setNotificationsAction(payload));
            // }
            // if (payload.alias === NotificationAlias.MEMBER_ACCEPTED) {
            //   const payloadResponse: ItineraryMemberAcceptWsResponse =
            //     payload.jsonData;
            //   dispatch(getFeedDetailRequest(payloadResponse.itineraryId));
            //   dispatch(
            //     getNextItineraryDetailsRequest(payloadResponse.itineraryId),
            //   );
            // }
            // if (payload.alias === NotificationAlias.MEMBER_REJECTED) {
            //   dispatch(setNotificationsAction(payload));
            // }
            // if (payload.alias === NotificationAlias.NEW_QUESTION) {
            //   dispatch(setNotificationsAction(payload));
            // }
            // if (payload.alias === NotificationAlias.NEW_ANSWER) {
            //   dispatch(setNotificationsAction(payload));
            // }
            // if (payload.alias === NotificationAlias.ITINERARY_UPDATED) {
            //   dispatch(setNotificationsAction(payload));
            // }
            // if (payload.alias === NotificationAlias.ITINERARY_DELETED) {
            //   dispatch(setNotificationsAction(payload));
            // }
            // if (payload.alias === NotificationAlias.RATE_ITINERARY) {
            //   dispatch(setNotificationsAction(payload));
            // }
          },
        );

        if (!user.isGuide) {
          socket.current.emit(NotificationAlias.HOST_SUBSCRIPTION, user.id);
          dispatch(wsListenSubscriptions());

          socket.current.on('subscription-updates', (payload: Subscription) => {
            dispatch(subscriptionsActions.setSubscription(payload));
          });
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
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [signed, user, token, socket.current]);

  return {socket: socket.current};
};
