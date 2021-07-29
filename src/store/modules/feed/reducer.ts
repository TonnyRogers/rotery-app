import produce from 'immer';

import {
  ItineraryProps,
  QuestionProps,
  NotificationsProps,
  MemberProps,
} from '../../../utils/types';
import {FeedActions} from './actions';
import {WsActions} from '../websocket/actions';
import {PushNotificationsActions} from '../pushNotifications/actions';
interface InitialStateProps {
  itineraries: ItineraryProps[];
  loading: boolean;
}

interface CustomMemberPayload {
  itinerary_id: number;
  user_id: number;
}

interface ActionProps {
  type: string;
  payload: {
    itineraries: ItineraryProps[];
    itinerary: ItineraryProps;
    itineraryQuestion: QuestionProps;
    itineraryMember: MemberProps | CustomMemberPayload;
    notification: NotificationsProps;
  };
}

const INITIAL_STATE: InitialStateProps = {
  itineraries: [],
  loading: false,
};

export default function feed(state = INITIAL_STATE, action: ActionProps) {
  return produce(state, (draft) => {
    switch (action.type) {
      case FeedActions.GET_FEED_REQUEST: {
        draft.loading = true;
        break;
      }
      case FeedActions.GET_FEED_SUCCESS: {
        draft.itineraries = action.payload.itineraries;
        draft.loading = false;
        break;
      }
      case FeedActions.GET_FEED_FAILURE: {
        draft.loading = false;
        break;
      }
      case FeedActions.GET_FEED_FILTERED_REQUEST: {
        draft.loading = true;
        break;
      }
      case FeedActions.GET_FEED_FILTERED_SUCCESS: {
        draft.itineraries = action.payload.itineraries;
        draft.loading = false;
        break;
      }
      case FeedActions.GET_FEED_FILTERED_FAILURE: {
        draft.loading = false;
        break;
      }
      case FeedActions.PAGINATE_FEED_REQUEST: {
        draft.loading = true;
        break;
      }
      case FeedActions.PAGINATE_FEED_SUCCESS: {
        const itineraries = [
          ...draft.itineraries,
          ...action.payload.itineraries,
        ];

        draft.itineraries = itineraries;
        draft.loading = false;
        break;
      }
      case FeedActions.MAKE_QUESTION_REQUEST: {
        draft.loading = true;
        break;
      }
      case FeedActions.MAKE_QUESTION_SUCCESS: {
        const itineraryQuestion = action.payload.itineraryQuestion;
        const itineraryList = draft.itineraries;
        const itineraryIndex = itineraryList.findIndex(
          (item) => item.id === itineraryQuestion.itinerary_id,
        );

        if (itineraryIndex !== -1) {
          itineraryList[itineraryIndex].questions.push(itineraryQuestion);
          draft.itineraries = itineraryList;
        }
        draft.loading = false;
        break;
      }
      case FeedActions.MAKE_QUESTION_FAILURE: {
        draft.loading = false;
        break;
      }
      case FeedActions.JOIN_REQUEST: {
        draft.loading = true;
        break;
      }
      case FeedActions.JOIN_SUCCESS: {
        const itineraryMember = action.payload.itineraryMember;
        const itineraryList = draft.itineraries;
        if ('pivot' in itineraryMember) {
          const itineraryIndex = itineraryList.findIndex(
            (item) => item.id === itineraryMember.pivot.itinerary_id,
          );

          if (itineraryIndex !== -1) {
            const memberIndex = itineraryList[itineraryIndex].members.findIndex(
              (item) => item.id === itineraryMember.id,
            );
            if (memberIndex !== -1) {
              itineraryList[itineraryIndex].members[memberIndex] = {
                ...itineraryMember,
              };
            } else {
              itineraryList[itineraryIndex].members.push(itineraryMember);
            }
            draft.itineraries = itineraryList;
          }
        }
        draft.loading = false;
        break;
      }
      case FeedActions.JOIN_FAILURE: {
        draft.loading = false;
        break;
      }
      case WsActions.ITINERARY_ANSWER: {
        const itineraryList = draft.itineraries;
        const itineraryQuestion: QuestionProps = JSON.parse(
          action.payload.notification.json_data,
        );
        const itineraryIndex = itineraryList.findIndex(
          (item) => item.id === itineraryQuestion.itinerary_id,
        );

        if (itineraryIndex !== -1) {
          let questionIndex = itineraryList[itineraryIndex].questions.findIndex(
            (question) => question.id === itineraryQuestion.id,
          );
          if (questionIndex !== -1) {
            itineraryList[itineraryIndex].questions[questionIndex] = {
              ...itineraryQuestion,
            };
            draft.itineraries = itineraryList;
          }
        }
        break;
      }
      case WsActions.MEMBER_ACCEPTED: {
        const itineraryPayload: ItineraryProps = JSON.parse(
          action.payload.notification.json_data,
        );

        const itineraryList = draft.itineraries;
        const itineraryIndex = itineraryList.findIndex(
          (item) => item.id === itineraryPayload.id,
        );

        if (itineraryIndex !== -1 && itineraryIndex !== undefined) {
          itineraryList[itineraryIndex] = {...itineraryPayload};
        } else {
          itineraryList.push(itineraryPayload);
        }
        draft.itineraries = itineraryList;
        break;
      }
      case WsActions.MEMBER_REJECTED: {
        const jsonData = JSON.parse(action.payload.notification.json_data);

        const itineraryList = draft.itineraries;
        if (itineraryList !== null) {
          const itineraryIndex = itineraryList.findIndex(
            (item) => item.id === jsonData.itinerary_id,
          );

          if (itineraryIndex !== -1) {
            const memberIndex = itineraryList[itineraryIndex].members.findIndex(
              (item) => item.pivot.user_id === jsonData.user_id,
            );
            if (memberIndex !== -1) {
              itineraryList[itineraryIndex].members.splice(memberIndex, 1);
              draft.itineraries = itineraryList;
            }
          }
        }
        break;
      }
      case PushNotificationsActions.ITINERARY_ANSWER: {
        const itineraryList = draft.itineraries;
        const itineraryQuestion = action.payload.itineraryQuestion;

        const itineraryIndex = itineraryList.findIndex(
          (item) => item.id === itineraryQuestion.itinerary_id,
        );

        if (itineraryIndex !== -1) {
          let questionIndex = itineraryList[itineraryIndex].questions.findIndex(
            (question) => question.id === itineraryQuestion.id,
          );
          if (questionIndex !== -1) {
            itineraryList[itineraryIndex].questions[questionIndex] = {
              ...itineraryQuestion,
            };
            draft.itineraries = itineraryList;
          }
        }
        break;
      }
      case PushNotificationsActions.ITINERARY_ACCEPT_MEMBER: {
        const itineraryPayload = action.payload.itinerary;

        const itineraryList = draft.itineraries;
        const itineraryIndex = itineraryList.findIndex(
          (item) => item.id === itineraryPayload.id,
        );

        if (itineraryIndex !== -1 && itineraryIndex !== undefined) {
          itineraryList[itineraryIndex] = {...itineraryPayload};
        } else {
          itineraryList.push(itineraryPayload);
        }
        draft.itineraries = itineraryList;
        break;
      }
      case PushNotificationsActions.ITINERARY_REJECT_MEMBER: {
        const jsonData = action.payload.itineraryMember;

        if ('itinerary_id' in jsonData) {
          const itineraryList = draft.itineraries;
          if (itineraryList !== null) {
            const itineraryIndex = itineraryList.findIndex(
              (item) => item.id === jsonData.itinerary_id,
            );

            if (itineraryIndex !== -1) {
              const memberIndex = itineraryList[
                itineraryIndex
              ].members.findIndex(
                (item) => item.pivot.user_id === jsonData.user_id,
              );
              if (memberIndex !== -1) {
                itineraryList[itineraryIndex].members.splice(memberIndex, 1);
                draft.itineraries = itineraryList;
              }
            }
          }
        }
        break;
      }
      default:
    }
  });
}
