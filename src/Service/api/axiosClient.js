import axios from "axios";
import queryString from "query-string";
import firebase from "firebase";

const axiosClient = axios.create({
  baseURL: "http://localhost:8080/support",
  // baseURL: "https://evma.azurewebsites.net/evma",
  headers: {
    // "Content-Type": "application/json",
    // Authorization: `Bearer ${token}`,
  },
  paramsSerializer: (params) => queryString.stringify(params),
});

axiosClient.interceptors.response.use(
  (response) => {
    if (response && response.data) {
      return response.data;
    }

    return response;
  },
  (err) => {
    return err.response;
  }
);

axiosClient.interceptors.request.use(async (config) => {
  const token = localStorage.getItem("TOKEN");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
});

export default axiosClient;
