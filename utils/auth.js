// Token storage keys
const TOKEN_KEY = "auth_token";
const REFRESH_TOKEN_KEY = "auth_refresh_token";
const TOKEN_EXPIRY_KEY = "auth_token_expiry";
const REFRESH_TOKEN_EXPIRY_KEY = "auth_refresh_token_expiry";
const USER_ID_KEY = "auth_user_id";
const USER_PHOTO_KEY = "auth_user_photo_url";
const PASSWORD_CHANGED = "auth_password_changed";

// Store auth data in localStorage
export const storeAuthData = (authData) => {
  if (typeof window === "undefined") return;

  localStorage.setItem(TOKEN_KEY, authData.token);
  localStorage.setItem(REFRESH_TOKEN_KEY, authData.refreshToken);
  localStorage.setItem(TOKEN_EXPIRY_KEY, authData.expiration);
  localStorage.setItem(
    REFRESH_TOKEN_EXPIRY_KEY,
    authData.refreshTokenExpiration
  );
  if (authData.passwordChangeRequired === true) {
    localStorage.setItem(PASSWORD_CHANGED, "true");
  }

  if (authData.userId) {
    localStorage.setItem(USER_ID_KEY, authData.userId);
  }

  if (authData.imagePath) {
    localStorage.setItem(USER_PHOTO_KEY, authData.imagePath);
  }
};

// Get stored token
export const getToken = () => {
  if (typeof window === "undefined") return null;
  return localStorage.getItem(TOKEN_KEY);
};

// Get stored refresh token
export const getRefreshToken = () => {
  if (typeof window === "undefined") return null;
  return localStorage.getItem(REFRESH_TOKEN_KEY);
};

// Get token expiry
export const getTokenExpiry = () => {
  if (typeof window === "undefined") return null;
  const expiry = localStorage.getItem(TOKEN_EXPIRY_KEY);
  return expiry ? new Date(expiry) : null;
};

// Get refresh token expiry
export const getRefreshTokenExpiry = () => {
  if (typeof window === "undefined") return null;
  const expiry = localStorage.getItem(REFRESH_TOKEN_EXPIRY_KEY);
  return expiry ? new Date(expiry) : null;
};

// Get user ID
export const getUserId = () => {
  if (typeof window === "undefined") return null;
  return localStorage.getItem(USER_ID_KEY);
};

// Clear auth data
export const clearAuthData = () => {
  if (typeof window === "undefined") return;

  localStorage.removeItem(TOKEN_KEY);
  localStorage.removeItem(REFRESH_TOKEN_KEY);
  localStorage.removeItem(TOKEN_EXPIRY_KEY);
  localStorage.removeItem(REFRESH_TOKEN_EXPIRY_KEY);
  localStorage.removeItem(USER_ID_KEY);
  localStorage.removeItem(USER_PHOTO_KEY);
  localStorage.removeItem(PASSWORD_CHANGED);
};

// Check if token is expired
export const isTokenExpired = () => {
  const expiry = getTokenExpiry();
  if (!expiry) return true;

  return new Date() > new Date(expiry);
};

// Check if refresh token is expired
export const isRefreshTokenExpired = () => {
  const expiry = getRefreshTokenExpiry();
  if (!expiry) return true;

  return new Date() > new Date(expiry);
};

// Check if user is authenticated
export const isAuthenticated = () => {
  const token = getToken();
  if (!token) return false;

  return !isTokenExpired();
};

export const getUserphoto = () => {
  if (typeof window === "undefined") return null;
  return localStorage.getItem(USER_PHOTO_KEY);
};

// Add a function to get the passwordChangeRequired flag
export const getPasswordChangeRequired = () => {
  if (typeof window === "undefined") return null;
  return localStorage.getItem(PASSWORD_CHANGED);
};
