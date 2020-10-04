import {ConnectionsProps} from './reducer';

export function getConnectionsRequest() {
  return {
    type: '@connections/GET_CONNECTIONS_REQUEST',
  };
}

export function getConnectionsSuccess(connections: ConnectionsProps[]) {
  return {
    type: '@connections/GET_CONNECTIONS_SUCCESS',
    payload: {connections},
  };
}

export function getConnectionsFailure() {
  return {
    type: '@connections/GET_CONNECTIONS_FAILURE',
  };
}
