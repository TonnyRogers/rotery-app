export interface ProfileProps {
  id: number;
  name: string | null;
  gender: string | null;
  birth: string | null;
  cpf: number | null;
  profission: string | null;
  phone: number | null;
  user_id: number;
  created_at: string;
  updated_at: string;
  file_id?: number | null;
  file?: {
    url?: string;
  };
  location?: string;
  location_json?: ProfileLocationJson;
}

export interface LocationJson {
  city: string;
  state: string;
  country: string;
  countryCode: string;
  address: string;
  position: {
    lat: string;
    lon: string;
  };
}

export type ProfileLocationJson = Pick<
  LocationJson,
  'city' | 'state' | 'country' | 'countryCode' | 'position'
>;

export interface UserProps {
  id: number;
  email: string;
  username: string;
  person: ProfileProps;
  created_at: string;
}

export interface OwnerProps extends UserProps {}

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
    user_id: number;
    itinerary_id: number;
    is_admin: boolean;
    accepted: boolean;
    created_at: string;
  };
}

export interface ItemProps {
  id: number;
  name: string;
  pivot: {
    capacity: number;
    price: number;
    description: string;
  };
}

export interface StatusProps {
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
  is_private: boolean;
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

export interface FavoriteProps {
  id: number;
  itinerary_id: number;
  itinerary: ItineraryProps;
}

export interface TransportProps {
  id: number;
  name?: string;
  price?: number;
  capacity?: number;
  description?: string;
  pivot?: {
    description: string | null;
    price: number | null;
    capacity: number;
  };
}

export interface LodgingProps {
  id: number;
  name?: string;
  price?: number;
  capacity?: number;
  description?: string;
  pivot?: {
    description: string | null;
    price: number | null;
    capacity: number;
  };
}

export interface ActivityProps {
  id: number;
  name?: string;
  price?: number;
  capacity?: number;
  description?: string;
  pivot?: {
    description: string | null;
    price: number | null;
    capacity: number;
  };
}

export interface BottomSheetData {
  componentype: string;
  type: string;
  id: number;
}

export interface ConnectionsProps {
  id: number;
  owner_id: number;
  user_id: number;
  blocked: boolean;
  owner: UserProps;
  target: UserProps;
}

export interface InvitesProps {
  id: number;
  owner_id: number;
  user_id: number;
  blocked: boolean;
  owner: UserProps;
  target: UserProps;
}

export interface MessageProps {
  id: number;
  sender_id: number;
  receiver_id: number;
  message: string;
  readed: boolean;
  created_at: string;
  unreaded: number;
  type: string;
  json_data?: ItineraryProps;
  sender: {
    username: string;
    person: {
      file: {
        url: string;
      };
    };
  };
}

export interface NotificationsProps {
  id: number;
  user_id: number;
  readed: boolean;
  subject: string;
  content: string;
  created_at: string;
  alias: string;
  json_data: any;
}

export enum NotificationAlias {
  NEW_MESSAGE = 'new_message',
  RATE_ITINERARY = 'rate_itinerary',
  ITINERARY_UPDATED = 'itinerary_updated',
  ITINERARY_DELETED = 'itinerary_deleted',
  NEW_MEMBER = 'itinerary_member_request',
  MEMBER_ACCEPTED = 'itinerary_member_accepted',
  MEMBER_REJECTED = 'itinerary_member_rejected',
  NEW_QUESTION = 'itinerary_question',
  NEW_ANSWER = 'itinerary_answer',
  CONNECTION_ACCEPTED = 'new_connection_accepted',
  NEW_CONNECTION = 'new_connection',
}

export interface ImageListProps {
  id: number;
}

export interface CreateItemListProps {
  id: number;
  capacity: number;
  description?: string;
  price: number;
}

export interface UpdateItemListProps {
  id: number;
  name?: string;
  pivot: {
    description: string | null;
    price: number | null;
    capacity: number;
  };
}

export enum ItineraryStatusEnum {
  'OPENED' = 1,
  'ON_GOING' = 2,
  'FINISHED' = 3,
  'CANCELLED' = 4,
}

export interface PlacesSearchGeo {
  type: string;
  address: {
    municipality?: string;
    countrySubdivision?: string;
    countryCode?: string;
    country?: string;
    freeformAddress?: string;
  };
  position: {
    lat: string;
    lon: string;
  };
}

export interface TomTomResult<T> {
  results: T[];
}
