const path = require("path");
const sqlite3 = require("sqlite3").verbose();
const dbPath = path.resolve(__dirname, "../sambhav.db");

const db = new sqlite3.Database(dbPath, (err) => {
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

const ensureClaimsColumns = () => {
  db.all("PRAGMA table_info(claims)", [], (err, columns) => {
    if (err) {
      console.error("Failed to inspect claims schema:", err.message);
      return;
    }

    const existing = new Set((columns || []).map((column) => column.name));
    const migrations = [];

    if (!existing.has("reviewed_by")) {
      migrations.push("ALTER TABLE claims ADD COLUMN reviewed_by INTEGER");
    }
    if (!existing.has("reviewed_at")) {
      migrations.push("ALTER TABLE claims ADD COLUMN reviewed_at TEXT");
    }
    if (!existing.has("admin_note")) {
      migrations.push("ALTER TABLE claims ADD COLUMN admin_note TEXT");
    }

    migrations.forEach((sql) => {
      db.run(sql, (migrationErr) => {
        if (migrationErr) {
          console.error("Claims migration failed:", migrationErr.message);
        }
      });
    });
  });
};

ensureClaimsColumns();

db.run(`
CREATE TABLE IF NOT EXISTS claim_status_history (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  claim_id INTEGER NOT NULL,
  previous_status TEXT,
  new_status TEXT,
  changed_by INTEGER,
  changed_at TEXT DEFAULT CURRENT_TIMESTAMP
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
