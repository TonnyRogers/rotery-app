import produce from 'immer';

import {
  ItineraryProps,
  NotificationsProps,
  QuestionProps,
  MemberProps,
  ItineraryMemberResponse,
} from '../../../utils/types';
import {ItineraryActions} from './actions';
import {WsActions} from '../websocket/actions';
import {NextItinerariesActions} from '../nextItineraries/actions';
import {PushNotificationsActions} from '../pushNotifications/actions';

interface InitialStateProps {
  itineraries: ItineraryProps[];
  loading: boolean;
}

interface ActionProps {
  type: string;
  payload: {
    itineraries: ItineraryProps[];
    itinerary: ItineraryProps;
    notification: NotificationsProps<any>;
    itineraryQuestion: QuestionProps;
    itineraryMember: ItineraryMemberResponse;
    itineraryId: number;
    userId: number;
  };
}

const INITIAL_STATE: InitialStateProps = {
  itineraries: [],
  loading: false,
};

export default function itineraries(
  state = INITIAL_STATE,
  action: ActionProps,
) {
  return produce(state, (draft) => {
    switch (action.type) {
      case ItineraryActions.GET_ITINERARIES_REQUEST: {
        draft.loading = true;
        break;
      }
      case ItineraryActions.GET_ITINERARIES_SUCCESS: {
        draft.itineraries = action.payload.itineraries;
        draft.loading = false;
        break;
      }
      case ItineraryActions.GET_ITINERARIES_FAILURE: {
        draft.loading = false;
        break;
      }
      case ItineraryActions.CREATE_ITINERARY_REQUEST: {
        draft.loading = true;
        break;
      }
      case ItineraryActions.CREATE_ITINERARY_SUCCESS: {
        draft.itineraries = [...draft.itineraries, action.payload.itinerary];
        draft.loading = false;
        break;
      }
      case ItineraryActions.CREATE_ITINERARY_FAILURE: {
        draft.loading = false;
        break;
      }
      case ItineraryActions.UPDATE_ITINERARY_REQUEST: {
        draft.loading = true;
        break;
      }
      case ItineraryActions.UPDATE_ITINERARY_SUCCESS: {
        const itinerary = action.payload.itinerary;
        const itineraryList = draft.itineraries;
        if (itineraryList !== null) {
          const itineraryIndex = itineraryList?.findIndex(
            (item) => item.id === itinerary.id,
          );
          if (itineraryIndex !== -1) {
            itineraryList[itineraryIndex] = {...itinerary};
            draft.itineraries = itineraryList;
          }
        }
        draft.loading = false;
        break;
      }
      case ItineraryActions.UPDATE_ITINERARY_FAILURE: {
        draft.loading = false;
        break;
      }
      case ItineraryActions.ACCEPT_MEMBER_REQUEST: {
        draft.loading = true;
        break;
      }
      case ItineraryActions.ACCEPT_MEMBER_SUCCESS: {
        const {itineraryMember} = action.payload;
        const itineraryList = draft.itineraries;

        if (itineraryList !== null) {
          const itineraryIndex = itineraryList.findIndex(
            (item) => item.id === itineraryMember.itinerary.id,
          );
          if (itineraryIndex !== -1) {
            const memberIndex = itineraryList[itineraryIndex].members.findIndex(
              (item) => item.id === itineraryMember.id,
            );
            if (memberIndex !== -1) {
              itineraryList[itineraryIndex].members[memberIndex] = {
                ...itineraryMember,
                itinerary: itineraryMember.itinerary.id,
              };
              draft.itineraries = itineraryList;
            }
          }
        }
        draft.loading = false;
        break;
      }
      case ItineraryActions.ACCEPT_MEMBER_FAILURE: {
        draft.loading = false;
        break;
      }
      case ItineraryActions.REMOVE_MEMBER_REQUEST: {
        draft.loading = true;
        break;
      }
      case ItineraryActions.REMOVE_MEMBER_SUCCESS: {
        const {itineraryId, userId} = action.payload;
        const itineraryList = draft.itineraries;
        if (itineraryList !== null) {
          const itineraryIndex = itineraryList.findIndex(
            (item) => item.id === itineraryId,
          );
          if (itineraryIndex !== -1) {
            const memberIndex = itineraryList[itineraryIndex].members.findIndex(
              (item) => item.user.id === userId,
            );

            if (memberIndex !== -1) {
              itineraryList[itineraryIndex].members.splice(memberIndex, 1);
              draft.itineraries = itineraryList;
            }
          }
        }
        draft.loading = false;
        break;
      }
      case ItineraryActions.REMOVE_MEMBER_FAILURE: {
        draft.loading = false;
        break;
      }
      case ItineraryActions.DELETE_ITINERARY_REQUEST: {
        draft.loading = true;
        break;
      }
      case ItineraryActions.DELETE_ITINERARY_SUCCESS: {
        const {itineraryId} = action.payload;
        const itineraryList = draft.itineraries;
        if (itineraryList !== null) {
          const itineraryIndex = itineraryList.findIndex(
            (item) => item.id === itineraryId,
          );

          if (itineraryIndex !== -1) {
            itineraryList.splice(itineraryIndex, 1);
            draft.itineraries = itineraryList;
          }
        }
        draft.loading = false;
        break;
      }
      case ItineraryActions.DELETE_ITINERARY_FAILURE: {
        draft.loading = false;
        break;
      }
      case ItineraryActions.REPLY_QUESTION_SUCCESS: {
        const itineraryList = draft.itineraries;
        const itineraryQuestion = action.payload.itineraryQuestion;
        if (itineraryList !== null) {
          const itineraryIndex = itineraryList.findIndex(
            (item) => item.id === itineraryQuestion.itinerary,
          );

          if (itineraryIndex !== -1) {
            let questionIndex = itineraryList[
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
      case ItineraryActions.PROMOTE_MEMBER_REQUEST: {
        draft.loading = true;
        break;
      }
      case ItineraryActions.PROMOTE_MEMBER_SUCCESS: {
        const {itineraryMember} = action.payload;
        const itineraryList = draft.itineraries;

        const itineraryIndex = itineraryList.findIndex(
          (item) => item.id === itineraryMember.itinerary.id,
        );

        if (itineraryIndex !== -1) {
          const memberIndex = itineraryList[itineraryIndex].members.findIndex(
            (item) => item.id === itineraryMember.id,
          );
          if (memberIndex !== -1) {
            itineraryList[itineraryIndex].members[memberIndex] = {
              ...itineraryMember,
              itinerary: itineraryMember.itinerary.id,
            };
            draft.itineraries = itineraryList;
          }
        }
        draft.loading = false;
        break;
      }
      case ItineraryActions.PROMOTE_MEMBER_FAILURE: {
        draft.loading = false;
        break;
      }
      case ItineraryActions.DEMOTE_MEMBER_REQUEST: {
        draft.loading = true;
        break;
      }
      case ItineraryActions.DEMOTE_MEMBER_SUCCESS: {
        const {itineraryMember} = action.payload;
        const itineraryList = draft.itineraries;

        const itineraryIndex = itineraryList.findIndex(
          (item) => item.id === itineraryMember.itinerary.id,
        );

        if (itineraryIndex !== -1) {
          const memberIndex = itineraryList[itineraryIndex].members.findIndex(
            (item) => item.id === itineraryMember.id,
          );
          if (memberIndex !== -1) {
            itineraryList[itineraryIndex].members[memberIndex] = {
              ...itineraryMember,
              itinerary: itineraryMember.itinerary.id,
            };
            draft.itineraries = itineraryList;
          }
        }
        draft.loading = false;
        break;
      }
      case ItineraryActions.DEMOTE_MEMBER_FAILURE: {
        draft.loading = false;
        break;
      }
      case ItineraryActions.NOTIFY_ITINERARY_FINISH_REQUEST: {
        draft.loading = true;
        break;
      }
      case ItineraryActions.NOTIFY_ITINERARY_FINISH_SUCCESS: {
        draft.loading = false;
        break;
      }
      case ItineraryActions.NOTIFY_ITINERARY_FINISH_REQUEST: {
        draft.loading = false;
        break;
      }
      case WsActions.ITINERARY_QUESTION: {
        const itineraryList = draft.itineraries;
        const itineraryQuestion: QuestionProps =
          action.payload.notification.jsonData;

        if (itineraryList !== null) {
          const itineraryIndex = itineraryList.findIndex(
            (item) => item.id === itineraryQuestion.itinerary,
          );

          if (itineraryIndex !== -1) {
            let questionIndex = itineraryList[
              itineraryIndex
            ].questions.findIndex(
              (question) => question.id === itineraryQuestion.id,
            );
            if (questionIndex !== -1) {
              itineraryList[itineraryIndex].questions[questionIndex] = {
                ...itineraryQuestion,
              };
            } else {
              itineraryList[itineraryIndex].questions.push(itineraryQuestion);
            }
            draft.itineraries = itineraryList;
          }
        }
        break;
      }
      case WsActions.NEW_ITINERARY_MEMBER: {
        const memberPayload: MemberProps = action.payload.notification.jsonData;
        const itineraryList = draft.itineraries;
        if (itineraryList !== null) {
          const itineraryIndex = itineraryList.findIndex(
            (item) => item.id === memberPayload.itinerary,
          );

          if (itineraryIndex !== -1) {
            const memberIndex = itineraryList[itineraryIndex].members.findIndex(
              (item) => item.id === memberPayload.id,
            );
            if (memberIndex !== -1) {
              itineraryList[itineraryIndex].members[memberIndex] = {
                ...memberPayload,
              };
            } else {
              itineraryList[itineraryIndex].members.push(memberPayload);
            }
            draft.itineraries = itineraryList;
          }
        }
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
      case PushNotificationsActions.ITINERARY_MEMBER: {
        const memberPayload = action.payload.itineraryMember;

        const itineraryList = draft.itineraries;
        if (itineraryList !== null) {
          const itineraryIndex = itineraryList.findIndex(
            (item) => item.id === memberPayload.itinerary.id,
          );

          if (itineraryIndex !== -1) {
            const memberIndex = itineraryList[itineraryIndex].members.findIndex(
              (item) => item.id === memberPayload.id,
            );
            if (memberIndex !== -1) {
              itineraryList[itineraryIndex].members[memberIndex] = {
                ...memberPayload,
                itinerary: memberPayload.itinerary.id,
              };
            } else {
              itineraryList[itineraryIndex].members.push({
                ...memberPayload,
                itinerary: memberPayload.itinerary.id,
              });
            }
            draft.itineraries = itineraryList;
          }
        }
        break;
      }
      case PushNotificationsActions.ITINERARY_QUESTION: {
        const itineraryList = draft.itineraries;
        const itineraryQuestion = action.payload.itineraryQuestion;

        if (itineraryList !== null) {
          const itineraryIndex = itineraryList.findIndex(
            (item) => item.id === itineraryQuestion.itinerary,
          );

          if (itineraryIndex !== -1) {
            let questionIndex = itineraryList[
              itineraryIndex
            ].questions.findIndex(
              (question) => question.id === itineraryQuestion.id,
            );
            if (questionIndex !== -1) {
              itineraryList[itineraryIndex].questions[questionIndex] = {
                ...itineraryQuestion,
              };
            } else {
              itineraryList[itineraryIndex].questions.push(itineraryQuestion);
            }
            draft.itineraries = itineraryList;
          }
        }
        break;
      }
      default:
    }
  });
}
