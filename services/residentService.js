import axios from "../lib/axios";
import { RESIDENT_ENDPOINTS } from "@/config/api";

export const getResidentProfile = async (residentId) => {
  try {
    const response = await axios.get(RESIDENT_ENDPOINTS.RESIDENT_PROFILE(residentId));
    return response.data;
  } catch (error) {
    console.error("Error fetching Resident profile:", error);
    throw error;
  }
};

// Get all Residents
export const getResidents = async () => {
  try {
    const response = await axios.get(
      `${RESIDENT_ENDPOINTS.RESIDENTS}`
    );
    return response.data;
  } catch (error) {
    console.error("Error fetching Residents:", error);
    throw error;
  }
};

// Add Resident
export const addResident = async (formData) => {
  try {
    const response = await axios.post(RESIDENT_ENDPOINTS.RESIDENTS, formData);
    return response.data;
  } catch (error) {
    console.error("Error adding Resident:", error);
    throw error;
  }
};

// Get Resident by ID
export const getResidentById = async (residentId) => {
  try {
    const response = await axios.get(RESIDENT_ENDPOINTS.RESIDENT_PROFILE(residentId));
    return response.data;
  } catch (error) {
    console.error("Error fetching Resident:", error);
    throw error;
  }
};

export const editResident = async (formData) => {
  try {
    // Send the payload directly to the API as per new schema
    const response = await axios.put(RESIDENT_ENDPOINTS.RESIDENTS, formData);
    return response.data;
  } catch (error) {
    console.error("Error updating Resident info:", error);
    throw error;
  }
};

// Delete a Resident  
export const deleteResident = async (residentId) => {
  try {
    const response = await axios.delete(`${RESIDENT_ENDPOINTS.RESIDENTS}`, {
      params: { id: residentId }
    });
    return response.data;
  } catch (error) {
    console.error("Error deleting Resident:", error);
    throw error;
  }
};

export const getResidentsMin = async () => {
  try {
    const response = await axios.get(
      `${RESIDENT_ENDPOINTS.RESIDENTS}/min`
    );
    return response.data;
  } catch (error) {
    console.error("Error fetching minimal resident data:", error);
    throw error;
  }
};

export const getResidentBasicInfo = async (residentId) => {
  try {
    const response = await axios.get(RESIDENT_ENDPOINTS.RESIDENT_BASIC_INFO(residentId));
    return response.data;
  } catch (error) {
    console.error("Error fetching resident basic info:", error);
    throw error;
  }
};