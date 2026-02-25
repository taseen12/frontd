import axios from "../lib/axios";
import { ACTIVITY_API_ENDPOINTS } from "@/config/api";

export const getActivityAlert = async (patientId) => {
  try {
    const response = await axios.get(ACTIVITY_API_ENDPOINTS.ACTIVITY_ALERT(patientId));
    return response.data;
  } catch (error) {
    console.error("Error fetching activity alert:", error);
    throw error;
  }
};
export const getActivityLog = async (patientId, period) => {
  try {
    const response = await axios.get(
      ACTIVITY_API_ENDPOINTS.ACTIVITY_LOG(patientId, period)
    );
    return response.data;
  } catch (error) {
    console.error("Error fetching activity log:", error);
    throw error;
  }
};


export const getActivityHistory = async (patientId) => {
  try {
    const response = await axios.get(ACTIVITY_API_ENDPOINTS.ACTIVITY_HISTORY(patientId));
    return response.data;
  } catch (error) {
    console.error("Error fetching activity history:", error);
    throw error;
  }
};