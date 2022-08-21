export enum GuidesActions {
  HIDE_FEED_GUIDE = '@guides/HIDE_FEED_GUIDE',
  HIDE_NEW_ITINERARY_GUIDE = '@guides/HIDE_NEW_ITINERARY_GUIDE',
  HIDE_MY_ITINERARY_GUIDE = '@guides/HIDE_MY_ITINERARY_GUIDE',
  HIDE_PROFILE_GUIDE = '@guides/HIDE_PROFILE_GUIDE',
  SHOW_REVENUE_GUIDE = '@guides/SHOW_REVENUE_GUIDE',
  HIDE_REVENUE_GUIDE = '@guides/HIDE_REVENUE_GUIDE',
  HIDE_SUBSCRIPTION_GUIDE = '@guides/HIDE_SUBSCRIPTION_GUIDE',
  SHOW_ITINERARY_PAYMENT_GUIDE_SUCCESS = '@guides/SHOW_ITINERARY_PAYMENT_GUIDE_SUCCESS',
  HIDE_ITINERARY_PAYMENT_GUIDE = '@guides/HIDE_ITINERARY_PAYMENT_GUIDE',
  HIDE_WELCOME_GUIDE = '@guides/HIDE_WELCOME_GUIDE',
  HIDE_EXPLORE_LOCATIONS_GUIDE = '@guides/HIDE_EXPLORE_LOCATIONS_GUIDE',
  HIDE_LOCATION_DETAILS_GUIDE = '@guides/HIDE_LOCATION_DETAILS_GUIDE',
  HIDE_CHATS_GUIDE = '@guides/HIDE_CHATS_GUIDE',
}

export function hideFeedGuide() {
  return {
    type: GuidesActions.HIDE_FEED_GUIDE,
  };
}

export function hideNewItineraryGuide() {
  return {
    type: GuidesActions.HIDE_NEW_ITINERARY_GUIDE,
  };
}

export function hideMyItineraryGuide() {
  return {
    type: GuidesActions.HIDE_MY_ITINERARY_GUIDE,
  };
}

export function hideProfileGuide() {
  return {
    type: GuidesActions.HIDE_PROFILE_GUIDE,
  };
}

export function showRevenueGuideSuccess() {
  return {
    type: GuidesActions.SHOW_REVENUE_GUIDE,
  };
}

export function hideRevenueGuide() {
  return {
    type: GuidesActions.HIDE_REVENUE_GUIDE,
  };
}

export function hideSubscriptionGuide() {
  return {
    type: GuidesActions.HIDE_SUBSCRIPTION_GUIDE,
  };
}

export function showItineraryPaymentGuideSuccess() {
  return {
    type: GuidesActions.SHOW_ITINERARY_PAYMENT_GUIDE_SUCCESS,
  };
}

export function hideItineraryPaymentGuide() {
  return {
    type: GuidesActions.HIDE_ITINERARY_PAYMENT_GUIDE,
  };
}

export function hideWelcomeGuide() {
  return {
    type: GuidesActions.HIDE_WELCOME_GUIDE,
  };
}

export function hideExploreLocationsGuide() {
  return {
    type: GuidesActions.HIDE_EXPLORE_LOCATIONS_GUIDE,
  };
}

export function hideLocationDetailsGuide() {
  return {
    type: GuidesActions.HIDE_LOCATION_DETAILS_GUIDE,
  };
}

export function hideChatsGuide() {
  return {
    type: GuidesActions.HIDE_CHATS_GUIDE,
  };
}
