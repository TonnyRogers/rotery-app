import {ItineraryProps} from './reducer';

export function getNextItinerariesRequest() {
  return {
    type: '@nextItineraries/GET_NEXTITINERARIES_REQUEST',
  };
}

export function getNextItinerariesSuccess(itineraries: ItineraryProps) {
  return {
    type: '@nextItineraries/GET_NEXTITINERARIES_SUCCESS',
    payload: {itineraries},
  };
}

export function getNextItinerariesFailure() {
  return {
    type: '@nextItineraries/GET_NEXTITINERARIES_FAILURE',
  };
}

export function makeQuestionRequest(itineraryId: number, question: string) {
  return {
    type: '@nextItineraries/MAKE_QUESTION_REQUEST',
    payload: {itineraryId, question},
  };
}

export function makeQuestionSuccess() {
  return {
    type: '@nextItineraries/MAKE_QUESTION_SUCCESS',
  };
}

export function makeQuestionFailure() {
  return {
    type: '@nextItineraries/MAKE_QUESTION_FAILURE',
  };
}
