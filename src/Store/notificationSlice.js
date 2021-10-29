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

      notifications.sort((firstNoti, secondNoti) => {
        const firstDate = new Date(firstNoti.date);
        const secondDate = new Date(secondNoti.date);

        return firstDate.getTime() < secondDate.getTime()
          ? 1
          : firstDate.getTime() > secondDate.getTime()
          ? -1
          : 0;
      });

      state.notifications = [...notifications];
    },

    addNewNotification(state, action) {
      if (
        state.isAllowToStoreInstantEventNoti &&
        state.isAllowToStoreInstantOrganizationNoti
      ) {
        const notification = action.payload;
        state.notifications = [notification, ...state.notifications];
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
    preventToStoreInstantEventNoti(state) {
      state.isAllowToStoreInstantEventNoti = false;
    },
    preventToStoreInstantOrganizationNoti(state) {
      state.isAllowToStoreInstantOrganizationNoti = false;
    },
    clearInstantEvent(state) {
      state.instantNotifications = [];
    },
    modifyListNotification(state, action) {
      const notifications = action.payload;
      state.notifications = notifications;
    },
  },
});

export const notificationAction = notificationSlice.actions;
export default notificationSlice;
