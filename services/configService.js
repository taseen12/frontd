import axios from "@/lib/axios";
import { CONFIG_ENDPOINTS } from "@/config/api";

// Get Genders
export const getGenders = async () => {
  try {
    const response = await axios.get(CONFIG_ENDPOINTS.GENDERS, {
      headers: {
        'Content-Type': 'application/json',
      },
    });
    return response.data;
  } catch (error) {
    console.error("Error fetching genders:", error);
    throw error;
  }
};

// Get Indigenous Status
export const getIndigenousStatus = async () => {
  try {
    const response = await axios.get(CONFIG_ENDPOINTS.INDIGENOUS_STATUS, {
      headers: {
        'Content-Type': 'application/json',
      },
    });
    return response.data;
  } catch (error) {
    console.error("Error fetching indigenous status:", error);
    throw error;
  }
};

// Get Legal Authority Status
export const getLegalAuthorityStatus = async () => {
  try {
    const response = await axios.get(CONFIG_ENDPOINTS.LEGAL_AUTHORITY_STATUS, {
      headers: {
        'Content-Type': 'application/json',
      },
    });
    return response.data;
  } catch (error) {
    console.error("Error fetching legal authority status:", error);
    throw error;
  }
};

// Get Mobility Status
export const getMobilityStatus = async () => {
  try {
    const response = await axios.get(CONFIG_ENDPOINTS.MOBILITY_STATUS, {
      headers: {
        'Content-Type': 'application/json',
      },
    });
    return response.data;
  } catch (error) {
    console.error("Error fetching mobility status:", error);
    throw error;
  }
};

// Get Cognitive Status
export const getCognitiveStatus = async () => {
  try {
    const response = await axios.get(CONFIG_ENDPOINTS.COGNITIVE_STATUS, {
      headers: {
        'Content-Type': 'application/json',
      },
    });
    return response.data;
  } catch (error) {
    console.error("Error fetching cognitive status:", error);
    throw error;
  }
};

// Get Dietary Status
export const getDietaryStatus = async () => {
  try {
    const response = await axios.get(CONFIG_ENDPOINTS.DIETARY_STATUS, {
      headers: {
        'Content-Type': 'application/json',
      },
    });
    return response.data;
  } catch (error) {
    console.error("Error fetching dietary status:", error);
    throw error;
  }
};

// Get Hobbies
export const getHobbies = async () => {
  try {
    const response = await axios.get(CONFIG_ENDPOINTS.HOBBYS, {
      headers: {
        'Content-Type': 'application/json',
      },
    });
    return response.data;
  } catch (error) {
    console.error("Error fetching hobbies:", error);
    throw error;
  }
};