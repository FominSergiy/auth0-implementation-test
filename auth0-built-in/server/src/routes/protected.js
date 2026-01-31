import { Router } from 'express';

import { jwtCheck } from '../middleware/auth.js';
import { userSync } from '../middleware/userSync.js';

const router = Router();

/**
 * Protected Endpoint
 *
 * This endpoint requires a valid JWT access token.
 *
 * GET /api/protected
 * Headers: Authorization: Bearer <access_token>
 */
router.get('/protected', jwtCheck, userSync, (req, res) => {
  // The middleware validates:
  // - Token signature (using Auth0's JWKS)
  // - Token expiration
  // - Issuer (must match your Auth0 domain)
  // - Audience (must match your API identifier)

  res.json({
    message: 'You have accessed a protected endpoint!',
    timestamp: new Date().toISOString(),
    tokenPayload: req.auth,
    info: {
      description: 'This endpoint requires a valid JWT access token.',
      hint: 'The token is validated against your Auth0 tenant.'
    }
  });
});

/**
 * Protected Profile Endpoint
 *
 * Returns user information extracted from the JWT.
 *
 *
 * GET /api/protected/profile
 * Headers: Authorization: Bearer <access_token>
 */
router.get('/protected/profile', jwtCheck, userSync, (req, res) => {
  // Common claims in the access token:
  // - sub: Subject (user ID)
  // - iss: Issuer (your Auth0 domain)
  // - aud: Audience (your API identifier)
  // - exp: Expiration timestamp
  // - iat: Issued at timestamp
  // - scope: Granted scopes

  res.json({
    message: 'User profile from token',
    // JWT token claims (from Auth0)
    tokenClaims: {
      sub: req.auth.sub,
      issuer: req.auth.iss,
      audience: req.auth.aud,
      scopes: req.auth.scope?.split(' ') || [],
      issuedAt: req.auth.iat,
      expiresAt: req.auth.exp
    },
    // Database user record (from JIT provisioning)
    // This will be populated once you implement the TODOs in userSync.js
    databaseUser: req.user || null
  });
});

/**
 * Protected Messages Endpoint
 *
 * Returns private messages only for authenticated users.
 *
 *
 * GET /api/protected/messages
 * Headers: Authorization: Bearer <access_token>
 */
router.get('/protected/messages', jwtCheck, userSync, (req, res) => {
  res.json({
    messages: [
      { id: 1, text: 'This is a private message.', private: true },
      { id: 2, text: 'Only authenticated users can see this.', private: true },
      { id: 3, text: 'Your session is secure with Auth0!', private: true }
    ],
    accessedBy: req.auth.sub
  });
});

export default router;

/*
 * ===========================================================================
 * IMPLEMENTATION HINTS
 * ===========================================================================
 *
 * After creating the auth middleware in middleware/auth.js:
 *
 * 1. Import the middleware at the top of this file:
 *    import { checkJwt } from '../middleware/auth.js';
 *
 * 2. Add checkJwt to each protected route:
 *    router.get('/protected', checkJwt, (req, res) => { ... });
 *
 * 3. Access the decoded token via req.auth:
 *    - req.auth.sub - User ID
 *    - req.auth.iss - Issuer (Auth0 domain)
 *    - req.auth.aud - Audience
 *    - req.auth.scope - Granted scopes
 *
 * 4. For scope-based authorization, you can check:
 *    if (req.auth.scope?.includes('read:messages')) { ... }
 *
 * ===========================================================================
 */
