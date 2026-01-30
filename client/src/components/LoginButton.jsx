import React from 'react';
import { useAuth0 } from '@auth0/auth0-react';
import { useCallback } from 'react';

/**
 * Login Button Component
 *
 * Initiates the Auth0 login flow when clicked.
 * Redirects user to Auth0 Universal Login page.
 *
 * ===========================================================================
 * TODO: Implement login functionality using useAuth0 hook
 * ===========================================================================
 *
 * Steps:
 * 1. Import useAuth0 hook from @auth0/auth0-react
 * 2. Destructure loginWithRedirect from the hook
 * 3. Call loginWithRedirect() when button is clicked
 *
 * Optional enhancements:
 * - Pass connection parameter for direct social login
 * - Pass appState.returnTo to remember where user was
 */

// TODO: add social providers after basic is done
const LoginButton = () => {
  const { loginWithRedirect } = useAuth0();

  /**
   * Handle login button click
   *
   * Basic usage:
   *   loginWithRedirect()
   *
   * With return URL:
   *   loginWithRedirect({ appState: { returnTo: window.location.pathname } })
   *
   * Direct to specific social provider:
   *   loginWithRedirect({ authorizationParams: { connection: 'google-oauth2' } })
   *   loginWithRedirect({ authorizationParams: { connection: 'github' } })
   */
  const handleLogin = useCallback(() => {
    loginWithRedirect();
  }, [loginWithRedirect]);

  return (
    <button className="btn btn-primary" onClick={handleLogin}>
      Log In
    </button>
  );
};

export default LoginButton;

/*
 * ===========================================================================
 * IMPLEMENTATION EXAMPLE
 * ===========================================================================
 *
 * import { useAuth0 } from '@auth0/auth0-react';
 *
 * const LoginButton = () => {
 *   const { loginWithRedirect } = useAuth0();
 *
 *   const handleLogin = () => {
 *     loginWithRedirect({
 *       appState: { returnTo: window.location.pathname }
 *     });
 *   };
 *
 *   return (
 *     <button className="btn btn-primary" onClick={handleLogin}>
 *       Log In
 *     </button>
 *   );
 * };
 *
 * ===========================================================================
 * SOCIAL LOGIN VARIATIONS
 * ===========================================================================
 *
 * Direct Google Login:
 *   loginWithRedirect({
 *     authorizationParams: { connection: 'google-oauth2' }
 *   });
 *
 * Direct GitHub Login:
 *   loginWithRedirect({
 *     authorizationParams: { connection: 'github' }
 *   });
 *
 * Note: These bypass Universal Login and go directly to the provider.
 * The default loginWithRedirect() shows Universal Login with all options.
 *
 * ===========================================================================
 */
