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
