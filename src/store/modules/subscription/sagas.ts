import {all, takeLatest, call, put} from 'redux-saga/effects';
import Toast from 'react-native-toast-message';

import {
  SubscriptionActions,
  getSubscriptionSuccess,
  getSubscriptionFailure,
  createSubscriptionRequest,
  createSubscriptionSuccess,
  createSubscriptionFailure,
  cancelSubscriptionRequest,
  cancelSubscriptionSuccess,
  cancelSubscriptionFailure,
} from './actions';
import {AxiosResponse} from 'axios';
import {Subscription} from '../../../utils/types';
import api from '../../../services/api';

export function* getSubscription() {
  try {
    const response: AxiosResponse<Subscription> = yield call(
      api.get,
      '/subscriptions',
    );

    yield put(getSubscriptionSuccess(response.data));
  } catch (error) {
    yield put(getSubscriptionFailure());
    Toast.show({
      text1: 'Erro ao buscar dados da assinatura, tente mais tarde.',
      position: 'bottom',
      type: 'error',
    });
  }
}

export function* createSubscription({
  payload,
}: ReturnType<typeof createSubscriptionRequest>) {
  try {
    const response: AxiosResponse<Subscription> = yield call(
      api.post,
      '/subscriptions',
      {
        ...payload,
      },
    );

    yield put(createSubscriptionSuccess(response.data));
  } catch (error) {
    yield put(createSubscriptionFailure());
    Toast.show({
      text1: 'Erro ao criar assinatura.',
      position: 'bottom',
      type: 'error',
    });
  }
}

export function* cancelSubscription({
  payload,
}: ReturnType<typeof cancelSubscriptionRequest>) {
  try {
    const {subscriptionId} = payload;
    yield call(api.delete, `/subscriptions/${subscriptionId}`);

    yield put(cancelSubscriptionSuccess());
  } catch (error) {
    yield put(cancelSubscriptionFailure());
    Toast.show({
      text1: 'Erro ao cancelar assinatura.',
      position: 'bottom',
      type: 'error',
    });
  }
}

export default all([
  takeLatest(SubscriptionActions.GET_SUBSCRIPTION_REQUEST, getSubscription),
  takeLatest(
    SubscriptionActions.CREATE_SUBSCRIPTION_REQUEST,
    createSubscription,
  ),
  takeLatest(
    SubscriptionActions.CANCEL_SUBSCRIPTION_REQUEST,
    cancelSubscription,
  ),
]);
