import {
  ItineraryProps,
  ImageListProps,
  CreateItemListProps,
  UpdateItemListProps,
  QuestionProps,
  MemberProps,
  LocationJson,
} from '../../../utils/types';

export enum ItineraryActions {
  GET_ITINERARIES_REQUEST = '@itineraries/GET_ITINERARIES_REQUEST',
  GET_ITINERARIES_SUCCESS = '@itineraries/GET_ITINERARIES_SUCCESS',
  GET_ITINERARIES_FAILURE = '@itineraries/GET_ITINERARIES_FAILURE',
  CREATE_ITINERARY_REQUEST = '@itineraries/CREATE_ITINERARY_REQUEST',
  CREATE_ITINERARY_SUCCESS = '@itineraries/CREATE_ITINERARY_SUCCESS',
  CREATE_ITINERARY_FAILURE = '@itineraries/CREATE_ITINERARY_FAILURE',
  DELETE_ITINERARY_REQUEST = '@itineraries/DELETE_ITINERARY_REQUEST',
  DELETE_ITINERARY_SUCCESS = '@itineraries/DELETE_ITINERARY_SUCCESS',
  DELETE_ITINERARY_FAILURE = '@itineraries/DELETE_ITINERARY_FAILURE',
  UPDATE_ITINERARY_REQUEST = '@itineraries/UPDATE_ITINERARY_REQUEST',
  UPDATE_ITINERARY_SUCCESS = '@itineraries/UPDATE_ITINERARY_SUCCESS',
  UPDATE_ITINERARY_FAILURE = '@itineraries/UPDATE_ITINERARY_FAILURE',
  REPLY_QUESTION_REQUEST = '@itineraries/REPLY_QUESTION_REQUEST',
  REPLY_QUESTION_SUCCESS = '@itineraries/REPLY_QUESTION_SUCCESS',
  REPLY_QUESTION_FAILURE = '@itineraries/REPLY_QUESTION_FAILURE',
  PROMOTE_MEMBER_REQUEST = '@itineraries/PROMOTE_MEMBER_REQUEST',
  PROMOTE_MEMBER_SUCCESS = '@itineraries/PROMOTE_MEMBER_SUCCESS',
  PROMOTE_MEMBER_FAILURE = '@itineraries/PROMOTE_MEMBER_FAILURE',
  DEMOTE_MEMBER_REQUEST = '@itineraries/DEMOTE_MEMBER_REQUEST',
  DEMOTE_MEMBER_SUCCESS = '@itineraries/DEMOTE_MEMBER_SUCCESS',
  DEMOTE_MEMBER_FAILURE = '@itineraries/DEMOTE_MEMBER_FAILURE',
  ACCEPT_MEMBER_REQUEST = '@itineraries/ACCEPT_MEMBER_REQUEST',
  ACCEPT_MEMBER_SUCCESS = '@itineraries/ACCEPT_MEMBER_SUCCESS',
  ACCEPT_MEMBER_FAILURE = '@itineraries/ACCEPT_MEMBER_FAILURE',
  REMOVE_MEMBER_REQUEST = '@itineraries/REMOVE_MEMBER_REQUEST',
  REMOVE_MEMBER_SUCCESS = '@itineraries/REMOVE_MEMBER_SUCCESS',
  REMOVE_MEMBER_FAILURE = '@itineraries/REMOVE_MEMBER_FAILURE',
  NOTIFY_ITINERARY_FINISH_REQUEST = '@itineraries/NOTIFY_ITINERARY_FINISH_REQUEST',
  NOTIFY_ITINERARY_FINISH_SUCCESS = '@itineraries/NOTIFY_ITINERARY_FINISH_SUCCESS',
  NOTIFY_ITINERARY_FINISH_FAILURE = '@itineraries/NOTIFY_ITINERARY_FINISH_FAILURE',
}

export function getItinerariesRequest() {
  return {
    type: ItineraryActions.GET_ITINERARIES_REQUEST,
  };
}

export function getItinerariesSuccess(itineraries: ItineraryProps[]) {
  return {
    type: ItineraryActions.GET_ITINERARIES_SUCCESS,
    payload: {itineraries},
  };
}

