import {LocationType} from '../../../utils/enums';
import {Location} from '../../../utils/types';

export enum LocationActions {
  GET_LOCATION_FEED_REQUEST = 'GET_LOCATION_FEED_REQUEST',
  GET_LOCATION_FEED_SUCCESS = 'GET_LOCATION_FEED_SUCCESS',
  GET_LOCATION_FEED_FAILURE = 'GET_LOCATION_FEED_FAILURE',
}

interface FilterProps {
  region?: string;
  type?: LocationType;
  activity?: number;
  city?: string;
  state?: string;
  page: number;
  limit: number;
}

export function getLocationFeedRequest(filter: FilterProps) {
  return {
    type: LocationActions.GET_LOCATION_FEED_REQUEST,
    payload: {
      filter,
    },
  };
}

export function getLocationFeedSuccess(locations: Location[], page: number) {
  return {
    type: LocationActions.GET_LOCATION_FEED_SUCCESS,
    payload: {
      locations,
      page,
    },
  };
}

export function getLocationFeedFailure() {
  return {
    type: LocationActions.GET_LOCATION_FEED_FAILURE,
  };
}
