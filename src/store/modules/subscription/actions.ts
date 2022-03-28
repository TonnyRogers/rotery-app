import {Subscription} from '../../../utils/types';

export enum SubscriptionActions {
  GET_SUBSCRIPTION_REQUEST = '@subscription/GET_SUBSCRIPTION_REQUEST',
  GET_SUBSCRIPTION_SUCCESS = '@subscription/GET_SUBSCRIPTION_SUCCESS',
  GET_SUBSCRIPTION_FAILURE = '@subscription/GET_SUBSCRIPTION_FAILURE',
  CREATE_SUBSCRIPTION_REQUEST = '@subscription/CREATE_SUBSCRIPTION_REQUEST',
  CREATE_SUBSCRIPTION_SUCCESS = '@subscription/CREATE_SUBSCRIPTION_SUCCESS',
  CREATE_SUBSCRIPTION_FAILURE = '@subscription/CREATE_SUBSCRIPTION_FAILURE',
  CANCEL_SUBSCRIPTION_REQUEST = '@subscription/CANCEL_SUBSCRIPTION_REQUEST',
  CANCEL_SUBSCRIPTION_SUCCESS = '@subscription/CANCEL_SUBSCRIPTION_SUCCESS',
  CANCEL_SUBSCRIPTION_FAILURE = '@subscription/CANCEL_SUBSCRIPTION_FAILURE',
  CHANGE_SUBSCRIPTION_CARD_REQUEST = '@subscription/CHANGE_SUBSCRIPTION_CARD_REQUEST',
  CHANGE_SUBSCRIPTION_CARD_SUCCESS = '@subscription/CHANGE_SUBSCRIPTION_CARD_SUCCESS',
  CHANGE_SUBSCRIPTION_CARD_FAILURE = '@subscription/CHANGE_SUBSCRIPTION_CARD_FAILURE',
}

export function getSubscriptionRequest() {
  return {
    type: SubscriptionActions.GET_SUBSCRIPTION_REQUEST,
  };
}

export function getSubscriptionSuccess(subscription: Subscription) {
  return {
    type: SubscriptionActions.GET_SUBSCRIPTION_SUCCESS,
    payload: {subscription},
  };
}

export function getSubscriptionFailure() {
  return {
    type: SubscriptionActions.GET_SUBSCRIPTION_FAILURE,
  };
}

export function createSubscriptionRequest(
  preapproval_plan_id: string,
  card_token_id: string,
  payer_email: string,
  planId?: number,
) {
  return {
    type: SubscriptionActions.CREATE_SUBSCRIPTION_REQUEST,
    payload: {
      preapproval_plan_id,
      card_token_id,
      payer_email,
      planId,
    },
  };
}

export function createSubscriptionSuccess(subscription: Subscription) {
  return {
    type: SubscriptionActions.CREATE_SUBSCRIPTION_SUCCESS,
    payload: {subscription},
  };
}

export function createSubscriptionFailure() {
  return {
    type: SubscriptionActions.CREATE_SUBSCRIPTION_FAILURE,
  };
}

export function cancelSubscriptionRequest(subscriptionId: number) {
  return {
    type: SubscriptionActions.CANCEL_SUBSCRIPTION_REQUEST,
    payload: {
      subscriptionId,
    },
  };
}

export function cancelSubscriptionSuccess() {
  return {
    type: SubscriptionActions.CANCEL_SUBSCRIPTION_SUCCESS,
  };
}

export function cancelSubscriptionFailure() {
  return {
    type: SubscriptionActions.CANCEL_SUBSCRIPTION_FAILURE,
  };
}
export function changeSubscriptionCardRequest(
  subscriptionId: number,
  card_token_id: string,
) {
  return {
    type: SubscriptionActions.CHANGE_SUBSCRIPTION_CARD_REQUEST,
    payload: {
      subscriptionId,
      card_token_id,
    },
  };
}

export function changeSubscriptionCardSuccess() {
  return {
    type: SubscriptionActions.CHANGE_SUBSCRIPTION_CARD_SUCCESS,
  };
}

export function changeSubscriptionCardFailure() {
  return {
    type: SubscriptionActions.CHANGE_SUBSCRIPTION_CARD_FAILURE,
  };
}
