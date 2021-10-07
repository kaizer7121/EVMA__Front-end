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

export const changePassword = (data) => {
  const url = "/changePassword";
  return axiosClient.post(url, { data: data });
};
