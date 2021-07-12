import produce from 'immer';

import {ItineraryProps, FavoriteProps} from '../../../utils/types';
import {FavoritesActions} from './actions';

interface InitialStateProps {
  items: FavoriteProps[];
  loading: boolean;
}

interface ActionProps {
  type: string;
  payload: {
    itineraries: ItineraryProps[];
    itinerary: ItineraryProps;
    itineraryId: number;
    favorite: FavoriteProps;
    favorites: FavoriteProps[];
  };
}

const INITIAL_STATE: InitialStateProps = {
  items: [],
  loading: false,
};

export default function feed(state = INITIAL_STATE, action: ActionProps) {
  return produce(state, (draft) => {
    switch (action.type) {
      case FavoritesActions.GET_FAVORITES_REQUEST: {
        draft.loading = true;
        break;
      }
      case FavoritesActions.GET_FAVORITES_SUCCESS: {
        if (action.payload.favorites[0]) {
          draft.items = action.payload.favorites;
        } else {
          draft.items = [];
        }
        draft.loading = false;
        break;
      }
      case FavoritesActions.GET_FAVORITES_FAILURE: {
        draft.loading = false;
        break;
      }
      case FavoritesActions.SET_FAVORITE_REQUEST: {
        draft.loading = true;
        break;
      }
      case FavoritesActions.SET_FAVORITE_SUCCESS: {
        const favoriteList = draft.items;
        const favoriteItem = action.payload.favorite;

        favoriteList.push(favoriteItem);
        draft.items = favoriteList;
        draft.loading = false;
        break;
      }
      case FavoritesActions.SET_FAVORITE_FAILURE: {
        draft.loading = false;
        break;
      }
      case FavoritesActions.REMOVE_FAVORITE_REQUEST: {
        draft.loading = true;
        break;
      }
      case FavoritesActions.REMOVE_FAVORITE_SUCCESS: {
        const favoriteList = draft.items;
        const {itineraryId} = action.payload;

        const itineraryIndex = favoriteList?.findIndex(
          (item) => item.itinerary.id === itineraryId,
        );

        if (itineraryIndex !== -1) {
          favoriteList?.splice(itineraryIndex, 1);
          draft.items = favoriteList;
        }
        draft.loading = false;
        break;
      }
      case FavoritesActions.REMOVE_FAVORITE_FAILURE: {
        draft.loading = false;
        break;
      }
      default:
    }
  });
}
