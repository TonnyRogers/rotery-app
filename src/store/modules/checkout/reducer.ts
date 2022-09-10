import produce from 'immer';
import {CheckoutActions} from './actions';
import {
  CheckoutCustomerResponse,
  CheckoutCustomerCardResponse,
  PaymentSatatusDetailType,
  ProcessPaymentReponse,
  JoinItineraryWithPaymentResponse,
} from '../../../utils/types';
import {AuthActions} from '../auth/actions';

interface ActionProps {
  type: string;
  payload: {
    customer: CheckoutCustomerResponse;
    customerCard: CheckoutCustomerCardResponse;
    cardId: string;
    paymentResponse: ProcessPaymentReponse;
    paymentJoinResponse: JoinItineraryWithPaymentResponse;
    selectedCard: CheckoutCustomerCardResponse;
  };
}

interface InitialStateProps {
  checkoutStatus: PaymentSatatusDetailType | null;
  loading: boolean;
  customer: CheckoutCustomerResponse | null;
  defaultCard: CheckoutCustomerCardResponse | null;
}

const INITIAL_STATE: InitialStateProps = {
  loading: false,
  customer: null,
  checkoutStatus: null,
  defaultCard: null,
};

export default function checkout(state = INITIAL_STATE, action: ActionProps) {
  return produce(state, (draft) => {
    switch (action.type) {
      case CheckoutActions.GET_CUSTOMER_REQUEST: {
        draft.loading = true;
        break;
      }
      case CheckoutActions.GET_CUSTOMER_SUCCESS: {
        draft.customer = action.payload.customer;
        draft.loading = false;
        break;
      }
      case CheckoutActions.GET_CUSTOMER_FAILURE: {
        draft.loading = false;
        break;
      }
      case CheckoutActions.CREATE_CUSTOMER_REQUEST: {
        draft.loading = true;
        break;
      }
      case CheckoutActions.CREATE_CUSTOMER_SUCCESS: {
        draft.customer = action.payload.customer;
        draft.loading = false;
        break;
      }
      case CheckoutActions.CREATE_CUSTOMER_FAILURE: {
        draft.loading = false;
        break;
      }
      case CheckoutActions.ADD_CUSTOMER_CARD_REQUEST: {
        draft.loading = true;
        break;
      }
      case CheckoutActions.ADD_CUSTOMER_CARD_SUCCESS: {
        if (draft.customer) {
          const customer = draft.customer;

          const cardIndex = customer.cards.findIndex(
            (item) => item.id === action.payload.customerCard.id,
          );

          if (cardIndex !== -1) {
            customer.cards[cardIndex] = {...action.payload.customerCard};
          } else {
            customer.cards.push(action.payload.customerCard);
          }

          draft.customer = customer;
        }
        draft.loading = false;
        break;
      }
      case CheckoutActions.ADD_CUSTOMER_CARD_FAILURE: {
        draft.loading = false;
        break;
      }
      case CheckoutActions.REMOVE_CUSTOMER_CARD_REQUEST: {
        draft.loading = true;
        break;
      }
      case CheckoutActions.REMOVE_CUSTOMER_CARD_SUCCESS: {
        if (draft.customer) {
          const customer = draft.customer;

          const cardIndex = customer.cards.findIndex(
            (item) => item.id === action.payload.cardId,
          );
          if (cardIndex !== -1) {
            customer.cards.splice(cardIndex, 1);
            draft.customer = customer;
          }
        }
        draft.loading = false;
        break;
      }
      case CheckoutActions.REMOVE_CUSTOMER_CARD_FAILURE: {
        draft.loading = false;
        break;
      }
      case CheckoutActions.RESET_STATUS: {
        draft.checkoutStatus = null;
        break;
      }
      case CheckoutActions.PROCESS_PAYMENT_REQUEST: {
        draft.loading = true;
        break;
      }
      case CheckoutActions.PROCESS_PAYMENT_SUCCESS: {
        const processed = action.payload.paymentResponse;

        switch (processed.status) {
          case 'approved':
            draft.checkoutStatus = 'approved';
            break;
          case 'in_process':
            draft.checkoutStatus = 'in_process';
            break;
          case 'rejected':
            draft.checkoutStatus = 'rejected';
            break;

          default:
            break;
        }
        draft.loading = false;
        break;
      }
      case CheckoutActions.PROCESS_PAYMENT_FAILURE: {
        draft.loading = false;
        break;
      }
      case CheckoutActions.PROCESS_JOIN_ITINERARY_REQUEST: {
        draft.loading = true;
        break;
      }
      case CheckoutActions.PROCESS_JOIN_ITINERARY_SUCCESS: {
        const processed = action.payload.paymentJoinResponse;

        switch (processed.payment.status) {
          case 'approved':
            draft.checkoutStatus = 'approved';
            break;
          case 'in_process':
            draft.checkoutStatus = 'in_process';
            break;
          case 'rejected':
            draft.checkoutStatus = 'rejected';
            break;

          default:
            break;
        }
        draft.loading = false;
        break;
      }
      case CheckoutActions.PROCESS_JOIN_ITINERARY_FAILURE: {
        draft.loading = false;
        break;
      }
      case CheckoutActions.PROCESS_TIP_REQUEST: {
        draft.loading = true;
        break;
      }
      case CheckoutActions.PROCESS_TIP_SUCCESS: {
        draft.loading = false;
        break;
      }
      case CheckoutActions.PROCESS_TIP_FAILURE: {
        draft.loading = false;
        break;
      }
      case CheckoutActions.SET_DEFAULT_CARD: {
        draft.defaultCard = action.payload.selectedCard;
        break;
      }
      case AuthActions.LOGOUT: {
        draft.customer = INITIAL_STATE.customer;
        draft.loading = INITIAL_STATE.loading;
        draft.checkoutStatus = INITIAL_STATE.checkoutStatus;
        draft.defaultCard = INITIAL_STATE.defaultCard;
        break;
      }
      default:
    }
  });
}
