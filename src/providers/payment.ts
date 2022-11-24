import {
  PAYMENT_DEV_KEY,
  PAYMENT_PROD_KEY,
  PAYMENT_DEV_SUBSCRIPTION_KEY,
} from '@env';

export const paymentToken = {
  prod: PAYMENT_PROD_KEY,
  dev: PAYMENT_DEV_KEY,
  subscription: PAYMENT_DEV_SUBSCRIPTION_KEY,
};
