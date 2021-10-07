import axiosClient from "./axiosClient";

export const getAllOrganization = () => {
  const url = "/api/profiles/organizers";
  return axiosClient.get(url);
};

export const getOrganizationDetail = (organizationID) => {
  const url = `/api/profiles/${organizationID}`;
  return axiosClient.get(url);
};
