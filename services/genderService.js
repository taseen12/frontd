import axios from "../lib/axios";
import { OTHERS_API_ENDPOINTS } from "@/config/api";

export const getGenders = async ({ page = 1, limit = 10 } = {}) => {
  try {
    const response = await axios.get(
      `${OTHERS_API_ENDPOINTS.GENDERS}?page=${page}&limit=${limit}`
      );
    return response.data;
  } catch (error) {
    console.error("Error fetching gender:", error);
    throw error;
  }
};