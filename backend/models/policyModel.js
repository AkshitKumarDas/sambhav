const db = require("../config/db");

const getPoliciesByUserId = (userId) => {
  return new Promise((resolve, reject) => {
    db.all(
      "SELECT * FROM policies WHERE user_id = ?",
      [userId],
      (err, rows) => {
        if (err) reject(err);
        else resolve(rows);
      },
    );
  });
};

module.exports = {
  getPoliciesByUserId,
};
