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
  name: string;
  alias: string;
}
export interface ItemProps {
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
  HOST_SUBSCRIPTION = 'subscription',
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
  installments: CardTokenInstallmentsResponse[];
}

export interface CardTokenInstallmentsResponse {
  payment_method_id: string;
  payment_type_id: string;
  processing_mode: string;
  merchant_account_id: any;
  agreements: any;
  issuer: {
    id: number;
    name: string;
    secure_thumbnail: string;
    thumbnail: string;
  };
  payer_costs: PayerCosts[];
}

export type PayerCosts = {
  installments: number;
  installment_rate: number;
  discount_rate: number;
  reimbursement_rate: any;
  labels: [];
  installment_rate_collector: string[];
  min_allowed_amount: number;
  max_allowed_amount: number;
  recommended_message: string;
  installment_amount: number;
  total_amount: number;
  payment_method_option_id: number;
};

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

export interface ProcessPaymentReponse {
  acquirer_reconciliation: [];
  additional_info: {
    authentication_code?: any;
    available_balance?: any;
    nsu_processadora?: any;
  };
  authorization_code: number;
  binary_mode: boolean;
  brand_id: number;
  call_for_authorize_id: number;
  captured: boolean;
  card: {
    cardholder: {
      identification: {
        number: string;
        type: string;
      };
      name: string;
    };
    date_created: string;
    date_last_updated: string;
    expiration_month: number;
    expiration_year: number;
    first_six_digits: string;
    id: number;
    last_four_digits: string;
  };
  charges_details: [];
  collector_id: number;
  corporation_id: number;
  counter_currency: number;
  coupon_amount: number;
  currency_id: string;
  date_approved: string;
  date_created: string;
  date_last_updated: string;
  date_of_expiration: any;
  deduction_schema: any;
  description: string;
  differential_pricing_id: any;
  external_reference: string;
  fee_details: [
    {
      amount: number;
      fee_payer: string;
      type: string;
    },
  ];
  id: number;
  installments: number;
  integrator_id: number;
  issuer_id: string;
  live_mode: boolean;
  marketplace_owner: any;
  merchant_account_id: any;
  merchant_number: any;
  metadata: Record<string, unknown>;
  money_release_date: string;
  money_release_schema: any;
  notification_url: string;
  operation_type: string;
  order: Record<string, unknown>;
  payer: {
    first_name: any;
    last_name: any;
    email: string;
    identification: {
      number: string;
      type: string;
    };
    phone: {
      area_code: any;
      number: any;
      extension: any;
    };
    type: any;
    entity_type: any;
    id: string;
  };
  payment_method_id: string;
  payment_type_id: string;
  platform_id: any;
  point_of_interaction: {
    business_info: {
      sub_unit: string;
      unit: string;
    };
    type: string;
  };
  pos_id: any;
  processing_mode: string;
  refunds: RefundPaymentPayload[];
  shipping_amount: number;
  sponsor_id: any;
  statement_descriptor: string;
  status: PaymentSatatusDetailType;
  status_detail:
    | ApprovedPaymentStatusDetail
    | InProcessPaymentStatusDetail
    | RejectedPaymentStatusDetail;
  store_id: any;
  taxes_amount: number;
  transaction_amount: number;
  transaction_amount_refunded: number;
  transaction_details: {
    acquirer_reference: any;
    external_resource_url: any;
    financial_institution: any;
    installment_amount: number;
    net_received_amount: number;
    overpaid_amount: number;
    payable_deferral_period: any;
    payment_method_reference_id: any;
    total_paid_amount: number;
  };
}

export interface PaymentRefundResponse {
  id: number;
  payment_id: number;
  amount: number;
  metadata: Record<string, unknown>;
  source: {
    id: number;
    name: string;
    type: string;
  };
  date_created: string;
  unique_sequence_number: string;
  refund_mode: string;
  adjustment_amount: number;
  status: string;
  reason: string;
  labels: string[];
  partition_details: string[];
}

export interface JoinItineraryWithPaymentResponse extends MemberProps {
  payment: ProcessPaymentReponse;
}

export type PaymentSatatusDetailType =
  | 'approved'
  | 'in_process'
  | 'rejected'
  | 'cancelled'
  | 'refunded';

export type ApprovedPaymentStatusDetail =
  | 'accredited'
  | 'refunded'
  | 'partially_refunded';

