import 'dotenv/config';
import express from 'express';
import cors from 'cors';

// Import routes
import healthRoutes from './routes/health.js';
import publicRoutes from './routes/public.js';
import protectedRoutes from './routes/protected.js';
import { jwtCheck } from './middleware/auth.js';

const app = express();
const PORT = process.env.PORT || 5001;

// =============================================================================
// MIDDLEWARE
// =============================================================================

// Parse JSON bodies
app.use(express.json());

// CORS configuration - Allow requests from React frontend
app.use(cors({
  origin: 'http://localhost:3000',
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization'],
  credentials: true
}));

// Request logging (development)
app.use((req, res, next) => {
  console.log(`${new Date().toISOString()} - ${req.method} ${req.path}`);
  next();
});

// =============================================================================
// ROUTES
// =============================================================================

// Health check routes (no auth required)
app.use('/api', healthRoutes);

// Public routes (no auth required)
app.use('/api', publicRoutes);

// Protected routes (auth required)
app.use('/api', protectedRoutes);

// =============================================================================
// ERROR HANDLING
// =============================================================================

// 404 handler
app.use((req, res) => {
  res.status(404).json({
    error: 'Not Found',
    message: `Cannot ${req.method} ${req.path}`
  });
});

// Global error handler
app.use((err, req, res, next) => {
  console.error('Error:', err);

  // Handle Auth0 JWT errors
  if (err.name === 'UnauthorizedError') {
    return res.status(401).json({
      error: 'Unauthorized',
      message: err.message || 'Invalid or missing token'
    });
  }

  // Handle other errors
  res.status(err.status || 500).json({
    error: err.name || 'Internal Server Error',
    message: err.message || 'Something went wrong'
  });
});

// =============================================================================
// START SERVER
// =============================================================================

app.listen(PORT, () => {
  console.log(`
╔════════════════════════════════════════════════════════════╗
║           Auth0 Study API Server                           ║
╠════════════════════════════════════════════════════════════╣
║  Server running on: http://localhost:${PORT}                  ║
║                                                            ║
║  Endpoints:                                                ║
║    GET /api/health           - Health check                ║
║    GET /api/public           - Public data                 ║
║    GET /api/protected        - Protected (requires JWT)    ║
║    GET /api/protected/profile - User profile from token    ║
╚════════════════════════════════════════════════════════════╝
  `);
});
