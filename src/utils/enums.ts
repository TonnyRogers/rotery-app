export enum YupValidationMessages {
  REQUIRED = 'campo obrigatório',
}

export enum LocationType {
  BEACH = 'beach',
  WATERFALL = 'waterfall',
  CAVERN = 'cavern',
  MOUNTAIN = 'mountain',
  PARK = 'park',
  PLACE = 'place',
}

export enum LocationDetailingType {
  DURATION = 'duration',
  MOBILITY_ACCESS = 'mobility_access',
  CHILDREN_ACCESS = 'children_access',
  ANIMAL_PRESENCE = 'animal_presente',
  MOBILE_SIGNAL = 'mobile_signal',
  FOOD_PROXIMITY = 'food_nearby',
  GUIDE_REQUESTED = 'guide_requested',
  WEEKLY_PRESENCE = 'weekly_presence',
}

export enum LocationDetailingLevel {
  LOW = 'low',
  MEDIUM = 'medium',
  HIGH = 'high',
}

export enum ChatType {
  MESSAGE = 'message',
  BEGIN = 'begin',
  END = 'end',
  RATE = 'rate',
  LOCATION = 'location',
}

export enum WelcomeStepListType {
  PROFILE_PHOTO = 'profile_photo',
  PROFILE_BASIC_INFO = 'profile_basic_info',
  BACKPACKER_FIRST_CHAT = 'backpacker_first_chat',
  GUIDE_FIRST_CHAT = 'guide_first_chat',
  GUIDE_LOCATION_RELATE_VALIDATION = 'guide_location_validation',
}

export enum AppRoutes {
  EXPLORE_LOCATIONS = 'ExploreLocations',
  LOCATION_FEED = 'LocationFeed',
  CHAT_MESSAGES = 'ChatMessages',
  WELCOME = 'Welcome',
  PROFILE = 'Profile',
  CONNECTIONS = 'Connections',
}

export enum TipPaymentStatus {
  PAID = 'paid',
  PENDING = 'pending',
  REFUNDED = 'refunded',
  REFUSED = 'refused',
}

export enum LocalStorageKeys {
  AUTH_REFRESH = '@auth:refreshToken',
  AUTH_TOKEN = '@auth:token',
  NOTIFICATION_TOKEN = '@notification:token',
}

export enum GuideEnum {
  FEED = 'feedGuide',
  WELCOME = 'welcomeGuide',
  NEW_ITINERARY = 'newItineraryGuide',
  MY_ITINERARY = 'myItineraryGuide',
  PROFILE = 'profileGuide',
  REVENUES = 'revenuesGuide',
  SUBSCRIPTION = 'subscriptionGuide',
  SUBSCRIPTION_CHECKOUT = 'subscriptionCheckoutGuide',
  EXPLORE_LOCATIONS = 'exploreLocationsGuide',
  LOCATION_DETALING = 'locationDetailsGuide',
  CHAT = 'chatsGuide',
}

export enum ContentType {
  LOGIN_LIST = 'login_list',
  WELCOME_SEASON_BANNER = 'welcome_season',
  SITE_NEWS = 'site_news',
  APP_ADS = 'app_ads',
  APP_GUIDED_TOUR = 'app_tour',
  BACKPACKER_SUBSCRIPTION = 'backpacker_subs',
  GUIDE_SUBSCRIPTION = 'guide_subs',
  GENERIC = 'generic',
}

export enum ContentGuideTourKeys {
  FEED = 'feed_guide',
  BACKPACKER_WELCOME = 'backpacker_welcome_guide',
  GUIDE_WELCOME = 'guide_welcome_guide',
  NEW_ITINERARY = 'new_itinerary_guide',
  MY_ITINERARY = 'my_itinerary_guide',
  BACKPACKER_PROFILE = 'backpacker_profile_guide',
  GUIDE_PROFILE = 'guide_profile_guide',
  REVENUES = 'revenues_guide',
  BACKPACKER_SUBSCRIPTION = 'backpacker_subscription_guide',
  GUIDE_SUBSCRIPTION = 'guide_subscription_guide',
  SUBSCRIPTION_CHECKOUT = 'subscription_checkout_guide',
  EXPLORE_LOCATIONS = 'explore_locations_guide',
  BACKPACKER_LOCATION_DETALING = 'backpacker_location_details_guide',
  GUIDE_LOCATION_DETALING = 'guide_location_details_guide',
  BACKPACKER_CHAT = 'backpacker_chats_guide',
  GUIDE_CHAT = 'guide_chats_guide',
  BEGIN_CHAT = 'begin_chats_guide',
}
