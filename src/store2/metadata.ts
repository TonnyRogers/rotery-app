import {createSlice, PayloadAction, Dispatch} from '@reduxjs/toolkit';
import api from '../providers/api';
import Toast from 'react-native-toast-message';
import {FirstStepResponseData} from '../utils/types';

export interface InitialStateProps {
  firstStep: FirstStepResponseData | null;
  loading: boolean;
}

const initialState: InitialStateProps = {
  firstStep: null,
  loading: false,
};

export const metadataSlice = createSlice({
  name: 'metadata',
  initialState,
  reducers: {
    setFirstStep: (state, action: PayloadAction<FirstStepResponseData>) => {
      state.firstStep = action.payload;
    },
    endLoading: (state) => {
      state.loading = false;
    },
    initLoading: (state) => {
      state.loading = true;
    },
  },
});

export const metadataActions = metadataSlice.actions;
const {initLoading, endLoading} = metadataActions;

export const getFirstSteps = () => async (dispatch: Dispatch) => {
  try {
    dispatch(initLoading());
    const response = await api.get<FirstStepResponseData>(
      'metadata/first-steps',
    );

    dispatch(metadataActions.setFirstStep(response.data));
    dispatch(endLoading());
  } catch (error) {
    dispatch(endLoading());
    Toast.show({
      text1: 'Erro ao buscar dados.',
      position: 'bottom',
      type: 'error',
    });
  }
};

export default metadataSlice.reducer;
