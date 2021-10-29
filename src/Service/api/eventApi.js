import axiosClient from "./axiosClient";

export const getAllEvent = (param) => {
  const url = "/api/events";
  const params = { ...param, sort: "startDate,desc" };
  return axiosClient.get(url, { params });
};

export const createEvent = (params) => {
  const url = "/api/events";
  return axiosClient.post(url, params);
};

export const editEvent = (params, eventID) => {
  const url = `/api/events/${eventID}`;
  return axiosClient.put(url, params);
};

export const getEventByID = (eventID) => {
  const url = `/api/events/${eventID}`;
  return axiosClient.get(url);
};

export const getEventPost = (eventID) => {
  const url = `/api/posts/${eventID}?size=100`;
  return axiosClient.get(url);
};

export const createEventPost = (data) => {
  const url = "/api/posts";
  return axiosClient.post(url, data);
};

export const editEventPost = (data, postID) => {
  const url = `/api/posts/${postID}`;
  return axiosClient.put(url, data);
};

export const deleteEventPost = (postID) => {
  const url = `/api/posts/${postID}`;
  return axiosClient.delete(url);
};

export const getAllCategoryFromDB = () => {
  const url = "/api/events/categories";
  return axiosClient.get(url);
};

export const getAllEventByProfileID = (profileID, params) => {
  const url = `/api/events/byOrganizer/${profileID}`;
  return axiosClient.get(url);
};

export const changeEventStatus = (eventID, statusID) => {
  const url = `/api/events/${eventID}`;
  return axiosClient.patch(url, { statusId: statusID });
};

export const searchEvent = (data) => {
  const url = "/api/events/search?size=100&sort=startDate,desc";
  return axiosClient.post(url, data);
};

export const getEventByStatus = (organizationID, statusID) => {
  const url = `api/events/byOrganizer/${organizationID}/${statusID}`;
  return axiosClient.get(url);
};

export const followEvent = (eventID) => {
  const url = `/api/followEvent?eventId=${eventID}`;
  return axiosClient.get(url);
};

export const unfollowEvent = (eventID) => {
  const url = `/api/unfollowEvent?eventId=${eventID}`;
  return axiosClient.get(url);
};

export const getListFollowedEvent = () => {
  const url = "api/getFollowEvents?size=100";
  return axiosClient.get(url);
};
