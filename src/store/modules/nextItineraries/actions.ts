import {ItineraryProps, QuestionProps} from '../../../utils/types';

export enum NextItinerariesActions {
  GET_NEXTITINERARIES_REQUEST = '@nextItineraries/GET_NEXTITINERARIES_REQUEST',
  GET_NEXTITINERARIES_SUCCESS = '@nextItineraries/GET_NEXTITINERARIES_SUCCESS',
  GET_NEXTITINERARIES_FAILURE = '@nextItineraries/GET_NEXTITINERARIES_FAILURE',
  MAKE_QUESTION_REQUEST = '@nextItineraries/MAKE_QUESTION_REQUEST',
  MAKE_QUESTION_SUCCESS = '@nextItineraries/MAKE_QUESTION_SUCCESS',
  MAKE_QUESTION_FAILURE = '@nextItineraries/MAKE_QUESTION_FAILURE',
  RATE_ITINERARY_REQUEST = '@nextItineraries/RATE_ITINERARY_REQUEST',
  RATE_ITINERARY_SUCCESS = '@nextItineraries/RATE_ITINERARY_SUCCESS',
  RATE_ITINERARY_FAILURE = '@nextItineraries/RATE_ITINERARY_FAILURE',
  LEAVE_ITINERARY_REQUEST = '@nextItineraries/LEAVE_ITINERARY_REQUEST',
  LEAVE_ITINERARY_SUCCESS = '@nextItineraries/LEAVE_ITINERARY_SUCCESS',
  LEAVE_ITINERARY_FAILURE = '@nextItineraries/LEAVE_ITINERARY_FAILURE',
}

export function getNextItinerariesRequest() {
  return {
    type: NextItinerariesActions.GET_NEXTITINERARIES_REQUEST,
  };
}

export function getNextItinerariesSuccess(itineraries: ItineraryProps) {
  return {
    type: NextItinerariesActions.GET_NEXTITINERARIES_SUCCESS,
    payload: {itineraries},
  };
}

export function getNextItinerariesFailure() {
  return {
    type: NextItinerariesActions.GET_NEXTITINERARIES_FAILURE,
  };
}

export function makeQuestionRequest(itineraryId: number, question: string) {
  return {
    type: NextItinerariesActions.MAKE_QUESTION_REQUEST,
    payload: {itineraryId, question},
  };
}

export function makeQuestionSuccess(itineraryQuestion: QuestionProps) {
  return {
    type: NextItinerariesActions.MAKE_QUESTION_SUCCESS,
    payload: {itineraryQuestion},
  };
}

export function makeQuestionFailure() {
  return {
    type: NextItinerariesActions.MAKE_QUESTION_FAILURE,
  };
}

export function rateItineraryRequest(
  itineraryId: number,
  userId: number,
  itineraryRate: number,
  userRate: number,
  itineraryDescription: string,
  userDescription: string,
) {
  return {
    type: NextItinerariesActions.RATE_ITINERARY_REQUEST,
    payload: {
      itineraryId,
      itineraryRate,
      itineraryDescription,
      userId,
      userRate,
      userDescription,
    },
  };
}

export function rateItinerarySuccess() {
  return {
    type: NextItinerariesActions.RATE_ITINERARY_SUCCESS,
  };
}

export function rateItineraryFailure() {
  return {
    type: NextItinerariesActions.RATE_ITINERARY_FAILURE,
  };
}

export function leaveItineraryRequest(itineraryId: number) {
  return {
    type: NextItinerariesActions.LEAVE_ITINERARY_REQUEST,
    payload: {itineraryId},
  };
}

export function leaveItinerarySuccess() {
  return {
    type: NextItinerariesActions.LEAVE_ITINERARY_SUCCESS,
  };
}

export function leaveItineraryFailure() {
  return {
    type: NextItinerariesActions.LEAVE_ITINERARY_FAILURE,
  };
}
