import axios from "../lib/axios";
import { RESIDENT_ENDPOINTS } from "@/config/api";

const CLINICAL_INFO_ENDPOINTS = {
  CLINICAL_INFO: `${RESIDENT_ENDPOINTS.RESIDENTS}/clinical-info`,
  CLINICAL_INFO_BY_RESIDENT: (residentId) => `${RESIDENT_ENDPOINTS.RESIDENTS}/clinical-info/${residentId}`,
};

// Add Clinical Info
export const addClinicalInfo = async (clinicalData) => {
  try {
    const response = await axios.post(
      CLINICAL_INFO_ENDPOINTS.CLINICAL_INFO,
      clinicalData,
      {
        headers: { 'Content-Type': 'application/json' }
      }
    );
    return response.data;
  } catch (error) {
    console.error("Error adding clinical info:", error);
    throw error;
  }
};

// Get Clinical Info by Resident ID
export const getClinicalInfoByResidentId = async (residentId) => {
  try {
    const response = await axios.get(RESIDENT_ENDPOINTS.RESIDENT_CLINICAL_INFO(residentId));
    return response.data;
  } catch (error) {
    console.error("Error fetching clinical info:", error);
    throw error;
  }
};

// Update Clinical Info
export const updateClinicalInfo = async (clinicalData) => {
  try {
    const response = await axios.put(
      `${RESIDENT_ENDPOINTS.RESIDENTS}/clinical-info`,
      clinicalData,
      {
        headers: { 'Content-Type': 'application/json' }
      }
    );
    return response.data;
  } catch (error) {
    console.error("Error updating clinical info:", error);
    throw error;
  }
};

// Delete Clinical Info
export const deleteClinicalInfo = async (clinicalInfoId) => {
  try {
    const response = await axios.delete(
      `${CLINICAL_INFO_ENDPOINTS.CLINICAL_INFO}/${clinicalInfoId}`
    );
    return response.data;
  } catch (error) {
    console.error("Error deleting clinical info:", error);
    throw error;
  }
};
