import {ItineraryProps} from './reducer';

export function getFavoritesRequest() {
  return {
    type: '@favorites/GET_FAVORITES_REQUEST',
  };
}

export function getFavoritesSuccess(itineraries: ItineraryProps[]) {
  return {
    type: '@favorites/GET_FAVORITES_SUCCESS',
    payload: {itineraries},
  };
}

export function getFavoritesFailure() {
  return {
    type: '@favorites/GET_FAVORITES_FAILURE',
  };
}

export function setFavoriteRequest(itineraryId: number) {
  return {
    type: '@favorites/SET_FAVORITE_REQUEST',
    payload: {itineraryId},
  };
}

export function setFavoriteSuccess() {
  return {
    type: '@favorites/SET_FAVORITE_SUCCESS',
  };
}

export function setFavoriteFailure() {
  return {
    type: '@favorites/SET_FAVORITE_FAILURE',
  };
}

export function removeFavoriteRequest(itineraryId: number) {
  return {
    type: '@favorites/REMOVE_FAVORITE_REQUEST',
    payload: {itineraryId},
  };
}

export function removeFavoriteSuccess() {
  return {
    type: '@favorites/REMOVE_FAVORITE_SUCCESS',
  };
}

export function removeFavoriteFailure() {
  return {
    type: '@favorites/REMOVE_FAVORITE_FAILURE',
  };
}
