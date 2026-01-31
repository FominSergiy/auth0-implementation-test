import { query } from '../db/connection.js';

/**
 * Extract the provider name from an Auth0 sub claim
 *
 * Auth0 'sub' format: "provider|user_id"
 * Examples:
 *   - "google-oauth2|123456789"
 *   - "github|12345"
 *   - "auth0|507f1f77bcf86cd799439011"
 *
 * @param {string} sub - The Auth0 sub claim
 * @returns {string} - The provider name
 */
function extractProvider(sub) {
  if (!sub) return 'unknown';
  const parts = sub.split('|');
  console.log(parts)
  return parts[0] || 'unknown';
}

export async function userSync(req, res, next) {
  // Skip if no auth info (should not happen if jwtCheck runs first)
  if (!req.auth) {
    return next();
  }

  try {
    // Extract user info from the JWT
    const { sub } = req.auth.payload;

    // Note: Standard access tokens may not include email/name/picture
    // These might need to come from ID tokens or custom claims
    // For this exercise, we'll use what's available
    const email = req.auth.email || req.auth[`${process.env.AUTH0_NAMESPACE}/email`] || null;
    const name = req.auth.name || req.auth[`${process.env.AUTH0_NAMESPACE}/name`] || null;
    const picture = req.auth.picture || req.auth[`${process.env.AUTH0_NAMESPACE}/picture`] || null;
    const provider = extractProvider(sub);

    // Step 1 - Check if user exists
    const existingUserResult = await query(
      'SELECT * FROM users WHERE auth0_sub = $1', 
      [sub]
    );

    let user;

    if (existingUserResult.rows.length == 0) {
      // create new user if not exists
      const insertResult = await query(
        `INSERT INTO users (auth0_sub, email, name, picture, provider, last_login)
         VALUES ($1, $2, $3, $4, $5, NOW())
         RETURNING *`,
        [sub, email, name, picture, provider]
      );
      user = insertResult.rows[0]
      console.log('Created new user:', user.id, user.auth0_sub);

    } else {
      const updateResult = await query(
        `UPDATE users SET last_login = NOW()
        WHERE auth0_sub = $1
        RETURNING *`,
        [sub]
      );
      user = updateResult.rows[0];
    }

    // Attach user to request for route handlers
    req.user = user;
    next();

  } catch (error) {
    console.error('User sync error:', error);
    // Don't fail the request if user sync fails
    // Just continue without the user object
    next();
  }
}