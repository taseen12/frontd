import axios from "axios";
import {
  getToken,
  getRefreshToken,
  storeAuthData,
  clearAuthData,
  isTokenExpired,
} from "../utils/auth";
import { API_BASE_URL, AUTH_ENDPOINTS } from "../config/api";

// Create axios instance
const axiosInstance = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

// Request interceptor for adding auth token
axiosInstance.interceptors.request.use(
  async (config) => {
    // Skip token for login and refresh endpoints
    const isAuthEndpoint =
      config.url === AUTH_ENDPOINTS.LOGIN ||
      config.url === AUTH_ENDPOINTS.GET_LOGIN;

    if (isAuthEndpoint) {
      return config;
    }

    let token = getToken();

    // If token is expired, try to refresh it
    if (token && isTokenExpired()) {
      console.log("Token expired, refreshing before request");
      try {
        const response = await axios.post(
          `${API_BASE_URL}${AUTH_ENDPOINTS.GET_LOGIN}`,
          {
            token: token,
            refreshToken: getRefreshToken(),
          }
        );

        const data = response.data;

        // Update stored tokens
        storeAuthData({
          token: data.token,
          refreshToken: data.refreshToken,
          expiration: new Date(Date.now() + 24 * 60 * 60 * 1000).toISOString(),
          refreshTokenExpiration: new Date(
            Date.now() + 7 * 24 * 60 * 60 * 1000
          ).toISOString(),
        });

        token = data.token;
      } catch (error) {
        console.error("Failed to refresh token:", error);
        clearAuthData();

        if (typeof window !== "undefined") {
          window.location.href = "/";
        }

        return Promise.reject(error);
      }
    }

    // Add token to request
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor for handling errors
axiosInstance.interceptors.response.use(
  (response) => response,
  (error) => {
    // Handle 401 Unauthorized errors
    if (error.response && error.response.status === 401) {
      console.error("Unauthorized request:", error);

      // Clear auth data and redirect to login
      clearAuthData();
      if (typeof window !== "undefined") {
        window.location.href = "/";
      }
    }
    return Promise.reject(error);
  }
);

export default axiosInstance;
