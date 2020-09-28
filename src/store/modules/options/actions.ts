import {ActivityProps, LodgingProps, TransportProps} from './reducer';

export function getActivitiesRequest() {
  return {
    type: '@options/GET_ACTIVITIES_REQUEST',
  };
}

export function getActivitiesSuccess(activities: ActivityProps[]) {
  return {
    type: '@options/GET_ACTIVITIES_SUCCESS',
    payload: {activities},
  };
}

export function getActivitiesFailure() {
  return {
    type: '@options/GET_ACTIVITIES_FAILURE',
  };
}

export function getTransportsRequest() {
  return {
    type: '@options/GET_TRANSPORTS_REQUEST',
  };
}

export function getTransportsSuccess(transports: TransportProps[]) {
  return {
    type: '@options/GET_TRANSPORTS_SUCCESS',
    payload: {transports},
  };
}

export function getTransportsFailure() {
  return {
    type: '@options/GET_TRANSPORTS_FAILURE',
  };
}

export function getLodgingsRequest() {
  return {
    type: '@options/GET_LODGINGS_REQUEST',
  };
}

export function getLodgingsSuccess(lodgings: LodgingProps[]) {
  return {
    type: '@options/GET_LODGINGS_SUCCESS',
    payload: {lodgings},
  };
}

export function getLodgingsFailure() {
  return {
    type: '@options/GET_LODGINGS_FAILURE',
  };
}
