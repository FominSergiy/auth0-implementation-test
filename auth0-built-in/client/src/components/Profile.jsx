import React from 'react';
import { useAuth0 } from '@auth0/auth0-react';

/**
 * Profile Component
 *
 * Displays the authenticated user's profile information.
 *
 * ===========================================================================
 * TODO: Implement profile display using useAuth0 hook
 * ===========================================================================
 *
 * Steps:
 * 1. Import useAuth0 hook from @auth0/auth0-react
 * 2. Destructure user, isAuthenticated, isLoading from the hook
 * 3. Handle loading state
 * 4. Display user information from the user object
 */


const Profile = () => {
  const { user, isAuthenticated, isLoading } = useAuth0();


  // Handle loading state
  if (isLoading) {
    return (
      <div className="loading-container">
        <div className="spinner"></div>
        <p className="mt-2">Loading profile...</p>
      </div>
    );
  }

  // Handle not authenticated
  if (!isAuthenticated || !user) {
    return (
      <div className="card">
        <h2>Profile</h2>
        <p className="mt-2 text-muted">
          Please log in to view your profile.
        </p>
        {/* TODO: This message should not appear if ProtectedRoute is working */}
      </div>
    );
  }

  /**
   * User object properties (from ID token):
   *
   * Standard OIDC claims:
   * - sub: User ID (unique identifier)
   * - name: Full name
   * - nickname: Display name
   * - picture: Profile picture URL
   * - email: Email address
   * - email_verified: Boolean
   * - updated_at: Last profile update
   *
   * Additional claims depend on scopes requested and identity provider.
   */

  return (
    <div className="card">
      <div className="card-header">
        <h2 className="card-title">User Profile</h2>
        <p className="card-subtitle">Information from your identity provider</p>
      </div>

      {/* Profile Header */}
      <div className="profile-container">
        {user.picture && (
          <img
            src={user.picture}
            alt={user.name || 'Profile'}
            className="profile-avatar"
          />
        )}
        <div className="profile-info">
          <h2>{user.name || 'Unknown User'}</h2>
          <p>{user.email || 'No email provided'}</p>
        </div>
      </div>

      {/* Profile Details */}
      <div className="profile-details">
        <div className="profile-field">
          <span className="profile-field-label">User ID:</span>
          <span>{user.sub}</span>
        </div>

        {user.nickname && (
          <div className="profile-field">
            <span className="profile-field-label">Nickname:</span>
            <span>{user.nickname}</span>
          </div>
        )}

        {user.email && (
          <div className="profile-field">
            <span className="profile-field-label">Email:</span>
            <span>
              {user.email}
              {user.email_verified && (
                <span className="status-badge success ml-2" style={{ marginLeft: '0.5rem' }}>
                  Verified
                </span>
              )}
            </span>
          </div>
        )}

        {user.updated_at && (
          <div className="profile-field">
            <span className="profile-field-label">Last Updated:</span>
            <span>{new Date(user.updated_at).toLocaleString()}</span>
          </div>
        )}
      </div>

      {/* Raw User Data (for debugging) */}
      <div className="mt-3">
        <h4 style={{ marginBottom: '0.5rem' }}>Raw User Data:</h4>
        <div className="api-response">
          <pre>{JSON.stringify(user, null, 2)}</pre>
        </div>
      </div>
    </div>
  );
};

export default Profile;

/*
 * ===========================================================================
 * IMPLEMENTATION EXAMPLE
 * ===========================================================================
 *
 * import { useAuth0 } from '@auth0/auth0-react';
 *
 * const Profile = () => {
 *   const { user, isAuthenticated, isLoading } = useAuth0();
 *
 *   if (isLoading) {
 *     return <div>Loading...</div>;
 *   }
 *
 *   if (!isAuthenticated || !user) {
 *     return <div>Please log in</div>;
 *   }
 *
 *   return (
 *     <div>
 *       <img src={user.picture} alt={user.name} />
 *       <h2>{user.name}</h2>
 *       <p>{user.email}</p>
 *     </div>
 *   );
 * };
 *
 * ===========================================================================
 * USER OBJECT PROPERTIES
 * ===========================================================================
 *
 * The user object comes from the ID token and includes:
 *
 * Standard Claims:
 * - sub: Subject (unique user ID)
 * - name: Full name
 * - given_name: First name
 * - family_name: Last name
 * - nickname: Display name
 * - picture: Profile picture URL
 * - email: Email address
 * - email_verified: Boolean
 * - locale: Language preference
 * - updated_at: Last profile update timestamp
 *
 * Social Provider Claims (vary by provider):
 * - identities: Array of linked social accounts
 *
 * ===========================================================================
 * SOCIAL PROVIDER DIFFERENCES
 * ===========================================================================
 *
 * Google:
 * - Usually provides: name, email, picture, email_verified
 * - sub format: google-oauth2|123456789
 *
 * GitHub:
 * - Usually provides: name, nickname, picture, email
 * - sub format: github|123456
 * - May include: login (GitHub username)
 *
 * The Auth0 SDK normalizes these into a consistent format.
 *
 * ===========================================================================
 */
