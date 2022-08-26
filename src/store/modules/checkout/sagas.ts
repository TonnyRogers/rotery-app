import {takeLatest, put, call, all} from 'redux-saga/effects';
import Toast from 'react-native-toast-message';
import {AxiosResponse} from 'axios';

import NetInfo from '../../../services/netinfo';
import {
  CheckoutActions,
  getCustomerRequest,
  getCustomerFailure,
  getCustomerSuccess,
  createCustomerSuccess,
  createCustomerRequest,
  createCustomerFailure,
  addCustomerCardRequest,
  addCustomerCardSuccess,
  processPaymentRequest,
  removeCustomerCardRequest,
  removeCustomerCardSuccess,
  removeCustomerCardFailure,
  processPaymentSuccess,
  processPaymentFailure,
  processJoinItineraryPaymentRequest,
  processJoinItinerarySuccess,
  processJoinItineraryFailure,
} from './actions';
import api from '../../../services/api';
import {
  CheckoutCustomerResponse,
  CheckoutCustomerCardResponse,
  ProcessPaymentReponse,
  JoinItineraryWithPaymentResponse,
} from '../../../utils/types';
import {translateError} from '../../../lib/utils';

export function* getCustomer({payload}: ReturnType<typeof getCustomerRequest>) {
  try {
    const info = yield call(NetInfo);

    if (!info.status) {
      yield put(getCustomerFailure());
      return;
    }

    const {id} = payload;
    const response: AxiosResponse<CheckoutCustomerResponse> = yield call(
      api.get,
      `/payments/customer/${id}`,
    );
    yield put(getCustomerSuccess(response.data));
  } catch (error) {
    yield put(getCustomerFailure());
  }
}

export function* createCustomer({
  payload: {cratePayload},
}: ReturnType<typeof createCustomerRequest>) {
  try {
    const info = yield call(NetInfo);

    if (!info.status) {
      yield put(createCustomerFailure());
      return;
    }

    const {email, fullName, phone} = cratePayload;
    const firstName = fullName?.split(' ')[0];
    const lastName = fullName?.split(' ').splice(1).join(' ');
    const phoneArea = String(phone).slice(0, 2);
    const phoneNumber = String(phone).slice(2);

    const response: AxiosResponse<CheckoutCustomerResponse> = yield call(
      api.post,
      '/payments/customer',
      {
        email,
        ...(fullName ? {first_name: firstName, last_name: lastName} : {}),
        ...(phone ? {phone: {area_code: phoneArea, number: phoneNumber}} : {}),
        description: 'Mochilee App Payment User',
      },
    );
    yield put(createCustomerSuccess(response.data));
  } catch (error) {
    yield put(createCustomerFailure());
  }
}

export function* addCustomerCard({
  payload,
}: ReturnType<typeof addCustomerCardRequest>) {
  try {
    const info = yield call(NetInfo);

    if (!info.status) {
      yield put(createCustomerFailure());
      return;
    }

    const {cardToken, customerId} = payload;

    const response: AxiosResponse<CheckoutCustomerCardResponse> = yield call(
      api.post,
      `/payments/customer/${customerId}/card`,
      {token: cardToken},
    );
    yield put(addCustomerCardSuccess(response.data));
  } catch (error) {
    Toast.show({
      text1: 'Erro ao adicionar cartão, tente novamente.',
      position: 'bottom',
      type: 'error',
    });
    yield put(createCustomerFailure());
  }
}

export function* removeCustomerCard({
  payload,
}: ReturnType<typeof removeCustomerCardRequest>) {
  try {
    const info = yield call(NetInfo);

    if (!info.status) {
      yield put(removeCustomerCardFailure());
      return;
    }

    const {cardId, customerId} = payload;
    const response: AxiosResponse<CheckoutCustomerCardResponse> = yield call(
      api.delete,
      `/payments/customer/${customerId}/card/${cardId}`,
    );
    yield put(removeCustomerCardSuccess(response.data.id));
  } catch (error) {
    Toast.show({
      text1: 'Erro ao remover cartão, tente novamente.',
      position: 'bottom',
      type: 'error',
    });
    yield put(removeCustomerCardFailure());
  }
}

export function* process({payload}: ReturnType<typeof processPaymentRequest>) {
  try {
    const info = yield call(NetInfo);

    if (!info.status) {
      yield put(processPaymentFailure());
      return;
    }

    const {payment} = payload;
    const response: AxiosResponse<ProcessPaymentReponse> = yield call(
      api.post,
      '/payments-process',
      {...payment},
    );
    yield put(processPaymentSuccess(response.data));
    // RootNavigation.replace('');
  } catch (error) {
    Toast.show({
      text1: 'Erro fazer pagamento, tente novamente.',
      position: 'bottom',
      type: 'error',
    });
    yield put(processPaymentFailure());
  }
}

export function* processJoinItinerary({
  payload,
}: ReturnType<typeof processJoinItineraryPaymentRequest>) {
  try {
    const info = yield call(NetInfo);

    if (!info.status) {
      yield put(processJoinItineraryFailure());
      return;
    }

    const {itineraryId, payment} = payload;
    const currentDate = new Date();
    // eslint-disable-next-line prettier/prettier
    const response: AxiosResponse<JoinItineraryWithPaymentResponse> = yield call(
      api.post,
      `/itineraries/${itineraryId}/join-with-payment`,
        {
        currentDate,
        payment,
      });
    yield put(processJoinItinerarySuccess(response.data));
  } catch (error) {
    Toast.show({
      text1: translateError(error.response.data.message),
      position: 'bottom',
      type: 'error',
    });
    yield put(processJoinItineraryFailure());
  }
}

export default all([
  takeLatest(CheckoutActions.GET_CUSTOMER_REQUEST, getCustomer),
  takeLatest(CheckoutActions.CREATE_CUSTOMER_REQUEST, createCustomer),
  takeLatest(CheckoutActions.ADD_CUSTOMER_CARD_REQUEST, addCustomerCard),
  takeLatest(CheckoutActions.PROCESS_PAYMENT_REQUEST, process),
  takeLatest(
    CheckoutActions.PROCESS_JOIN_ITINERARY_REQUEST,
    processJoinItinerary,
  ),
  takeLatest(CheckoutActions.REMOVE_CUSTOMER_CARD_REQUEST, removeCustomerCard),
]);
