import { AUTH_ENDPOINTS } from "../config/api";
import { storeAuthData, getToken, getRefreshToken } from "../utils/auth";
import axiosInstance from "../lib/axios";

// Login service
export const loginService = async (email, password) => {
  try {
    const response = await axiosInstance.post(AUTH_ENDPOINTS.LOGIN, {
      email,
      password,
    });

    const data = response.data;

    // if (data.status !== 200) {
    //   throw new Error(data.message || "Login failed");
    // }

    // Store auth data
    storeAuthData(data);

    return data;
  } catch (error) {
    throw error;
  }
};

// Refresh token service
export const refreshTokenService = async () => {
  try {
    const response = await axiosInstance.post(AUTH_ENDPOINTS.GET_LOGIN, {
      token: getToken(),
      refreshToken: getRefreshToken(),
    });

    const data = response.data;

    // Update stored tokens
    storeAuthData({
      token: data.token,
      refreshToken: data.refreshToken,
      expiration: new Date(Date.now() + 24 * 60 * 60 * 1000).toISOString(), // Assuming 24h validity
      refreshTokenExpiration: new Date(
        Date.now() + 7 * 24 * 60 * 60 * 1000
      ).toISOString(), // Assuming 7 days validity
    });

    return data;
  } catch (error) {
    throw error;
  }
};
