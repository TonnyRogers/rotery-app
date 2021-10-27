export interface ProfileProps {
  id: number;
  name: string | null;
  gender: string | null;
  birth: string | null;
  document: string | null;
  profission: string | null;
  phone: string | null;
  user_id: number;
  createdAt: string;
  updatedAt: string;
  file: FileProps | null;
  location?: string;
  locationJson?: ProfileLocationJson;
  user: UserProps;
}

export interface ProfileServerResponse
  extends Omit<ProfileProps, 'phone' | 'location_json' | 'document'> {
  g_phone: string;
  g_document: string;
  g_locationJson: ProfileLocationJson;
}

export interface LocationJson {
  city?: string;
  state?: string;
  country?: string;
  countryCode?: string;
  address?: string;
  position?: {
    lat?: string;
    lon?: string;
  };
}

export type ProfileLocationJson = Pick<
  LocationJson,
  'city' | 'state' | 'country' | 'countryCode' | 'position'
>;

export type ItineraryLocationJson = Pick<
  LocationJson,
  'city' | 'state' | 'country' | 'countryCode' | 'position'
>;

export interface UserRateProps {
  id: number;
  rate: number;
  description: string;
  user: UserProps;
  updatedAt: string;
  createdAt: string;
}
export interface ItineraryRateProps {
  id: number;
  rate: number;
  description: string;
  itinerary: ItineraryProps;
  updatedAt: string;
  createdAt: string;
}

export interface UserProps {
  id: number;
  email: string;
  username: string;
  role: string;
  profile: ProfileProps;
  createdAt: string;
  isActive: boolean;
  isHost: boolean;
  ratings?: UserRateProps[];
  g_email: string;
}

export interface OwnerProps extends UserProps {}

export interface QuestionProps {
  id: string;
  question: string;
  answer: string | null;
  itinerary: number;
  owner: UserProps;
  isVisible: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface MemberProps {
  id: number;
  isAdmin: boolean;
  isAccepted: boolean;
  itinerary: number;
  user: UserProps;
  createdAt: string;
  updatedAt: string;
  deletedAt: string | null;
}

export interface ItineraryMemberResponse
  extends Omit<MemberProps, 'itinerary'> {
  itinerary: ItineraryProps;
}

export interface ItineraryItemDependecyProps {
  id: string;
  name?: string;
  alias: string;
}
export interface ItemProps {
  id: string;
  name: string;
  itinerary: number;
  capacity: number;
  price: string;
  description: string;
  isFree: boolean;
}

export interface FileProps {
  id: number;
  url: string;
  name: string;
  type: string;
  subtype: string;
}

export interface ItineraryPhotoProps {
  id: string;
  itinerary: number;
  file: FileProps;
}

export interface ItineraryActivityItemProps extends ItemProps {
  activity: ItineraryItemDependecyProps;
}
export interface ItineraryTransportItemProps extends ItemProps {
  transport: ItineraryItemDependecyProps;
}
export interface ItineraryLodgingItemProps extends ItemProps {
  lodging: ItineraryItemDependecyProps;
}

export type ItineraryStatus = 'active' | 'on_going' | 'finished' | 'cancelled';

export enum ItineraryStatusTranlated {
  active = 'ativo',
  on_going = 'em andamento',
  finished = 'finalizado',
  cancelled = 'cancelado',
}

export interface ItineraryProps {
  id: number;
  owner: UserProps;
  name: string;
  description: string;
  begin: string;
  end: string;
  deadlineForJoin: string;
  capacity: number;
  location: string;
  locationJson: ItineraryLocationJson | null;
  isPrivate: boolean;
  createdAt: string;
  updatedAt: string;
  activities: ItineraryActivityItemProps[];
  lodgings: ItineraryLodgingItemProps[];
  transports: ItineraryTransportItemProps[];
  photos: ItineraryPhotoProps[];
  questions: QuestionProps[];
  members: MemberProps[];
  status: ItineraryStatus;
}

export interface FeedItineraryProps extends ItineraryProps {}

export interface FavoriteProps {
  id: number;
  itinerary_id: number;
  itinerary: ItineraryProps;
}

export interface BottomSheetData {
  componentype: string;
  type: string;
  id: number;
}

export interface ConnectionsProps {
  id: number;
  isBlocked: boolean;
  owner: UserProps;
  target: UserProps;
}

export interface InvitesProps {
  id: number;
  isBlocked: boolean;
  owner: UserProps;
  target: UserProps;
}

export interface MessageProps {
  id: number;
  message: string;
  readed: boolean;
  unreaded: number;
  type: string;
  jsonData?: ItineraryProps | null;
  sender: UserProps;
  receiver: UserProps;
  createdAt: string;
}

export interface NotificationsProps<T> {
  id: number;
  user: UserProps;
  isReaded: boolean;
  subject: string;
  content: string;
  alias: string;
  jsonData: T;
  createdAt: string;
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

export interface CreateItineraryItemListProps {
  capacity: number;
  description?: string;
  price: string;
  isFree: boolean;
}

export interface CreateItineraryActivityItemProps
  extends CreateItineraryItemListProps {
  activity: number;
  name?: string;
}
export interface CreateItineraryTransportItemProps
  extends CreateItineraryItemListProps {
  transport: number;
  name?: string;
}
export interface CreateItineraryLodgingItemProps
  extends CreateItineraryItemListProps {
  lodging: number;
  name?: string;
}
export interface CreateItineraryPhotoItemProps {
  file: number;
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

export interface LocationPickerInputSetItem<T> {
  id: number;
  name: string;
  value: T;
}

export type TomTomApiResponseTypes =
  | 'Street'
  | 'Geography'
  | 'POI'
  | 'Point Address';

export interface TomTomApiResponse {
  type: TomTomApiResponseTypes;
  address: {
    streetName?: string;
    municipalitySubdivision?: string;
    municipality: string;
    countrySubdivision: string;
    countryCode: string;
    country: string;
    countryCodeISO3: string;
    freeformAddress: string;
    extendedPostalCode?: string;
  };
  position: {
    lat: string;
    lon: string;
  };
}

export interface SendChatMessagePayload {
  receiver: {id: number};
  message: string;
  jsonData?: Record<string, unknown>;
}

export enum MessageTypeEnum {
  MESSAGE = 'message',
  ITINERARY_INVITE = 'itinerary_invite',
}

export type MessageTypes = 'message' | 'itinerary_invite';
