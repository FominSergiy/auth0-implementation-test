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
const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000/api';

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
 * TODO: Implement this function
 *
 * @param {Function} getAccessTokenSilently - Function from useAuth0 to get token
 * @returns {Promise<Object>} The response data
 *
 * Steps:
 * 1. Call getAccessTokenSilently() to get the access token
 * 2. Include token in Authorization header as "Bearer <token>"
 * 3. Handle errors (401, 403, etc.)
 */
export const fetchProtectedData = async (getAccessTokenSilently) => {
  // TODO: Get the access token
  // const token = await getAccessTokenSilently();

  // TODO: Make authenticated request
  // const response = await fetch(`${API_URL}/protected`, {
  //   headers: {
  //     Authorization: `Bearer ${token}`
  //   }
  // });

  // Temporary: Make request without token
  const response = await fetch(`${API_URL}/protected`);

  if (!response.ok) {
    throw new Error(`HTTP ${response.status}: ${response.statusText}`);
  }

  return response.json();
};

/**
 * Fetch Protected Profile
 *
 * Gets user profile data extracted from the JWT on the backend.
 *
 * TODO: Implement this function
 *
 * @param {Function} getAccessTokenSilently - Function from useAuth0 to get token
 * @returns {Promise<Object>} The profile data
 */
export const fetchProtectedProfile = async (getAccessTokenSilently) => {
  // TODO: Implement authenticated request
  // const token = await getAccessTokenSilently();
  // const response = await fetch(`${API_URL}/protected/profile`, {
  //   headers: { Authorization: `Bearer ${token}` }
  // });

  const response = await fetch(`${API_URL}/protected/profile`);

  if (!response.ok) {
    throw new Error(`HTTP ${response.status}: ${response.statusText}`);
  }

  return response.json();
};

/**
 * Fetch Protected Messages
 *
 * Gets private messages (requires authentication).
 *
 * TODO: Implement this function
 *
 * @param {Function} getAccessTokenSilently - Function from useAuth0 to get token
 * @returns {Promise<Object>} The messages data
 */
export const fetchProtectedMessages = async (getAccessTokenSilently) => {
  // TODO: Implement authenticated request
  const response = await fetch(`${API_URL}/protected/messages`);

  if (!response.ok) {
    throw new Error(`HTTP ${response.status}: ${response.statusText}`);
  }

  return response.json();
};

/**
 * Generic Authenticated Fetch
 *
 * A reusable function for making authenticated requests.
 *
 * TODO: Implement this utility function
 *
 * @param {string} endpoint - The API endpoint (e.g., '/protected/data')
 * @param {Function} getAccessTokenSilently - Function to get access token
 * @param {Object} options - Additional fetch options
 * @returns {Promise<Object>} The response data
 */
export const authenticatedFetch = async (endpoint, getAccessTokenSilently, options = {}) => {
  // TODO: Get the access token
  // const token = await getAccessTokenSilently();

  // TODO: Merge headers with auth header
  // const headers = {
  //   ...options.headers,
  //   Authorization: `Bearer ${token}`
  // };

  // TODO: Make the request
  // const response = await fetch(`${API_URL}${endpoint}`, {
  //   ...options,
  //   headers
  // });

  // Temporary implementation without auth
  const response = await fetch(`${API_URL}${endpoint}`, options);

  if (!response.ok) {
    const errorData = await response.json().catch(() => ({}));
    throw new Error(errorData.message || `HTTP ${response.status}: ${response.statusText}`);
  }

  return response.json();
};

/*
 * ===========================================================================
 * IMPLEMENTATION EXAMPLE
 * ===========================================================================
 *
 * export const fetchProtectedData = async (getAccessTokenSilently) => {
 *   // Get the access token from Auth0
 *   const token = await getAccessTokenSilently();
 *
 *   // Make the authenticated request
 *   const response = await fetch(`${API_URL}/protected`, {
 *     headers: {
 *       Authorization: `Bearer ${token}`,
 *       'Content-Type': 'application/json'
 *     }
 *   });
 *
 *   // Handle errors
 *   if (!response.ok) {
 *     if (response.status === 401) {
 *       throw new Error('Unauthorized - please log in again');
 *     }
 *     if (response.status === 403) {
 *       throw new Error('Forbidden - insufficient permissions');
 *     }
 *     throw new Error(`HTTP ${response.status}: ${response.statusText}`);
 *   }
 *
 *   return response.json();
 * };
 *
 * ===========================================================================
 * USAGE IN COMPONENTS
 * ===========================================================================
 *
 * import { useAuth0 } from '@auth0/auth0-react';
 * import { fetchProtectedData } from '../api/api';
 *
 * const MyComponent = () => {
 *   const { getAccessTokenSilently } = useAuth0();
 *
 *   const handleFetch = async () => {
 *     try {
 *       const data = await fetchProtectedData(getAccessTokenSilently);
 *       console.log(data);
 *     } catch (error) {
 *       console.error('Error:', error);
 *     }
 *   };
 *
 *   return <button onClick={handleFetch}>Fetch Data</button>;
 * };
 *
 * ===========================================================================
 * GENERIC AUTHENTICATED FETCH EXAMPLE
 * ===========================================================================
 *
 * export const authenticatedFetch = async (endpoint, getAccessTokenSilently, options = {}) => {
 *   const token = await getAccessTokenSilently();
 *
 *   const response = await fetch(`${API_URL}${endpoint}`, {
 *     ...options,
 *     headers: {
 *       'Content-Type': 'application/json',
 *       ...options.headers,
 *       Authorization: `Bearer ${token}`
 *     }
 *   });
 *
 *   if (!response.ok) {
 *     const error = await response.json().catch(() => ({}));
 *     throw new Error(error.message || `Request failed: ${response.status}`);
 *   }
 *
 *   return response.json();
 * };
 *
 * // Usage:
 * const data = await authenticatedFetch('/protected/data', getAccessTokenSilently);
 * const result = await authenticatedFetch('/protected/items', getAccessTokenSilently, {
 *   method: 'POST',
 *   body: JSON.stringify({ name: 'New Item' })
 * });
 *
 * ===========================================================================
 */
