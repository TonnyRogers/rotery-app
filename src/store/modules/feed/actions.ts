import {
  QuestionProps,
  MemberProps,
  FeedItineraryProps,
} from '../../../utils/types';

export enum FeedActions {
  GET_FEED_REQUEST = '@feed/GET_FEED_REQUEST',
  GET_FEED_SUCCESS = '@feed/GET_FEED_SUCCESS',
  GET_FEED_FAILURE = '@feed/GET_FEED_FAILURE',
  GET_FEED_FILTERED_REQUEST = '@feed/GET_FEED_FILTERED_REQUEST',
  GET_FEED_FILTERED_SUCCESS = '@feed/GET_FEED_FILTERED_SUCCESS',
  GET_FEED_FILTERED_FAILURE = '@feed/GET_FEED_FILTERED_FAILURE',
  MAKE_QUESTION_REQUEST = '@feed/MAKE_QUESTION_REQUEST',
  MAKE_QUESTION_SUCCESS = '@feed/MAKE_QUESTION_SUCCESS',
  MAKE_QUESTION_FAILURE = '@feed/MAKE_QUESTION_FAILURE',
  JOIN_REQUEST = '@feed/JOIN_REQUEST',
  JOIN_SUCCESS = '@feed/JOIN_SUCCESS',
  JOIN_FAILURE = '@feed/JOIN_FAILURE',
  PAGINATE_FEED_REQUEST = '@feed/PAGINATE_FEED_REQUEST',
  PAGINATE_FEED_SUCCESS = '@feed/PAGINATE_FEED_SUCCESS',
  PAGINATE_FEED_FAILURE = '@feed/PAGINATE_FEED_FAILURE',
}

interface FilterProps {
  begin?: string;
  end?: string;
  location?: {
    city?: string;
    state?: string;
  };
  page?: number;
  limit?: number;
}

export function getFeedRequest() {
  return {
    type: FeedActions.GET_FEED_REQUEST,
  };
}

export function getFeedSuccess(itineraries: FeedItineraryProps) {
  return {
    type: FeedActions.GET_FEED_SUCCESS,
    payload: {itineraries},
  };
}

export function getFeedFailure() {
  return {
    type: FeedActions.GET_FEED_FAILURE,
  };
}

export function getFeedFilteredRequest(filter: FilterProps) {
  return {
    type: FeedActions.GET_FEED_FILTERED_REQUEST,
    payload: {filter},
  };
}

export function getFeedFilteredSuccess(itineraries: FeedItineraryProps) {
  return {
    type: FeedActions.GET_FEED_FILTERED_SUCCESS,
    payload: {itineraries},
  };
}

export function getFeedFilteredFailure() {
  return {
    type: FeedActions.GET_FEED_FILTERED_FAILURE,
  };
}

export function makeQuestionRequest(itineraryId: number, question: string) {
  return {
    type: FeedActions.MAKE_QUESTION_REQUEST,
    payload: {itineraryId, question},
  };
}

export function makeQuestionSuccess(itineraryQuestion: QuestionProps) {
  return {
    type: FeedActions.MAKE_QUESTION_SUCCESS,
    payload: {itineraryQuestion},
  };
}

export function makeQuestionFailure() {
  return {
    type: FeedActions.MAKE_QUESTION_FAILURE,
  };
}

export function joinRequest(itineraryId: number) {
  return {
    type: FeedActions.JOIN_REQUEST,
    payload: {itineraryId},
  };
}

export function joinSuccess(itineraryMember: MemberProps) {
  return {
    type: FeedActions.JOIN_SUCCESS,
    payload: {itineraryMember},
  };
}

export function joinFailure() {
  return {
    type: FeedActions.JOIN_FAILURE,
  };
}

export function paginateFeedRequest(filter: FilterProps) {
  return {
    type: FeedActions.PAGINATE_FEED_REQUEST,
    payload: {filter},
  };
}

export function paginateFeedSuccess(itineraries: FeedItineraryProps) {
  return {
    type: FeedActions.PAGINATE_FEED_SUCCESS,
    payload: {itineraries},
  };
}

export function paginateFeedFailure() {
  return {
    type: FeedActions.PAGINATE_FEED_FAILURE,
  };
}
