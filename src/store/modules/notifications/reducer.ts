import produce from 'immer';
// import {localNotification} from '../../../services/notifications';
import {NotificationsActions} from './actions';
import {NotificationsProps} from '../../../utils/types';

interface InitialStateProps {
  data: NotificationsProps[] | null;
  counter: number;
}

interface ActionProps {
  type: string;
  payload: {
    notifications: NotificationsProps[];
    notification: NotificationsProps;
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
            if (!item.readed) {
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

            const notReadedNotifications: NotificationsProps[] =
              allNotifications.filter((item) => {
                if (item.readed === false) {
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
            (item) => item.id === notificationId,
          );

          if (notificationIndex !== -1) {
            allNotifications.splice(notificationIndex, 1);

            draft.data = allNotifications;
            draft.counter = draft.counter - 1;
          }
        }
        break;
      }
      default:
    }
  });
}
