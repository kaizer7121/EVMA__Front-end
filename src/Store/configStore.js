import { configureStore } from "@reduxjs/toolkit";

import tokenSlice from "./tokenSlice";
import profileSlice from "./profileSlice";

const store = configureStore({
  reducer: {
    token: tokenSlice.reducer,
    profile: profileSlice.reducer,
  },
});

export default store;
