/**
 * Database Seed Script
 *
 * This script creates the database schema for the Auth0 study project.
 * Run it with: npm run db:seed
 *
 * The users table stores application users, linked to Auth0 identities
 * via the auth0_sub column (the 'sub' claim from the JWT).
 */
import 'dotenv/config';
import pg from 'pg';

const { Pool } = pg;

const pool = new Pool({
  host: process.env.DB_HOST || 'localhost',
  port: parseInt(process.env.DB_PORT || '5432'),
  user: process.env.DB_USER || 'postgres',
  password: process.env.DB_PASSWORD || 'postgres',
  database: process.env.DB_NAME || 'auth0_study',
});

const createUsersTable = `
  CREATE TABLE IF NOT EXISTS users (
    id SERIAL PRIMARY KEY,
    auth0_sub VARCHAR(255) UNIQUE NOT NULL,
    email VARCHAR(255),
    name VARCHAR(255),
    picture VARCHAR(500),
    provider VARCHAR(50),
    created_at TIMESTAMP DEFAULT NOW(),
    last_login TIMESTAMP
  );
`;

/*
 * Schema explanation:
 *
 * id          - Internal database ID (auto-increment)
 * auth0_sub   - The Auth0 'sub' claim (e.g., "google-oauth2|123456")
 *               This is UNIQUE because each Auth0 identity = one user record
 * email       - User's email (may be same across providers, but that's OK)
 * name        - User's display name from the identity provider
 * picture     - URL to user's profile picture
 * provider    - Extracted from sub (e.g., "google-oauth2", "github")
 * created_at  - When the user was first created (JIT provisioned)
 * last_login  - Updated on each login
 *
 * Key insight:
 * - We use auth0_sub (not email) as the unique identifier
 * - Same email with different providers = different user records
 * - This is the "no account linking" approach
 */

const createIndexes = `
  CREATE INDEX IF NOT EXISTS idx_users_auth0_sub ON users(auth0_sub);
  CREATE INDEX IF NOT EXISTS idx_users_email ON users(email);
`;

async function seed() {
  console.log('Starting database seed...\n');

  try {
    // Create users table
    console.log('Creating users table...');
    await pool.query(createUsersTable);
    console.log('✓ Users table created\n');

    // Create indexes
    console.log('Creating indexes...');
    await pool.query(createIndexes);
    console.log('✓ Indexes created\n');

    // Verify table exists
    const result = await pool.query(`
      SELECT column_name, data_type, is_nullable
      FROM information_schema.columns
      WHERE table_name = 'users'
      ORDER BY ordinal_position;
    `);

    console.log('Users table schema:');
    console.log('─'.repeat(50));
    result.rows.forEach(col => {
      console.log(`  ${col.column_name.padEnd(15)} ${col.data_type.padEnd(20)} ${col.is_nullable === 'YES' ? 'NULL' : 'NOT NULL'}`);
    });
    console.log('─'.repeat(50));

    console.log('\n✓ Database seed completed successfully!');
  } catch (error) {
    console.error('✗ Seed failed:', error.message);
    process.exit(1);
  } finally {
    await pool.end();
  }
}

// Run if executed directly
seed();
