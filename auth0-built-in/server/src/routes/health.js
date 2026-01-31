import { Router } from 'express';

const router = Router();

/**
 * Health Check Endpoint
 *
 * This endpoint is used to verify the server is running.
 * No authentication required.
 *
 * GET /api/health
 */
router.get('/health', (req, res) => {
  res.json({
    status: 'ok',
    timestamp: new Date().toISOString(),
    service: 'auth0-study-api',
    version: '1.0.0'
  });
});

export default router;
