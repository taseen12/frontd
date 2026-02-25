import axios from "../lib/axios";
import { RESIDENT_ENDPOINTS } from "@/config/api";

export const addAuthorisedRepresentative = async (payload) => {
  try {
    const response = await axios.post(
      `${RESIDENT_ENDPOINTS.RESIDENTS}/authorized-representative`,
      payload,
      {
        headers: { 'Content-Type': 'application/json' }
      }
    );
    return response.data;
  } catch (error) {
    console.error("Error adding authorised representative:", error);
    throw error;
  }
};

export const getAuthorisedRepresentatives = async ({ page = 1, limit = 10 } = {}) => {
  try {
    const response = await axios.get(
      `${RESIDENT_ENDPOINTS.RESIDENTS}/authorized-representative`,
      {
        params: { page, limit }
      }
    );
    return response.data;
  } catch (error) {
    console.error("Error fetching authorised representatives:", error);
    throw error;
  }
};

export const getAuthorisedRepresentativeById = async (id) => {
  try {
    const response = await axios.get(
      `${RESIDENT_ENDPOINTS.RESIDENTS}/authorized-representative/${id}`
    );
    return response.data;
  } catch (error) {
    console.error("Error fetching authorised representative:", error);
    throw error;
  }
};

export const editAuthorisedRepresentative = async (payload) => {
  try {
    const response = await axios.put(
      `${RESIDENT_ENDPOINTS.RESIDENTS}/authorized-representative`,
      payload,
      {
        headers: { 'Content-Type': 'application/json' }
      }
    );
    return response.data;
  } catch (error) {
    console.error("Error updating authorised representative:", error);
    throw error;
  }
};

export const deleteAuthorisedRepresentative = async (id) => {
  try {
    const response = await axios.delete(
      `${RESIDENT_ENDPOINTS.RESIDENTS}/authorized-representative`,
      {
        params: { id }
      }
    );
    return response.data;
  } catch (error) {
    console.error("Error deleting authorised representative:", error);
    throw error;
  }
};

export const getAuthorisedRepresentativeByResidentId = async (residentId) => {
  try {
    const response = await axios.get(RESIDENT_ENDPOINTS.RESIDENT_AUTHORIZED_REPRESENTATIVE(residentId));
    return response.data;
  } catch (error) {
    console.error("Error fetching authorised representative by resident ID:", error);
    throw error;
  }
};