const db = require("../config/db");

const getClaimsByUserId = (userId) => {
  return new Promise((resolve, reject) => {
    db.all("SELECT * FROM claims WHERE user_id = ?", [userId], (err, rows) => {
      if (err) reject(err);
      else resolve(rows);
    });
  });
};

module.exports = {
  getClaimsByUserId,
};
