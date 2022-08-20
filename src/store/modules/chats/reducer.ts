import produce from 'immer';
import {ChatActions} from './actions';
import {ChatMessage, NotificationsProps} from '../../../utils/types';
import {WsActions} from '../websocket/actions';
import {formatChatName} from '../../../lib/utils';
import {PushNotificationsActions} from '../pushNotifications/actions';

interface InitialStateProps {
  chats: ChatMessage[];
  currentChat: ChatMessage[];
  loading: boolean;
  unreadCounter: number;
  currentChatKey: string | null;
}

const INITIAL_STATE: InitialStateProps = {
  chats: [],
  currentChat: [],
  currentChatKey: null,
  loading: false,
  unreadCounter: 0,
};

interface ActionProps {
  type: string;
  payload: {
    chatMessages: ChatMessage[];
    chatMessage: ChatMessage;
    authUserId: number;
    ownerId: number;
    targetId: number;
    notification: NotificationsProps<any>;
  };
}

export default function chats(state = INITIAL_STATE, actions: ActionProps) {
  return produce(state, (draft) => {
    switch (actions.type) {
      case ChatActions.GET_CHAT_MESSAGES_REQUEST: {
        draft.loading = true;
        break;
      }
      case ChatActions.GET_CHAT_MESSAGES_SUCCESS: {
        let unreadCounter = 0;
        const groupedChats = actions.payload.chatMessages.reduce(
          (acc: Record<string, ChatMessage>, curr) => {
            const chatHash = `${curr.receiver.id}-${curr.sender.id}`;

            if (!acc[chatHash]) {
              acc[chatHash] = {
                ...curr,
                unreadedCount: curr.readed ? 0 : 1,
              };
            } else {
              acc[chatHash].unreadedCount =
                acc[chatHash].unreadedCount + (curr.readed ? 0 : 1);
            }

            return acc;
          },
          {},
        );

        const chatList = Object.values(groupedChats).map(
          (chatItem) => chatItem,
        );

        chatList.forEach(
          (item) => (unreadCounter += item.unreadedCount > 0 ? 1 : 0),
        );

        draft.loading = false;
        draft.chats = chatList;
        draft.unreadCounter = unreadCounter;
        break;
      }
      case ChatActions.BEGIN_CHAT_FAILURE: {
        draft.loading = false;
        break;
      }
      case ChatActions.GET_CURRENT_CHAT_REQUEST: {
        draft.loading = true;
        break;
      }
      case ChatActions.GET_CURRENT_CHAT_SUCCESS: {
        draft.currentChat = actions.payload.chatMessages;
        draft.loading = false;
        break;
      }
      case ChatActions.GET_CURRENT_CHAT_FAILURE: {
        draft.loading = false;
        break;
      }
      case WsActions.CHAT_SUBSCRIBE: {
        const {targetId, ownerId} = actions.payload;
        draft.currentChatKey = formatChatName(targetId, ownerId);
        break;
      }
      case WsActions.CLOSE_CHAT_CHANNEL: {
        draft.currentChatKey = null;
        break;
      }
      case WsActions.SEND_CHAT_MESSAGE_SUCCESS: {
        const messageDuplicated = draft.currentChat.find(
          (item) => item.id === actions.payload.chatMessage.id,
        );

        if (!messageDuplicated) {
          draft.currentChat = [
            actions.payload.chatMessage,
            ...draft.currentChat,
          ];
        }

        break;
      }
      case WsActions.CHAT_MESSAGE: {
        draft.currentChat = [actions.payload.chatMessage, ...draft.currentChat];
        break;
      }
      case WsActions.CHAT_BEGIN: {
        draft.currentChat = [actions.payload.chatMessage, ...draft.currentChat];
        break;
      }
      case WsActions.CHAT_FINISH: {
        draft.currentChat = [actions.payload.chatMessage, ...draft.currentChat];
        break;
      }
      case WsActions.NEW_CHAT_NOTIFICATION: {
        let grouped = draft.chats;
        const newChatMessage: ChatMessage =
          actions.payload.notification.jsonData;

        const foundedChatMessage = grouped.findIndex(
          (item) =>
            item.sender.id === newChatMessage.sender.id &&
            item.receiver.id === newChatMessage.receiver.id,
        );

        if (foundedChatMessage === -1) {
          grouped.push({...newChatMessage, unreadedCount: 1});
        } else {
          grouped[foundedChatMessage] = {
            ...newChatMessage,
            unreadedCount: grouped[foundedChatMessage].unreadedCount + 1,
          };
        }

        let counter = 0;

        grouped.forEach((item) => (counter += item.unreadedCount));

        draft.chats = grouped;
        draft.unreadCounter = counter;
        draft.loading = false;

        break;
      }
      case PushNotificationsActions.NEW_CHAT: {
        const grouped = draft.chats;
        const newChatMessage = actions.payload.chatMessage;

        const foundedChatMessage = grouped.findIndex(
          (item) =>
            item.sender.id === newChatMessage.sender.id &&
            item.receiver.id === newChatMessage.receiver.id,
        );

        if (foundedChatMessage === -1) {
          grouped.push({...newChatMessage, unreadedCount: 1});
        } else {
          grouped[foundedChatMessage] = {
            ...newChatMessage,
            unreadedCount: grouped[foundedChatMessage].unreadedCount + 1,
          };
        }

        let counter = 0;

        grouped.forEach((item) => (counter += item.unreadedCount));

        draft.chats = grouped;
        draft.unreadCounter = counter;
        draft.loading = false;

        break;
      }
      default:
        break;
    }
  });
}
