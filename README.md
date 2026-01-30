# Auth0 Login & Social Federation Study Project

A full-stack authentication study project using Auth0, React, and Express.js.

## Overview

This project demonstrates:
- Auth0 authentication with Authorization Code Flow + PKCE
- Social login federation (Google + GitHub)
- JWT validation on protected API routes
- React frontend with Auth0 React SDK
- Express.js backend with JWT middleware

## Project Structure

```
auth0-login-test/
├── client/                    # React Frontend
│   ├── src/
│   │   ├── auth/              # Auth0 provider setup
│   │   ├── components/        # Login, Logout, Profile components
│   │   ├── pages/             # Home, Dashboard pages
│   │   └── api/               # API client with auth headers
│   └── .env.local             # Frontend environment variables
│
├── server/                    # Express Backend
│   ├── src/
│   │   ├── middleware/        # JWT validation middleware
│   │   └── routes/            # API routes
│   └── .env                   # Backend environment variables
```

## Prerequisites

1. **Auth0 Account** - Create at https://auth0.com/signup
2. **Node.js** - v16 or higher
3. **npm** or **yarn**

## Auth0 Setup

### 1. Create a Single Page Application
- Go to Auth0 Dashboard → Applications → Create Application
- Name: `Auth0 Study App`
- Type: Single Page Web Application
- Save the **Domain** and **Client ID**

### 2. Configure Application Settings
In your application's Settings tab:
- Allowed Callback URLs: `http://localhost:3000, http://localhost:3000/callback`
- Allowed Logout URLs: `http://localhost:3000`
- Allowed Web Origins: `http://localhost:3000`

### 3. Create an API
- Go to APIs → Create API
- Name: `Auth0 Study API`
- Identifier: `http://localhost:5000/api`
- Signing Algorithm: RS256

### 4. Enable Social Connections
- Go to Authentication → Social
- Enable **Google** and **GitHub**
- Enable both for your application in the Applications tab

## Installation

### Backend Setup
```bash
cd server
npm install
cp .env.example .env
# Edit .env with your Auth0 credentials
npm run dev
```

### Frontend Setup
```bash
cd client
npm install
cp .env.example .env.local
# Edit .env.local with your Auth0 credentials
npm start
```

## Environment Variables

### Client (.env.local)
```
REACT_APP_AUTH0_DOMAIN=your-tenant.auth0.com
REACT_APP_AUTH0_CLIENT_ID=your-client-id
REACT_APP_AUTH0_AUDIENCE=http://localhost:5000/api
REACT_APP_API_URL=http://localhost:5000/api
```

### Server (.env)
```
PORT=5000
AUTH0_DOMAIN=your-tenant.auth0.com
AUTH0_AUDIENCE=http://localhost:5000/api
```

## API Endpoints

| Method | Endpoint | Auth Required | Description |
|--------|----------|---------------|-------------|
| GET | `/api/health` | No | Health check |
| GET | `/api/public` | No | Public data |
| GET | `/api/protected` | Yes | Protected data |
| GET | `/api/protected/profile` | Yes | User profile from token |

## Learning Objectives

Files marked with **TODO** comments are for you to implement:

### Frontend (Client)
- `auth/Auth0ProviderWithHistory.jsx` - Configure Auth0Provider
- `components/LoginButton.jsx` - Implement login with useAuth0
- `components/LogoutButton.jsx` - Implement logout with useAuth0
- `components/Profile.jsx` - Display user profile
- `components/ProtectedRoute.jsx` - Route protection logic
- `pages/Dashboard.jsx` - Make authenticated API calls
- `api/api.js` - Attach Bearer token to requests

### Backend (Server)
- `middleware/auth.js` - JWT validation middleware
- `routes/protected.js` - Apply auth middleware to routes

## Key Concepts

### Authorization Code Flow with PKCE
1. Generate code_verifier and code_challenge
2. Redirect to Auth0 with code_challenge
3. User authenticates
4. Auth0 redirects back with authorization code
5. Exchange code + code_verifier for tokens

### JWT Validation
- Verify signature using Auth0's public keys (JWKS)
- Check token expiration
- Validate issuer matches your Auth0 domain
- Validate audience matches your API identifier

### Social Federation
Auth0 acts as an identity broker:
1. User clicks "Login with Google"
2. Redirect to Google OAuth
3. Google authenticates user
4. Google sends tokens to Auth0
5. Auth0 normalizes profile
6. Auth0 issues tokens to your app

## Testing Checklist

- [ ] Server runs on http://localhost:5000
- [ ] Client runs on http://localhost:3000
- [ ] Health check: `curl http://localhost:5000/api/health`
- [ ] Login redirects to Auth0 Universal Login
- [ ] Google login works
- [ ] GitHub login works
- [ ] User profile displays after login
- [ ] Logout clears session
- [ ] Protected API requires token
- [ ] Dashboard fetches protected data

## Troubleshooting

### "Unauthorized" on protected routes
- Check that audience in frontend matches API identifier
- Verify tokens are being attached to requests
- Check Auth0 logs for token validation errors

### Social login not showing
- Ensure social connections are enabled in Auth0
- Verify connections are enabled for your application

### CORS errors
- Check CORS configuration in server
- Verify Allowed Web Origins in Auth0 dashboard