export function getItinerariesFailure() {
  return {
    type: ItineraryActions.GET_ITINERARIES_FAILURE,
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
  isPrivate: boolean,
  images?: ImageListProps[],
  activities?: CreateItemListProps[],
  lodgings?: CreateItemListProps[],
  transports?: CreateItemListProps[],
  location_json?: LocationJson,
) {
  return {
    type: ItineraryActions.CREATE_ITINERARY_REQUEST,
    payload: {
      name,
      images,
      capacity,
      description,
      dateBegin,
      dateEnd,
      dateLimit,
      location,
      isPrivate,
      activities,
      lodgings,
      transports,
      location_json,
    },
  };
}

export function createItinerarySuccess(itinerary: ItineraryProps) {
  return {
    type: ItineraryActions.CREATE_ITINERARY_SUCCESS,
    payload: {itinerary},
  };
}

export function createItineraryFailure() {
  return {
    type: ItineraryActions.CREATE_ITINERARY_FAILURE,
  };
}

export function deleteItineraryRequest(itineraryId: number) {
  return {
    type: ItineraryActions.DELETE_ITINERARY_REQUEST,
    payload: {itineraryId},
  };
}

export function deleteItinerarySuccess(itineraryId: number) {
  return {
    type: ItineraryActions.DELETE_ITINERARY_SUCCESS,
    payload: {itineraryId},
  };
}

export function deleteItineraryFailure() {
  return {
    type: ItineraryActions.DELETE_ITINERARY_FAILURE,
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
  isPrivate: boolean,
  images?: ImageListProps[],
  activities?: UpdateItemListProps[],
  lodgings?: UpdateItemListProps[],
  transports?: UpdateItemListProps[],
  location_json?: LocationJson,
) {
  return {
    type: ItineraryActions.UPDATE_ITINERARY_REQUEST,
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
      isPrivate,
      activities,
      lodgings,
      transports,
      location_json,
    },
  };
}

export function updateItinerarySuccess(itinerary: ItineraryProps) {
  return {
    type: ItineraryActions.UPDATE_ITINERARY_SUCCESS,
    payload: {itinerary},
  };
}

export function updateItineraryFailure() {
  return {
    type: ItineraryActions.UPDATE_ITINERARY_FAILURE,
  };
}

export function replyQuestionRequest(
  itineraryId: number,
  questionId: number,
  anwser: string,
) {
  return {
    type: ItineraryActions.REPLY_QUESTION_REQUEST,
    payload: {anwser, questionId, itineraryId},
  };
}

export function replyQuestionSuccess(itineraryQuestion: QuestionProps) {
  return {
    type: ItineraryActions.REPLY_QUESTION_SUCCESS,
    payload: {itineraryQuestion},
  };
}

export function replyQuestionFailure() {
  return {
    type: ItineraryActions.REPLY_QUESTION_FAILURE,
  };
}

export function promoteMemberRequest(itineraryId: number, memberId: number) {
  return {
    type: ItineraryActions.PROMOTE_MEMBER_REQUEST,
    payload: {itineraryId, memberId},
  };
}

export function promoteMemberSuccess(itineraryMember: MemberProps) {
  return {
    type: ItineraryActions.PROMOTE_MEMBER_SUCCESS,
    payload: {itineraryMember},
  };
}

export function promoteMemberFailure() {
  return {
    type: ItineraryActions.PROMOTE_MEMBER_FAILURE,
  };
}

export function demoteMemberRequest(itineraryId: number, memberId: number) {
  return {
    type: ItineraryActions.DEMOTE_MEMBER_REQUEST,
    payload: {itineraryId, memberId},
  };
}

export function demoteMemberSuccess(itineraryMember: MemberProps) {
  return {
    type: ItineraryActions.DEMOTE_MEMBER_SUCCESS,
    payload: {itineraryMember},
  };
}

export function demoteMemberFailure() {
  return {
    type: ItineraryActions.DEMOTE_MEMBER_FAILURE,
  };
}

export function acceptMemberRequest(itineraryId: number, memberId: number) {
  return {
    type: ItineraryActions.ACCEPT_MEMBER_REQUEST,
    payload: {itineraryId, memberId},
  };
}

export function acceptMemberSuccess(itineraryMember: MemberProps) {
  return {
    type: ItineraryActions.ACCEPT_MEMBER_SUCCESS,
    payload: {itineraryMember},
  };
}

export function acceptMemberFailure() {
  return {
    type: ItineraryActions.ACCEPT_MEMBER_FAILURE,
  };
}

export function removeMemberRequest(itineraryId: number, memberId: number) {
  return {
    type: ItineraryActions.REMOVE_MEMBER_REQUEST,
    payload: {itineraryId, memberId},
  };
}

export function removeMemberSuccess(itineraryId: number, memberId: number) {
  return {
    type: ItineraryActions.REMOVE_MEMBER_SUCCESS,
    payload: {itineraryId, memberId},
  };
}

export function removeMemberFailure() {
  return {
    type: ItineraryActions.REMOVE_MEMBER_FAILURE,
  };
}

export function notifyItineraryFinishRequest(itineraryId: number) {
  return {
    type: ItineraryActions.NOTIFY_ITINERARY_FINISH_REQUEST,
    payload: {itineraryId},
  };
}

export function notifyItineraryFinishSuccess() {
  return {
    type: ItineraryActions.NOTIFY_ITINERARY_FINISH_SUCCESS,
  };
}

export function notifyItineraryFinishFailure() {
  return {
    type: ItineraryActions.NOTIFY_ITINERARY_FINISH_FAILURE,
  };
}
