import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth0 } from '@auth0/auth0-react';

/**
 * Home Page Component
 *
 * Landing page showing app features and login options.
 * This component is complete - no TODOs here.
 */
const Home = () => {
  // Note: This will show warnings until Auth0Provider is configured
  // The useAuth0 hook gracefully handles the unconfigured state
  let isAuthenticated = false;
  let user = null;

  try {
    const auth0 = useAuth0();
    isAuthenticated = auth0.isAuthenticated;
    user = auth0.user;
  } catch (e) {
    // Auth0Provider not configured yet - that's okay for this page
  }

  return (
    <div>
      {/* Hero Section */}
      <section className="hero">
        <h1>Auth0 Study Project</h1>
        <p>
          Learn authentication and social federation with Auth0, React, and Express.js.
          Implement OAuth 2.0, OpenID Connect, and secure API access.
        </p>

        {isAuthenticated ? (
          <div>
            <p style={{ marginBottom: '1rem' }}>
              Welcome back, {user?.name || 'User'}!
            </p>
            <Link to="/dashboard" className="btn btn-outline" style={{ color: 'white', borderColor: 'white' }}>
              Go to Dashboard
            </Link>
          </div>
        ) : (
          <p style={{ opacity: 0.8 }}>
            Click "Log In" above to get started
          </p>
        )}
      </section>

      {/* Features Grid */}
      <section className="features">
        <div className="card feature-card">
          <div className="feature-icon">🔐</div>
          <h3>Authentication</h3>
          <p className="text-muted mt-1">
            Implement secure user authentication with Auth0 Universal Login
            and Authorization Code Flow with PKCE.
          </p>
        </div>

        <div className="card feature-card">
          <div className="feature-icon">🌐</div>
          <h3>Social Federation</h3>
          <p className="text-muted mt-1">
            Enable login with Google and GitHub. Auth0 normalizes
            user profiles from different identity providers.
          </p>
        </div>

        <div className="card feature-card">
          <div className="feature-icon">🔑</div>
          <h3>JWT Tokens</h3>
          <p className="text-muted mt-1">
            Understand ID tokens and access tokens. Validate JWTs
            on your backend API using Auth0's JWKS.
          </p>
        </div>

        <div className="card feature-card">
          <div className="feature-icon">🛡️</div>
          <h3>Protected APIs</h3>
          <p className="text-muted mt-1">
            Secure Express.js endpoints with JWT validation middleware.
            Only authenticated users can access protected routes.
          </p>
        </div>
      </section>

      {/* Learning Objectives */}
      <section className="card mt-3">
        <h2 style={{ marginBottom: '1rem' }}>What You'll Learn</h2>
        <ul style={{ lineHeight: '2', paddingLeft: '1.5rem' }}>
          <li>Configure Auth0 tenant, applications, and APIs</li>
          <li>Implement login/logout with the Auth0 React SDK</li>
          <li>Understand OAuth 2.0 and OpenID Connect flows</li>
          <li>Set up social connections (Google, GitHub)</li>
          <li>Validate JWTs on Express.js backend</li>
          <li>Protect API routes with authentication middleware</li>
          <li>Handle access tokens for API calls</li>
        </ul>
      </section>

      {/* Quick Start */}
      <section className="card">
        <h2 style={{ marginBottom: '1rem' }}>Quick Start</h2>
        <ol style={{ lineHeight: '2', paddingLeft: '1.5rem' }}>
          <li>Create an Auth0 account at <a href="https://auth0.com/signup" target="_blank" rel="noopener noreferrer">auth0.com</a></li>
          <li>Configure your tenant (see README.md for details)</li>
          <li>Copy <code>.env.example</code> to <code>.env</code> in both client and server</li>
          <li>Fill in your Auth0 credentials</li>
          <li>Implement the TODO sections in the code</li>
          <li>Test the authentication flow!</li>
        </ol>
      </section>

      {/* Files to Implement */}
      <section className="card">
        <h2 style={{ marginBottom: '1rem' }}>Files to Implement (TODOs)</h2>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '1.5rem' }}>
          <div>
            <h4 style={{ color: '#635dff', marginBottom: '0.5rem' }}>Frontend (React)</h4>
            <ul style={{ lineHeight: '1.8', paddingLeft: '1.5rem' }}>
              <li><code>auth/Auth0ProviderWithHistory.jsx</code></li>
              <li><code>components/LoginButton.jsx</code></li>
              <li><code>components/LogoutButton.jsx</code></li>
              <li><code>components/Profile.jsx</code></li>
              <li><code>components/ProtectedRoute.jsx</code></li>
              <li><code>pages/Dashboard.jsx</code></li>
              <li><code>api/api.js</code></li>
            </ul>
          </div>
          <div>
            <h4 style={{ color: '#635dff', marginBottom: '0.5rem' }}>Backend (Express)</h4>
            <ul style={{ lineHeight: '1.8', paddingLeft: '1.5rem' }}>
              <li><code>middleware/auth.js</code></li>
              <li><code>routes/protected.js</code></li>
            </ul>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
