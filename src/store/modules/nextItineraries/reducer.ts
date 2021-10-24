import produce from 'immer';

import {
  ItineraryProps,
  NotificationsProps,
  QuestionProps,
  ItineraryMemberResponse,
} from '../../../utils/types';
import {WsActions} from '../websocket/actions';
import {NextItinerariesActions} from './actions';
import {PushNotificationsActions} from '../pushNotifications/actions';
interface InitialStateProps {
  itineraries: ItineraryProps[] | null;
  loading: boolean;
}

interface CustomMemberPayload {
  itinerary_id: number;
  user_id: number;
}
interface CustomItineraryPayload {
  id: number;
}

interface ActionProps {
  type: string;
  payload: {
    itineraries: ItineraryProps[];
    itinerary: ItineraryProps;
    notification: NotificationsProps<any>;
    itineraryQuestion: QuestionProps;
    itineraryMember: CustomMemberPayload;
    customItineraryPayload: CustomItineraryPayload;
  };
}

const INITIAL_STATE: InitialStateProps = {
  itineraries: null,
  loading: false,
};

export default function itineraries(
  state = INITIAL_STATE,
  action: ActionProps,
) {
  return produce(state, (draft) => {
    switch (action.type) {
      case NextItinerariesActions.GET_NEXTITINERARIES_SUCCESS: {
        draft.itineraries = action.payload.itineraries;
        break;
      }
      case NextItinerariesActions.MAKE_QUESTION_SUCCESS: {
        const itineraryQuestion = action.payload.itineraryQuestion;
        const itineraryList = draft.itineraries;
        if (itineraryList !== null) {
          const itineraryIndex = itineraryList.findIndex(
            (item) =>
              typeof itineraryQuestion.itinerary !== 'number' &&
              item.id === itineraryQuestion.itinerary,
          );

          if (itineraryIndex !== -1) {
            itineraryList[itineraryIndex].questions.push(itineraryQuestion);
            draft.itineraries = itineraryList;
          }
        }
        break;
      }
      case WsActions.MEMBER_ACCEPTED: {
        const memberPayload: ItineraryMemberResponse =
          action.payload.notification.jsonData;
        let itineraryList = draft.itineraries;

        if (itineraryList !== null) {
          const itineraryIndex = itineraryList.findIndex(
            (item) => item.id === memberPayload.itinerary.id,
          );

          if (itineraryIndex === -1) {
            const nextItinerary = memberPayload.itinerary;
            nextItinerary.members = [
              ...nextItinerary.members,
              {...memberPayload, itinerary: memberPayload.itinerary.id},
            ];
            itineraryList.push(nextItinerary);
          }
        } else {
          const nextItinerary = memberPayload.itinerary;
          nextItinerary.members = [
            {...memberPayload, itinerary: memberPayload.itinerary.id},
          ];
          itineraryList = [nextItinerary];
        }
        draft.itineraries = itineraryList;
        break;
      }
      case WsActions.MEMBER_REJECTED: {
        const jsonData: ItineraryMemberResponse =
          action.payload.notification.jsonData;

        const itineraryList = draft.itineraries;
        if (itineraryList !== null) {
          const itineraryIndex = itineraryList.findIndex(
            (item) => item.id === jsonData.itinerary.id,
          );

          if (itineraryIndex !== -1) {
            const memberIndex = itineraryList[itineraryIndex].members.findIndex(
              (item) => item.user.id === jsonData.user.id,
            );
            if (memberIndex !== -1) {
              itineraryList[itineraryIndex].members.splice(memberIndex, 1);
              draft.itineraries = itineraryList;
            }
          }
        }
        break;
      }
      case WsActions.ITINERARY_UPDATE: {
        const itineraryPayload: ItineraryProps =
          action.payload.notification.jsonData;

        const itineraryList = draft.itineraries;
        if (itineraryList !== null) {
          const itineraryIndex = itineraryList.findIndex(
            (item) => item.id === itineraryPayload.id,
          );

          if (itineraryIndex !== -1) {
            itineraryList[itineraryIndex] = {...itineraryPayload};
            draft.itineraries = itineraryList;
          }
        }
        break;
      }
      case WsActions.ITINERARY_DELETE: {
        const jsonData: {id: number} = action.payload.notification.jsonData;

        const itineraryList = draft.itineraries;
        if (itineraryList !== null) {
          const itineraryIndex = itineraryList.findIndex(
            (item) => item.id === jsonData.id,
          );

          if (itineraryIndex !== -1) {
            itineraryList.splice(itineraryIndex, 1);
            draft.itineraries = itineraryList;
          }
        }
        break;
      }
      case WsActions.ITINERARY_ANSWER: {
        const itineraryList = draft.itineraries;
        const itineraryQuestion: QuestionProps =
          action.payload.notification.jsonData;

        if (itineraryList !== null) {
          const itineraryIndex = itineraryList.findIndex(
            (item) =>
              typeof itineraryQuestion.itinerary !== 'number' &&
              item.id === itineraryQuestion.itinerary,
          );

          if (itineraryIndex !== -1) {
            const questionIndex = itineraryList[
              itineraryIndex
            ].questions.findIndex(
              (question) => question.id === itineraryQuestion.id,
            );
            if (questionIndex !== -1) {
              itineraryList[itineraryIndex].questions[questionIndex] = {
                ...itineraryQuestion,
              };
              draft.itineraries = itineraryList;
            }
          }
        }
        break;
      }
      case PushNotificationsActions.ITINERARY_ACCEPT_MEMBER: {
        const itineraryPayload = action.payload.itinerary;
        let itineraryList = draft.itineraries;

        if (itineraryList !== null) {
          const itineraryIndex = itineraryList.findIndex(
            (item) => item.id === itineraryPayload.id,
          );

          if (itineraryIndex !== -1 && itineraryIndex !== undefined) {
            itineraryList[itineraryIndex] = {...itineraryPayload};
          } else {
            itineraryList.push(itineraryPayload);
          }
        } else {
          itineraryList = [itineraryPayload];
        }
        draft.itineraries = itineraryList;
        break;
      }
      case PushNotificationsActions.ITINERARY_REJECT_MEMBER: {
        const jsonData = action.payload.itineraryMember;

        const itineraryList = draft.itineraries;
        if (itineraryList !== null) {
          const itineraryIndex = itineraryList.findIndex(
            (item) => item.id === jsonData.itinerary_id,
          );

          if (itineraryIndex !== -1) {
            const memberIndex = itineraryList[itineraryIndex].members.findIndex(
              (item) => item.user.id === jsonData.user_id,
            );
            if (memberIndex !== -1) {
              itineraryList[itineraryIndex].members.splice(memberIndex, 1);
              draft.itineraries = itineraryList;
            }
          }
        }
        break;
      }
      case PushNotificationsActions.ITINERARY_UPDATED: {
        const itineraryPayload: ItineraryProps = action.payload.itinerary;

        const itineraryList = draft.itineraries;
        if (itineraryList !== null) {
          const itineraryIndex = itineraryList.findIndex(
            (item) => item.id === itineraryPayload.id,
          );

          if (itineraryIndex !== -1) {
            itineraryList[itineraryIndex] = {...itineraryPayload};
            draft.itineraries = itineraryList;
          }
        }
        break;
      }
      case PushNotificationsActions.ITINERARY_DELETED: {
        const jsonData = action.payload.customItineraryPayload;

        const itineraryList = draft.itineraries;
        if (itineraryList !== null) {
          const itineraryIndex = itineraryList.findIndex(
            (item) => item.id === jsonData.id,
          );

          if (itineraryIndex !== -1) {
            itineraryList.splice(itineraryIndex, 1);
            draft.itineraries = itineraryList;
          }
        }
        break;
      }
      case PushNotificationsActions.ITINERARY_ANSWER: {
        const itineraryList = draft.itineraries;
        const itineraryQuestion = action.payload.itineraryQuestion;

        if (itineraryList !== null) {
          const itineraryIndex = itineraryList.findIndex(
            (item) =>
              typeof itineraryQuestion.itinerary !== 'number' &&
              item.id === itineraryQuestion.itinerary,
          );

          if (itineraryIndex !== -1) {
            const questionIndex = itineraryList[
              itineraryIndex
            ].questions.findIndex(
              (question) => question.id === itineraryQuestion.id,
            );
            if (questionIndex !== -1) {
              itineraryList[itineraryIndex].questions[questionIndex] = {
                ...itineraryQuestion,
              };
              draft.itineraries = itineraryList;
            }
          }
        }
        break;
      }
      default:
    }
  });
}
