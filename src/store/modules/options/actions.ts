import {ActivityProps, LodgingProps, TransportProps} from './reducer';

export enum OptionsActions {
  GET_ACTIVITIES_REQUEST = '@options/GET_ACTIVITIES_REQUEST',
  GET_ACTIVITIES_SUCCESS = '@options/GET_ACTIVITIES_SUCCESS',
  GET_ACTIVITIES_FAILURE = '@options/GET_ACTIVITIES_FAILURE',
  GET_TRANSPORTS_REQUEST = '@options/GET_TRANSPORTS_REQUEST',
  GET_TRANSPORTS_SUCCESS = '@options/GET_TRANSPORTS_SUCCESS',
  GET_TRANSPORTS_FAILURE = '@options/GET_TRANSPORTS_FAILURE',
  GET_LODGINGS_REQUEST = '@options/GET_LODGINGS_REQUEST',
  GET_LODGINGS_SUCCESS = '@options/GET_LODGINGS_SUCCESS',
  GET_LODGINGS_FAILURE = '@options/GET_LODGINGS_FAILURE',
}

export function getActivitiesRequest() {
  return {
    type: OptionsActions.GET_ACTIVITIES_REQUEST,
  };
}

export function getActivitiesSuccess(activities: ActivityProps[]) {
  return {
    type: OptionsActions.GET_ACTIVITIES_SUCCESS,
    payload: {activities},
  };
}

export function getActivitiesFailure() {
  return {
    type: OptionsActions.GET_ACTIVITIES_FAILURE,
  };
}

export function getTransportsRequest() {
  return {
    type: OptionsActions.GET_TRANSPORTS_REQUEST,
  };
}

export function getTransportsSuccess(transports: TransportProps[]) {
  return {
    type: OptionsActions.GET_TRANSPORTS_SUCCESS,
    payload: {transports},
  };
}

export function getTransportsFailure() {
  return {
    type: OptionsActions.GET_TRANSPORTS_FAILURE,
  };
}

export function getLodgingsRequest() {
  return {
    type: OptionsActions.GET_LODGINGS_REQUEST,
  };
}

export function getLodgingsSuccess(lodgings: LodgingProps[]) {
  return {
    type: OptionsActions.GET_LODGINGS_SUCCESS,
    payload: {lodgings},
  };
}

export function getLodgingsFailure() {
  return {
    type: OptionsActions.GET_LODGINGS_FAILURE,
  };
}
