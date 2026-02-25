import axios from "../lib/axios";
import { RESIDENT_ENDPOINTS } from "@/config/api";

const LIFESTYLE_ENDPOINTS = {
  LIFESTYLE_HOBBY: "/api/residents/lifestyle-hobby",
  HOBBIES: "/api/config/hobbys",
};

// Get Available Hobbies
export const getHobbies = async () => {
  try {
    const response = await axios.get(
      LIFESTYLE_ENDPOINTS.HOBBIES,
      {
        headers: {
          'Content-Type': 'application/json',
        },
      }
    );
    return response.data;
  } catch (error) {
    console.error("Error fetching hobbies:", error);
    throw error;
  }
};

// Get Resident Hobbies
export const getResidentHobbies = async (residentId) => {
  try {
    const response = await axios.get(
      `/api/residents/hobbys?id=${residentId}`,
      {
        headers: {
          'Content-Type': 'application/json',
        },
      }
    );
    return response.data;
  } catch (error) {
    console.error("Error fetching resident hobbies:", error);
    throw error;
  }
};

// Get Resident Important Dates
export const getResidentImportantDates = async (residentId) => {
  try {
    const response = await axios.get(
      `/api/residents/important-dates?id=${residentId}`,
      {
        headers: {
          'Content-Type': 'application/json',
        },
      }
    );
    return response.data;
  } catch (error) {
    console.error("Error fetching resident important dates:", error);
    throw error;
  }
};

// Add Lifestyle Information
export const addLifestyleInfo = async (lifestyleData) => {
  try {
    const response = await axios.post(LIFESTYLE_ENDPOINTS.LIFESTYLE_HOBBY, lifestyleData, {
      headers: {
        'Content-Type': 'application/json',
      },
    });
    return response.data;
  } catch (error) {
    console.error("Error adding lifestyle info:", error);
    throw error;
  }
};

// Get Lifestyle Info by Resident ID
export const getLifestyleInfoByResidentId = async (residentId) => {
  try {
    const response = await axios.get(RESIDENT_ENDPOINTS.RESIDENT_LIFESTYLE_INFO(residentId));
    return response.data;
  } catch (error) {
    console.error("Error fetching lifestyle info:", error);
    throw error;
  }
};

// Update Lifestyle Info
export const updateLifestyleInfo = async (lifestyleData) => {
  try {
    const response = await axios.put(
      "/api/residents/lifestyle-info",
      lifestyleData,
      {
        headers: {
          'Content-Type': 'application/json',
        },
      }
    );
    return response.data;
  } catch (error) {
    console.error("Error updating lifestyle info:", error);
    throw error;
  }
};

// Update Resident Hobbies
export const updateResidentHobbies = async (residentId, hobbies) => {
  try {
    console.log("Updating hobbies with payload:", {
      residentId: residentId,
      hobbys: hobbies
    });
    
    // Use PUT method for editing (not POST)
    const payload = {
      residentId: residentId,
      hobbys: hobbies
    };
    
    console.log("Final payload for hobbies:", payload);
    
    const response = await axios.put(
      "http://192.168.154.10:9094/api/residents/hobbys",
      payload,
      {
        headers: {
          'Content-Type': 'application/json',
        },
      }
    );
    
    return response.data;
  } catch (error) {
    console.error("Error updating hobbies:", error);
    console.error("Error response:", error.response?.data);
    throw error;
  }
};

export const updateImportantDates = async (residentId, importantDates) => {
  try {
    console.log("Updating important dates with payload:", {
      residentId: residentId,
      importantDates: importantDates
    });
    
    // Use POST method with correct payload structure
    const payload = {
      residentId: residentId,
      importantDates: importantDates.map(date => ({
        date: date.date ? new Date(date.date).toISOString() : new Date().toISOString(),
        reason: date.reason || ""
      }))
    };
    
    console.log("Final payload for important dates:", payload);
    
    const response = await axios.put(
      "http://192.168.154.10:9094/api/residents/important-dates",
      payload,
      {
        headers: {
          'Content-Type': 'application/json',
        },
      }
    );
    
    return response.data;
  } catch (error) {
    console.error("Error updating important dates:", error);
    console.error("Error response:", error.response?.data);
    throw error;
  }
};

// Get Important Dates by Resident ID
export const getImportantDatesByResidentId = async (residentId) => {
  try {
    const response = await axios.get(
      `http://192.168.154.10:9094/api/residents/important-dates?id=${residentId}`
    );
    return response.data;
  } catch (error) {
    console.error("Error fetching important dates:", error);
    throw error;
  }
};

// Delete Lifestyle Info
export const deleteLifestyleInfo = async (lifestyleId) => {
  try {
    const response = await axios.delete(`${LIFESTYLE_ENDPOINTS.LIFESTYLE_HOBBY}/${lifestyleId}`);
    return response.data;
  } catch (error) {
    console.error("Error deleting lifestyle info:", error);
    throw error;
  }
};
