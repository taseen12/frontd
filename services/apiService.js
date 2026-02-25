import axios from "../lib/axios";
import { RESIDENT_ENDPOINTS } from "../config/api";

// Error handler
const handleApiError = (error) => {
  if (error.response) {
    console.error("API Error Response:", error.response.data);
    console.error("Status:", error.response.status);
  } else if (error.request) {
    console.error("API Error Request:", error.request);
  } else {
    console.error("API Error Message:", error.message);
  }
};

export async function fetchPatients() {
  try {
    const response = await axios.get(RESIDENT_ENDPOINTS.RESIDENTS);
    return response.data;
  } catch (error) {
    handleApiError(error);
    throw error;
  }
}
