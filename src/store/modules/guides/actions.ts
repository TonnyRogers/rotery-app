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
