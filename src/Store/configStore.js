import { configureStore } from "@reduxjs/toolkit";

import tokenSlice from "./tokenSlice";
import profileSlice from "./profileSlice";
import categoriesSlice from "./categoriesStore";
import notificationSlice from "./notificationSlice";

const store = configureStore({
  reducer: {
    token: tokenSlice.reducer,
    profile: profileSlice.reducer,
    categories: categoriesSlice.reducer,
    notifications: notificationSlice.reducer,
  },
});

export default store;
