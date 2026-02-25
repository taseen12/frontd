import axios from "../lib/axios";
import { OTHERS_API_ENDPOINTS } from "@/config/api";

export const getRooms = async ({ page = 1, limit = 10 } = {}) => {
  try {
    const response = await axios.get(
      `${OTHERS_API_ENDPOINTS.ROOMS}?page=${page}&limit=${limit}`
      );
    return response.data;
  } catch (error) {
    console.error("Error fetching rooms:", error);
    throw error;
  }
};

export const getAvailableRooms = async ({ page = 1, limit = 10 } = {}) => {
  try {
    const response = await axios.get(
      `${OTHERS_API_ENDPOINTS.AVAILABLE_ROOMS}?page=${page}&limit=${limit}`
      );
    return response.data;
  } catch (error) {
    console.error("Error fetching rooms:", error);
    throw error;
  }
};

export const addRoom = async (payload) => {
  try {
    const body = { room: { createdAt: new Date().toISOString(), ...payload } };
    const response = await axios.post(OTHERS_API_ENDPOINTS.ROOMS, body, {
      headers: { 'Content-Type': 'application/json' }
    });
    return response.data;
  } catch (error) {
    console.error("Error adding room:", error);
    throw error;
  }
};

export const editRoom = async (payload) => {
  try {
    const body = { room: payload };
    const response = await axios.put(OTHERS_API_ENDPOINTS.ROOMS, body, {
      headers: { 'Content-Type': 'application/json' }
    });
    return response.data;
  } catch (error) {
    console.error("Error updating room:", error);
    throw error;
  }
};

export const deleteRoom = async (id) => {
  try {
    const response = await axios.delete(OTHERS_API_ENDPOINTS.ROOMS, {
      params: { id }
    });
    return response.data;
  } catch (error) {
    console.error("Error deleting room:", error);
    throw error;
  }
};