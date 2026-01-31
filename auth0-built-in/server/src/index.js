import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// #region agent log
fetch('http://127.0.0.1:7242/ingest/7747adb1-92c5-48fc-bd0c-248bdfd72287',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({location:'index.js:entry',message:'index.js loaded',data:{cwd:process.cwd(),dirname:__dirname,expectedConnectionPath:join(__dirname,'db','connection.js')},timestamp:Date.now(),sessionId:'debug-session',hypothesisId:'B'})}).catch(()=>{});
// #endregion

// Import routes
import healthRoutes from './routes/health.js';
import publicRoutes from './routes/public.js';
let protectedRoutes;
try {
  const mod = await import('./routes/protected.js');
  protectedRoutes = mod.default;
  // #region agent log
  fetch('http://127.0.0.1:7242/ingest/7747adb1-92c5-48fc-bd0c-248bdfd72287',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({location:'index.js:protected-import',message:'protected routes loaded',data:{success:true},timestamp:Date.now(),sessionId:'debug-session',hypothesisId:'A'})}).catch(()=>{});
  // #endregion
} catch (err) {
  // #region agent log
  fetch('http://127.0.0.1:7242/ingest/7747adb1-92c5-48fc-bd0c-248bdfd72287',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({location:'index.js:protected-import',message:'protected routes load failed',data:{code:err.code,message:err.message,stack:err.stack},timestamp:Date.now(),sessionId:'debug-session',hypothesisId:'A,C,D'})}).catch(()=>{});
  // #endregion
  protectedRoutes = express.Router().get('*', (req, res) => res.status(503).json({ error: 'Protected routes failed to load' }));
}

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
