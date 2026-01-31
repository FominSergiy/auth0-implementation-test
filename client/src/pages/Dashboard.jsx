import React, { useState, useEffect} from 'react';
import { Link } from 'react-router-dom';
import { useAuth0 } from '@auth0/auth0-react';
import { fetchPublicData, fetchProtectedData, fetchProtectedProfile } from '../api/api';
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



const Dashboard = () => {
  const { user, getAccessTokenSilently } = useAuth0();


  // State for API responses
  const [publicData, setPublicData] = useState(null);
  const [protectedData, setProtectedData] = useState(null);
  const [profileData, setProfileData] = useState(null);
  const [loading, setLoading] = useState({ public: false, protected: false, profile: false });
  const [errors, setErrors] = useState({ public: null, protected: null, profile: null });


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
      const data = await fetchPublicData();
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
   * Steps:
   * 1. Get access token using getAccessTokenSilently()
   * 2. Include token in Authorization header
   * 3. Handle token errors (expired, missing scope, etc.)
   */
  const fetchProtected = async () => {
    setLoading(prev => ({ ...prev, protected: true }));
    setErrors(prev => ({ ...prev, protected: null }));

    try {
      const data = await fetchProtectedData(getAccessTokenSilently)
      setProtectedData(data);
    } catch (error) {
      setErrors(prev => ({ ...prev, protected: error.message }));
    } finally {
      setLoading(prev => ({ ...prev, protected: false }));
    }
  };

  /**
   * Fetch Profile Data from API
   */
  const fetchProfile = async () => {
    setLoading(prev => ({ ...prev, profile: true }));
    setErrors(prev => ({ ...prev, profile: null }));

    try {
      const data = await fetchProtectedProfile(getAccessTokenSilently)
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
