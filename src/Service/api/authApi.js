import axiosClient from "./axiosClient";

export const signIn = (data) => {
  const url = "/api/login";
  const params = new URLSearchParams();
  params.append("username", data.email);
  params.append("password", data.password);

  return axiosClient.post(url, params, {
    "Content-Type": "application/x-www-form-urlencoded",
  });
};

export const getGoogleLoginLink = () => {
  const url = "/api/loginWithGG";
  return axiosClient.get(url);
};

export const exchangeFirebaseToken = (params) => {
  const url = "/api/firebaseToken";
  return axiosClient.get(url, { params });
};

export const signUp = (data) => {
  const url = "/api/signup";
  const params = {
    signUsername: data.email,
    signPassword: data.password,
    role: data.role,
    name: data.fullName,
    DOB: data.dateOfBirth.toISOString(),
    email: data.email,
  };

  return axiosClient.post(url, params);
};

export const getCurrentProfile = () => {
  const url = "/api/profiles/currentUser";
  return axiosClient.get(url);
};

export const changePassword = (data) => {
  const url = "/changePassword";
  return axiosClient.post(url, { data: data });
};

export const getProfilebyID = (profileID) => {
  const url = `/api/profiles/${profileID}`;

  return axiosClient.get(url);
};

export const updateProfile = (data, userID) => {
  const url = `/api/profiles/${userID}`;

  return axiosClient.put(url, data);
};
