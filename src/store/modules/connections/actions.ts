import {ConnectionsProps, InvitesProps} from './reducer';

export function getConnectionsRequest() {
  return {
    type: '@connections/GET_CONNECTIONS_REQUEST',
  };
}

export function getConnectionsSuccess(
  connections: ConnectionsProps[],
  invites: InvitesProps[],
) {
  return {
    type: '@connections/GET_CONNECTIONS_SUCCESS',
    payload: {connections, invites},
  };
}

export function getConnectionsFailure() {
  return {
    type: '@connections/GET_CONNECTIONS_FAILURE',
  };
}

export function makeConnectionRequest(userId: number) {
  return {
    type: '@connections/MAKE_CONNECTION_REQUEST',
    payload: {userId},
  };
}

export function makeConnectionSuccess() {
  return {
    type: '@connections/MAKE_CONNECTION_SUCCESS',
  };
}

export function makeConnectionFailure() {
  return {
    type: '@connections/MAKE_CONNECTION_FAILURE',
  };
}

export function acceptConnectionRequest(userId: number) {
  return {
    type: '@connections/ACCEPT_CONNECTION_REQUEST',
    payload: {userId},
  };
}

export function acceptConnectionSuccess() {
  return {
    type: '@connections/ACCEPT_CONNECTION_SUCCESS',
  };
}

export function acceptConnectionFailure() {
  return {
    type: '@connections/ACCEPT_CONNECTION_FAILURE',
  };
}

export function rejectConnectionRequest(userId: number) {
  return {
    type: '@connections/REJECT_CONNECTION_REQUEST',
    payload: {userId},
  };
}

export function rejectConnectionSuccess() {
  return {
    type: '@connections/REJECT_CONNECTION_SUCCESS',
  };
}

export function rejectConnectionFailure() {
  return {
    type: '@connections/REJECT_CONNECTION_FAILURE',
  };
}

export function blockConnectionRequest(userId: number) {
  return {
    type: '@connections/BLOCK_CONNECTION_REQUEST',
    payload: {userId},
  };
}

export function blockConnectionSuccess() {
  return {
    type: '@connections/BLOCK_CONNECTION_SUCCESS',
  };
}

export function blockConnectionFailure() {
  return {
    type: '@connections/BLOCK_CONNECTION_FAILURE',
  };
}

export function unblockConnectionRequest(userId: number) {
  return {
    type: '@connections/UNBLOCK_CONNECTION_REQUEST',
    payload: {userId},
  };
}

export function unblockConnectionSuccess() {
  return {
    type: '@connections/UNBLOCK_CONNECTION_SUCCESS',
  };
}

export function unblockConnectionFailure() {
  return {
    type: '@connections/UNBLOCK_CONNECTION_FAILURE',
  };
}
