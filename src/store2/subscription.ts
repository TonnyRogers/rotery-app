import {createSlice, PayloadAction, Dispatch} from '@reduxjs/toolkit';
import api from '../providers/api';
import Toast from 'react-native-toast-message';
import {Subscription} from '../utils/types';
import {authActions} from './auth';

export interface InitialStateProps {
  data: Subscription | null;
  loading: boolean;
}

type CreateSubscriptionPayload = {
  preapproval_plan_id: string;
  card_token_id: string;
  payer_email: string;
  planId?: number;
};

const initialState: InitialStateProps = {
  data: null,
  loading: false,
};

export const subscriptionSlice = createSlice({
  name: 'subscription',
  initialState,
  reducers: {
    setSubscription: (state, action: PayloadAction<Subscription | null>) => {
      state.data = action.payload;
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
      state.data = initialState.data;
    });
  },
});

export const subscriptionsActions = subscriptionSlice.actions;
export const {initLoading, endLoading} = subscriptionsActions;

export const getSubscription = () => async (dispatch: Dispatch) => {
  try {
    dispatch(initLoading());
    const response = await api.get<Subscription>('/subscriptions');

    dispatch(subscriptionsActions.setSubscription(response.data));
    dispatch(endLoading());
  } catch (error) {
    dispatch(endLoading());
    Toast.show({
      text1: 'Erro ao buscar dados da assinatura, tente mais tarde.',
      position: 'bottom',
      type: 'error',
    });
  }
};

export const createSubscription =
  (payload: CreateSubscriptionPayload) => async (dispatch: Dispatch) => {
    try {
      dispatch(initLoading());
      const response = await api.post<Subscription>('/subscriptions', payload);

      dispatch(subscriptionsActions.setSubscription(response.data));
      dispatch(endLoading());
    } catch (error) {
      dispatch(endLoading());
      Toast.show({
        text1: 'Erro ao criar assinatura.',
        position: 'bottom',
        type: 'error',
      });
    }
  };

export const cancelSubscription =
  (id: number) => async (dispatch: Dispatch) => {
    try {
      dispatch(initLoading());
      await api.delete<Subscription>(`/subscriptions/${id}`);

      dispatch(subscriptionsActions.setSubscription(null));
      dispatch(endLoading());
    } catch (error) {
      dispatch(endLoading());
      Toast.show({
        text1: 'Erro ao cancelar assinatura.',
        position: 'bottom',
        type: 'error',
      });
    }
  };

export const changeSubscriptionCard =
  (payload: {subscriptionId: number; card_token_id: string}) =>
  async (dispatch: Dispatch) => {
    const {subscriptionId, card_token_id} = payload;
    try {
      dispatch(initLoading());
      await api.put<Subscription>(
        `/subscriptions/${subscriptionId}/change-card`,
        {
          card_token_id,
        },
      );

      dispatch(endLoading());
      dispatch(getSubscription() as any);
      Toast.show({
        text1: 'Cartão alterado!',
        position: 'bottom',
        type: 'success',
      });
    } catch (error) {
      dispatch(endLoading());
      Toast.show({
        text1: 'Erro ao alterar cartão.',
        position: 'bottom',
        type: 'error',
      });
    }
  };

export default subscriptionSlice.reducer;
