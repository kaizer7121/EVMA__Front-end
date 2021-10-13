import axios from "axios";
import queryString from "query-string";

const token = localStorage.getItem("TOKEN");

const axiosClient = axios.create({
  baseURL: "http://localhost:8080/support",
  headers: {
    // "Content-Type": "application/json",
    Authorization: `Bearer ${token}`,
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

export default axiosClient;
