import produce from 'immer';

import {
  ItineraryProps,
  NotificationsProps,
  QuestionProps,
  CustomMemberPayload,
  ItineraryMemberAcceptWsResponse,
} from '../../../utils/types';
import {WsActions} from '../websocket/actions';
import {NextItinerariesActions} from './actions';
import {PushNotificationsActions} from '../pushNotifications/actions';
interface InitialStateProps {
  itineraries: ItineraryProps[] | null;
  loading: boolean;
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
    itineraryMemberWs: ItineraryMemberAcceptWsResponse;
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
        draft.itineraries = action.payload.itineraries || null;
        break;
      }
      case NextItinerariesActions.MAKE_QUESTION_SUCCESS: {
        const itineraryQuestion = action.payload.itineraryQuestion;
        const itineraryList = draft.itineraries;
        if (itineraryList !== null) {
          const itineraryIndex = itineraryList.findIndex(
            (item) => item.id === itineraryQuestion.itinerary,
          );

          if (itineraryIndex !== -1) {
            itineraryList[itineraryIndex].questions.push(itineraryQuestion);
            draft.itineraries = itineraryList;
          }
        }
        break;
      }
      case NextItinerariesActions.GET_NEXTITINERARIES_DETAILS_SUCCESS: {
        const {itinerary} = action.payload;
        const itineraryList = draft.itineraries;
        if (itineraryList !== null) {
          const itineraryIndex = itineraryList.findIndex(
            (item) => item.id === itinerary.id,
          );

          if (itineraryIndex !== -1) {
            itineraryList[itineraryIndex] = itinerary;
          } else {
            itineraryList.push(itinerary);
          }
          draft.itineraries = itineraryList;
        }
        break;
      }
      case WsActions.MEMBER_REJECTED: {
        const jsonData: ItineraryMemberAcceptWsResponse =
          action.payload.notification.jsonData;

        const itineraryList = draft.itineraries;
        if (itineraryList !== null) {
          const itineraryIndex = itineraryList.findIndex(
            (item) => item.id === jsonData.itineraryId,
          );

          if (itineraryIndex !== -1) {
            itineraryList.splice(itineraryIndex, 1);
            draft.itineraries = itineraryList;
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
            (item) => item.id === itineraryQuestion.itinerary,
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
      case PushNotificationsActions.ITINERARY_REJECT_MEMBER: {
        const jsonData = action.payload.itineraryMemberWs;

        const itineraryList = draft.itineraries;
        if (itineraryList !== null) {
          const itineraryIndex = itineraryList.findIndex(
            (item) => item.id === jsonData.itineraryId,
          );

          if (itineraryIndex !== -1) {
            itineraryList.splice(itineraryIndex, 1);
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
            (item) => item.id === itineraryQuestion.itinerary,
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
