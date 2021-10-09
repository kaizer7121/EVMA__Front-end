import axiosClient from "./axiosClient";

export const getAllOrganization = (params) => {
  const url = "/api/profiles/organizers";
  return axiosClient.get(url, { params });
};

export const getOrganizationDetail = (organizationID) => {
  const url = `/api/profiles/${organizationID}`;
  return axiosClient.get(url);
};
