import {createSlice, PayloadAction, Dispatch} from '@reduxjs/toolkit';
import {GuideEnum, ContentGuideTourKeys, ContentType} from '../utils/enums';
import {ContentList} from '../utils/types';
import Toast from 'react-native-toast-message';
import api from '../providers/api';

type GuideKeyParams = {
  profileKey:
    | ContentGuideTourKeys.BACKPACKER_PROFILE
    | ContentGuideTourKeys.GUIDE_PROFILE;
  chatKey:
    | ContentGuideTourKeys.BACKPACKER_CHAT
    | ContentGuideTourKeys.GUIDE_CHAT;
  locationDetailingKey:
    | ContentGuideTourKeys.BACKPACKER_LOCATION_DETALING
    | ContentGuideTourKeys.GUIDE_LOCATION_DETALING;
  subscriptionKey:
    | ContentGuideTourKeys.BACKPACKER_SUBSCRIPTION
    | ContentGuideTourKeys.GUIDE_SUBSCRIPTION;
  welcomeKey:
    | ContentGuideTourKeys.BACKPACKER_WELCOME
    | ContentGuideTourKeys.GUIDE_WELCOME;
};

interface InitialStateProps {
  feedGuide: boolean;
  welcomeGuide: boolean;
  newItineraryGuide: boolean;
  myItineraryGuide: boolean;
  profileGuide: boolean;
  revenuesGuide: boolean;
  subscriptionGuide: boolean;
  subscriptionCheckoutGuide: boolean;
  exploreLocationsGuide: boolean;
  locationDetailsGuide: boolean;
  chatsGuide: boolean;
  data: {
    profileContent: ContentList[];
    revenuesContent: ContentList[];
    subscriptionContent: ContentList[];
    subscriptionCheckoutContent: ContentList[];
    welcomeContent: ContentList[];
    exploreLocationsContent: ContentList[];
    chatsContent: ContentList[];
    beginChatContent: ContentList[];
    locationDetailsContent: ContentList[];
  };
}

const initialState: InitialStateProps = {
  feedGuide: true,
  newItineraryGuide: true,
  myItineraryGuide: true,
  profileGuide: true,
  revenuesGuide: false,
  subscriptionGuide: true,
  subscriptionCheckoutGuide: true,
  welcomeGuide: true,
  exploreLocationsGuide: true,
  chatsGuide: true,
  locationDetailsGuide: true,
  data: {
    profileContent: [],
    revenuesContent: [],
    subscriptionContent: [],
    subscriptionCheckoutContent: [],
    welcomeContent: [],
    exploreLocationsContent: [],
    chatsContent: [],
    beginChatContent: [],
    locationDetailsContent: [],
  },
};

export const guidesSlice = createSlice({
  name: 'guides',
  initialState,
  reducers: {
    setGuideViewed: (state, action: PayloadAction<{key: GuideEnum}>) => {
      state[action.payload.key] = false;
    },
    setProfileGuides: (state, action: PayloadAction<ContentList[]>) => {
      const hasNewGuides =
        action.payload.length > state.data.profileContent.length;
      state.data.profileContent = action.payload;
      state.profileGuide = hasNewGuides;
    },
    setRevenuesGuides: (state, action: PayloadAction<ContentList[]>) => {
      const hasNewGuides =
        action.payload.length > state.data.revenuesContent.length;
      state.data.revenuesContent = action.payload;
      state.revenuesGuide = hasNewGuides;
    },
    setSubscriptionGuides: (state, action: PayloadAction<ContentList[]>) => {
      const hasNewGuides =
        action.payload.length > state.data.subscriptionContent.length;
      state.data.subscriptionContent = action.payload;
      state.subscriptionGuide = hasNewGuides;
    },
    setSubscriptionCheckoutGuides: (
      state,
      action: PayloadAction<ContentList[]>,
    ) => {
      const hasNewGuides =
        action.payload.length > state.data.subscriptionCheckoutContent.length;
      state.data.subscriptionCheckoutContent = action.payload;
      state.subscriptionCheckoutGuide = hasNewGuides;
    },
    setWelcomeGuides: (state, action: PayloadAction<ContentList[]>) => {
      const hasNewGuides =
        action.payload.length > state.data.welcomeContent.length;
      state.data.welcomeContent = action.payload;
      state.welcomeGuide = hasNewGuides;
    },
    setExploreLocationsGuides: (
      state,
      action: PayloadAction<ContentList[]>,
    ) => {
      const hasNewGuides =
        action.payload.length > state.data.exploreLocationsContent.length;
      state.data.exploreLocationsContent = action.payload;
      state.exploreLocationsGuide = hasNewGuides;
    },
    setChatsGuides: (state, action: PayloadAction<ContentList[]>) => {
      const hasNewGuides =
        action.payload.length > state.data.chatsContent.length;
      state.data.chatsContent = action.payload;
      state.chatsGuide = hasNewGuides;
    },
    setBeginChatGuides: (state, action: PayloadAction<ContentList[]>) => {
      state.data.beginChatContent = action.payload;
    },
    setLocationDetailsGuides: (state, action: PayloadAction<ContentList[]>) => {
      const hasNewGuides =
        action.payload.length > state.data.locationDetailsContent.length;
      state.data.locationDetailsContent = action.payload;
      state.locationDetailsGuide = hasNewGuides;
    },
  },
});

