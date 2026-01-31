/**
 * Auth0 JWT Validation Middleware
 *
 * This middleware validates JWT access tokens issued by Auth0.
 * It uses the express-oauth2-jwt-bearer library which:
 * - Fetches Auth0's JWKS (JSON Web Key Set) to verify token signatures
 * - Validates token expiration
 * - Validates issuer matches your Auth0 domain
 * - Validates audience matches your API identifier
 *
 * Steps:
 * 1. Import the 'auth' function from 'express-oauth2-jwt-bearer'
 * 2. Create the checkJwt middleware using auth() with configuration
 * 3. Export the middleware for use in routes
 *
 * Configuration options for auth():
 * - issuerBaseURL: Your Auth0 domain URL (e.g., https://your-tenant.auth0.com)
 * - audience: Your API identifier (e.g., http://localhost:5000/api)
 *
 * Environment variables available:
 * - process.env.AUTH0_DOMAIN: Your Auth0 domain
 * - process.env.AUTH0_AUDIENCE: Your API identifier
 */
import { auth } from 'express-oauth2-jwt-bearer';

const jwtCheck = auth({
  audience: `http://${process.env.AUTH0_AUDIENCE}`,
  issuerBaseURL: `https://${process.env.AUTH0_DOMAIN}`,
  tokenSigningAlg: 'RS256',
});

export { jwtCheck };


/*
 * ===========================================================================
 * IMPLEMENTATION EXAMPLE (Complete Solution)
 * ===========================================================================
 *
 * import { auth } from 'express-oauth2-jwt-bearer';
 *
 * export const checkJwt = auth({
 *   issuerBaseURL: `https://${process.env.AUTH0_DOMAIN}`,
 *   audience: process.env.AUTH0_AUDIENCE,
 * });
 *
 * ===========================================================================
 * HOW IT WORKS
 * ===========================================================================
 *
 * 1. When a request comes in, the middleware checks the Authorization header
 * 2. It extracts the token from "Bearer <token>"
 * 3. It fetches the JWKS from https://your-domain/.well-known/jwks.json
 * 4. It verifies the token signature using the public key
 * 5. It validates claims: issuer, audience, expiration
 * 6. If valid, decoded token is attached to req.auth
 * 7. If invalid, it throws an error (caught by error handler)
 *
 * ===========================================================================
 * COMMON ERRORS
 * ===========================================================================
 *
 * - "No authorization token was found"
 *   Missing Authorization header
 *
 * - "jwt expired"
 *   Token has expired, need to get a new one
 *
 * - "jwt audience invalid"
 *   Audience in token doesn't match configured audience
 *
 * - "jwt issuer invalid"
 *   Issuer in token doesn't match configured issuer
 *
 * ===========================================================================
 */
