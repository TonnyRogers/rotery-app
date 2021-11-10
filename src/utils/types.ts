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
  customerId?: string;
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

export enum PaymentStatus {
  PAID = 'paid',
  PENDING = 'pending',
  REFUNDED = 'refunded',
  REFUSED = 'refused',
  FREE = 'free',
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
  paymentId: string;
  paymentStatus: PaymentStatus;
}

export interface ItineraryMemberResponse
  extends Omit<MemberProps, 'itinerary'> {
  itinerary: ItineraryProps;
}

export interface ItineraryMemberAcceptWsResponse {
  memberId: string;
  userId: number;
  itineraryId: number;
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
  requestPayment: boolean;
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
  CONNECTION_BLOCK = 'connection_block',
  CONNECTION_UNBLOCK = 'connection_unblock',
  MEMBER_PROMOTED = 'itinerary_member_promoted',
  MEMBER_DEMOTED = 'itinerary_member_demoted',
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

export interface CustomMemberPayload {
  itinerary: number;
  user: number;
}

type MetaType = {
  currentPage: number;
  itemCount: number;
  itemsPerPage: number;
  totalItems: number;
  totalPages: number;
};

export interface PaginatedResponse<T> {
  items: T[];
  meta: MetaType;
}

export interface CardTokenResponse {
  cardholder: {
    identification: {
      number: string;
      type: string;
    };
    name: string;
  };
  date_created: string;
  date_due: string;
  date_last_updated: string;
  expiration_month: number;
  expiration_year: number;
  first_six_digits: string;
  id: string;
  last_four_digits: string;
  live_mode: boolean;
  luhn_validation: boolean;
  public_key: string;
  require_esc: boolean;
  security_code_length: number;
  status: string;
}

export interface CheckoutCustomerCardResponse {
  cardholder: {
    name: string;
    identification: {
      number: string;
      type: string;
    };
  };
  customer_id: string;
  date_created: string;
  date_last_updated: string;
  expiration_month: number;
  expiration_year: number;
  first_six_digits: string;
  id: string;
  issuer: {
    id: number;
    name: string;
  };
  last_four_digits: string;
  payment_method: {
    id: string;
    name: string;
    payment_type_id: string;
    thumbnail: string;
    secure_thumbnail: string;
  };
  security_code: {
    length: number;
    card_location: string;
  };
  user_id: string;
}
export interface CheckoutCustomerResponse {
  id: string;
  email: string;
  first_name: string;
  last_name: string;
  phone: {
    area_code: string;
    number: string;
  };
  identification: {
    type: string;
    number: string;
  };
  address: {
    id: string | null;
    zip_code: string | null;
    street_name: string | null;
    street_number: number | null;
  };
  date_registered: string;
  description: string;
  date_created: string;
  date_last_updated: string;
  metadata: {
    source_sync: string;
  };
  default_card: string;
  default_address: null;
  cards: CheckoutCustomerCardResponse[];
  addresses: [];
  live_mode: false;
}

export interface ProcessPaymentPayload {
  description: string;
  external_reference: string;
  installments: number;
  payer: {
    id: string;
    entity_type: 'individual';
    type: 'customer';
    email: string;
  };
  issuer_id: number;
  token: string;
  payment_method_id: string;
  transaction_amount: number;
  statement_descriptor: string;
}