export const guidesActions = guidesSlice.actions;

export const viewedGuide =
  (payload: {key: GuideEnum}) => async (dispatch: Dispatch) => {
    dispatch(guidesActions.setGuideViewed(payload));
  };

export const getGuides =
  (keys: GuideKeyParams) => async (dispatch: Dispatch) => {
    try {
      const response = await api.get<ContentList[]>('/contents/all', {
        params: {
          type: ContentType.APP_GUIDED_TOUR,
        },
      });

      const profileGuides: ContentList[] = [];
      const chatGuides: ContentList[] = [];
      const beginChatGuides: ContentList[] = [];
      const locationGuides: ContentList[] = [];
      const subscriptionGuides: ContentList[] = [];
      const welcomeGuides: ContentList[] = [];
      const exploreGuides: ContentList[] = [];
      const revenuesGuides: ContentList[] = [];
      const subscriptionCheckoutGuides: ContentList[] = [];

      response.data.forEach((content) => {
        if (content.key && content.key === keys.profileKey) {
          profileGuides.push(content);
        }
        if (content.key && content.key === keys.chatKey) {
          chatGuides.push(content);
        }
        if (content.key && content.key === keys.locationDetailingKey) {
          locationGuides.push(content);
        }
        if (content.key && content.key === keys.subscriptionKey) {
          subscriptionGuides.push(content);
        }
        if (content.key && content.key === keys.welcomeKey) {
          welcomeGuides.push(content);
        }

        if (content.key === ContentGuideTourKeys.EXPLORE_LOCATIONS) {
          exploreGuides.push(content);
        }

        if (content.key === ContentGuideTourKeys.REVENUES) {
          revenuesGuides.push(content);
        }

        if (content.key === ContentGuideTourKeys.SUBSCRIPTION_CHECKOUT) {
          subscriptionCheckoutGuides.push(content);
        }

        if (content.key === ContentGuideTourKeys.BEGIN_CHAT) {
          beginChatGuides.push(content);
        }
      });

      dispatch(guidesActions.setProfileGuides(profileGuides));
      dispatch(guidesActions.setChatsGuides(chatGuides));
      dispatch(guidesActions.setLocationDetailsGuides(locationGuides));
      dispatch(guidesActions.setSubscriptionGuides(subscriptionGuides));
      dispatch(guidesActions.setWelcomeGuides(welcomeGuides));
      dispatch(guidesActions.setExploreLocationsGuides(exploreGuides));
      dispatch(guidesActions.setRevenuesGuides(revenuesGuides));
      dispatch(guidesActions.setSubscriptionCheckoutGuides(welcomeGuides));
      dispatch(guidesActions.setBeginChatGuides(beginChatGuides));
    } catch (error) {
      Toast.show({
        text1: 'Erro ao buscar conteúdo.',
        position: 'bottom',
        type: 'error',
      });
    }
  };

export default guidesSlice.reducer;
