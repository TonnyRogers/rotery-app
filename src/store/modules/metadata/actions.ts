import {FirstStepResponseData} from '../../../utils/types';

export enum MetadataActions {
  GET_FIRST_STEPS_REQUEST = 'GET_FIRST_STEPS_REQUEST',
  GET_FIRST_STEPS_SUCCESS = 'GET_FIRST_STEPS_SUCCESS',
  GET_FIRST_STEPS_FAILURE = 'GET_FIRST_STEPS_FAILURE',
}

export function getFirstStepsRequest() {
  return {
    type: MetadataActions.GET_FIRST_STEPS_REQUEST,
  };
}

export function getFirstStepsSuccess(firstStep: FirstStepResponseData) {
  return {
    type: MetadataActions.GET_FIRST_STEPS_SUCCESS,
    payload: {firstStep},
  };
}

export function getFirstStepsFailure() {
  return {
    type: MetadataActions.GET_FIRST_STEPS_FAILURE,
  };
}
