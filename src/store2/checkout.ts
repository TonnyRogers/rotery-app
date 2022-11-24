import {createSlice, PayloadAction, Dispatch} from '@reduxjs/toolkit';
import Toast from 'react-native-toast-message';
import api from '../providers/api';
import {
  PaymentSatatusDetailType,
  CheckoutCustomerResponse,
  CheckoutCustomerCardResponse,
  ProcessPaymentReponse,
  ProcessPaymentPayload,
  Tip,
} from '../utils/types';
import {ProcessTip} from '../store/modules/checkout/actions';
import {authActions} from './auth';

type CreateCustomerPayload = {
  email: string;
  fullName?: string;
  phone?: number;
};

export interface InitialStateProps {
  checkoutStatus: PaymentSatatusDetailType | null;
  loading: boolean;
  customer: CheckoutCustomerResponse | null;
  defaultCard: CheckoutCustomerCardResponse | null;
}

const initialState: InitialStateProps = {
  loading: false,
  customer: null,
  checkoutStatus: null,
  defaultCard: null,
};

export const checkoutSlice = createSlice({
  name: 'checkout',
  initialState,
  reducers: {
    setCustomer: (
      state,
      action: PayloadAction<CheckoutCustomerResponse | null>,
    ) => {
      state.customer = action.payload;
    },
    setNewCustomerCard: (
      state,
      action: PayloadAction<CheckoutCustomerCardResponse>,
    ) => {
      if (state.customer) {
        const customer = state.customer;

        const cardIndex = customer.cards.findIndex(
          (item) => item.id === action.payload.id,
        );

        if (cardIndex !== -1) {
          customer.cards[cardIndex] = {...action.payload};
        } else {
          customer.cards.push(action.payload);
        }

        state.customer = customer;
      }
    },
    removeCustomerCard: (state, action: PayloadAction<{cardId: string}>) => {
      if (state.customer) {
        const customer = state.customer;

        const cardIndex = customer.cards.findIndex(
          (item) => item.id === action.payload.cardId,
        );
        if (cardIndex !== -1) {
          customer.cards.splice(cardIndex, 1);
          state.customer = customer;
        }
      }
    },
    processPayment: (state, action: PayloadAction<ProcessPaymentReponse>) => {
      const processed = action.payload;

      if (processed.status === 'approved') {
        state.checkoutStatus = processed.status;
      }
      if (processed.status === 'in_process') {
        state.checkoutStatus = processed.status;
      }
      if (processed.status === 'rejected') {
        state.checkoutStatus = processed.status;
      }
    },
    setDefaultCard: (
      state,
      action: PayloadAction<CheckoutCustomerCardResponse>,
    ) => {
      state.defaultCard = action.payload;
    },
    resetCheckoutStatus: (state) => {
      state.checkoutStatus = null;
    },
    initLoading: (state) => {
      state.loading = true;
    },
    endLoading: (state) => {
      state.loading = false;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(authActions.handleLogout, (state) => {
      state.loading = initialState.loading;
      state.customer = initialState.customer;
      state.checkoutStatus = initialState.checkoutStatus;
      state.defaultCard = initialState.defaultCard;
    });
  },
});

export const checkoutActions = checkoutSlice.actions;
const {initLoading, endLoading} = checkoutActions;

export const getCustomer = (id: string) => async (dispatch: Dispatch) => {
  try {
    dispatch(initLoading());
    const response = await api.get<CheckoutCustomerResponse>(
      `/payments/customer/${id}`,
    );

    dispatch(checkoutActions.setCustomer(response.data));
    dispatch(endLoading());
  } catch (error) {
    dispatch(endLoading());
  }
};

export const createCustomer =
  (payload: CreateCustomerPayload) => async (dispatch: Dispatch) => {
    const {email, fullName, phone} = payload;
    const firstName = fullName?.split(' ')[0];
    const lastName = fullName?.split(' ').splice(1).join(' ');
    const phoneArea = String(phone).slice(0, 2);
    const phoneNumber = String(phone).slice(2);

    try {
      dispatch(initLoading());
      const response = await api.post<CheckoutCustomerResponse>(
        '/payments/customer',
        {
          email,
          ...(fullName ? {first_name: firstName, last_name: lastName} : {}),
          ...(phone
            ? {phone: {area_code: phoneArea, number: phoneNumber}}
            : {}),
          description: 'Mochilee App Payment User',
        },
      );

      dispatch(checkoutActions.setCustomer(response.data));
      dispatch(endLoading());
    } catch (error) {
      dispatch(endLoading());
    }
  };

export const addCustomerCard =
  (payload: {cardToken: string; customerId: string}) =>
  async (dispatch: Dispatch) => {
    const {cardToken, customerId} = payload;
    try {
      dispatch(initLoading());
      const response = await api.post<CheckoutCustomerCardResponse>(
        `/payments/customer/${customerId}/card`,
        {token: cardToken},
      );

      dispatch(checkoutActions.setNewCustomerCard(response.data));
      dispatch(endLoading());
    } catch (error) {
      dispatch(endLoading());
      Toast.show({
        text1: 'Erro ao adicionar cartão, tente novamente.',
        position: 'bottom',
        type: 'error',
      });
    }
  };

export const deleteCustomerCard =
  (payload: {cardId: string; customerId: string}) =>
  async (dispatch: Dispatch) => {
    const {cardId, customerId} = payload;
    try {
      dispatch(initLoading());
      const response = await api.delete<CheckoutCustomerCardResponse>(
        `/payments/customer/${customerId}/card/${cardId}`,
      );

      dispatch(checkoutActions.removeCustomerCard({cardId: response.data.id}));
      dispatch(endLoading());
    } catch (error) {
      dispatch(endLoading());
      Toast.show({
        text1: 'Erro ao remover cartão, tente novamente.',
        position: 'bottom',
        type: 'error',
      });
    }
  };

export const process =
  (payload: ProcessPaymentPayload) => async (dispatch: Dispatch) => {
    try {
      dispatch(initLoading());
      const response = await api.post<ProcessPaymentReponse>(
        '/payments-process',
        payload,
      );

      dispatch(checkoutActions.processPayment(response.data));
      dispatch(endLoading());
    } catch (error) {
      dispatch(endLoading());
      Toast.show({
        text1: 'Erro fazer pagamento, tente novamente.',
        position: 'bottom',
        type: 'error',
      });
    }
  };

export const processTip =
  (payload: ProcessTip) => async (dispatch: Dispatch) => {
    try {
      dispatch(initLoading());
      await api.post<Tip>('/tips', payload);
      dispatch(endLoading());
      Toast.show({
        text1: 'Contribuição enviada ✅.',
        text2: 'Obrigado',
        position: 'bottom',
        type: 'success',
      });
    } catch (error) {
      dispatch(endLoading());
      Toast.show({
        text1: 'Erro ao processar pagamento, tente novamente.',
        position: 'bottom',
        type: 'error',
      });
    }
  };

export default checkoutSlice.reducer;
