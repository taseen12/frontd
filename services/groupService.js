import axios from "../lib/axios";
import { OTHERS_API_ENDPOINTS } from "@/config/api";

export const getGroups = async ({ page = 1, limit = 10 } = {}) => {
  try {
    const response = await axios.get(`${OTHERS_API_ENDPOINTS.GROUPS}`, {
      params: { page, limit },
    });
    return response.data;
  } catch (error) {
    console.error("Error fetching groups:", error);
    throw error;
  }
};

export const addGroup = async (payload) => {
  try {
    const body = { group: { createdAt: new Date().toISOString(), createdBy: payload?.createdBy || "system", ...payload } };
    const response = await axios.post(OTHERS_API_ENDPOINTS.GROUPS, body, {
      headers: { 'Content-Type': 'application/json' }
    });
    return response.data;
  } catch (error) {
    console.error("Error adding group:", error);
    throw error;
  }
};

export const editGroup = async (payload) => {
  try {
    const body = { group: payload };
    const response = await axios.put(OTHERS_API_ENDPOINTS.GROUPS, body, {
      headers: { 'Content-Type': 'application/json' }
    });
    return response.data;
  } catch (error) {
    console.error("Error updating group:", error);
    throw error;
  }
};

export const deleteGroup = async (id) => {
  try {
    const response = await axios.delete(OTHERS_API_ENDPOINTS.GROUPS, {
      params: { id }
    });
    return response.data;
  } catch (error) {
    console.error("Error deleting group:", error);
    throw error;
  }
};


