import { Router } from 'express';

const router = Router();

/**
 * Public Endpoint
 *
 * This endpoint returns data without requiring authentication.
 * Use this to test that your API is accessible.
 *
 * GET /api/public
 */
router.get('/public', (req, res) => {
  res.json({
    message: 'This is a public endpoint - no authentication required!',
    timestamp: new Date().toISOString(),
    info: {
      description: 'Anyone can access this endpoint without a token.',
      hint: 'Try accessing /api/protected to see the difference.'
    }
  });
});

/**
 * Public Messages Endpoint
 *
 * Returns sample public messages.
 *
 * GET /api/public/messages
 */
router.get('/public/messages', (req, res) => {
  res.json({
    messages: [
      { id: 1, text: 'Welcome to the Auth0 Study API!', public: true },
      { id: 2, text: 'This endpoint is publicly accessible.', public: true },
      { id: 3, text: 'Login to access protected endpoints.', public: true }
    ]
  });
});

export default router;
