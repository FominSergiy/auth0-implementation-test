import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Auth0Provider } from '@auth0/auth0-react';
import { useCallback } from 'react';


/**
 * Auth0 Provider Wrapper with React Router Integration
 *
 * This component wraps the application with Auth0Provider and integrates
 * with React Router for handling redirects after authentication.
 *
 * ===========================================================================
 * TODO: Implement the Auth0Provider configuration
 * ===========================================================================
 */


const Auth0ProviderWithHistory = ({ children }) => {
  const navigate = useNavigate();

  const domain = process.env.REACT_APP_AUTH0_DOMAIN;                        
  const clientId = process.env.REACT_APP_AUTH0_CLIENT_ID;                   
  const audience = process.env.REACT_APP_AUTH0_AUDIENCE;  


  /**
   * Callback function called after Auth0 redirects back to the app.
   * Used to restore the user to where they were before logging in.
   *
   * @param {object} appState - State passed to loginWithRedirect
   */
  const onRedirectCallback = useCallback((appState) => {
    // Navigate to the returnTo path or default to home
    navigate(appState?.returnTo || window.location.pathname);
  }, [navigate])

  return (
    <Auth0Provider
      domain={domain}
      clientId={clientId}
      authorizationParams={{
        redirect_uri: window.location.origin,
        audience: audience,
        scope: "openid profile email",
      }}
      onRedirectCallback={onRedirectCallback}
      cacheLocation='localstorage'
    >
      {children}
    </Auth0Provider>
  );
};

export default Auth0ProviderWithHistory;

/*
 * ===========================================================================
 * IMPLEMENTATION HINTS
 * ===========================================================================
 *
 * Key Configuration Options:
 *
 * 1. domain (required)
 *    - Your Auth0 tenant domain (e.g., "your-tenant.auth0.com")
 *    - From environment variable: REACT_APP_AUTH0_DOMAIN
 *
 * 2. clientId (required)
 *    - Your Auth0 application's Client ID
 *    - From environment variable: REACT_APP_AUTH0_CLIENT_ID
 *
 * 3. authorizationParams (required for API calls)
 *    - redirect_uri: Where to return after login
 *    - audience: Your API identifier (needed to get access tokens)
 *    - scope: What information/permissions to request
 *
 * 4. onRedirectCallback (optional but recommended)
 *    - Called after Auth0 redirects back to your app
 *    - Use to restore user's location before login
 *
 * 5. cacheLocation (optional)
 *    - "memory" (default, most secure)
 *    - "localstorage" (persists across tabs, less secure)
 *
 * ===========================================================================
 * COMMON SCOPES
 * ===========================================================================
 *
 * - "openid": Required for OIDC, returns ID token
 * - "profile": User's name, nickname, picture
 * - "email": User's email address
 * - "offline_access": Returns refresh token for silent renewal
 *
 * ===========================================================================
 * COMPLETE IMPLEMENTATION EXAMPLE
 * ===========================================================================
 *
 * import { Auth0Provider } from '@auth0/auth0-react';
 *
 * const Auth0ProviderWithHistory = ({ children }) => {
 *   const navigate = useNavigate();
 *
 *   const domain = process.env.REACT_APP_AUTH0_DOMAIN;
 *   const clientId = process.env.REACT_APP_AUTH0_CLIENT_ID;
 *   const audience = process.env.REACT_APP_AUTH0_AUDIENCE;
 *
 *   const onRedirectCallback = (appState) => {
 *     navigate(appState?.returnTo || window.location.pathname);
 *   };
 *
 *   return (
 *     <Auth0Provider
 *       domain={domain}
 *       clientId={clientId}
 *       authorizationParams={{
 *         redirect_uri: window.location.origin,
 *         audience: audience,
 *         scope: "openid profile email"
 *       }}
 *       onRedirectCallback={onRedirectCallback}
 *     >
 *       {children}
 *     </Auth0Provider>
 *   );
 * };
 *
 * ===========================================================================
 */
