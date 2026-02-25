import axios from "../lib/axios";
import { OTHERS_API_ENDPOINTS } from "@/config/api";

export const getRoles = async ({ page = 1, limit = 10 } = {}) => {
  try {
    const response = await axios.get(`${OTHERS_API_ENDPOINTS.ROLES}`, {
      params: { page, limit },
    });
    return response.data;
  } catch (error) {
    console.error("Error fetching role:", error);
    throw error;
  }
};

export const addRole = async (payload) => {
  try {
    const body = { group: { createdAt: new Date().toISOString(), createdBy: payload?.createdBy || "system", ...payload } };
    const response = await axios.post(OTHERS_API_ENDPOINTS.ROLES, body, {
      headers: { 'Content-Type': 'application/json' }
    });
    return response.data;
  } catch (error) {
    console.error("Error adding group:", error);
    throw error;
  }
};

export const editRole = async (payload) => {
  try {
    const body = { group: payload };
    const response = await axios.put(OTHERS_API_ENDPOINTS.ROLES, body, {
      headers: { 'Content-Type': 'application/json' }
    });
    return response.data;
  } catch (error) {
    console.error("Error updating group:", error);
    throw error;
  }
};

export const deleteRole = async (id) => {
  try {
    const response = await axios.delete(OTHERS_API_ENDPOINTS.ROLES, {
      params: { id }
    });
    return response.data;
  } catch (error) {
    console.error("Error deleting group:", error);
    throw error;
  }
};


