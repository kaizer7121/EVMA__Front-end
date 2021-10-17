import { createSlice } from "@reduxjs/toolkit";

const notificationSlice = createSlice({
  name: "notifications",
  initialState: {
    notifications: [],
    instantNotifications: [],
    isAllowToStoreInstantEventNoti: false,
    isAllowToStoreInstantOrganizationNoti: false,
  },
  reducers: {
    addNotiInLast3Days(state, action) {
      const notifications = action.payload;
      
      state.notifications = [...notifications];
    },

    addNewNotification(state, action) {
      if (
        state.isAllowToStoreInstantEventNoti &&
        state.isAllowToStoreInstantOrganizationNoti
      ) {
        const notification = action.payload;

        state.notifications = [...state.notifications, notification];
      }
    },

    addInstantEvent(state, action) {
      if (
        state.isAllowToStoreInstantEventNoti &&
        state.isAllowToStoreInstantOrganizationNoti
      ) {
        const instantNotifications = action.payload;
        state.instantNotifications = [
          ...state.instantNotifications,
          instantNotifications,
        ];
      }
    },
    allowToStoreInstantEventNoti(state) {
      state.isAllowToStoreInstantEventNoti = true;
    },
    allowToStoreInstantOrganizationNoti(state) {
      state.isAllowToStoreInstantOrganizationNoti = true;
    },
    clearInstantEvent(state) {
      state.instantNotifications = [];
    },
  },
});

export const notificationAction = notificationSlice.actions;
export default notificationSlice;
