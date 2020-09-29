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
  owner: OwnerProps;
}

interface InitialStateProps {
  itineraries: ItineraryProps[] | null;
  loading: boolean;
}

interface ActionProps {
  type: string;
  payload: {
    itineraries: [];
    itinerary: {};
  };
}

const INITIAL_STATE: InitialStateProps = {
  itineraries: null,
  loading: false,
};

export default function itineraries(
  state = INITIAL_STATE,
  action: ActionProps,
) {
  return produce(state, (draft) => {
    switch (action.type) {
      case '@itineraries/GET_ITINERARIES_REQUEST': {
        draft.loading = true;
        break;
      }
      case '@itineraries/GET_ITINERARIES_SUCCESS': {
        draft.loading = false;
        draft.itineraries = action.payload.itineraries;
        break;
      }
      case '@itineraries/GET_ITINERARIES_FAILURE': {
        draft.loading = false;
        break;
      }
      case '@itineraries/CREATE_ITINERARY_REQUEST': {
        draft.loading = true;
        break;
      }
      case '@itineraries/CREATE_ITINERARY_SUCCESS': {
        draft.loading = false;
        break;
      }
      case '@itineraries/CREATE_ITINERARY_FAILURE': {
        draft.loading = false;
        break;
      }
      default:
    }
  });
}
