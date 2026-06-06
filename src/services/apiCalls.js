import apiClient from "./apiClient";
import { API_ROUTES } from "../constants/app";

export const getVisitorCount = async () => {
  const response = await apiClient.get(API_ROUTES.VISITOR_COUNT);
  return response.data;
};

export const sendContactEmail = async (formData) => {
  const response = await apiClient.post(API_ROUTES.CONTACT_EMAIL, formData);
  return response.data;
};

export const trackVisit = async (visitData) => {
  const response = await apiClient.post(API_ROUTES.TRACK_VISIT, visitData);
  return response.data;
};