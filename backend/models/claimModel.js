const db = require("../config/db");

const createClaim = (
  policyId,
  userId,
  incidentType,
  description,
  amount,
  claimCategory,
) => {
  return new Promise((resolve, reject) => {
    const query = `
      INSERT INTO claims
      (policy_id, user_id, incident_type, description, amount, claim_category, status)
      VALUES (?, ?, ?, ?, ?, ?, 'submitted')
    `;

    db.run(
      query,
      [policyId, userId, incidentType, description, amount, claimCategory],
      function (err) {
        if (err) reject(err);
        else {
          resolve({
            id: this.lastID,
            policy_id: policyId,
            status: "submitted",
            claim_category: claimCategory,
          });
        }
      },
    );
  });
};
const getClaimsByUserId = (userId) => {
  return new Promise((resolve, reject) => {
    db.all("SELECT * FROM claims WHERE user_id = ?", [userId], (err, rows) => {
      if (err) reject(err);
      else resolve(rows);
    });
  });
};
const getAllClaims = () => {
  return new Promise((resolve, reject) => {
    db.all("SELECT * FROM claims ORDER BY created_at DESC", [], (err, rows) => {
      if (err) reject(err);
      else resolve(rows || []);
    });
  });
};

const updateClaimStatus = (claimId, status) => {
  return new Promise((resolve, reject) => {
    db.run(
      "UPDATE claims SET status = ?, updated_at = CURRENT_TIMESTAMP WHERE id = ?",
      [status, claimId],
      function (err) {
        if (err) reject(err);
        else resolve({ updated: this.changes });
      },
    );
  });
};

module.exports = {
  createClaim,
  getAllClaims,
  updateClaimStatus,
  getClaimsByUserId,
};
