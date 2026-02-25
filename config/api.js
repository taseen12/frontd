// API base URL from environment variables
export const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;
export const SOCKET_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;
export const CAMERA_BASE_URL = process.env.NEXT_PUBLIC_API_CAMERA_URL;

// Auth endpoints
export const AUTH_ENDPOINTS = {
  LOGIN: `${API_BASE_URL}/api/Login`,
  GET_LOGIN: `${API_BASE_URL}/api/Login/GetToken`,
};

export const CONNECTION = {
  SOCKET: `${API_BASE_URL}/live-status`,
  CAMERA: `${CAMERA_BASE_URL}/cam1/index.m3u8`,
};

export const MONITORING = {
  POLICY: `${API_BASE_URL}/api/HealthPolicys`,
};

export const RESIDENT_ENDPOINTS = {
  RESIDENT_ID: `${API_BASE_URL}/api/Residents/ids`,
  RESIDENTS: `${API_BASE_URL}/api/Residents`,
  RESIDENT_PROFILE: (residentId) =>
    `${API_BASE_URL}/api/Residents?id=${residentId}`,
  RESIDENT_BASIC_INFO: (residentId) =>
    `${API_BASE_URL}/api/residents/basic-info?id=${residentId}`,
  RESIDENT_AUTHORIZED_REPRESENTATIVE: (residentId) =>
    `${API_BASE_URL}/api/residents/authorized-representative?id=${residentId}`,
  RESIDENT_CLINICAL_INFO: (residentId) =>
    `${API_BASE_URL}/api/residents/clinical-info?id=${residentId}`,
  RESIDENT_LIFESTYLE_INFO: (residentId) =>
    `${API_BASE_URL}/api/residents/lifestyle-info?id=${residentId}`,
};

export const OTHERS_API_ENDPOINTS = {
  ROOMS: `${API_BASE_URL}/api/Rooms`,
  AVAILABLE_ROOMS: `${API_BASE_URL}/api/Rooms/available`,
  GROUPS: `${API_BASE_URL}/api/Groups`,
  GENDERS: `${API_BASE_URL}/api/config/Genders`,
  ROLES: `${API_BASE_URL}/api/Roles`,
};

export const POLICY_ENDPOINTS = {
  ACTIVITY_POLICY: `${API_BASE_URL}/api/activitypolicys`,
  HEALTH_POLICY: `${API_BASE_URL}/api/HealthPolicys`,
};

export const ACTIVITY_API_ENDPOINTS = {
ACTIVITY_LOG: (patientId, period) =>
  `${API_BASE_URL}/api/ActivityLogs?patientId=${patientId}&startDate=${period}`,
  ACTIVITY_ALERT: (patientId) => `${API_BASE_URL}/api/Alerts/activity-alerts?patientId=${patientId}`,
  ACTIVITY_HISTORY: (patientId) => `${API_BASE_URL}/api/Alerts/health-alerts?patientId=${patientId}`,
  WASHROOM_ACTIVITY: `${API_BASE_URL}/api/WashRoomActivity`,
  SENSOR_ID: `${API_BASE_URL}/api/WashRoomSensors/sensorIds`,
};

export const CONFIG_ENDPOINTS = {
  ACTIVITY_LEVELS: `${API_BASE_URL}/api/Config/activity-levels`,
  ACTIVITY_TYPES: `${API_BASE_URL}/api/Config/activity-types`,
  HEALTH_LEVELS: `${API_BASE_URL}/api/Config/health-levels`,
  HEALTH_TYPES: `${API_BASE_URL}/api/Config/health-types`,
  GENDERS: `${API_BASE_URL}/api/config/genders`,
  INDIGENOUS_STATUS: `${API_BASE_URL}/api/config/indigenous-status`,
  LEGAL_AUTHORITY_STATUS: `${API_BASE_URL}/api/config/legal-authority-status`,
  MOBILITY_STATUS: `${API_BASE_URL}/api/config/mobility-status`,
  COGNITIVE_STATUS: `${API_BASE_URL}/api/config/cognitive-status`,
  DIETARY_STATUS: `${API_BASE_URL}/api/config/dietary-status`,
  HOBBYS: `${API_BASE_URL}/api/config/hobbys`,
};
