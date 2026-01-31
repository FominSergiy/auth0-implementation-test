import React from 'react';

/**
 * Callback Page Component
 *
 * This page handles the redirect from Auth0 after authentication.
 * The Auth0 SDK automatically processes the callback URL parameters.
 *
 * In most cases, you won't need custom logic here because:
 * 1. Auth0Provider handles the callback automatically
 * 2. onRedirectCallback in Auth0Provider handles navigation
 *
 * This page just shows a loading state while the SDK processes the callback.
 */
const Callback = () => {
  return (
    <div className="loading-container" style={{ minHeight: '50vh' }}>
      <div className="spinner"></div>
      <p className="mt-2">Processing authentication...</p>
      <p className="text-muted mt-1" style={{ fontSize: '0.9rem' }}>
        You will be redirected shortly.
      </p>
    </div>
  );
};

export default Callback;

/*
 * ===========================================================================
 * HOW THE CALLBACK WORKS
 * ===========================================================================
 *
 * 1. User clicks "Login" → redirected to Auth0
 * 2. User authenticates (password, social, etc.)
 * 3. Auth0 redirects back to: http://localhost:3000/callback?code=xxx&state=yyy
 * 4. Auth0Provider detects the callback URL parameters
 * 5. SDK exchanges the authorization code for tokens
 * 6. onRedirectCallback is called with appState
 * 7. User is redirected to the original page (or home)
 *
 * ===========================================================================
 * URL PARAMETERS
 * ===========================================================================
 *
 * After authentication, Auth0 redirects with:
 * - code: Authorization code (exchanged for tokens)
 * - state: CSRF protection + appState (returnTo, etc.)
 *
 * The SDK automatically:
 * - Validates the state parameter
 * - Exchanges code for tokens using PKCE
 * - Stores tokens in memory
 * - Clears URL parameters
 *
 * ===========================================================================
 * ERROR HANDLING
 * ===========================================================================
 *
 * If authentication fails, Auth0 redirects with:
 * - error: Error code (e.g., "access_denied")
 * - error_description: Human-readable message
 *
 * The SDK handles these errors and they can be accessed via:
 * const { error } = useAuth0();
 *
 * ===========================================================================
 * CUSTOM CALLBACK HANDLING (Advanced)
 * ===========================================================================
 *
 * If you need custom callback logic:
 *
 * import { useAuth0 } from '@auth0/auth0-react';
 * import { useEffect } from 'react';
 * import { useNavigate } from 'react-router-dom';
 *
 * const Callback = () => {
 *   const { error, isLoading } = useAuth0();
 *   const navigate = useNavigate();
 *
 *   useEffect(() => {
 *     if (error) {
 *       console.error('Auth error:', error);
 *       navigate('/error');
 *     }
 *   }, [error, navigate]);
 *
 *   if (isLoading) {
 *     return <div>Loading...</div>;
 *   }
 *
 *   return <div>Redirecting...</div>;
 * };
 *
 * ===========================================================================
 */
