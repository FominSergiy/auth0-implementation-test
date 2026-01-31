import React, { useCallback } from 'react';
import { useAuth0 } from '@auth0/auth0-react';

/**
 * Logout Button Component
 *
 * Logs the user out of Auth0 and clears the session.
 *
 * ===========================================================================
 * TODO: Implement logout functionality using useAuth0 hook
 * ===========================================================================
 *
 * Steps:
 * 1. Import useAuth0 hook from @auth0/auth0-react
 * 2. Destructure logout from the hook
 * 3. Call logout() with returnTo option when button is clicked
 */

const LogoutButton = () => {
  const { logout } = useAuth0();

  /**
   * Handle logout button click
   *
   * The logout function:
   * - Clears the Auth0 session
   * - Clears local tokens from memory/storage
   * - Redirects to Auth0 logout endpoint
   * - Auth0 then redirects to returnTo URL
   *
   * Options:
   * - logoutParams.returnTo: Where to redirect after logout
   *   (Must be in Allowed Logout URLs in Auth0 dashboard)
   */
  const handleLogout = useCallback(() => {
      logout({
        logoutParams: {
          returnTo: window.location.origin
        }
      })
    },[logout])

  return (
    <button className="btn btn-secondary" onClick={handleLogout}>
      Log Out
    </button>
  );
};

export default LogoutButton;

/*
 * ===========================================================================
 * IMPLEMENTATION EXAMPLE
 * ===========================================================================
 *
 * import { useAuth0 } from '@auth0/auth0-react';
 *
 * const LogoutButton = () => {
 *   const { logout } = useAuth0();
 *
 *   const handleLogout = () => {
 *     logout({
 *       logoutParams: {
 *         returnTo: window.location.origin
 *       }
 *     });
 *   };
 *
 *   return (
 *     <button className="btn btn-secondary" onClick={handleLogout}>
 *       Log Out
 *     </button>
 *   );
 * };
 *
 * ===========================================================================
 * LOGOUT BEHAVIOR
 * ===========================================================================
 *
 * When logout() is called:
 * 1. Clears tokens from memory/localStorage
 * 2. Redirects to Auth0: https://your-domain/v2/logout
 * 3. Auth0 clears the session cookie
 * 4. Auth0 redirects to returnTo URL
 *
 * Note: returnTo URL must be in "Allowed Logout URLs" in Auth0 dashboard
 *
 * ===========================================================================
 * FEDERATED LOGOUT (Optional)
 * ===========================================================================
 *
 * To also log out from the identity provider (Google, GitHub, etc.):
 *
 * logout({
 *   logoutParams: {
 *     returnTo: window.location.origin,
 *     federated: true  // Also logout from IdP
 *   }
 * });
 *
 * Note: Federated logout may not be supported by all providers.
 *
 * ===========================================================================
 */
