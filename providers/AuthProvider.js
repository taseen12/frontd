"use client";

import {
  createContext,
  useContext,
  useState,
  useEffect,
  useCallback,
} from "react";
import {
  storeAuthData,
  clearAuthData,
  getToken,
  getRefreshToken,
  isTokenExpired,
  isRefreshTokenExpired,
  isAuthenticated,
  getUserId,
  getUserphoto,
} from "../utils/auth";
import axiosInstance from "../lib/axios";
import { AUTH_ENDPOINTS } from "../config/api";

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [user, setUser] = useState(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  // Refresh token function
  const refreshToken = useCallback(async () => {
    console.log("Attempting to refresh token");
    const currentRefreshToken = getRefreshToken();

    if (!currentRefreshToken) {
      console.log("No refresh token found");
      return false;
    }

    try {
      const response = await axiosInstance.post(AUTH_ENDPOINTS.GET_LOGIN, {
        token: getToken(),
        refreshToken: currentRefreshToken,
      });

      const data = response.data;
      console.log("Token refreshed successfully");

      // Update stored tokens
      storeAuthData({
        token: data.token,
        refreshToken: data.refreshToken,
        expiration: new Date(Date.now() + 24 * 60 * 60 * 1000).toISOString(), // 24h validity
        refreshTokenExpiration: new Date(
          Date.now() + 7 * 24 * 60 * 60 * 1000
        ).toISOString(), // 7 days validity
      });

      return true;
    } catch (err) {
      console.error("Failed to refresh token:", err);
      return false;
    }
  }, []);

  // Check authentication status
  const checkAuthStatus = useCallback(async () => {
    console.log("Checking auth status");
    setIsLoading(true);

    try {
      // Check if user is authenticated
      const authenticated = isAuthenticated();

      // If token is expired but refresh token is valid, try to refresh
      if (!authenticated && !isRefreshTokenExpired()) {
        console.log("Token expired, attempting refresh");
        const refreshed = await refreshToken();
        if (refreshed) {
          console.log("Token refreshed, user is authenticated");
          setIsLoggedIn(true);
          setUser({ id: getUserId() });
        } else {
          console.log("Token refresh failed, user is not authenticated");
          setIsLoggedIn(false);
          setUser(null);
        }
      } else {
        console.log(
          "Auth status:",
          authenticated ? "Authenticated" : "Not authenticated"
        );
        setIsLoggedIn(authenticated);
        if (authenticated) {
          setUser({ id: getUserId() });
        } else {
          setUser(null);
        }
      }
    } catch (error) {
      console.error("Error checking auth status:", error);
      setIsLoggedIn(false);
      setUser(null);
    } finally {
      setIsLoading(false);
    }
  }, [refreshToken]);

  // Check authentication status on mount and set up refresh interval
  useEffect(() => {
    checkAuthStatus();

    // Set up interval to check token expiry and refresh if needed
    const interval = setInterval(() => {
      if (isTokenExpired() && !isRefreshTokenExpired()) {
        console.log("Token expired, refreshing...");
        refreshToken();
      }
    }, 60000);

    return () => clearInterval(interval);
  }, [checkAuthStatus, refreshToken]);

  // Login function
  const login = useCallback(async (email, password) => {
    setIsLoading(true);
    setError(null);

    try {
      console.log("Attempting login for:", email);
      const response = await axiosInstance.post(AUTH_ENDPOINTS.LOGIN, {
        email,
        password,
      });

      const data = response.data;

      if (data.status !== 0) {
        throw new Error(data.message || "Login failed");
      }

      console.log("Login successful");

      // Store auth data
      storeAuthData(data);
      setIsLoggedIn(true);
      setUser({ id: data.userId });

      return data;
    } catch (err) {
      console.error("Login failed:", err);
      const errorMessage =
        err.response?.data?.message ||
        err.message ||
        "An error occurred during login";
      setError(errorMessage);
      throw new Error(errorMessage);
    } finally {
      setIsLoading(false);
    }
  }, []);

  // Logout function
  const logout = useCallback(() => {
    clearAuthData();
    setIsLoggedIn(false);
    setUser(null);
    getUserphoto(null);
  }, []);

  // Context value
  const value = {
    login,
    logout,
    refreshToken,
    checkAuthStatus,
    isLoading,
    error,
    user,
    isLoggedIn,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === null) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}
