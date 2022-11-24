import {ContentList} from '../utils/types';
import {createSlice, PayloadAction, Dispatch} from '@reduxjs/toolkit';
import api from '../providers/api';
import {ContentType} from '../utils/enums';

interface InitialStateProps {
  loginBanners: ContentList[];
  welcomeSeasonBanner: ContentList | null;
}

const initialState: InitialStateProps = {
  loginBanners: [],
  welcomeSeasonBanner: null,
};

const contentsSlice = createSlice({
  name: 'contents',
  initialState,
  reducers: {
    setLoginContents: (state, action: PayloadAction<ContentList[]>) => {
      state.loginBanners = action.payload;
    },
    setWelcomeSeasonBanner: (state, action: PayloadAction<ContentList>) => {
      state.welcomeSeasonBanner = action.payload;
    },
  },
});

export const contentsActions = contentsSlice.actions;

export const getLoginBannerList = () => async (dispatch: Dispatch) => {
  const response = await api.get<ContentList[]>('/contents/all', {
    params: {
      type: ContentType.LOGIN_LIST,
    },
  });

  dispatch(contentsActions.setLoginContents(response.data));
};

export const getSeasonBanner = () => async (dispatch: Dispatch) => {
  const response = await api.get<ContentList>('/contents', {
    params: {
      type: ContentType.WELCOME_SEASON_BANNER,
    },
  });

  dispatch(contentsActions.setWelcomeSeasonBanner(response.data));
};

export default contentsSlice.reducer;
