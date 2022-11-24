import {createSlice, PayloadAction, Dispatch} from '@reduxjs/toolkit';
import {ActivityProps} from '../store/modules/options/reducer';
import api from '../providers/api';
import Toast from 'react-native-toast-message';

export interface TransportProps {
  id: number;
  name: string;
  value: string;
}

export interface LodgingProps {
  id: number;
  name: string;
  value: string;
}

export interface InitialStateProps {
  activities: ActivityProps[];
  transports: TransportProps[];
  lodgings: LodgingProps[];
  loading: boolean;
}

const initialState: InitialStateProps = {
  activities: [],
  transports: [],
  lodgings: [],
  loading: false,
};

export const optionsSlice = createSlice({
  name: 'options',
  initialState,
  reducers: {
    setActivities: (state, action: PayloadAction<ActivityProps[]>) => {
      state.activities = action.payload;
    },
    setLodgings: (state, action: PayloadAction<LodgingProps[]>) => {
      state.lodgings = action.payload;
    },
    setTransports: (state, action: PayloadAction<TransportProps[]>) => {
      state.transports = action.payload;
    },
    initLoading: (state) => {
      state.loading = true;
    },
    endLoading: (state) => {
      state.loading = false;
    },
  },
});

export const optionsActions = optionsSlice.actions;
const {initLoading, endLoading} = optionsActions;

export const getActivities = () => async (dispatch: Dispatch) => {
  try {
    dispatch(initLoading());
    const response = await api.get<ActivityProps[]>('/activities');

    dispatch(optionsActions.setActivities(response.data));
    dispatch(endLoading());
  } catch (error) {
    dispatch(endLoading());
    Toast.show({
      text1: 'Erro ao carregar atividades.',
      position: 'bottom',
      type: 'error',
    });
  }
};

export const getLodgings = () => async (dispatch: Dispatch) => {
  try {
    dispatch(initLoading());
    const response = await api.get<LodgingProps[]>('/lodgings');

    dispatch(optionsActions.setLodgings(response.data));
    dispatch(endLoading());
  } catch (error) {
    dispatch(endLoading());
    Toast.show({
      text1: 'Erro ao carregar hospedagens.',
      position: 'bottom',
      type: 'error',
    });
  }
};

export const getTransports = () => async (dispatch: Dispatch) => {
  try {
    dispatch(initLoading());
    const response = await api.get<TransportProps[]>('/transports');

    dispatch(optionsActions.setTransports(response.data));
    dispatch(endLoading());
  } catch (error) {
    dispatch(endLoading());
    Toast.show({
      text1: 'Erro ao carregar transportes.',
      position: 'bottom',
      type: 'error',
    });
  }
};

export default optionsSlice.reducer;
