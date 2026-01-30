import { Router } from 'express';

import { jwtCheck } from '../middleware/auth.js';

const router = Router();

/**
 * Protected Endpoint
 *
 * This endpoint requires a valid JWT access token.
 *
 * TODO: Add the checkJwt middleware to protect this route
 * Example: router.get('/protected', checkJwt, (req, res) => { ... });
 *
 * GET /api/protected
 * Headers: Authorization: Bearer <access_token>
 */
router.get('/protected', jwtCheck, (req, res) => {
  // TODO: Once you add the middleware, req.auth will contain the decoded token
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
 * TODO: Add the checkJwt middleware to protect this route
 *
 * GET /api/protected/profile
 * Headers: Authorization: Bearer <access_token>
 */
router.get('/protected/profile', jwtCheck, (req, res) => {
  // TODO: After adding auth middleware, extract user info from req.auth
  // Common claims in the access token:
  // - sub: Subject (user ID)
  // - iss: Issuer (your Auth0 domain)
  // - aud: Audience (your API identifier)
  // - exp: Expiration timestamp
  // - iat: Issued at timestamp
  // - scope: Granted scopes

  res.json({
    message: 'User profile from token',
    user: {
      id: req.auth.sub,
      issuer: req.auth.iss,
      audience: req.auth.aud,
      scopes: req.auth.scope?.split(' ') || [],
      issuedAt: new Date(req.auth.iat * 1000).toISOString(),
      expiresAt: new Date(req.auth.exp * 1000).toISOString()
    }
  });
});

/**
 * Protected Messages Endpoint
 *
 * Returns private messages only for authenticated users.
 *
 * TODO: Add the checkJwt middleware to protect this route
 *
 * GET /api/protected/messages
 * Headers: Authorization: Bearer <access_token>
 */
router.get('/protected/messages', jwtCheck, (req, res) => {
  res.json({
    messages: [
      { id: 1, text: 'This is a private message.', private: true },
      { id: 2, text: 'Only authenticated users can see this.', private: true },
      { id: 3, text: 'Your session is secure with Auth0!', private: true }
    ],
    // TODO: Uncomment after adding auth middleware
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
