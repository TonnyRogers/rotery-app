import {createSlice, PayloadAction, Dispatch} from '@reduxjs/toolkit';
import api from '../providers/api';
import Toast from 'react-native-toast-message';
import {Location, PaginatedResponse} from '../utils/types';
import {LocationType} from '../utils/enums';

export interface InitialStateProps {
  loading: boolean;
  locations: Location[];
}

const initialState: InitialStateProps = {
  locations: [],
  loading: false,
};

type FeedPaginatedResponse = {
  locations: Location[];
  page: number;
};

interface FilterProps {
  region?: string;
  type?: LocationType;
  activity?: number;
  city?: string;
  state?: string;
  page: number;
  limit: number;
}

export const locationsSlice = createSlice({
  name: 'locations',
  initialState,
  reducers: {
    setLocationFeed: (state, action: PayloadAction<FeedPaginatedResponse>) => {
      if (action.payload.page === 1) {
        state.locations = action.payload.locations;
      } else {
        state.locations = [...state.locations, ...action.payload.locations];
      }
    },
    initLoading: (state) => {
      state.loading = true;
    },
    endLoading: (state) => {
      state.loading = false;
    },
  },
});

export const locationsActions = locationsSlice.actions;
const {initLoading, endLoading} = locationsActions;

export const getLocationFeed =
  (filter: FilterProps) => async (dispatch: Dispatch) => {
    try {
      dispatch(initLoading());
      const response = await api.get<PaginatedResponse<Location>>(
        '/locations/feed',
        {
          params: filter,
        },
      );

      dispatch(
        locationsActions.setLocationFeed({
          locations: response.data.items || null,
          page: filter.page,
        }),
      );
      dispatch(endLoading());
    } catch (error) {
      dispatch(endLoading());
      Toast.show({
        text1: 'Erro ao buscar feed.',
        position: 'bottom',
        type: 'error',
      });
    }
  };

export default locationsSlice.reducer;
