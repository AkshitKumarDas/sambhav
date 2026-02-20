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

const getClaimById = (claimId) => {
  return new Promise((resolve, reject) => {
    db.get("SELECT * FROM claims WHERE id = ?", [claimId], (err, row) => {
      if (err) reject(err);
      else resolve(row || null);
    });
  });
};

const updateClaimStatus = (claimId, status) => {
  return new Promise((resolve, reject) => {
    db.run(
      "UPDATE claims SET status = ? WHERE id = ?",
      [status, claimId],
      function (err) {
        if (err) reject(err);
        else resolve({ updated: this.changes });
      },
    );
  });
};

const updateClaimReview = (claimId, status, reviewedBy, adminNote) => {
  return new Promise((resolve, reject) => {
    db.run(
      `UPDATE claims
       SET status = ?,
           reviewed_by = ?,
           reviewed_at = CURRENT_TIMESTAMP,
           admin_note = ?
       WHERE id = ?`,
      [status, reviewedBy, adminNote || null, claimId],
      function (err) {
        if (err) reject(err);
        else resolve({ updated: this.changes });
      },
    );
  });
};

const createClaimStatusHistory = (claimId, previousStatus, newStatus, changedBy) => {
  return new Promise((resolve, reject) => {
    db.run(
      `INSERT INTO claim_status_history
       (claim_id, previous_status, new_status, changed_by)
       VALUES (?, ?, ?, ?)`,
      [claimId, previousStatus, newStatus, changedBy],
      function (err) {
        if (err) reject(err);
        else resolve({ id: this.lastID });
      },
    );
  });
};

const getClaimHistory = (claimId) => {
  return new Promise((resolve, reject) => {
    db.all(
      `SELECT id, claim_id, previous_status, new_status, changed_by, changed_at
       FROM claim_status_history
       WHERE claim_id = ?
       ORDER BY changed_at DESC, id DESC`,
      [claimId],
      (err, rows) => {
        if (err) reject(err);
        else resolve(rows || []);
      },
    );
  });
};

module.exports = {
  createClaim,
  getAllClaims,
  updateClaimStatus,
  getClaimsByUserId,
  getClaimById,
  updateClaimReview,
  createClaimStatusHistory,
  getClaimHistory,
};
