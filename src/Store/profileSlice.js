import { createSlice } from "@reduxjs/toolkit";

const profileSlice = createSlice({
  name: "userProfile",
  initialState: {
    id: "",
    name: "",
    email: "",
    city: "",
    jobTitle: "",
    address: "",
    phoneNumber: "",
    summary: "",
    avatarURL: "",
    backgroundURL: "",
    role: "",
    dob: "",
  },
  reducers: {
    signIn(state, action) {
      const {
        id,
        name,
        email,
        city,
        jobTitle,
        address,
        phoneNumber,
        summary,
        avatarURL,
        backgroundURL,
        role,
        dob,
      } = action.payload;
      state.id = id;
      state.name = name;
      state.email = email;
      state.city = city;
      state.jobTitle = jobTitle;
      state.address = address;
      state.phoneNumber = phoneNumber;
      state.summary = summary;
      state.avatarURL = avatarURL;
      state.backgroundURL = backgroundURL;
      state.role = role;
      state.dob = dob;
    },
    signOut(state) {
      state.id = "";
      state.name = "";
      state.email = "";
      state.city = "";
      state.jobTitle = "";
      state.address = "";
      state.phoneNumber = "";
      state.summary = "";
      state.avatarURL = "";
      state.backgroundURL = "";
      state.role = "";
      state.dob = "";
    },
  },
});

export const profileAction = profileSlice.actions;
export default profileSlice;
