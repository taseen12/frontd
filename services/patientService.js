import axios from "../lib/axios";
import { RESIDENT_ENDPOINTS } from "@/config/api";

export const getPatientProfile = async (patientId) => {
  try {
    const response = await axios.get(RESIDENT_ENDPOINTS.PATIENT_PROFILE(patientId));
    return response.data;
  } catch (error) {
    console.error("Error fetching Patient profile:", error);
    throw error;
  }
};

// Get all Patient
export const getPatients = async () => {
  try {
    const response = await axios.get(
      `${RESIDENT_ENDPOINTS.RESIDENTS}`
    );
    return response.data;
  } catch (error) {
    console.error("Error fetching Patients:", error);
    throw error;
  }
};

// Add new Patient
export const addPatient = async (formData) => {
  
  try {
    const response = await axios.post(RESIDENT_ENDPOINTS.RESIDENTS, {
      patient: formData
    });
    return response.data;
  } catch (error) {
    console.error("Error adding Patient:", error);
    throw error;
  }
};

// Get Patient by ID
export const getPatientById = async (patientId) => {
  try {
    const response = await axios.get(`${RESIDENT_ENDPOINTS.RESIDENTS}`, {
      params: { id: patientId }
    });
    
    return {
      patients: response.data.patient || response.data
    };
  } catch (error) {
    console.error("Error fetching Patient:", error);
    throw error;
  }
};

export const editPatient = async (formData) => {
  try {
    const payload = { patient: formData };

    // Send the payload to the API
    const response = await axios.put(RESIDENT_ENDPOINTS.RESIDENTS, payload);
    return response.data;
  } catch (error) {
    console.error("Error updating Patient info:", error);
    throw error;
  }
};

// Delete a Patient  
export const deletePatient = async (patientId) => {
  try {
    const response = await axios.delete(`${RESIDENT_ENDPOINTS.RESIDENTS}`, {
      params: { id: patientId }
    });
    return response.data;
  } catch (error) {
    console.error("Error deleting Patient:", error);
    throw error;
  }
};

export const getPatientsMin = async () => {
  try {
    const response = await axios.get(
      `${RESIDENT_ENDPOINTS.RESIDENTS}/min`
    );
    return response.data;
  } catch (error) {
    console.error("Error fetching minimal patient data:", error);
    throw error;
  }
};