import {ItineraryProps} from './reducer';

interface ImageListProps {
  id: number;
}

interface LodgingListProps {
  id: number;
  capacity: number;
  description?: string;
  price: number;
}

export function getItinerariesRequest() {
  return {
    type: '@itineraries/GET_ITINERARIES_REQUEST',
  };
}

export function getItinerariesSuccess(itineraries: ItineraryProps) {
  return {
    type: '@itineraries/GET_ITINERARIES_SUCCESS',
    payload: {itineraries},
  };
}

export function getItinerariesFailure() {
  return {
    type: '@itineraries/GET_ITINERARIES_Failure',
  };
}

export function createItineraryRequest(
  name: string,
  capacity: number,
  description: string,
  dateBegin: Date,
  dateEnd: Date,
  dateLimit: Date,
  location: string,
  images?: [ImageListProps],
  activities?: [LodgingListProps],
  lodgings?: [LodgingListProps],
  transports?: [LodgingListProps],
) {
  return {
    type: '@itineraries/CREATE_ITINERARY_REQUEST',
    payload: {
      name,
      images,
      capacity,
      description,
      dateBegin,
      dateEnd,
      dateLimit,
      location,
      activities,
      lodgings,
      transports,
    },
  };
}

export function createItinerarySuccess(itinerary: ItineraryProps) {
  return {
    type: '@itineraries/CREATE_ITINERARY_SUCCESS',
    payload: {itinerary},
  };
}

export function createItineraryFailure() {
  return {
    type: '@itineraries/CREATE_ITINERARY_FAILURE',
  };
}
