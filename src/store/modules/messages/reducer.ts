import produce from 'immer';
import {MessageProps, NotificationsProps} from '../../../utils/types';
import {MessageActions} from './actions';
import {WsActions} from '../websocket/actions';
import {PushNotificationsActions} from '../pushNotifications/actions';

interface InitialStateProps {
  messages: MessageProps[];
  conversation: MessageProps[];
  unreadCounter: number;
  loading: boolean;
  chatKey: string | null;
}
interface ActionProps {
  type: string;
  payload: {
    messages: MessageProps[];
    message: MessageProps;
    notification: NotificationsProps;
    targetId: number;
    ownerId: number;
    authUserId: number;
  };
}

const INITIAL_STATE: InitialStateProps = {
  messages: [],
  conversation: [],
  unreadCounter: 0,
  loading: false,
  chatKey: null,
};

export default function messages(state = INITIAL_STATE, action: ActionProps) {
  return produce(state, (draft) => {
    switch (action.type) {
      case MessageActions.GET_REQUEST: {
        draft.loading = true;
        break;
      }
      case MessageActions.GET_SUCCESS: {
        const grouped: MessageProps[] = action.payload.messages.reduce(
          (accumulator: MessageProps[], current) => {
            const found = accumulator.find(
              (find) => find.sender_id === current.sender_id,
            );

            const value = current;
            if (!found) {
              accumulator.push({...value, unreaded: value.readed ? 0 : 1});
            } else {
              found.unreaded += value.readed ? 0 : 1;
              found.created_at = value.created_at;
            }

            return accumulator;
          },
          [],
        );

        let counter = 0;

        grouped.forEach((item) => (counter += item.unreaded));

        draft.messages = grouped;
        draft.unreadCounter = counter;
        draft.loading = false;
        break;
      }
      case MessageActions.GET_FAILURE: {
        draft.loading = false;
        break;
      }
      case MessageActions.CONVERSATION_REQUEST: {
        draft.loading = true;
        break;
      }
      case MessageActions.CONVERSATION_SUCCESS: {
        draft.conversation = [...action.payload.messages];
        const messageIndex = draft.messages.findIndex(
          (item) => item.sender_id === action.payload.messages[0].sender_id,
        );
        if (messageIndex > -1) {
          const messageList = draft.messages;

          messageList[messageIndex].unreaded = 0;
          draft.messages = [...messageList];

          let counter = 0;

          draft.messages.forEach((item) => (counter += item.unreaded));
          draft.unreadCounter = counter;
        }
        draft.loading = false;
        break;
      }
      case MessageActions.CONVERSATION_FAILURE: {
        draft.loading = false;
        break;
      }
      case MessageActions.SEND_REQUEST: {
        draft.loading = true;
        break;
      }
      case MessageActions.SEND_SUCCESS: {
        draft.conversation = [action.payload.message, ...draft.conversation];
        draft.loading = false;
        break;
      }
      case MessageActions.SEND_FAILURE: {
        draft.loading = false;
        break;
      }
      case WsActions.NEW_MESSAGE: {
        const grouped = draft.messages;
        const newMessage =
          typeof action.payload.notification.json_data === 'string'
            ? JSON.parse(action.payload.notification.json_data)
            : action.payload.notification.json_data;

        const foundedMessage = grouped.findIndex(
          (item) =>
            item.sender_id === newMessage.sender_id &&
            item.receiver_id === newMessage.receiver_id,
        );

        if (foundedMessage === -1) {
          grouped.push({...newMessage, unreaded: 1});
        } else {
          grouped[foundedMessage] = {
            ...newMessage,
            unreaded: grouped[foundedMessage].unreaded + 1,
          };
        }

        let counter = 0;

        grouped.forEach((item) => (counter += item.unreaded));

        draft.messages = grouped;
        draft.unreadCounter = counter;
        draft.loading = false;

        break;
      }
      case WsActions.CHAT_SUBSCRIBE: {
        const {targetId, ownerId} = action.payload;
        const idsArr = [targetId, ownerId];
        const sortedArr = idsArr.sort();

        draft.chatKey = `chat:${sortedArr[0]}and${sortedArr[1]}`;
        break;
      }
      case WsActions.CLOSE_CHAT_CHANNEL: {
        draft.chatKey = null;
        break;
      }
      case WsActions.CHAT_MESSAGE: {
        const newMessage = action.payload.message;
        newMessage.id = Math.random();
        if (newMessage.sender_id !== action.payload.authUserId) {
          draft.conversation = [action.payload.message, ...draft.conversation];
        }
        break;
      }
      case PushNotificationsActions.NEW_MESSAGE: {
        const grouped = draft.messages;
        const newMessage = action.payload.message;

        const foundedMessage = grouped.findIndex(
          (item) =>
            item.sender_id === newMessage.sender_id &&
            item.receiver_id === newMessage.receiver_id,
        );

        if (foundedMessage === -1) {
          grouped.push({...newMessage, unreaded: 1});
        } else {
          grouped[foundedMessage] = {
            ...newMessage,
            unreaded: grouped[foundedMessage].unreaded + 1,
          };
        }

        let counter = 0;

        grouped.forEach((item) => (counter += item.unreaded));

        draft.messages = grouped;
        draft.unreadCounter = counter;
        draft.loading = false;

        break;
      }
      default:
    }
  });
}
