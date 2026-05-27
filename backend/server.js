require('dotenv').config();
const express = require('express');
const cors = require('cors');
const { Pool } = require('pg');
const path = require('path');

const app = express();
const port = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

// Serve static frontend files
app.use(express.static(path.join(__dirname, '../')));

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
});

// Initialize tables
pool.query(`
  CREATE TABLE IF NOT EXISTS templates (
    id VARCHAR(255) PRIMARY KEY,
    data JSONB NOT NULL
  );
  CREATE TABLE IF NOT EXISTS plans (
    date_key VARCHAR(255) PRIMARY KEY,
    data JSONB NOT NULL
  );
`).then(() => {
  console.log("Database connected and tables verified.");
}).catch(err => {
  console.error("Database connection error:", err);
});

// Sync endpoint to fetch everything
app.get('/api/sync', async (req, res) => {
  try {
    const templatesRes = await pool.query('SELECT data FROM templates');
    const plansRes = await pool.query('SELECT date_key, data FROM plans');

    const templates = templatesRes.rows.map(row => row.data);
    const plans = {};
    plansRes.rows.forEach(row => {
      plans[row.date_key] = row.data;
    });

    res.json({ templates, plans });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Update a single template
app.post('/api/templates', async (req, res) => {
  try {
    const template = req.body;
    if (!template.id) return res.status(400).json({ error: "Missing template id" });

    await pool.query(
      'INSERT INTO templates (id, data) VALUES ($1, $2) ON CONFLICT (id) DO UPDATE SET data = EXCLUDED.data',
      [template.id, template]
    );
    res.json({ success: true });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Delete a template
app.delete('/api/templates/:id', async (req, res) => {
  try {
    const id = req.params.id;
    await pool.query('DELETE FROM templates WHERE id = $1', [id]);
    res.json({ success: true });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Update a single plan
app.post('/api/plans', async (req, res) => {
  try {
    const { date_key, planData } = req.body;
    if (!date_key || !planData) return res.status(400).json({ error: "Missing data" });

    await pool.query(
      'INSERT INTO plans (date_key, data) VALUES ($1, $2) ON CONFLICT (date_key) DO UPDATE SET data = EXCLUDED.data',
      [date_key, planData]
    );
    res.json({ success: true });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
