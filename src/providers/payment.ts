import {PAYMENT_DEV_KEY, PAYMENT_PROD_KEY} from '@env';

export const paymentToken = __DEV__ ? PAYMENT_DEV_KEY : PAYMENT_PROD_KEY;
