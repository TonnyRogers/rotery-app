import {ConnectionsProps, InvitesProps} from '../../../utils/types';

export enum ConnectionActions {
  GET_CONNECTIONS_REQUEST = '@connections/GET_CONNECTIONS_REQUEST',
  GET_CONNECTIONS_SUCCESS = '@connections/GET_CONNECTIONS_SUCCESS',
  GET_CONNECTIONS_FAILURE = '@connections/GET_CONNECTIONS_FAILURE',
  MAKE_CONNECTION_REQUEST = '@connections/MAKE_CONNECTION_REQUEST',
  MAKE_CONNECTION_SUCCESS = '@connections/MAKE_CONNECTION_SUCCESS',
  MAKE_CONNECTION_FAILURE = '@connections/MAKE_CONNECTION_FAILURE',
  ACCEPT_CONNECTION_REQUEST = '@connections/ACCEPT_CONNECTION_REQUEST',
  ACCEPT_CONNECTION_SUCCESS = '@connections/ACCEPT_CONNECTION_SUCCESS',
  ACCEPT_CONNECTION_FAILURE = '@connections/ACCEPT_CONNECTION_FAILURE',
  REJECT_CONNECTION_REQUEST = '@connections/REJECT_CONNECTION_REQUEST',
  REJECT_CONNECTION_SUCCESS = '@connections/REJECT_CONNECTION_SUCCESS',
  REJECT_CONNECTION_FAILURE = '@connections/REJECT_CONNECTION_FAILURE',
  BLOCK_CONNECTION_REQUEST = '@connections/BLOCK_CONNECTION_REQUEST',
  BLOCK_CONNECTION_SUCCESS = '@connections/BLOCK_CONNECTION_SUCCESS',
  BLOCK_CONNECTION_FAILURE = '@connections/BLOCK_CONNECTION_FAILURE',
  UNBLOCK_CONNECTION_REQUEST = '@connections/UNBLOCK_CONNECTION_REQUEST',
  UNBLOCK_CONNECTION_SUCCESS = '@connections/UNBLOCK_CONNECTION_SUCCESS',
  UNBLOCK_CONNECTION_FAILURE = '@connections/UNBLOCK_CONNECTION_FAILURE',
}

export function getConnectionsRequest() {
  return {
    type: ConnectionActions.GET_CONNECTIONS_REQUEST,
  };
}

export function getConnectionsSuccess(
  connections: ConnectionsProps[],
  invites: InvitesProps[],
) {
  return {
    type: ConnectionActions.GET_CONNECTIONS_SUCCESS,
    payload: {connections, invites},
  };
}

export function getConnectionsFailure() {
  return {
    type: ConnectionActions.GET_CONNECTIONS_FAILURE,
  };
}

export function makeConnectionRequest(userId: number) {
  return {
    type: ConnectionActions.MAKE_CONNECTION_REQUEST,
    payload: {userId},
  };
}

export function makeConnectionSuccess(connection: ConnectionsProps) {
  return {
    type: ConnectionActions.MAKE_CONNECTION_SUCCESS,
    payload: {connection},
  };
}

export function makeConnectionFailure() {
  return {
    type: ConnectionActions.MAKE_CONNECTION_FAILURE,
  };
}

export function acceptConnectionRequest(userId: number) {
  return {
    type: ConnectionActions.ACCEPT_CONNECTION_REQUEST,
    payload: {userId},
  };
}

export function acceptConnectionSuccess(connection: ConnectionsProps) {
  return {
    type: ConnectionActions.ACCEPT_CONNECTION_SUCCESS,
    payload: {connection},
  };
}

export function acceptConnectionFailure() {
  return {
    type: ConnectionActions.ACCEPT_CONNECTION_FAILURE,
  };
}

export function rejectConnectionRequest(userId: number) {
  return {
    type: ConnectionActions.REJECT_CONNECTION_REQUEST,
    payload: {userId},
  };
}

export function rejectConnectionSuccess(userId: number) {
  return {
    type: ConnectionActions.REJECT_CONNECTION_SUCCESS,
    payload: {userId},
  };
}

export function rejectConnectionFailure() {
  return {
    type: ConnectionActions.REJECT_CONNECTION_FAILURE,
  };
}

export function blockConnectionRequest(userId: number) {
  return {
    type: ConnectionActions.BLOCK_CONNECTION_REQUEST,
    payload: {userId},
  };
}

export function blockConnectionSuccess(userId: number) {
  return {
    type: ConnectionActions.BLOCK_CONNECTION_SUCCESS,
    payload: {userId},
  };
}

export function blockConnectionFailure() {
  return {
    type: ConnectionActions.BLOCK_CONNECTION_FAILURE,
  };
}

export function unblockConnectionRequest(userId: number) {
  return {
    type: ConnectionActions.UNBLOCK_CONNECTION_REQUEST,
    payload: {userId},
  };
}

export function unblockConnectionSuccess(userId: number) {
  return {
    type: ConnectionActions.UNBLOCK_CONNECTION_SUCCESS,
    payload: {userId},
  };
}

export function unblockConnectionFailure() {
  return {
    type: ConnectionActions.UNBLOCK_CONNECTION_FAILURE,
  };
}
