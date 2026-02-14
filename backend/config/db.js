const sqlite3 = require("sqlite3").verbose();

const db = new sqlite3.Database("./sambhav.db", (err) => {
  if (err) {
    console.error("Database connection error:", err.message);
  } else {
    console.log("SQLite database connected");
  }
});

/*
  CREATE USERS TABLE
*/
db.run(`
  CREATE TABLE IF NOT EXISTS users (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT NOT NULL,
    email TEXT UNIQUE NOT NULL,
    password_hash TEXT NOT NULL,
    role TEXT DEFAULT 'user',
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP
  )
`);
// POLICIES TABLE
db.run(`
  CREATE TABLE IF NOT EXISTS policies (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    user_id INTEGER NOT NULL,
    plan_name TEXT NOT NULL,
    start_date DATETIME DEFAULT CURRENT_TIMESTAMP,
    end_date DATETIME,
    status TEXT DEFAULT 'active'
  )
`);
// CLAIMS TABLE
db.run(`
  CREATE TABLE IF NOT EXISTS claims (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    policy_id INTEGER,
    user_id INTEGER,
    incident_type TEXT,
    description TEXT,
    amount REAL,
    claim_category TEXT,
    status TEXT DEFAULT 'submitted',
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP
  )
`);
// DBS
db.run(`
CREATE TABLE IF NOT EXISTS dbs_scores (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  user_id INTEGER,
  score INTEGER,
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP
)
`);
// RECEIPT TABLE
db.run(`
CREATE TABLE IF NOT EXISTS receipts (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  receipt_number TEXT UNIQUE,
  user_id INTEGER,
  policy_id INTEGER,
  plan_name TEXT,
  premium_amount INTEGER,
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP
)
`);
module.exports = db;
