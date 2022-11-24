import produce from 'immer';

import {
  QuestionProps,
  NotificationsProps,
  MemberProps,
  FeedItineraryProps,
  ItineraryMemberAcceptWsResponse,
  JoinItineraryWithPaymentResponse,
} from '../../../utils/types';
import {FeedActions} from './actions';
import {WsActions} from '../websocket/actions';
import {PushNotificationsActions} from '../pushNotifications/actions';
import {AuthActions} from '../auth/actions';
import {CheckoutActions} from '../checkout/actions';
interface InitialStateProps {
  itineraries: FeedItineraryProps[];
  loading: boolean;
}
interface ActionProps {
  type: string;
  payload: {
    itineraries: FeedItineraryProps[];
    itinerary: FeedItineraryProps;
    itineraryQuestion: QuestionProps;
    itineraryMember: MemberProps;
    itineraryMemberWs: ItineraryMemberAcceptWsResponse;
    notification: NotificationsProps<any>;
    paymentJoinResponse: JoinItineraryWithPaymentResponse;
  };
}

const INITIAL_STATE: InitialStateProps = {
  itineraries: [],
  loading: false,
};

export default function feed(state = INITIAL_STATE, action: ActionProps) {
  return produce(state, (draft) => {
    switch (action.type) {
      case FeedActions.GET_FEED_DETAIL_REQUEST: {
        draft.loading = true;
        break;
      }
      case FeedActions.GET_FEED_DETAIL_SUCCESS: {
        const {itinerary} = action.payload;
        const itineraryList = draft.itineraries;
        if (itineraryList) {
          const itineraryIndex = itineraryList.findIndex(
            (item) => item.id === itinerary.id,
          );

          if (itineraryIndex !== -1) {
            itineraryList[itineraryIndex] = itinerary;
            draft.itineraries = itineraryList;
          }
        }
        draft.loading = false;
        break;
      }
      case FeedActions.GET_FEED_DETAIL_FAILURE: {
        draft.loading = false;
        break;
      }
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
      case FeedActions.PAGINATE_FEED_FAILURE: {
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
          (item) => item.id === itineraryQuestion.itinerary,
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
        const itineraryIndex = itineraryList.findIndex(
          (item) => item.id === itineraryMember.itinerary,
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
        draft.loading = false;
        break;
      }
      case FeedActions.JOIN_FAILURE: {
        draft.loading = false;
        break;
      }
      case CheckoutActions.PROCESS_JOIN_ITINERARY_SUCCESS: {
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        const {payment, ...itineraryMember} =
          action.payload.paymentJoinResponse;
        const itineraryList = draft.itineraries;
        const itineraryIndex = itineraryList.findIndex(
          (item) => item.id === itineraryMember.itinerary,
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
        draft.loading = false;
        break;
      }
      case WsActions.ITINERARY_ANSWER: {
        const itineraryList = draft.itineraries;
        const itineraryQuestion: QuestionProps =
          action.payload.notification.jsonData;
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
            const memberIndex = itineraryList[itineraryIndex].members.findIndex(
              (item) => item.id === Number(jsonData.memberId),
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
          (item) => item.id === itineraryQuestion.itinerary,
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
      case PushNotificationsActions.ITINERARY_REJECT_MEMBER: {
        const jsonData = action.payload.itineraryMemberWs;

        const itineraryList = draft.itineraries;
        if (itineraryList !== null) {
          const itineraryIndex = itineraryList.findIndex(
            (item) => item.id === jsonData.itineraryId,
          );

          if (itineraryIndex !== -1) {
            const memberIndex = itineraryList[itineraryIndex].members.findIndex(
              (item) => item.id === Number(jsonData.memberId),
            );
            if (memberIndex !== -1) {
              itineraryList[itineraryIndex].members.splice(memberIndex, 1);
              draft.itineraries = itineraryList;
            }
          }
        }
        break;
      }
      case AuthActions.LOGOUT: {
        draft.itineraries = INITIAL_STATE.itineraries;
        draft.loading = INITIAL_STATE.loading;
        break;
      }
      default:
    }
  });
}
