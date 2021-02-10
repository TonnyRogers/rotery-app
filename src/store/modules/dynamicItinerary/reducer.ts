import produce from 'immer';

interface OwnerProps {
  id: number;
  username: string;
  person: {
    file?: {
      url?: string;
    };
  };
}

export interface QuestionProps {
  id: number;
  question: string;
  anwser: string | null;
  itinerary_id: number;
  created_at: string;
  updated_at: string;
  owner: {
    username: string;
    person: {
      file?: {
        url?: string;
      };
    };
  };
}

export interface MemberProps {
  id: number;
  username: string;
  email: string;
  person: {
    file?: {
      url?: string;
    };
  };
  pivot: {
    itinerary_id: number;
    is_admin: boolean;
    accepted: boolean;
    created_at: string;
  };
}

interface ItemProps {
  id: number;
  name: string;
  pivot: {
    capacity: number;
    price: number;
    description: string;
  };
}

interface StatusProps {
  id: number;
  slug: string;
  name: string;
}

export interface ItineraryProps {
  id: number;
  owner_id: number;
  name: string;
  description: string;
  begin: string;
  end: string;
  deadline_for_join: string;
  capacity: number;
  location: string;
  created_at: string;
  updated_at: string;
  activities: ItemProps[];
  lodgings: ItemProps[];
  transports: ItemProps[];
  photos: [];
  questions: QuestionProps[];
  members: MemberProps[];
  status: StatusProps;
  owner: OwnerProps;
}

interface InitialStateProps {
  itinerary: ItineraryProps | null;
  loading: boolean;
}

interface ActionProps {
  type: string;
  payload: {
    itinerary: ItineraryProps;
  };
}

const INITIAL_STATE: InitialStateProps = {
  itinerary: null,
  loading: false,
};

export default function dynamicItinerary(
  state = INITIAL_STATE,
  action: ActionProps,
) {
  return produce(state, (draft) => {
    switch (action.type) {
      case '@dynamicItinerary/GET_DETAILS_REQUEST': {
        draft.loading = true;
        break;
      }
      case '@dynamicItinerary/GET_DETAILS_SUCCESS': {
        draft.itinerary = action.payload.itinerary;
        draft.loading = false;
        break;
      }
      case '@dynamicItinerary/GET_DETAILS_FAILURE': {
        draft.loading = false;
        break;
      }
      case '@dynamicItinerary/UPDATE_DETAILS_REQUEST': {
        draft.loading = true;
        break;
      }
      case '@dynamicItinerary/UPDATE_DETAILS_SUCCESS': {
        draft.itinerary = action.payload.itinerary;
        draft.loading = false;
        break;
      }
      case '@dynamicItinerary/UPDATE_DETAILS_FAILURE': {
        draft.loading = false;
        break;
      }
      default:
    }
  });
}
