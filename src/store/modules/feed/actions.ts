import {ItineraryProps} from '../../../utils/types';

interface FilterProps {
  begin?: string;
  end?: string;
  city?: string;
  page?: number;
}

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

export function getFeedFilteredRequest(filter: FilterProps) {
  return {
    type: '@feed/GET_FEED_FILTERED_REQUEST',
    payload: {filter},
  };
}

export function getFeedFilteredSuccess(itineraries: ItineraryProps) {
  return {
    type: '@feed/GET_FEED_FILTERED_SUCCESS',
    payload: {itineraries},
  };
}

export function getFeedFilteredFailure() {
  return {
    type: '@feed/GET_FEED_FILTERED_FAILURE',
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

export function joinRequest(itineraryId: number) {
  return {
    type: '@feed/JOIN_REQUEST',
    payload: {itineraryId},
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

export function paginateFeedRequest(
  page: number,
  begin?: string,
  end?: string,
) {
  return {
    type: '@feed/PAGINATE_FEED_REQUEST',
    payload: {page, begin, end},
  };
}

export function paginateFeedSuccess(itineraries: ItineraryProps) {
  return {
    type: '@feed/PAGINATE_FEED_SUCCESS',
    payload: {itineraries},
  };
}
