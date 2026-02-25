import axios from "../lib/axios";
import { POLICY_ENDPOINTS, CONFIG_ENDPOINTS } from "@/config/api";

export const getHealthPolicies = async (options = {}) => {
  try {
    const { page = 1, pageSize = 10, search } = options;
    const response = await axios.get(POLICY_ENDPOINTS.HEALTH_POLICY, {
      params: {
        pageNumber: page,
        pageSize,
        search,
      },
    });
    return response.data;
  } catch (error) {
    console.error("Error fetching health policies:", error);
    throw error;
  }
};

export const addHealthPolicy = async (payload) => {
  try {
    const body = { policy: payload };
    const response = await axios.post(POLICY_ENDPOINTS.HEALTH_POLICY, body, {
      headers: { "Content-Type": "application/json" },
    });
    return response.data;
  } catch (error) {
    console.error("Error adding health policy:", error);
    throw error;
  }
};

export const editHealthPolicy = async (payload) => {
  try {
    const body = { healthPolicy: payload };
    const response = await axios.put(POLICY_ENDPOINTS.HEALTH_POLICY, body, {
      headers: { "Content-Type": "application/json" },
    });
    return response.data;
  } catch (error) {
    console.error("Error updating health policy:", error);
    throw error;
  }
};

export const deleteHealthPolicy = async (id) => {
  try {
    const response = await axios.delete(POLICY_ENDPOINTS.HEALTH_POLICY, {
      params: { id },
    });
    return response.data;
  } catch (error) {
    console.error("Error deleting health policy:", error);
    throw error;
  }
};

export const getHealthLevels = async () => {
  try {
    const response = await axios.get(CONFIG_ENDPOINTS.HEALTH_LEVELS);
    return response.data.healthLevels || [];
  } catch (error) {
    console.error("Error fetching health levels:", error);
    throw error;
  }
};

export const getHealthTypes = async () => {
  try {
    const response = await axios.get(CONFIG_ENDPOINTS.HEALTH_TYPES);
    return response.data || {};
  } catch (error) {
    console.error("Error fetching health types:", error);
    throw error;
  }
};