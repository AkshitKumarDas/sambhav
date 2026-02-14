const db = require("../config/db");

exports.saveScore = (userId, score) => {
  return new Promise((resolve, reject) => {
    db.run(
      "INSERT INTO dbs_scores (user_id, score) VALUES (?, ?)",
      [userId, score],
      function (err) {
        if (err) reject(err);
        else resolve(this.lastID);
      },
    );
  });
};

exports.getLatestScore = (userId) => {
  return new Promise((resolve, reject) => {
    db.get(
      `SELECT * FROM dbs_scores
       WHERE user_id = ?
       ORDER BY created_at DESC
       LIMIT 1`,
      [userId],
      (err, row) => {
        if (err) reject(err);
        else resolve(row);
      },
    );
  });
};
