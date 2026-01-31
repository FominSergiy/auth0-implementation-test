/**
 * API Client Module
 *
 * Centralized API functions for making requests to the backend.
 * Handles attaching authentication tokens to protected requests.
 *
 * ===========================================================================
 * TODO: Implement authenticated API requests
 * ===========================================================================
 *
 * This module provides helper functions for making API calls.
 * Protected endpoints need the access token in the Authorization header.
 *
 * Usage in components:
 *   import { fetchProtectedData } from '../api/api';
 *   const data = await fetchProtectedData(getAccessTokenSilently);
 */

// API Base URL from environment
const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:5001/api';

/**
 * Fetch Public Data
 *
 * Makes a request to a public endpoint (no authentication required).
 *
 * @returns {Promise<Object>} The response data
 */
export const fetchPublicData = async () => {
  const response = await fetch(`${API_URL}/public`);

  if (!response.ok) {
    throw new Error(`HTTP ${response.status}: ${response.statusText}`);
  }

  return response.json();
};

/**
 * Fetch Public Messages
 *
 * @returns {Promise<Object>} The messages data
 */
export const fetchPublicMessages = async () => {
  const response = await fetch(`${API_URL}/public/messages`);

  if (!response.ok) {
    throw new Error(`HTTP ${response.status}: ${response.statusText}`);
  }

  return response.json();
};

/**
 * Fetch Protected Data
 *
 * Makes an authenticated request to a protected endpoint.
 *
 *
 * @param {Function} getToken - Function from useAuth0 to get token
 * @returns {Promise<Object>} The response data
 *
 * Steps:
 * 1. Call getAccessTokenSilently() to get the access token
 * 2. Include token in Authorization header as "Bearer <token>"
 * 3. Handle errors (401, 403, etc.)
 */
export const fetchProtectedData = async (getToken) => {
  return await authenticatedFetch('/protected', getToken)
};

/**
 * Fetch Protected Profile
 *
 * Gets user profile data extracted from the JWT on the backend.
 *
 *
 * @param {Function} getToken - Function from useAuth0 to get token
 * @returns {Promise<Object>} The profile data
 */
export const fetchProtectedProfile = async (getToken) => {
  return await authenticatedFetch('/protected/profile', getToken)
};

/**
 * Fetch Protected Messages
 *
 * Gets private messages (requires authentication).
 *
 *
 * @param {Function} getToken - Function from useAuth0 to get token
 * @returns {Promise<Object>} The messages data
 */
export const fetchProtectedMessages = async (getToken) => {
  return await authenticatedFetch('/protected/messages', getToken)
};

/**
 * Generic Authenticated Fetch
 *
 * A reusable function for making authenticated requests.
 *
 *
 * @param {string} endpoint - The API endpoint (e.g., '/protected/data')
 * @param {Function} getToken - Function to get access token
 * @param {Object} options - Additional fetch options
 * @returns {Promise<Object>} The response data
 */
export const authenticatedFetch = async (endpoint, getToken, options = {}) => {
  const token = await getToken();

  const headers = {
    ...options.headers,
    Authorization: `Bearer ${token}`
  };

  const response = await fetch(`${API_URL}${endpoint}`, {
    ...options,
    headers
  });


  if (!response.ok) {
    const errorData = await response.json().catch(() => ({}));
    throw new Error(errorData.message || `HTTP ${response.status}: ${response.statusText}`);
  }

  return response.json();
};
