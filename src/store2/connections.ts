import {createSlice, PayloadAction, Dispatch} from '@reduxjs/toolkit';
import api from '../providers/api';
import Toast from 'react-native-toast-message';
import {ConnectionsProps, InvitesProps} from '../utils/types';
import {authActions} from './auth';

export interface InitialStateProps {
  connections: ConnectionsProps[];
  invites: InvitesProps[];
  loading: boolean;
}

type ListConnectionResponse = {
  invites: InvitesProps[];
  connections: ConnectionsProps[];
};

const initialState: InitialStateProps = {
  connections: [],
  invites: [],
  loading: false,
};

export const connectionsSlice = createSlice({
  name: 'connections',
  initialState,
  reducers: {
    setConnections: (state, action: PayloadAction<ListConnectionResponse>) => {
      state.connections = action.payload.connections;
      state.invites = action.payload.invites;
    },
    setNewConnection: (state, action: PayloadAction<ConnectionsProps>) => {
      const connection = action.payload;
      state.connections = [...state.connections, connection];
      state.loading = false;
    },
    removeConnection: (state, action: PayloadAction<{userId: number}>) => {
      const {userId} = action.payload;
      const connectionsList = state.connections;
      const invitesList = state.invites;

      const connectionIndex = connectionsList.findIndex(
        (item) => item.target.id === userId,
      );
      const inviteIndex = invitesList.findIndex(
        (item) => item.owner.id === userId,
      );

      if (connectionIndex !== -1) {
        connectionsList.splice(connectionIndex, 1);
        state.connections = connectionsList;
      }

      if (inviteIndex !== -1) {
        invitesList.splice(inviteIndex, 1);
        state.invites = invitesList;
      }
    },
    blockConnection: (state, action: PayloadAction<{userId: number}>) => {
      const connectionList = state.connections;
      const connectionIndex = connectionList.findIndex(
        (item) => item.target.id === action.payload.userId,
      );

      if (connectionIndex !== -1) {
        connectionList[connectionIndex].isBlocked = true;
        state.connections = connectionList;
      }
    },
    unblockConnection: (state, action: PayloadAction<{userId: number}>) => {
      const connectionList = state.connections;
      const connectionIndex = connectionList.findIndex(
        (item) => item.target.id === action.payload.userId,
      );

      if (connectionIndex !== -1) {
        connectionList[connectionIndex].isBlocked = false;
        state.connections = connectionList;
      }
    },
    setNotificationConnection: (state, action: PayloadAction<InvitesProps>) => {
      const inviteIndex = state.invites.findIndex(
        (item) => item.owner.id === action.payload.owner.id,
      );

      if (inviteIndex === -1) {
        state.invites = [...state.invites, action.payload];
      }
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
      state.connections = initialState.connections;
    });
  },
});

export const conectionsActions = connectionsSlice.actions;
const {initLoading, endLoading} = conectionsActions;

export const getConnections = () => async (dispatch: Dispatch) => {
  try {
    dispatch(initLoading());
    const response = await api.get<ListConnectionResponse>('/connections');

    dispatch(conectionsActions.setConnections(response.data));
    dispatch(endLoading());
  } catch (error) {
    dispatch(endLoading());
    Toast.show({
      text1: 'Erro ao carregar conexões.',
      position: 'bottom',
      type: 'error',
    });
  }
};

export const makeConnection = (id: number) => async (dispatch: Dispatch) => {
  try {
    dispatch(initLoading());
    const response = await api.post<ConnectionsProps>(`/connections/${id}`);

    dispatch(conectionsActions.setNewConnection(response.data));
    dispatch(endLoading());
    Toast.show({
      text1: 'Conexão solicitada.',
      position: 'bottom',
      type: 'success',
    });
  } catch (error) {
    dispatch(endLoading());
    Toast.show({
      text1: 'Erro ao solicitar conexão.',
      position: 'bottom',
      type: 'error',
    });
  }
};

export const acceptConnection = (id: number) => async (dispatch: Dispatch) => {
  try {
    dispatch(initLoading());
    const response = await api.post<ConnectionsProps>(`/connections/${id}`);

    dispatch(conectionsActions.setNewConnection(response.data));
    dispatch(endLoading());
    Toast.show({
      text1: 'Conexão aceita.',
      position: 'bottom',
      type: 'success',
    });
  } catch (error) {
    dispatch(endLoading());
    Toast.show({
      text1: 'Erro ao aceitar conexão.',
      position: 'bottom',
      type: 'error',
    });
  }
};

export const rejectConnection = (id: number) => async (dispatch: Dispatch) => {
  try {
    dispatch(initLoading());
    await api.delete(`/connections/${id}`);

    dispatch(conectionsActions.removeConnection({userId: id}));
    dispatch(endLoading());
  } catch (error) {
    dispatch(endLoading());
    Toast.show({
      text1: 'Erro ao cancelar conexão.',
      position: 'bottom',
      type: 'error',
    });
  }
};

export const blockUserConnection =
  (id: number) => async (dispatch: Dispatch) => {
    try {
      dispatch(initLoading());
      await api.put(`/connections/${id}`, {
        isBlocked: true,
      });

      dispatch(conectionsActions.blockConnection({userId: id}));
      dispatch(endLoading());
    } catch (error) {
      dispatch(endLoading());
      Toast.show({
        text1: 'Erro ao bloquear conexão.',
        position: 'bottom',
        type: 'error',
      });
    }
  };

export const unblockUserConnection =
  (id: number) => async (dispatch: Dispatch) => {
    try {
      dispatch(initLoading());
      await api.put(`/connections/${id}`, {
        isBlocked: false,
      });

      dispatch(conectionsActions.unblockConnection({userId: id}));
      dispatch(endLoading());
    } catch (error) {
      dispatch(endLoading());
      Toast.show({
        text1: 'Erro ao desbloquear conexão.',
        position: 'bottom',
        type: 'error',
      });
    }
  };

export default connectionsSlice.reducer;
