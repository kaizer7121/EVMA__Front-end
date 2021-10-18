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
    avatarURL: "/images/default-avatar.png",
    backgroundURL: "/images/default-cover.jpg",
    role: "",
    dob: "",
    followedEvents: [],
    followedOrganizations: [],
  },
  reducers: {
    signInToEvma(state, action) {
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

      const roleName = !role ? "Attendees" : role.authority;

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
      state.role = roleName;
      state.dob = dob;

      localStorage.setItem("USER_ID", id);
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

      console.log("DELETE ID");
      localStorage.removeItem("USER_ID");
    },

    uploadImages(state, action) {
      const { avatarURL, backgroundURL } = action.payload;
      state.avatarURL = avatarURL;
      state.backgroundURL = backgroundURL;
    },
    updateProfile(state, action) {
      const {
        name,
        email,
        city,
        jobTitle,
        address,
        phoneNumber,
        summary,
        avatarURL,
        backgroundURL,
        dob,
      } = action.payload;

      state.name = name;
      state.email = email;
      state.city = city;
      state.jobTitle = jobTitle;
      state.address = address;
      state.phoneNumber = phoneNumber;
      state.summary = summary;
      state.avatarURL = avatarURL;
      state.backgroundURL = backgroundURL;
      state.dob = dob;
    },
    addFollowedEvents(state, action) {
      const followedEvents = action.payload;
      state.followedEvents = [...state.followedEvents, ...followedEvents];
    },
    addFollowedOrganizers(state, action) {
      const followedOrganizers = action.payload;

      state.followedOrganizations = [
        ...state.followedOrganizations,
        ...followedOrganizers,
      ];
    },
    removeFollowedEvent(state, action) {
      const eventID = action.payload;
      console.log("REMOVE");
      const currentFollowedEvents = [...state.followedEvents];
      const newFollowedEvents = currentFollowedEvents.filter((event) => {
        return event !== eventID[0];
      });
      state.followedEvents = newFollowedEvents;
    },
    removeFollowedOrganization(state, action) {
      const organizationID = action.payload;
      const currentFollowedOrganizations = [...state.followedOrganizations];
      const newFollowedEvents = currentFollowedOrganizations.filter(
        (organization) => organization !== organizationID[0]
      );

      state.followedOrganizations = newFollowedEvents;
    },
    clearFollowList(state) {
      state.followedEvents = [];
      state.followedOrganizations = [];
    },
  },
});

export const profileAction = profileSlice.actions;
export default profileSlice;
