import {createSlice, PayloadAction, Dispatch} from '@reduxjs/toolkit';
import api from '../providers/api';
import Toast from 'react-native-toast-message';
import {MessageProps} from '../utils/types';
import {authActions} from './auth';

export interface InitialStateProps {
  messages: MessageProps[];
  conversation: MessageProps[];
  unreadCounter: number;
  loading: boolean;
  chatKey: string | null;
}

type ConversationResponse = {
  messages: MessageProps[];
  ownerId: number;
};

type NewMessagePayload = {
  userId: number;
  message: string;
};

const initialState: InitialStateProps = {
  messages: [],
  conversation: [],
  unreadCounter: 0,
  loading: false,
  chatKey: null,
};

export const messageSlice = createSlice({
  name: 'messages',
  initialState,
  reducers: {
    setMessages: (state, action: PayloadAction<MessageProps[]>) => {
      const grouped: MessageProps[] = action.payload.reduce(
        (accumulator: MessageProps[], current: MessageProps) => {
          const foundIndex = accumulator.findIndex(
            (find) => find.sender.id === current.sender.id,
          );

          if (foundIndex === -1) {
            accumulator.push({...current, unreaded: current.readed ? 0 : 1});
          } else {
            const {unreaded} = accumulator[foundIndex];

            accumulator[foundIndex] = {
              ...current,
              unreaded: unreaded + (current.readed ? 0 : 1),
            };
          }

          return accumulator;
        },
        [],
      );

      let counter = 0;

      grouped.forEach((item) => (counter += item.unreaded ? 1 : 0));

      state.messages = grouped;
      state.unreadCounter = counter;
    },
    setConversation: (state, action: PayloadAction<ConversationResponse>) => {
      state.conversation = [...action.payload.messages];

      const messageIndex = state.messages.findIndex(
        (item) => item.sender.id === action.payload.ownerId,
      );

      if (messageIndex > -1) {
        const messageList = state.messages;

        messageList[messageIndex].unreaded = 0;
        state.messages = [...messageList];

        let counter = 0;

        state.messages.forEach((item) => (counter += item.unreaded ? 1 : 0));
        state.unreadCounter = counter;
      }
    },
    setNewMessage: (state, action: PayloadAction<MessageProps>) => {
      state.conversation = [action.payload, ...state.conversation];
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
      state.messages = initialState.messages;
      state.conversation = initialState.conversation;
      state.unreadCounter = initialState.unreadCounter;
      state.loading = initialState.loading;
      state.chatKey = initialState.chatKey;
    });
  },
});

export const messagesActions = messageSlice.actions;
const {initLoading, endLoading} = messagesActions;

export const getMessages = () => async (dispatch: Dispatch) => {
  try {
    dispatch(initLoading());
    const response = await api.get<MessageProps[]>('/messages');

    dispatch(messagesActions.setMessages(response.data));
    dispatch(endLoading());
  } catch (error) {
    dispatch(endLoading());
    Toast.show({
      text1: 'Erro ao buscar novas mensagens.',
      position: 'bottom',
      type: 'error',
    });
  }
};

export const getConversation =
  (userId: number) => async (dispatch: Dispatch) => {
    try {
      dispatch(initLoading());
      const response = await api.get<MessageProps[]>(
        `/messages/user/${userId}`,
      );

      dispatch(
        messagesActions.setConversation({
          messages: response.data,
          ownerId: userId,
        }),
      );
      dispatch(endLoading());
    } catch (error) {
      dispatch(endLoading());
      Toast.show({
        text1: 'Erro ao carregar conversa.',
        position: 'bottom',
        type: 'error',
      });
    }
  };

export const sendMessage =
  (payload: NewMessagePayload) => async (dispatch: Dispatch) => {
    const {message, userId} = payload;
    try {
      dispatch(initLoading());
      const response = await api.post<MessageProps>(`/messages/${userId}`, {
        message,
      });

      dispatch(messagesActions.setNewMessage(response.data));
      dispatch(endLoading());
    } catch (error) {
      dispatch(endLoading());
      Toast.show({
        text1: 'Erro ao enviar mensagem.',
        position: 'bottom',
        type: 'error',
      });
    }
  };

export default messageSlice.reducer;
