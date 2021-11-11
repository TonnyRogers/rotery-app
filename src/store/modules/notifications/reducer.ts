import produce from 'immer';
// import {localNotification} from '../../../services/notifications';
import {NotificationsActions} from './actions';
import {NotificationsProps} from '../../../utils/types';
import {AuthActions} from '../auth/actions';

interface InitialStateProps {
  data: NotificationsProps<any>[] | null;
  counter: number;
}

interface ActionProps {
  type: string;
  payload: {
    notifications: NotificationsProps<any>[];
    notification: NotificationsProps<any>;
    notificationId: number;
  };
}

const INITAL_STATE: InitialStateProps = {
  data: null,
  counter: 0,
};

export default function notifications(
  state = INITAL_STATE,
  action: ActionProps,
) {
  return produce(state, (draft) => {
    switch (action.type) {
      case NotificationsActions.GET_SUCCESS: {
        let notReadedCouter = 0;
        const notReadedNotifications = action.payload.notifications.filter(
          (item) => {
            if (!item.isReaded) {
              notReadedCouter += 1;
              return item;
            }
          },
        );

        draft.data = notReadedNotifications;
        draft.counter = notReadedCouter;
        break;
      }
      case NotificationsActions.NEW_NOTIFICATION: {
        let notReadedCouter = 0;
        const allNotifications = draft.data;
        const newNotification = action.payload.notification;

        if (allNotifications !== null) {
          const similar = allNotifications?.findIndex(
            (item) =>
              item.subject === newNotification.subject &&
              item.content === newNotification.content,
          );

          if (similar === -1) {
            allNotifications?.push(newNotification);

            const notReadedNotifications: NotificationsProps<any>[] =
              allNotifications.filter((item) => {
                if (item.isReaded === false) {
                  notReadedCouter += 1;
                  return item;
                }
              });

            draft.data = notReadedNotifications;
            draft.counter = notReadedCouter;
          }
        } else {
          draft.data = [newNotification];
          draft.counter = 1;
        }
        break;
      }
      case NotificationsActions.SET_READED_SUCESS: {
        const allNotifications = draft.data;
        const {notificationId} = action.payload;

        if (allNotifications !== null) {
          const notificationIndex = allNotifications?.findIndex(
            (item) => Number(item.id) === Number(notificationId),
          );

          if (notificationIndex !== -1) {
            allNotifications.splice(notificationIndex, 1);

            draft.data = allNotifications;
            draft.counter = draft.counter - 1;
          }
        }
        break;
      }
      case AuthActions.LOGOUT: {
        draft.counter = INITAL_STATE.counter;
        draft.data = INITAL_STATE.data;
      }
      default:
    }
  });
}
