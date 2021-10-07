import axiosClient from "./axiosClient";

export const getAllEvent = (params) => {
  const url = "/api/events";
  return axiosClient.get(url, { params });
};

export const createEvent = (params) => {
  const url = "/api/events";
  return axiosClient.post(url, params);
};

export const editEvent = (params) => {
  const url = "/api/events";
  return axiosClient.put(url, { params });
};

export const getEventByID = (eventID) => {
  const url = `/api/events/${eventID}`;
  return axiosClient.get(url);
};

export const getEventPost = (eventID) => {
  const url = `/api/posts/${eventID}`;
  return axiosClient.get(url);
};

export const getAllCategoryFromDB = () => {
  const url = "/api/events/categories";
  return axiosClient.get(url);
};

export const getAllEventByProfileID = (profileID) => {
  const url = `/api/events/byOrgainzer/${profileID}`;
  return axiosClient.get(url);
};
