import React from 'react';
import { Routes, Route, Link } from 'react-router-dom';
import { useAuth0 } from '@auth0/auth0-react';

// Components
import LoginButton from './components/LoginButton';
import LogoutButton from './components/LogoutButton';
import Profile from './components/Profile';
import ProtectedRoute from './components/ProtectedRoute';

// Pages
import Home from './pages/Home';
import Dashboard from './pages/Dashboard';
import Callback from './pages/Callback';

function App() {
  const { isAuthenticated, isLoading } = useAuth0();

  return (
    <div className="app-container">
      {/* Navigation Bar */}
      <nav className="navbar">
        <Link to="/" className="navbar-brand">
          Auth0 Study App
        </Link>

        <div className="navbar-nav">
          <Link to="/" className="nav-link">
            Home
          </Link>

          {isAuthenticated && (
            <Link to="/dashboard" className="nav-link">
              Dashboard
            </Link>
          )}

          {/* Show Login or Logout button based on auth state */}
          {!isLoading && (
            isAuthenticated ? <LogoutButton /> : <LoginButton />
          )}
        </div>
      </nav>

      {/* Main Content */}
      <main className="main-content">
        <Routes>
          {/* Public Routes */}
          <Route path="/" element={<Home />} />
          <Route path="/callback" element={<Callback />} />

          {/* Protected Routes */}
          <Route
            path="/dashboard"
            element={
              <ProtectedRoute>
                <Dashboard />
              </ProtectedRoute>
            }
          />

          <Route
            path="/profile"
            element={
              <ProtectedRoute>
                <Profile />
              </ProtectedRoute>
            }
          />

          {/* 404 Route */}
          <Route
            path="*"
            element={
              <div className="card text-center">
                <h1>404 - Page Not Found</h1>
                <p className="mt-2 text-muted">
                  The page you're looking for doesn't exist.
                </p>
                <Link to="/" className="btn btn-primary mt-3">
                  Go Home
                </Link>
              </div>
            }
          />
        </Routes>
      </main>

      {/* Footer */}
      <footer style={{ textAlign: 'center', padding: '2rem', color: '#666' }}>
        <p>Auth0 Study Project - Learning Authentication & Social Federation</p>
      </footer>
    </div>
  );
}

export default App;
