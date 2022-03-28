export enum GuidesActions {
  SHOW_FEED_GUIDE = '@guides/SHOW_FEED_GUIDE',
  SHOW_FEED_GUIDE_SUCCESS = '@guides/SHOW_FEED_GUIDE_SUCCESS',
  HIDE_FEED_GUIDE = '@guides/HIDE_FEED_GUIDE',
  SHOW_NEW_ITINERARY_GUIDE = '@guides/SHOW_NEW_ITINERARY_GUIDE',
  SHOW_NEW_ITINERARY_GUIDE_SUCCESS = '@guides/SHOW_NEW_ITINERARY_GUIDE_SUCCESS',
  HIDE_NEW_ITINERARY_GUIDE = '@guides/HIDE_NEW_ITINERARY_GUIDE',
  SHOW_MY_ITINERARY_GUIDE = '@guides/SHOW_MY_ITINERARY_GUIDE',
  SHOW_MY_ITINERARY_GUIDE_SUCCESS = '@guides/SHOW_MY_ITINERARY_GUIDE_SUCCESS',
  HIDE_MY_ITINERARY_GUIDE = '@guides/HIDE_MY_ITINERARY_GUIDE',
  SHOW_PROFILE_GUIDE = '@guides/SHOW_PROFILE_GUIDE',
  SHOW_PROFILE_GUIDE_SUCCESS = '@guides/SHOW_PROFILE_GUIDE_SUCCESS',
  HIDE_PROFILE_GUIDE = '@guides/HIDE_PROFILE_GUIDE',
  SHOW_REVENUE_GUIDE = '@guides/SHOW_REVENUE_GUIDE',
  HIDE_REVENUE_GUIDE = '@guides/HIDE_REVENUE_GUIDE',
  SHOW_SUBSCRIPTION_GUIDE = '@guides/SHOW_SUBSCRIPTION_GUIDE',
  HIDE_SUBSCRIPTION_GUIDE = '@guides/HIDE_SUBSCRIPTION_GUIDE',
  SHOW_ITINERARY_PAYMENT_GUIDE = '@guides/SHOW_ITINERARY_PAYMENT_GUIDE',
  SHOW_ITINERARY_PAYMENT_GUIDE_SUCCESS = '@guides/SHOW_ITINERARY_PAYMENT_GUIDE_SUCCESS',
  HIDE_ITINERARY_PAYMENT_GUIDE = '@guides/HIDE_ITINERARY_PAYMENT_GUIDE',
}

export function showFeedGuide() {
  return {
    type: GuidesActions.SHOW_FEED_GUIDE,
  };
}

export function showFeedGuideSuccess() {
  return {
    type: GuidesActions.SHOW_FEED_GUIDE_SUCCESS,
  };
}

export function hideFeedGuide() {
  return {
    type: GuidesActions.HIDE_FEED_GUIDE,
  };
}

export function showNewItineraryGuide() {
  return {
    type: GuidesActions.SHOW_NEW_ITINERARY_GUIDE,
  };
}

export function showNewItineraryGuideSuccess() {
  return {
    type: GuidesActions.SHOW_NEW_ITINERARY_GUIDE_SUCCESS,
  };
}

export function hideNewItineraryGuide() {
  return {
    type: GuidesActions.HIDE_NEW_ITINERARY_GUIDE,
  };
}

export function showMyItineraryGuide() {
  return {
    type: GuidesActions.SHOW_MY_ITINERARY_GUIDE,
  };
}

export function showMyItineraryGuideSuccess() {
  return {
    type: GuidesActions.SHOW_MY_ITINERARY_GUIDE_SUCCESS,
  };
}

export function hideMyItineraryGuide() {
  return {
    type: GuidesActions.HIDE_MY_ITINERARY_GUIDE,
  };
}

export function showProfileGuide() {
  return {
    type: GuidesActions.SHOW_PROFILE_GUIDE,
  };
}

export function showProfileGuideSuccess() {
  return {
    type: GuidesActions.SHOW_PROFILE_GUIDE_SUCCESS,
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

export function showSubscriptionGuideSuccess() {
  return {
    type: GuidesActions.SHOW_SUBSCRIPTION_GUIDE,
  };
}

export function hideSubscriptionGuide() {
  return {
    type: GuidesActions.HIDE_SUBSCRIPTION_GUIDE,
  };
}

export function showItineraryPaymentGuide() {
  return {
    type: GuidesActions.SHOW_ITINERARY_PAYMENT_GUIDE,
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