export type InProcessPaymentStatusDetail =
  | 'pending_contingency'
  | 'pending_review_manual';

export type RejectedPaymentStatusDetail =
  | 'cc_rejected_bad_filled_card_number'
  | 'cc_rejected_bad_filled_other'
  | 'cc_rejected_bad_filled_security_code'
  | 'cc_rejected_blacklist'
  | 'cc_rejected_call_for_authorize'
  | 'cc_rejected_card_disabled'
  | 'cc_rejected_card_error'
  | 'cc_rejected_duplicated_payment'
  | 'cc_rejected_high_risk'
  | 'cc_rejected_insufficient_amount'
  | 'cc_rejected_invalid_installments'
  | 'cc_rejected_max_attempts'
  | 'cc_rejected_other_reason'
  | 'cc_rejected_bad_filled_date';

export enum ProcessPaymentType {
  ITINERARY = 'itinerary',
  SUBSCRIPTION = 'subscription',
}

export interface RefundPaymentPayload {
  adjustment_amount: number;
  amount: number;
  date_created: string;
  external_refund_id: null;
  funder: null;
  id: number;
  labels: [];
  metadata: Record<string, unknown>;
  partition_details: [];
  payment_id: number;
  reason: null;
  refund_mode: string;
  source: {
    id: string;
    name: string;
    type: string;
  };
  status: string;
  unique_sequence_number: null;
}

export interface MemberWithPaymentResponse extends MemberProps {
  payment: ProcessPaymentReponse;
}

export interface BrasilApiBankResponse {
  ispb: string;
  name: string;
  code: number;
  fullName: string;
}

export interface Revenue {
  id: string;
  member: {
    username: string;
    avatar: string;
  };
  itinerary: {
    id: number;
    name: string;
    begin: string;
  };
  paymentStatus: PaymentStatus;
  amount: number;
  createdAt: string;
}
export interface FindAllMemberRevenuesResponse {
  revenues: Revenue[];
  total: number;
}

export type EmailHelpRequestTypeTypes =
  | 'payment'
  | 'itinerary'
  | 'revenue'
  | 'other';

export interface BankAccount {
  id: number;
  bankCode: string;
  bankName: string;
  account: string;
  accountType: string;
  agency: string;
  user: number;
  payDay: number;
  createdAt: string;
  updatedAt: string;
}

export interface CreateBankAccountPayload {
  bankCode: string;
  bankName: string;
  account: string;
  accountType: string;
  agency: string;
  payDay: number;
}

export enum PlanFrequency {
  MONTHLY = 'months',
  DAILY = 'days',
}

export enum PlanStatus {
  ACTIVE = 'active',
  INACTIVE = 'inactive',
  CANCELLED = 'cancelled',
}
export interface Plan {
  id: number;
  referenceId: string;
  name: string;
  frequencyType: PlanFrequency;
  status: PlanStatus;
  amount: string;
  repetitions: number;
  createdAt: string;
  updatedAt: string;
  deletedAt: string;
}

export interface Subscription {
  id: number;
  referenceId: string;
  plan: Plan;
  user: number;
  status: 'authorized' | 'paused' | 'pending' | 'cancelled' | 'no_payment';
  createdAt: string;
  updatedAt: string;
  deletedAt: string;
}

export interface SearchSubscriptionResult {
  id: string;
  status: 'authorized' | 'paused' | 'pending' | 'cancelled';
  reason: string;
  summarized: {
    quotas: number;
    semaphore: string;
    charged_quantity: number;
    pending_charge_quantity: number;
    charged_amount: number;
    pending_charge_amount: number;
    last_charged_date: string;
    last_charged_amount: number;
  };
  payer_id: number;
  back_url: string;
  collector_id: number;
  application_id: number;
  date_created: string;
  last_modified: string;
  init_point: string;
  sandbox_init_point: string;
  preapproval_plan_id: string;
  auto_recurring: {
    frequency: number;
    frequency_type: 'months' | 'days';
    transaction_amount: number;
    currency_id: 'BRL';
    start_date: string;
    end_date: string;
  };
  next_payment_date: string;
  payment_method_id: 'master' | 'visa' | 'amex';
  payer_first_name: string;
  payer_last_name: string;
}
export interface MLPaginatedResponse<T> {
  paging: {
    offset: number;
    limit: number;
    total: number;
  };
  results: T[];
}
