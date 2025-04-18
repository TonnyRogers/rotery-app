import {
  MessageProps,
  MemberProps,
  QuestionProps,
  InvitesProps,
  ItineraryMemberAcceptWsResponse,
} from '../../../utils/types';

export enum PushNotificationsActions {
  NEW_MESSAGE = '@push/NEW_MESSAGE',
  RATE_ITINERARY = '@push/RATE_ITINERARY',
  NEW_CONNECTION = '@push/NEW_CONNECTION',
  CONNECTION_ACCEPTED = '@push/CONNECTION_ACCEPTED',
  ITINERARY_MEMBER = '@push/ITINERARY_MEMBER',
  ITINERARY_ACCEPT_MEMBER = '@push/ITINERARY_ACCEPT_MEMBER',
  ITINERARY_REJECT_MEMBER = '@push/ITINERARY_REJECT_MEMBER',
  ITINERARY_QUESTION = '@push/ITINERARY_QUESTION',
  ITINERARY_ANSWER = '@push/ITINERARY_ANSWER',
  ITINERARY_UPDATED = '@push/ITINERARY_UPDATED',
  ITINERARY_DELETED = '@push/ITINERARY_DELETED',
}

export function pushNotificationNewMessage(message: MessageProps) {
  return {
    type: PushNotificationsActions.NEW_MESSAGE,
    payload: {message},
  };
}

export function pushNotificationRateItinerary(payload: {id: number}) {
  return {
    type: PushNotificationsActions.RATE_ITINERARY,
    payload: {payload},
  };
}

export function pushNotificationNewConnection(invite: InvitesProps) {
  return {
    type: PushNotificationsActions.NEW_CONNECTION,
    payload: {invite},
  };
}

export function pushNotificationConnectionAccepted(invite: InvitesProps) {
  return {
    type: PushNotificationsActions.CONNECTION_ACCEPTED,
    payload: {invite},
  };
}

export function pushNotificationItineraryNewMember(
  itineraryMember: MemberProps,
) {
  return {
    type: PushNotificationsActions.ITINERARY_MEMBER,
    payload: {itineraryMember},
  };
}

export function pushNotificationItineraryAcceptedMember(
  itineraryMemberWS: ItineraryMemberAcceptWsResponse,
) {
  return {
    type: PushNotificationsActions.ITINERARY_ACCEPT_MEMBER,
    payload: {itineraryMemberWS},
  };
}

export function pushNotificationItineraryRejectMember(
  itineraryMemberWs: ItineraryMemberAcceptWsResponse,
) {
  return {
    type: PushNotificationsActions.ITINERARY_REJECT_MEMBER,
    payload: {itineraryMemberWs},
  };
}

export function pushNotificationItineraryQuestion(
  itineraryQuestion: QuestionProps,
) {
  return {
    type: PushNotificationsActions.ITINERARY_QUESTION,
    payload: {itineraryQuestion},
  };
}

export function pushNotificationItineraryAnswer(
  itineraryQuestion: QuestionProps,
) {
  return {
    type: PushNotificationsActions.ITINERARY_ANSWER,
    payload: {itineraryQuestion},
  };
}

export function pushNotificationItineraryUpdated(itinerary: {id: number}) {
  return {
    type: PushNotificationsActions.ITINERARY_UPDATED,
    payload: {itinerary},
  };
}

export function pushNotificationItineraryDeleted(customItineraryPayload: {
  id: number;
}) {
  return {
    type: PushNotificationsActions.ITINERARY_DELETED,
    payload: {customItineraryPayload},
  };
}
