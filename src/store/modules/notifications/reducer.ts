import produce from 'immer';

export interface NotificationsProps {
  id: number;
  user_id: number;
  readed: boolean;
  subject: string;
  content: string;
  created_at: string;
  alias: string;
  json_data: {
    itinerary_id: number;
  };
}

interface InitialStateProps {
  data: NotificationsProps[] | null;
  counter: number;
}

interface ActionProps {
  type: string;
  payload: {
    notifications: NotificationsProps[];
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
      case '@notifications/GET_NOTIFICATIONS_SUCCESS': {
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
      default:
    }
  });
}
