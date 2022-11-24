/* eslint-disable @typescript-eslint/no-unused-vars */
import {createSlice, PayloadAction, Dispatch} from '@reduxjs/toolkit';
import Toast from 'react-native-toast-message';

import api from '../providers/api';
import {formatChatName} from '../lib/utils';
import {ChatMessage} from '../utils/types';
import {authActions} from './auth';
interface InitialStateProps {
  chats: ChatMessage[];
  currentChat: ChatMessage[];
  loading: boolean;
  unreadCounter: number;
  currentChatKey: string | null;
  isEstablishingConnection: boolean;
  isConnected: boolean;
}

type BeginChatPayload = {
  targetId: number;
  locationId: number;
  locationCityState: string;
  locationName: string;
};

const initialState: InitialStateProps = {
  chats: [],
  currentChat: [],
  currentChatKey: null,
  loading: false,
  unreadCounter: 0,
  isEstablishingConnection: false,
  isConnected: false,
};

export const chatSlice = createSlice({
  name: 'chats',
  initialState,
  reducers: {
    startConnecting: (
      state,
      action: PayloadAction<{ownerId: number; targetId: number}>,
    ) => {
      const {ownerId, targetId} = action.payload;
      state.currentChatKey = formatChatName(targetId, ownerId);
      state.isEstablishingConnection = true;
    },
    connectionEstablished: (state) => {
      state.isConnected = true;
      state.isEstablishingConnection = true;
    },
    sendChatMessage: (
      state,
      action: PayloadAction<{
        receiver: {id: number};
        message: string;
      }>,
    ) => {
      return;
    },
    endConnection: (
      state,
      action: PayloadAction<{ownerId: number; targetId: number}>,
    ) => {
      state.currentChatKey = initialState.currentChatKey;
      state.isConnected = false;
      state.isEstablishingConnection = false;
      return;
    },
    setChats: (state, action: PayloadAction<ChatMessage[]>) => {
      let unreadCounter = 0;
      const groupedChats = action.payload.reduce(
        (acc: Record<string, ChatMessage>, curr) => {
          const chatHash = `${curr.receiver.id}-${curr.sender.id}`;

          if (!acc[chatHash]) {
            acc[chatHash] = {
              ...curr,
              unreadedCount: curr.readed ? 0 : 1,
            };
          } else {
            acc[chatHash].unreadedCount =
              acc[chatHash].unreadedCount + (curr.readed ? 0 : 1);
          }

          return acc;
        },
        {},
      );

      const chatList = Object.values(groupedChats).map((chatItem) => chatItem);

      chatList.forEach(
        (item) => (unreadCounter += item.unreadedCount > 0 ? 1 : 0),
      );

      state.loading = false;
      state.chats = chatList;
      state.unreadCounter = unreadCounter;
    },
    setCurrentChat: (state, action: PayloadAction<ChatMessage[]>) => {
      state.currentChat = action.payload;
    },
    setChatMessage: (state, action: PayloadAction<ChatMessage>) => {
      state.currentChat = [action.payload, ...state.currentChat];
    },
    setChatMessageSended: (state, action: PayloadAction<ChatMessage>) => {
      const messageDuplicated = state.currentChat.find(
        (item) => item.id === action.payload.id,
      );

      if (!messageDuplicated) {
        state.currentChat = [action.payload, ...state.currentChat];
      }
    },
    setChatNotificationMessage: (state, action: PayloadAction<ChatMessage>) => {
      let grouped = state.chats;
      const newChatMessage = action.payload;

      const foundedChatMessage = grouped.findIndex(
        (item) =>
          item.sender.id === newChatMessage.sender.id &&
          item.receiver.id === newChatMessage.receiver.id,
      );

      if (foundedChatMessage === -1) {
        grouped.push({...newChatMessage, unreadedCount: 1});
      } else {
        grouped[foundedChatMessage] = {
          ...newChatMessage,
          unreadedCount: grouped[foundedChatMessage].unreadedCount + 1,
        };
      }

      let counter = 0;

      grouped.forEach((item) => (counter += item.unreadedCount));

      state.chats = grouped;
      state.unreadCounter = counter;
    },
    setChatSubscribe: (
      state,
      action: PayloadAction<{targetId: number; ownerId: number}>,
    ) => {
      const {targetId, ownerId} = action.payload;
      state.currentChatKey = formatChatName(targetId, ownerId);
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
      state.chats = initialState.chats;
      state.currentChat = initialState.currentChat;
      state.currentChatKey = initialState.currentChatKey;
      state.loading = initialState.loading;
      state.unreadCounter = initialState.unreadCounter;
      state.isEstablishingConnection = initialState.isEstablishingConnection;
      state.isConnected = initialState.isConnected;
    });
  },
});

export const chatActions = chatSlice.actions;

export const getChats = () => async (dispatch: Dispatch) => {
  try {
    dispatch(chatActions.initLoading());
    const response = await api.get<ChatMessage[]>('/chats');

    dispatch(chatActions.setChats(response.data));
    dispatch(chatActions.endLoading());
  } catch (error) {
    dispatch(chatActions.endLoading());
    Toast.show({
      text1: 'Erro ao buscar chats.',
      position: 'bottom',
      type: 'error',
    });
  }
};

export const getCurrentChat =
  (payload: {targetId: number}) => async (dispatch: Dispatch) => {
    try {
      dispatch(chatActions.initLoading());
      const response = await api.get<ChatMessage[]>(
        `/chats/user/${payload.targetId}`,
      );

      dispatch(chatActions.setCurrentChat(response.data));
      dispatch(chatActions.endLoading());
    } catch (error) {
      dispatch(chatActions.endLoading());
      Toast.show({
        text1: 'Erro ao carregar mensagens do chat.',
        position: 'bottom',
        type: 'error',
      });
    }
  };

export const beginChat =
  (payload: BeginChatPayload) => async (dispatch: Dispatch) => {
    const {locationCityState, locationId, locationName, targetId} = payload;
    try {
      dispatch(chatActions.initLoading());

      const response = await api.post<ChatMessage>(`/chats/${targetId}/begin`, {
        locationCityState,
        locationName,
        locationId,
      });

      dispatch(chatActions.setChatMessageSended(response.data));
      dispatch(chatActions.endLoading());
    } catch (error) {
      dispatch(chatActions.endLoading());
      Toast.show({
        text1: 'Erro ao iniciar chat.',
        text2: 'tente novamente',
        position: 'bottom',
        type: 'error',
      });
    }
  };

export const finishChat =
  (payload: BeginChatPayload) => async (dispatch: Dispatch) => {
    const {locationCityState, locationId, locationName, targetId} = payload;
    try {
      dispatch(chatActions.initLoading());

      const response = await api.post<ChatMessage>(`/chats/${targetId}/end`, {
        locationCityState,
        locationName,
        locationId,
      });

      dispatch(chatActions.setChatMessageSended(response.data));
      dispatch(chatActions.endLoading());
    } catch (error) {
      dispatch(chatActions.endLoading());
      Toast.show({
        text1: 'Erro ao iniciar chat.',
        text2: 'tente novamente',
        position: 'bottom',
        type: 'error',
      });
    }
  };

export default chatSlice.reducer;
