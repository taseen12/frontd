import axios from "../lib/axios";
import { POLICY_ENDPOINTS, CONFIG_ENDPOINTS } from "@/config/api";

export const getActivityPolicies = async (options = {}) => {
  try {
    const { page = 1, pageSize = 10, search } = options;
    const response = await axios.get(POLICY_ENDPOINTS.ACTIVITY_POLICY, {
      params: {
        pageNumber: page,
        pageSize,
        search,
      },
    });
    return response.data;
  } catch (error) {
    console.error("Error fetching activity policies:", error);
    throw error;
  }
};

export const addActivityPolicy = async (payload) => {
  try {
    const body = { activityPolicy: payload };
    const response = await axios.post(POLICY_ENDPOINTS.ACTIVITY_POLICY, body, {
      headers: { "Content-Type": "application/json" },
    });
    return response.data;
  } catch (error) {
    console.error("Error adding activity policy:", error);
    throw error;
  }
};

export const editActivityPolicy = async (payload) => {
  try {
    const body = { activityPolicy: payload };
    const response = await axios.put(POLICY_ENDPOINTS.ACTIVITY_POLICY, body, {
      headers: { "Content-Type": "application/json" },
    });
    return response.data;
  } catch (error) {
    console.error("Error updating activity policy:", error);
    throw error;
  }
};

export const deleteActivityPolicy = async (id) => {
  try {
    const response = await axios.delete(POLICY_ENDPOINTS.ACTIVITY_POLICY, {
      params: { id },
    });
    return response.data;
  } catch (error) {
    console.error("Error deleting activity policy:", error);
    throw error;
  }
};

export const getActivityLevels = async () => {
  try {
    const response = await axios.get(CONFIG_ENDPOINTS.ACTIVITY_LEVELS);
    return response.data.activityLevels || [];
  } catch (error) {
    console.error("Error fetching activity levels:", error);
    throw error;
  }
};
export const getSensorID = async () => {
    try {
      const response = await axios.get(POLICY_ENDPOINTS.SENSOR_ID);
      return response.data;
    } catch (error) {
      console.error("Error fetching activity policies:", error);
      throw error;
    }
}


export const getActivityTypes = async () => {
  try {
    const response = await axios.get(CONFIG_ENDPOINTS.ACTIVITY_TYPES);
    return response.data.activityTypes || [];
  } catch (error) {
    console.error("Error fetching activity types:", error);
    throw error;
  }
};