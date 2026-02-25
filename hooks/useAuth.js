"use client";

import { useState, useCallback, useEffect } from "react";

import { loginService, refreshTokenService } from "./../services/authService";
import {
  clearAuthData,
  getRefreshToken,
  isTokenExpired,
  isRefreshTokenExpired,
  isAuthenticated,
  getUserId,
  getUserphoto,
} from "./../utils/auth";

export function useAuth() {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [user, setUser] = useState({ id: null });
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  // Check authentication status on mount
  useEffect(() => {
    const checkAuth = () => {
      const authenticated = isAuthenticated();
      setIsLoggedIn(authenticated);
      if (authenticated) {
        setUser({ id: getUserId() });
      }
    };

    checkAuth();

    // Set up interval to check token expiry
    const interval = setInterval(() => {
      if (isTokenExpired() && !isRefreshTokenExpired()) {
        refreshToken();
      }
    }, 60000);

    return () => clearInterval(interval);
  }, []);

  // Login function
  const login = useCallback(async (email, password) => {
    setIsLoading(true);
    setError(null);

    try {
      const data = await loginService(email, password);
      const userId = data.userId;
      setIsLoggedIn(true);

      if (!userId) {
        throw new Error("Could not determine user ID from token");
      }

      // if (data.passwordChangeRequired) {
      //   router.push("/profile");
      // } else {
      //   router.push("/home");
      // }

      return data;
    } catch (err) {
      const errorMessage =
        err.response?.data || err.message || "An error occurred during login";
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

  // Refresh token function
  const refreshToken = useCallback(async () => {
    const currentRefreshToken = getRefreshToken();

    if (!currentRefreshToken) {
      logout();
      return;
    }

    setIsLoading(true);

    try {
      const data = await refreshTokenService();
      setIsLoggedIn(true);
      return data;
    } catch {
      logout();
      setError("Session expired. Please login again.");
    } finally {
      setIsLoading(false);
    }
  }, [logout]);

  return {
    login,
    logout,
    refreshToken,
    isLoading,
    error,
    user,
    isLoggedIn,
  };
}
