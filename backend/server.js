const express = require('express');
const { Pool } = require('pg');

const app = express();
const port = 4000;

// Database connection using Docker environment variables
const pool = new Pool({
  host: process.env.DB_HOST || 'database',
  port: process.env.DB_PORT || 5432,
  user: process.env.DB_USER || 'myuser',
  password: process.env.DB_PASSWORD || 'mysecretpassword',
  database: process.env.DB_NAME || 'myapp',
});

// Initialize database table on startup
async function initDb() {
  try {
    await pool.query(`
      CREATE TABLE IF NOT EXISTS visits (
        id SERIAL PRIMARY KEY,
        created_at TIMESTAMP DEFAULT NOW()
      );
    `);
    console.log('Database table "visits" is ready.');
  } catch (err) {
    console.error('Error creating database table:', err.message);
  }
}

initDb();

app.get('/', async (req, res) => {
  try {
    // Insert a visit record on every page refresh to prove data flow
    await pool.query('INSERT INTO visits DEFAULT VALUES');
    
    // Count total visits
    const result = await pool.query('SELECT COUNT(*) FROM visits');
    const count = result.rows[0].count;

    res.send(`Hello from Backend! Database is connected. Total visits: ${count}`);
  } catch (err) {
    console.error(err);
    res.status(500).send('Database connection error: ' + err.message);
  }
});

app.listen(port, () => {
  console.log(`Backend app listening on port ${port}`);
});