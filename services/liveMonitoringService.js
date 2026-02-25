import axios from "../lib/axios";
import { MONITORING } from "@/config/api";

// Get all Patient
export const getLiveMonitoring = async () => {
  try {
    const response = await axios.get(
      `${MONITORING.POLICY}`
    );
    return response.data;
  } catch (error) {
    console.error("Error fetching health policy:", error);
    throw error;
  }
};