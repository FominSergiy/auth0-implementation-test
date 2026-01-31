import pg from 'pg';
// #region agent log
fetch('http://127.0.0.1:7242/ingest/7747adb1-92c5-48fc-bd0c-248bdfd72287',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({location:'connection.js:entry',message:'connection.js evaluated',data:{},timestamp:Date.now(),sessionId:'debug-session',hypothesisId:'D'})}).catch(()=>{});
// #endregion
const { Pool } = pg;

// Create a connection pool using environment variables
// The pool will automatically use these env vars:
// - PGHOST or DB_HOST
// - PGPORT or DB_PORT
// - PGUSER or DB_USER
// - PGPASSWORD or DB_PASSWORD
// - PGDATABASE or DB_NAME
// Or you can use DATABASE_URL for a single connection string

const pool = new Pool({
  host: process.env.DB_HOST || 'localhost',
  port: parseInt(process.env.DB_PORT || '5432'),
  user: process.env.DB_USER || 'postgres',
  password: process.env.DB_PASSWORD || 'postgres',
  database: process.env.DB_NAME || 'auth0_study',
  // Pool configuration
  max: 10, // Maximum number of clients in the pool
  idleTimeoutMillis: 30000, // Close idle clients after 30 seconds
  connectionTimeoutMillis: 2000, // Return an error after 2 seconds if connection not available
});

/**
 *
 * Usage example:
 *   const users = await query('SELECT * FROM users WHERE id = $1', [userId]);
 *
 * @param {string} text - SQL query string
 * @param {Array} params - Query parameters (for parameterized queries)
 * @returns {Promise<object>} - Query result
 */
const query = async (text, params) => {
  try {
    const result = await pool.query(text, params);
    return result;
  } catch (error) {
    console.error(error);
    throw new Error(error)
  }
}

/**
 *
 * @returns {Promise<boolean>} - True if connection successful
 */
const testConnection  = async () => {
  try {
    await pool.query("SELECT 1");
    return true;
  } catch (error) {
    console.error(error)
    return false;
  }
}

export { pool, query, testConnection };