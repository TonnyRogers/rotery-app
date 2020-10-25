import {ItineraryProps} from './reducer';

interface ImageListProps {
  id: number;
}

interface CreateItemListProps {
  id: number;
  capacity: number;
  description?: string;
  price: number;
}

interface UpdateItemListProps {
  id: number;
  name?: string;
  pivot: {
    description: string | null;
    price: number | null;
    capacity: number;
  };
}

export function getItinerariesRequest() {
  return {
    type: '@itineraries/GET_ITINERARIES_REQUEST',
  };
}

export function getItinerariesSuccess(itineraries: ItineraryProps) {
  return {
    type: '@itineraries/GET_ITINERARIES_SUCCESS',
    payload: {itineraries},
  };
}

export function getItinerariesFailure() {
  return {
    type: '@itineraries/GET_ITINERARIES_Failure',
  };
}

export function createItineraryRequest(
  name: string,
  capacity: number,
  description: string,
  dateBegin: Date,
  dateEnd: Date,
  dateLimit: Date,
  location: string,
  images?: ImageListProps[],
  activities?: CreateItemListProps[],
  lodgings?: CreateItemListProps[],
  transports?: CreateItemListProps[],
) {
  return {
    type: '@itineraries/CREATE_ITINERARY_REQUEST',
    payload: {
      name,
      images,
      capacity,
      description,
      dateBegin,
      dateEnd,
      dateLimit,
      location,
      activities,
      lodgings,
      transports,
    },
  };
}

export function createItinerarySuccess(itinerary: ItineraryProps) {
  return {
    type: '@itineraries/CREATE_ITINERARY_SUCCESS',
    payload: {itinerary},
  };
}

export function createItineraryFailure() {
  return {
    type: '@itineraries/CREATE_ITINERARY_FAILURE',
  };
}

export function deleteItineraryRequest(itineraryId: number) {
  return {
    type: '@itineraries/DELETE_ITINERARY_REQUEST',
    payload: {itineraryId},
  };
}

export function deleteItinerarySuccess() {
  return {
    type: '@itineraries/DELETE_ITINERARY_SUCCESS',
  };
}

export function deleteItineraryFailure() {
  return {
    type: '@itineraries/DELETE_ITINERARY_FAILURE',
  };
}

export function updateItineraryRequest(
  itineraryId: number,
  name: string,
  capacity: number,
  description: string,
  dateBegin: Date,
  dateEnd: Date,
  dateLimit: Date,
  location: string,
  images?: ImageListProps[],
  activities?: UpdateItemListProps[],
  lodgings?: UpdateItemListProps[],
  transports?: UpdateItemListProps[],
) {
  return {
    type: '@itineraries/UPDATE_ITINERARY_REQUEST',
    payload: {
      itineraryId,
      name,
      images,
      capacity,
      description,
      dateBegin,
      dateEnd,
      dateLimit,
      location,
      activities,
      lodgings,
      transports,
    },
  };
}

export function updateItinerarySuccess() {
  return {
    type: '@itineraries/UPDATE_ITINERARY_SUCCESS',
  };
}

export function updateItineraryFailure() {
  return {
    type: '@itineraries/UPDATE_ITINERARY_FAILURE',
  };
}

export function replyQuestionRequest(
  itineraryId: number,
  questionId: number,
  anwser: string,
) {
  return {
    type: '@itineraries/REPLY_QUESTION_REQUEST',
    payload: {anwser, questionId, itineraryId},
  };
}

export function replyQuestionSuccess() {
  return {
    type: '@itineraries/REPLY_QUESTION_SUCCESS',
  };
}

export function replyQuestionFailure() {
  return {
    type: '@itineraries/REPLY_QUESTION_FAILURE',
  };
}

export function promoteMemberRequest(itineraryId: number, memberId: number) {
  return {
    type: '@itineraries/PROMOTE_MEMBER_REQUEST',
    payload: {itineraryId, memberId},
  };
}

export function promoteMemberSuccess() {
  return {
    type: '@itineraries/PROMOTE_MEMBER_SUCCESS',
  };
}

export function promoteMemberFailure() {
  return {
    type: '@itineraries/PROMOTE_MEMBER_FAILURE',
  };
}

export function demoteMemberRequest(itineraryId: number, memberId: number) {
  return {
    type: '@itineraries/DEMOTE_MEMBER_REQUEST',
    payload: {itineraryId, memberId},
  };
}

export function demoteMemberSuccess() {
  return {
    type: '@itineraries/DEMOTE_MEMBER_SUCCESS',
  };
}

export function demoteMemberFailure() {
  return {
    type: '@itineraries/DEMOTE_MEMBER_FAILURE',
  };
}

export function acceptMemberRequest(itineraryId: number, memberId: number) {
  return {
    type: '@itineraries/ACCEPT_MEMBER_REQUEST',
    payload: {itineraryId, memberId},
  };
}

export function acceptMemberSuccess() {
  return {
    type: '@itineraries/ACCEPT_MEMBER_SUCCESS',
  };
}

export function acceptMemberFailure() {
  return {
    type: '@itineraries/ACCEPT_MEMBER_FAILURE',
  };
}

export function removeMemberRequest(itineraryId: number, memberId: number) {
  return {
    type: '@itineraries/REMOVE_MEMBER_REQUEST',
    payload: {itineraryId, memberId},
  };
}

export function removeMemberSuccess() {
  return {
    type: '@itineraries/REMOVE_MEMBER_SUCCESS',
  };
}

export function removeMemberFailure() {
  return {
    type: '@itineraries/REMOVE_MEMBER_FAILURE',
  };
}

export function notifyItineraryFinishRequest(itineraryId: number) {
  return {
    type: '@itineraries/NOTIFY_ITINERARY_FINISH_REQUEST',
    payload: {itineraryId},
  };
}

export function notifyItineraryFinishFailure() {
  return {
    type: '@itineraries/NOTIFY_ITINERARY_FINISH_FAILURE',
  };
}
