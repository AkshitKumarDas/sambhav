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
const createPolicy = (userId, planName, endDate) => {
  return new Promise((resolve, reject) => {
    const query = `
      INSERT INTO policies (user_id, plan_name, end_date, status)
      VALUES (?, ?, ?, 'active')
    `;

    db.run(query, [userId, planName, endDate], function (err) {
      if (err) {
        reject(err);
      } else {
        resolve({
          id: this.lastID,
          user_id: userId,
          plan_name: planName,
          end_date: endDate,
          status: "active",
        });
      }
    });
  });
};
const getPolicyById = (policyId) => {
  return new Promise((resolve, reject) => {
    db.get("SELECT * FROM policies WHERE id = ?", [policyId], (err, row) => {
      if (err) reject(err);
      else resolve(row);
    });
  });
};
module.exports = {
  getPoliciesByUserId,
  createPolicy,
  getPolicyById,
};
