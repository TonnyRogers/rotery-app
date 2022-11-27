import {createSlice, PayloadAction, Dispatch} from '@reduxjs/toolkit';
// import {REHYDRATE} from 'redux-persist';

import api from '../providers/api';
import {
  NotificationsProps,
  NotificationAlias,
  InvitesProps,
  ChatMessage,
} from '../utils/types';
import {chatActions} from './chats';
import {conectionsActions} from './connections';
import {authActions} from './auth';

interface InitialStateProps {
  data: NotificationsProps<any>[] | null;
  counter: number;
}

const initialState: InitialStateProps = {
  data: null,
  counter: 0,
};

export const notificationSlice = createSlice({
  name: 'notifications',
  initialState,
  reducers: {
    setNotifications: (
      state,
      action: PayloadAction<NotificationsProps<any>[]>,
    ) => {
      let notReadedCouter = 0;
      const notReadedNotifications = action.payload.filter((item) => {
        if (!item.isReaded) {
          notReadedCouter += 1;
          return item;
        }
      });

      state.data = notReadedNotifications;
      state.counter = notReadedCouter;
    },
    setNotification: (
      state,
      action: PayloadAction<NotificationsProps<any>>,
    ) => {
      let notReadedCouter = 0;
      const allNotifications = state.data;
      const newNotification = action.payload;

      if (allNotifications?.length) {
        const similar = allNotifications?.findIndex(
          (item) =>
            item.subject === newNotification.subject &&
            item.content === newNotification.content,
        );

        if (similar === -1) {
          allNotifications?.push(newNotification);

          const notReadedNotifications: NotificationsProps<any>[] =
            allNotifications.filter((item) => {
              if (item.isReaded === false) {
                notReadedCouter += 1;
                return item;
              }
            });

          state.data = notReadedNotifications;
          state.counter = notReadedCouter;
        }
      } else {
        state.data = [newNotification];
        state.counter = 1;
      }
    },
    removeNotification: (state, action: PayloadAction<{id: number}>) => {
      const allNotifications = state.data;
      const {id} = action.payload;

      if (allNotifications !== null) {
        const notificationIndex = allNotifications?.findIndex(
          (item) => Number(item.id) === Number(id),
        );

        if (notificationIndex !== -1) {
          allNotifications.splice(notificationIndex, 1);

          state.data = allNotifications;
          state.counter = state.counter - 1;
        }
      }
    },
  },
  extraReducers: (builder) => {
    builder.addCase(authActions.handleLogout, (state) => {
      state.counter = initialState.counter;
      state.data = initialState.data;
    });
    // builder.addCase(REHYDRATE, (state) => {});
  },
});

export const notificationsActions = notificationSlice.actions;

export const getNotifications = () => async (dispatch: Dispatch) => {
  try {
    const response = await api.get<NotificationsProps<any>[]>('/notifications');

    const nonReadedNotifications: NotificationsProps<any>[] =
      response.data.filter((item) => item.isReaded === false);

    for (const iterator of nonReadedNotifications) {
      if (iterator.alias === NotificationAlias.NEW_CHAT) {
        dispatch(
          chatActions.setChatNotificationMessage(
            iterator.jsonData as ChatMessage,
          ),
        );
      }
      if (iterator.alias === NotificationAlias.GUIDE_ACTIVATED) {
        //empty
      }
      if (iterator.alias === NotificationAlias.NEW_CONNECTION) {
        dispatch(
          conectionsActions.setNotificationConnection(
            iterator.jsonData as InvitesProps,
          ),
        );
      }
      if (iterator.alias === NotificationAlias.CONNECTION_ACCEPTED) {
        dispatch(
          conectionsActions.setNotificationConnection(
            iterator.jsonData as InvitesProps,
          ),
        );
      }
      if (iterator.alias === NotificationAlias.CONNECTION_UNBLOCK) {
        const connectionNotification: InvitesProps = iterator.jsonData;
        dispatch(
          conectionsActions.unblockConnection({
            userId: connectionNotification.target.id,
          }),
        );
      }
      if (iterator.alias === NotificationAlias.CONNECTION_BLOCK) {
        const connectionNotification: InvitesProps = iterator.jsonData;
        dispatch(
          conectionsActions.blockConnection({
            userId: connectionNotification.target.id,
          }),
        );
      }
      if (iterator.alias === NotificationAlias.RATE_LOCATION) {
        //empty
      }
      // if (iterator.alias === NotificationAlias.NEW_MEMBER) {
      //   // wsNewItineraryMemeberNotification(iterator);
      // }
      // if (iterator.alias === NotificationAlias.NEW_MESSAGE) {
      //   // wsNewMessageNotification(iterator);
      // }
      // if (iterator.alias === NotificationAlias.NEW_QUESTION) {
      //   // wsItineraryQuestionNotification(iterator);
      // }
      // if (iterator.alias === NotificationAlias.MEMBER_ACCEPTED) {
      //   // const payloadResponse: ItineraryMemberAcceptWsResponse =
      //   //   iterator.jsonData;
      //   // getFeedDetailRequest(payloadResponse.itineraryId);
      //   // getNextItineraryDetailsRequest(payloadResponse.itineraryId);
      // }
      // if (iterator.alias === NotificationAlias.MEMBER_REJECTED) {
      //   // wsRejectedItineraryMemeberNotification(iterator);
      // }

      // if (iterator.alias === NotificationAlias.RATE_ITINERARY) {
      //   // wsItineraryRateNotification(iterator);
      // }
      // if (iterator.alias === NotificationAlias.ITINERARY_UPDATED) {
      //   // wsItineraryUpdateNotification(iterator);
      // }
      // if (iterator.alias === NotificationAlias.ITINERARY_DELETED) {
      //   // wsItineraryDeleteNotification(iterator);
      // }
      // if (iterator.alias === NotificationAlias.NEW_ANSWER) {
      //   // wsItineraryAnswerNotification(iterator);
      // }
    }

    dispatch(notificationsActions.setNotifications(response.data));
  } catch (error) {}
};

export const setNotificationReaded =
  (id: number) => async (dispatch: Dispatch) => {
    try {
      await api.delete(`/notifications/${id}`);

      dispatch(notificationsActions.removeNotification({id}));
    } catch (error) {}
  };

export default notificationSlice.reducer;
