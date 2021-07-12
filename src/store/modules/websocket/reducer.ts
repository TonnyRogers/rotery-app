import produce from 'immer';
import {WsActions} from './actions';
import {formatChatName} from '../../../lib/utils';

interface InitialStateProps {
  isConnected: boolean;
  chatName: string | null;
}

const INITIAL_STATE: InitialStateProps = {
  isConnected: false,
  chatName: null,
};

export interface PayloadProps {
  message: string;
  ownerId: number;
  targetId: number;
  authUserId: number;
}

export default function websocket(
  state = INITIAL_STATE,
  action: {type: string; payload: PayloadProps},
) {
  return produce(state, (draft) => {
    switch (action.type) {
      case WsActions.SET_CONNECTED: {
        draft.isConnected = true;
        break;
      }
      case WsActions.SET_DISCONNECTED: {
        draft.isConnected = false;
        break;
      }
      case WsActions.CHAT_SUBSCRIBE: {
        const {targetId, ownerId} = action.payload;
        draft.chatName = formatChatName(targetId, ownerId);
        break;
      }
      case WsActions.CLOSE_CHAT_CHANNEL: {
        draft.chatName = null;
        break;
      }
      default:
    }
  });
}
