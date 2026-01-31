import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useAuth0 } from '@auth0/auth0-react';

/**
 * Protected Route Component
 *
 * Wraps routes that require authentication.
 * Redirects to login if user is not authenticated.
 *
 * ===========================================================================
 * TODO: Implement route protection using useAuth0 hook
 * ===========================================================================
 *
 * Steps:
 * 1. Import useAuth0 hook from @auth0/auth0-react
 * 2. Destructure isAuthenticated, isLoading, loginWithRedirect from the hook
 * 3. Show loading state while checking auth
 * 4. Redirect to login if not authenticated (or call loginWithRedirect)
 * 5. Render children if authenticated
 */


const ProtectedRoute = ({ children }) => {
  const location = useLocation();
  const { isAuthenticated, isLoading } = useAuth0();


  /**
   * Loading State
   *
   * While Auth0 is initializing (checking for existing session),
   * show a loading indicator to prevent flash of unauthenticated content.
   */
  if (isLoading) {
    return (
      <div className="loading-container">
        <div className="spinner"></div>
        <p className="mt-2">Checking authentication...</p>
      </div>
    );
  }

  /**
   * Not Authenticated
   *
   * Two approaches:
   *
   * 1. Navigate to home/login page (shown below):
   *    return <Navigate to="/" state={{ from: location }} replace />;
   *
   * 2. Automatically trigger login:
   *    loginWithRedirect({
   *      appState: { returnTo: location.pathname }
   *    });
   *    return <div>Redirecting to login...</div>;
   */
  if (!isAuthenticated) {
    // Option 1: Redirect to home page
    // The state prop passes the original location so we can redirect back after login
    return <Navigate to="/" state={{ from: location }} replace />;

    // Option 2: Automatically trigger login (uncomment to use)
    // loginWithRedirect({
    //   appState: { returnTo: location.pathname }
    // });
    // return (
    //   <div className="loading-container">
    //     <div className="spinner"></div>
    //     <p className="mt-2">Redirecting to login...</p>
    //   </div>
    // );
  }

  /**
   * Authenticated
   *
   * User is logged in, render the protected content.
   */
  return children;
};

export default ProtectedRoute;

/*
 * ===========================================================================
 * IMPLEMENTATION EXAMPLE
 * ===========================================================================
 *
 * import { useAuth0 } from '@auth0/auth0-react';
 * import { Navigate, useLocation } from 'react-router-dom';
 *
 * const ProtectedRoute = ({ children }) => {
 *   const { isAuthenticated, isLoading, loginWithRedirect } = useAuth0();
 *   const location = useLocation();
 *
 *   if (isLoading) {
 *     return <div className="spinner"></div>;
 *   }
 *
 *   if (!isAuthenticated) {
 *     // Option A: Redirect to home
 *     return <Navigate to="/" state={{ from: location }} replace />;
 *
 *     // Option B: Auto-login
 *     // loginWithRedirect({ appState: { returnTo: location.pathname } });
 *     // return <div>Redirecting...</div>;
 *   }
 *
 *   return children;
 * };
 *
 * ===========================================================================
 * USAGE IN APP.JSX
 * ===========================================================================
 *
 * <Route
 *   path="/dashboard"
 *   element={
 *     <ProtectedRoute>
 *       <Dashboard />
 *     </ProtectedRoute>
 *   }
 * />
 *
 * ===========================================================================
 * AUTH0 withAuthenticationRequired HOC (Alternative)
 * ===========================================================================
 *
 * Auth0 also provides a higher-order component:
 *
 * import { withAuthenticationRequired } from '@auth0/auth0-react';
 *
 * const ProtectedDashboard = withAuthenticationRequired(Dashboard, {
 *   onRedirecting: () => <div>Loading...</div>,
 *   returnTo: '/dashboard'
 * });
 *
 * <Route path="/dashboard" element={<ProtectedDashboard />} />
 *
 * This automatically redirects to login if not authenticated.
 *
 * ===========================================================================
 */
