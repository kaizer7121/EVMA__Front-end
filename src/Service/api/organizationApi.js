import axiosClient from "./axiosClient";

export const getAllOrganization = (params) => {
  const url = "/api/profiles/organizers";
  return axiosClient.get(url, { params });
};

export const getOrganizationDetail = (organizationID) => {
  const url = `/api/profiles/${organizationID}`;
  return axiosClient.get(url);
};

export const followOrganization = (organizationID) => {
  const url = `/api/followOrganizer?organizerId=${organizationID}`;
  return axiosClient.get(url);
};

export const unfollowOrganization = (organizationID) => {
  const url = `/api/unfollowOrganizer?organizerId=${organizationID}`;
  return axiosClient.get(url);
};

export const getListFollowedOrganization = () => {
  const url = "api/getFollowOrganizers?size=100";
  return axiosClient.get(url);
};
