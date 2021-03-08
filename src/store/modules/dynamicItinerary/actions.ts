import {ItineraryProps} from '../../../utils/types';

export function getDetailsRequest(itineraryId: number) {
  return {
    type: '@dynamicItinerary/GET_DETAILS_REQUEST',
    payload: {itineraryId},
  };
}

export function getDetailsSuccess(itinerary: ItineraryProps) {
  return {
    type: '@dynamicItinerary/GET_DETAILS_SUCCESS',
    payload: {itinerary},
  };
}

export function getDetailsFailure() {
  return {
    type: '@dynamicItinerary/GET_DETAILS_FAILURE',
  };
}

export function updateDetailsRequest() {
  return {
    type: '@dynamicItinerary/UPDATE_DETAILS_REQUEST',
  };
}

export function updateDetailsSuccess(itinerary: ItineraryProps) {
  return {
    type: '@dynamicItinerary/UPDATE_DETAILS_SUCCESS',
    payload: {itinerary},
  };
}

export function updateDetailsFailure() {
  return {
    type: '@dynamicItinerary/UPDATE_DETAILS_FAILURE',
  };
}
