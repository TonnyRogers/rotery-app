import {FavoriteProps} from '../../../utils/types';

export enum FavoritesActions {
  GET_FAVORITES_REQUEST = '@favorites/GET_FAVORITES_REQUEST',
  GET_FAVORITES_SUCCESS = '@favorites/GET_FAVORITES_SUCCESS',
  GET_FAVORITES_FAILURE = '@favorites/GET_FAVORITES_FAILURE',
  SET_FAVORITE_REQUEST = '@favorites/SET_FAVORITE_REQUEST',
  SET_FAVORITE_SUCCESS = '@favorites/SET_FAVORITE_SUCCESS',
  SET_FAVORITE_FAILURE = '@favorites/SET_FAVORITE_FAILURE',
  REMOVE_FAVORITE_REQUEST = '@favorites/REMOVE_FAVORITE_REQUEST',
  REMOVE_FAVORITE_SUCCESS = '@favorites/REMOVE_FAVORITE_SUCCESS',
  REMOVE_FAVORITE_FAILURE = '@favorites/REMOVE_FAVORITE_FAILURE',
}

export function getFavoritesRequest() {
  return {
    type: FavoritesActions.GET_FAVORITES_REQUEST,
  };
}

export function getFavoritesSuccess(favorites: FavoriteProps[]) {
  return {
    type: FavoritesActions.GET_FAVORITES_SUCCESS,
    payload: {favorites},
  };
}

export function getFavoritesFailure() {
  return {
    type: FavoritesActions.GET_FAVORITES_FAILURE,
  };
}

export function setFavoriteRequest(itineraryId: number) {
  return {
    type: FavoritesActions.SET_FAVORITE_REQUEST,
    payload: {itineraryId},
  };
}

export function setFavoriteSuccess(favorite: FavoriteProps) {
  return {
    type: FavoritesActions.SET_FAVORITE_SUCCESS,
    payload: {favorite},
  };
}

export function setFavoriteFailure() {
  return {
    type: FavoritesActions.SET_FAVORITE_FAILURE,
  };
}

export function removeFavoriteRequest(itineraryId: number) {
  return {
    type: FavoritesActions.REMOVE_FAVORITE_REQUEST,
    payload: {itineraryId},
  };
}

export function removeFavoriteSuccess(itineraryId: number) {
  return {
    type: FavoritesActions.REMOVE_FAVORITE_SUCCESS,
    payload: {itineraryId},
  };
}

export function removeFavoriteFailure() {
  return {
    type: FavoritesActions.REMOVE_FAVORITE_FAILURE,
  };
}
