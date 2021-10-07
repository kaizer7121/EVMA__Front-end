import { createSlice } from "@reduxjs/toolkit";

const tokenSlice = createSlice({
  name: "token",
  initialState: {
    token: localStorage.getItem("TOKEN"),
    expirationTime: localStorage.getItem("expirationTime"),
  },
  reducers: {
    addToken(state, action) {
      const token = action.payload;

      localStorage.setItem("TOKEN", token);

      state.token = token;
    },
    deleteToken(state) {
      localStorage.removeItem("TOKEN");
      state.token = null;
      state.expirationTime = 0;
    },
  },
});

export const tokenAction = tokenSlice.actions;
export default tokenSlice;
