const sqlite3 = require("sqlite3").verbose();
const path = require("path");

const db = new sqlite3.Database(path.join(__dirname, "sambhav.db"), (err) => {
  if (err) {
    console.error("Error opening database:", err);
  } else {
    console.log("SQLite Database Connected");
  }
});

module.exports = db;
