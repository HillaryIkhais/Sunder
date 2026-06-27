const { Pool } = require('pg');
const fs = require('fs');
const path = require('path');
require('dotenv').config({ path: path.join(__dirname, '../../.env') });

async function initDb() {
  if (!process.env.DATABASE_URL || process.env.DATABASE_URL.includes('YOUR_PASSWORD_HERE')) {
    console.error('❌ ERROR: Please update your .env file with your actual password and the new database endpoint.');
    process.exit(1);
  }

  console.log('Connecting to database...');
  const pool = new Pool({
    connectionString: process.env.DATABASE_URL,
    ssl: { rejectUnauthorized: false }
  });

  try {
    const client = await pool.connect();
    console.log('✅ Connected successfully!');
    
    const schemaPath = path.join(__dirname, '../lib/schema.sql');
    const sql = fs.readFileSync(schemaPath, 'utf8');
    
    console.log('Executing schema.sql...');
    await client.query(sql);
    
    console.log('✅ Database initialized successfully with pgvector and tables!');
    client.release();
  } catch (err) {
    console.error('❌ Failed to initialize database:', err.message);
  } finally {
    await pool.end();
  }
}

initDb();
