import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

/**
 * Dashboard Page Component
 *
 * Protected page that demonstrates authenticated API calls.
 * Shows data fetched from protected backend endpoints.
 *
 * ===========================================================================
 * TODO: Implement authenticated API calls using useAuth0
 * ===========================================================================
 *
 * Steps:
 * 1. Import useAuth0 hook
 * 2. Get getAccessTokenSilently from the hook
 * 3. Use the token when making API requests
 * 4. Import and use the api.js module for making requests
 */

// TODO: Import useAuth0
// import { useAuth0 } from '@auth0/auth0-react';

// TODO: Import the API module
// import { fetchPublicData, fetchProtectedData } from '../api/api';

const Dashboard = () => {
  // TODO: Get auth functions from useAuth0
  // const { user, getAccessTokenSilently } = useAuth0();

  // Temporary placeholder
  const user = { name: 'User', email: 'user@example.com' };

  // State for API responses
  const [publicData, setPublicData] = useState(null);
  const [protectedData, setProtectedData] = useState(null);
  const [profileData, setProfileData] = useState(null);
  const [loading, setLoading] = useState({ public: false, protected: false, profile: false });
  const [errors, setErrors] = useState({ public: null, protected: null, profile: null });

  // API base URL
  const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000/api';

  /**
   * Fetch Public Data
   *
   * This endpoint doesn't require authentication.
   * Used to verify API connectivity.
   */
  const fetchPublic = async () => {
    setLoading(prev => ({ ...prev, public: true }));
    setErrors(prev => ({ ...prev, public: null }));

    try {
      const response = await fetch(`${API_URL}/public`);
      const data = await response.json();
      setPublicData(data);
    } catch (error) {
      setErrors(prev => ({ ...prev, public: error.message }));
    } finally {
      setLoading(prev => ({ ...prev, public: false }));
    }
  };

  /**
   * Fetch Protected Data
   *
   * TODO: Implement authenticated API call
   *
   * Steps:
   * 1. Get access token using getAccessTokenSilently()
   * 2. Include token in Authorization header
   * 3. Handle token errors (expired, missing scope, etc.)
   */
  const fetchProtected = async () => {
    setLoading(prev => ({ ...prev, protected: true }));
    setErrors(prev => ({ ...prev, protected: null }));

    try {
      // TODO: Get access token
      // const token = await getAccessTokenSilently();

      // TODO: Make authenticated request
      // const response = await fetch(`${API_URL}/protected`, {
      //   headers: {
      //     Authorization: `Bearer ${token}`
      //   }
      // });

      // Temporary: Make request without token (will fail if auth middleware is enabled)
      const response = await fetch(`${API_URL}/protected`);

      if (!response.ok) {
        throw new Error(`HTTP ${response.status}: ${response.statusText}`);
      }

      const data = await response.json();
      setProtectedData(data);
    } catch (error) {
      setErrors(prev => ({ ...prev, protected: error.message }));
    } finally {
      setLoading(prev => ({ ...prev, protected: false }));
    }
  };

  /**
   * Fetch Profile Data from API
   *
   * TODO: Implement authenticated API call to get profile from token
   */
  const fetchProfile = async () => {
    setLoading(prev => ({ ...prev, profile: true }));
    setErrors(prev => ({ ...prev, profile: null }));

    try {
      // TODO: Get access token and make authenticated request
      // const token = await getAccessTokenSilently();
      // const response = await fetch(`${API_URL}/protected/profile`, {
      //   headers: { Authorization: `Bearer ${token}` }
      // });

      // Temporary: Make request without token
      const response = await fetch(`${API_URL}/protected/profile`);

      if (!response.ok) {
        throw new Error(`HTTP ${response.status}: ${response.statusText}`);
      }

      const data = await response.json();
      setProfileData(data);
    } catch (error) {
      setErrors(prev => ({ ...prev, profile: error.message }));
    } finally {
      setLoading(prev => ({ ...prev, profile: false }));
    }
  };

  // Fetch public data on mount
  useEffect(() => {
    fetchPublic();
  }, []);

  return (
    <div>
      {/* Header */}
      <div className="card">
        <h1>Dashboard</h1>
        <p className="text-muted mt-1">
          Welcome, {user?.name || 'User'}! This is a protected page.
        </p>
        <div className="mt-2">
          <Link to="/profile" className="btn btn-outline" style={{ marginRight: '0.5rem' }}>
            View Full Profile
          </Link>
        </div>
      </div>

      {/* API Testing Section */}
      <div className="dashboard-grid">
        {/* Public API Card */}
        <div className="card">
          <div className="card-header">
            <h3 className="card-title">Public API</h3>
            <p className="card-subtitle">No authentication required</p>
          </div>

          <button
            className="btn btn-primary"
            onClick={fetchPublic}
            disabled={loading.public}
          >
            {loading.public ? 'Loading...' : 'Fetch Public Data'}
          </button>

          {errors.public && (
            <div className="error-message mt-2">
              Error: {errors.public}
            </div>
          )}

          {publicData && (
            <div className="mt-2">
              <span className="status-badge success">Success</span>
              <div className="api-response mt-1">
                <pre>{JSON.stringify(publicData, null, 2)}</pre>
              </div>
            </div>
          )}
        </div>

        {/* Protected API Card */}
        <div className="card">
          <div className="card-header">
            <h3 className="card-title">Protected API</h3>
            <p className="card-subtitle">Requires valid JWT token</p>
          </div>

          <button
            className="btn btn-primary"
            onClick={fetchProtected}
            disabled={loading.protected}
          >
            {loading.protected ? 'Loading...' : 'Fetch Protected Data'}
          </button>

          {errors.protected && (
            <div className="error-message mt-2">
              Error: {errors.protected}
            </div>
          )}

          {protectedData && (
            <div className="mt-2">
              <span className="status-badge success">Success</span>
              <div className="api-response mt-1">
                <pre>{JSON.stringify(protectedData, null, 2)}</pre>
              </div>
            </div>
          )}

          <p className="text-muted mt-2" style={{ fontSize: '0.85rem' }}>
            TODO: Implement getAccessTokenSilently() to get the token
          </p>
        </div>

        {/* Profile API Card */}
        <div className="card">
          <div className="card-header">
            <h3 className="card-title">Profile from Token</h3>
            <p className="card-subtitle">User info extracted from JWT</p>
          </div>

          <button
            className="btn btn-primary"
            onClick={fetchProfile}
            disabled={loading.profile}
          >
            {loading.profile ? 'Loading...' : 'Fetch Profile from API'}
          </button>

          {errors.profile && (
            <div className="error-message mt-2">
              Error: {errors.profile}
            </div>
          )}

          {profileData && (
            <div className="mt-2">
              <span className="status-badge success">Success</span>
              <div className="api-response mt-1">
                <pre>{JSON.stringify(profileData, null, 2)}</pre>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Instructions */}
      <div className="card mt-3">
        <h3 style={{ marginBottom: '1rem' }}>Implementation Notes</h3>
        <p>
          The public endpoint should work immediately. The protected endpoints will return
          401 Unauthorized until you:
        </p>
        <ol style={{ paddingLeft: '1.5rem', lineHeight: '2', marginTop: '0.5rem' }}>
          <li>Configure Auth0Provider in <code>auth/Auth0ProviderWithHistory.jsx</code></li>
          <li>Implement <code>getAccessTokenSilently()</code> in this file</li>
          <li>Implement JWT middleware in <code>server/src/middleware/auth.js</code></li>
          <li>Apply middleware to routes in <code>server/src/routes/protected.js</code></li>
        </ol>
      </div>
    </div>
  );
};

export default Dashboard;

/*
 * ===========================================================================
 * IMPLEMENTATION EXAMPLE
 * ===========================================================================
 *
 * import { useAuth0 } from '@auth0/auth0-react';
 *
 * const Dashboard = () => {
 *   const { user, getAccessTokenSilently } = useAuth0();
 *
 *   const fetchProtected = async () => {
 *     try {
 *       // Get the access token
 *       const token = await getAccessTokenSilently();
 *
 *       // Make authenticated request
 *       const response = await fetch('http://localhost:5000/api/protected', {
 *         headers: {
 *           Authorization: `Bearer ${token}`
 *         }
 *       });
 *
 *       const data = await response.json();
 *       console.log(data);
 *     } catch (error) {
 *       console.error('Error:', error);
 *     }
 *   };
 *
 *   return (
 *     <button onClick={fetchProtected}>Fetch Data</button>
 *   );
 * };
 *
 * ===========================================================================
 * getAccessTokenSilently OPTIONS
 * ===========================================================================
 *
 * // Basic usage
 * const token = await getAccessTokenSilently();
 *
 * // With specific audience (if different from default)
 * const token = await getAccessTokenSilently({
 *   authorizationParams: {
 *     audience: 'https://my-api.example.com'
 *   }
 * });
 *
 * // Force refresh (bypass cache)
 * const token = await getAccessTokenSilently({
 *   cacheMode: 'off'
 * });
 *
 * ===========================================================================
 * ERROR HANDLING
 * ===========================================================================
 *
 * Common errors:
 * - "Login required": User session expired, need to re-authenticate
 * - "Consent required": User needs to grant permissions
 * - "Missing Refresh Token": Can't silently refresh, need login
 *
 * try {
 *   const token = await getAccessTokenSilently();
 * } catch (error) {
 *   if (error.error === 'login_required') {
 *     // Redirect to login
 *     loginWithRedirect();
 *   }
 * }
 *
 * ===========================================================================
 */
