import {
  CheckoutCustomerResponse,
  CheckoutCustomerCardResponse,
  ProcessPaymentPayload,
  ProcessPaymentReponse,
  JoinItineraryWithPaymentResponse,
  Tip,
} from '../../../utils/types';

export enum CheckoutActions {
  GET_CUSTOMER_REQUEST = '@checkout/GET_CUSTOMER_REQUEST',
  GET_CUSTOMER_SUCCESS = '@checkout/GET_CUSTOMER_SUCCESS',
  GET_CUSTOMER_FAILURE = '@checkout/GET_CUSTOMER_FAILURE',
  CREATE_CUSTOMER_REQUEST = '@checkout/CREATE_CUSTOMER_REQUEST',
  CREATE_CUSTOMER_SUCCESS = '@checkout/CREATE_CUSTOMER_SUCCESS',
  CREATE_CUSTOMER_FAILURE = '@checkout/CREATE_CUSTOMER_FAILURE',
  ADD_CUSTOMER_CARD_REQUEST = '@checkout/ADD_CUSTOMER_CARD_REQUEST',
  ADD_CUSTOMER_CARD_SUCCESS = '@checkout/ADD_CUSTOMER_CARD_SUCCESS',
  ADD_CUSTOMER_CARD_FAILURE = '@checkout/ADD_CUSTOMER_CARD_FAILURE',
  REMOVE_CUSTOMER_CARD_REQUEST = '@checkout/REMOVE_CUSTOMER_CARD_REQUEST',
  REMOVE_CUSTOMER_CARD_SUCCESS = '@checkout/REMOVE_CUSTOMER_CARD_SUCCESS',
  REMOVE_CUSTOMER_CARD_FAILURE = '@checkout/REMOVE_CUSTOMER_CARD_FAILURE',
  PROCESS_PAYMENT_REQUEST = '@checkout/PROCESS_PAYMENT_REQUEST',
  PROCESS_PAYMENT_SUCCESS = '@checkout/PROCESS_PAYMENT_SUCCESS',
  PROCESS_PAYMENT_FAILURE = '@checkout/PROCESS_PAYMENT_FAILURE',
  PROCESS_JOIN_ITINERARY_REQUEST = '@checkout/PROCESS_JOIN_ITINERARY_REQUEST',
  PROCESS_JOIN_ITINERARY_SUCCESS = '@checkout/PROCESS_JOIN_ITINERARY_SUCCESS',
  PROCESS_JOIN_ITINERARY_FAILURE = '@checkout/PROCESS_JOIN_ITINERARY_FAILURE',
  PROCESS_TIP_REQUEST = '@checkout/PROCESS_TIP_REQUEST',
  PROCESS_TIP_SUCCESS = '@checkout/PROCESS_TIP_SUCCESS',
  PROCESS_TIP_FAILURE = '@checkout/PROCESS_TIP_FAILURE',
  RESET_STATUS = '@checkout/RESET_STATUS',
  SET_DEFAULT_CARD = '@checkout/SET_DEFAULT_CARD',
}

export function getCustomerRequest(id: string) {
  return {
    type: CheckoutActions.GET_CUSTOMER_REQUEST,
    payload: {id},
  };
}

export function getCustomerSuccess(customer: CheckoutCustomerResponse) {
  return {
    type: CheckoutActions.GET_CUSTOMER_SUCCESS,
    payload: {customer},
  };
}

export function getCustomerFailure() {
  return {
    type: CheckoutActions.GET_CUSTOMER_FAILURE,
  };
}

export function createCustomerRequest(cratePayload: {
  email: string;
  fullName?: string;
  phone?: number;
}) {
  return {
    type: CheckoutActions.CREATE_CUSTOMER_REQUEST,
    payload: {cratePayload},
  };
}

export function createCustomerSuccess(customer: CheckoutCustomerResponse) {
  return {
    type: CheckoutActions.CREATE_CUSTOMER_SUCCESS,
    payload: {customer},
  };
}

export function createCustomerFailure() {
  return {
    type: CheckoutActions.CREATE_CUSTOMER_FAILURE,
  };
}

export function addCustomerCardRequest(cardToken: string, customerId: string) {
  return {
    type: CheckoutActions.ADD_CUSTOMER_CARD_REQUEST,
    payload: {customerId, cardToken},
  };
}

export function addCustomerCardSuccess(
  customerCard: CheckoutCustomerCardResponse,
) {
  return {
    type: CheckoutActions.ADD_CUSTOMER_CARD_SUCCESS,
    payload: {customerCard},
  };
}

export function addCustomerCardFailure() {
  return {
    type: CheckoutActions.ADD_CUSTOMER_CARD_FAILURE,
  };
}

export function removeCustomerCardRequest(customerId: string, cardId: string) {
  return {
    type: CheckoutActions.REMOVE_CUSTOMER_CARD_REQUEST,
    payload: {customerId, cardId},
  };
}

export function removeCustomerCardSuccess(cardId: string) {
  return {
    type: CheckoutActions.REMOVE_CUSTOMER_CARD_SUCCESS,
    payload: {cardId},
  };
}

export function removeCustomerCardFailure() {
  return {
    type: CheckoutActions.REMOVE_CUSTOMER_CARD_FAILURE,
  };
}

export function processPaymentRequest(payment: ProcessPaymentPayload) {
  return {
    type: CheckoutActions.PROCESS_PAYMENT_REQUEST,
    payload: {payment},
  };
}

export function processPaymentSuccess(paymentResponse: ProcessPaymentReponse) {
  return {
    type: CheckoutActions.PROCESS_PAYMENT_SUCCESS,
    payload: {paymentResponse},
  };
}

export function processPaymentFailure() {
  return {
    type: CheckoutActions.PROCESS_PAYMENT_FAILURE,
  };
}

export function processJoinItineraryPaymentRequest(
  itineraryId: number,
  payment: ProcessPaymentPayload,
) {
  return {
    type: CheckoutActions.PROCESS_JOIN_ITINERARY_REQUEST,
    payload: {itineraryId, payment},
  };
}

export function processJoinItinerarySuccess(
  paymentJoinResponse: JoinItineraryWithPaymentResponse,
) {
  return {
    type: CheckoutActions.PROCESS_JOIN_ITINERARY_SUCCESS,
    payload: {paymentJoinResponse},
  };
}

export function processJoinItineraryFailure() {
  return {
    type: CheckoutActions.PROCESS_JOIN_ITINERARY_FAILURE,
  };
}

export function resetCheckoutStatus() {
  return {
    type: CheckoutActions.RESET_STATUS,
  };
}

export function setDefaultCard(selectedCard: CheckoutCustomerCardResponse) {
  return {
    type: CheckoutActions.SET_DEFAULT_CARD,
    payload: {
      selectedCard,
    },
  };
}

export interface ProcessTip {
  user: {
    id: number;
  };
  paymentAmount: string;
  cardInfo: {
    token: string;
    paymentMethod: string;
    issuerId: string;
  };
}

export function processTipRequest(processTipPayload: ProcessTip) {
  return {
    type: CheckoutActions.PROCESS_TIP_REQUEST,
    payload: {processTipPayload},
  };
}

export function processTipSuccess(tip: Tip) {
  return {
    type: CheckoutActions.PROCESS_TIP_SUCCESS,
    payload: {tip},
  };
}

export function processTipFailure() {
  return {
    type: CheckoutActions.PROCESS_TIP_FAILURE,
  };
}
