import produce from 'immer';

import {
  ConnectionsProps,
  InvitesProps,
  NotificationsProps,
} from '../../../utils/types';
import {WsActions} from '../websocket/actions';
import {ConnectionActions} from './actions';
import {PushNotificationsActions} from '../pushNotifications/actions';

interface ActionProps {
  type: string;
  payload: {
    connections: ConnectionsProps[];
    connection: ConnectionsProps;
    invites: InvitesProps[];
    invite: InvitesProps;
    notification: NotificationsProps<any>;
    userId: number;
  };
}

interface InitialStateProps {
  connections: ConnectionsProps[];
  invites: InvitesProps[];
  loading: boolean;
}

const INITIAL_STATE: InitialStateProps = {
  connections: [],
  invites: [],
  loading: false,
};

export default function connections(
  state = INITIAL_STATE,
  action: ActionProps,
) {
  return produce(state, (draft) => {
    switch (action.type) {
      case ConnectionActions.GET_CONNECTIONS_REQUEST: {
        draft.loading = true;
        break;
      }
      case ConnectionActions.GET_CONNECTIONS_SUCCESS: {
        draft.connections = action.payload.connections;
        draft.invites = action.payload.invites;
        draft.loading = false;
        break;
      }
      case ConnectionActions.GET_CONNECTIONS_FAILURE: {
        draft.loading = false;
        break;
      }
      case ConnectionActions.MAKE_CONNECTION_REQUEST: {
        draft.loading = true;
        break;
      }
      case ConnectionActions.MAKE_CONNECTION_SUCCESS: {
        const connection = action.payload.connection;
        draft.connections = [...draft.connections, connection];
        draft.loading = false;
        break;
      }
      case ConnectionActions.MAKE_CONNECTION_FAILURE: {
        draft.loading = false;
        break;
      }
      case ConnectionActions.ACCEPT_CONNECTION_REQUEST: {
        draft.loading = true;
        break;
      }
      case ConnectionActions.ACCEPT_CONNECTION_SUCCESS: {
        const connection = action.payload.connection;
        draft.connections = [...draft.connections, connection];
        draft.loading = false;
        break;
      }
      case ConnectionActions.ACCEPT_CONNECTION_FAILURE: {
        draft.loading = false;
        break;
      }
      case ConnectionActions.REJECT_CONNECTION_REQUEST: {
        draft.loading = true;
        break;
      }
      case ConnectionActions.REJECT_CONNECTION_SUCCESS: {
        const {userId} = action.payload;
        const connectionsList = draft.connections;
        const invitesList = draft.invites;

        const connectionIndex = connectionsList.findIndex(
          (item) => item.target.id === userId,
        );
        const inviteIndex = invitesList.findIndex(
          (item) => item.owner.id === userId,
        );

        if (connectionIndex !== -1) {
          connectionsList.splice(connectionIndex, 1);
          draft.connections = connectionsList;
        }

        if (inviteIndex !== -1) {
          invitesList.splice(inviteIndex, 1);
          draft.invites = invitesList;
        }
        draft.loading = false;
        break;
      }
      case ConnectionActions.REJECT_CONNECTION_FAILURE: {
        draft.loading = false;
        break;
      }
      case ConnectionActions.BLOCK_CONNECTION_SUCCESS: {
        const connectionList = draft.connections;
        const connectionIndex = connectionList.findIndex(
          (item) => item.target.id === action.payload.userId,
        );

        if (connectionIndex !== -1) {
          connectionList[connectionIndex].isBlocked = true;
          draft.connections = connectionList;
        }
        break;
      }
      case ConnectionActions.UNBLOCK_CONNECTION_SUCCESS: {
        const connectionList = draft.connections;
        const connectionIndex = connectionList.findIndex(
          (item) => item.target.id === action.payload.userId,
        );

        if (connectionIndex !== -1) {
          connectionList[connectionIndex].isBlocked = false;
          draft.connections = connectionList;
        }
        break;
      }
      case WsActions.NEW_CONNECTION: {
        const invite: InvitesProps = action.payload.notification.jsonData;
        const inviteIndex = draft.invites.findIndex(
          (item) => item.owner.id === invite.owner.id,
        );

        if (inviteIndex === -1) {
          draft.invites = [...draft.invites, invite];
        }
        break;
      }
      case WsActions.CONNECTION_ACCEPTED: {
        const invite: InvitesProps = action.payload.notification.jsonData;

        const inviteIndex = draft.invites.findIndex(
          (item) => item.owner.id === invite.owner.id,
        );

        if (inviteIndex === -1) {
          draft.invites = [...draft.invites, invite];
        }
        break;
      }
      case WsActions.CONNECTION_BLOCK: {
        const invite: InvitesProps = action.payload.notification.jsonData;

        const inviteList = draft.invites;
        const inviteIndex = inviteList.findIndex(
          (item) => item.id === invite.id,
        );

        if (inviteIndex !== -1) {
          inviteList[inviteIndex].isBlocked = true;
          draft.invites = inviteList;
        }
        break;
      }
      case WsActions.CONNECTION_UNBLOCK: {
        const invite: InvitesProps = action.payload.notification.jsonData;

        const inviteList = draft.invites;
        const inviteIndex = inviteList.findIndex(
          (item) => item.id === invite.id,
        );

        if (inviteIndex !== -1) {
          inviteList[inviteIndex].isBlocked = false;
          draft.invites = inviteList;
        }
        break;
      }
      case PushNotificationsActions.NEW_CONNECTION: {
        const invite = action.payload.invite;
        const inviteIndex = draft.invites.findIndex(
          (item) => item.owner.id === invite.owner.id,
        );

        if (inviteIndex === -1) {
          draft.invites = [...draft.invites, invite];
        }
        break;
      }
      case PushNotificationsActions.CONNECTION_ACCEPTED: {
        const invite = action.payload.invite;
        const inviteIndex = draft.invites.findIndex(
          (item) => item.owner.id === invite.owner.id,
        );
        if (inviteIndex === -1) {
          draft.invites = [...draft.invites, invite];
        }
        break;
      }
      default:
    }
  });
}
