import {ItineraryProps} from './reducer';

export function getFeedRequest() {
  return {
    type: '@feed/GET_FEED_REQUEST',
  };
}

export function getFeedSuccess(itineraries: ItineraryProps) {
  return {
    type: '@feed/GET_FEED_SUCCESS',
    payload: {itineraries},
  };
}

export function getFeedFailure() {
  return {
    type: '@feed/GET_FEED_FAILURE',
  };
}

export function makeQuestionRequest(itineraryId: number, question: string) {
  return {
    type: '@feed/MAKE_QUESTION_REQUEST',
    payload: {itineraryId, question},
  };
}

export function makeQuestionSuccess() {
  return {
    type: '@feed/MAKE_QUESTION_SUCCESS',
  };
}

export function makeQuestionFailure() {
  return {
    type: '@feed/MAKE_QUESTION_FAILURE',
  };
}

export function joinRequest(itineraryId: number, userId: number) {
  return {
    type: '@feed/JOIN_REQUEST',
    payload: {itineraryId, userId},
  };
}

export function joinSuccess() {
  return {
    type: '@feed/JOIN_SUCCESS',
  };
}

export function joinFailure() {
  return {
    type: '@feed/JOIN_FAILURE',
  };
}
