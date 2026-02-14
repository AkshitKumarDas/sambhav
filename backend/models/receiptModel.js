const db = require("../config/db");

const createReceipt = (
  receiptNumber,
  userId,
  policyId,
  planName,
  premiumAmount,
) => {
  return new Promise((resolve, reject) => {
    const query = `
      INSERT INTO receipts
      (receipt_number, user_id, policy_id, plan_name, premium_amount)
      VALUES (?, ?, ?, ?, ?)
    `;

    db.run(
      query,
      [receiptNumber, userId, policyId, planName, premiumAmount],
      function (err) {
        if (err) reject(err);
        else resolve({ id: this.lastID });
      },
    );
  });
};

const getReceiptByPolicyId = (policyId) => {
  return new Promise((resolve, reject) => {
    db.get(
      "SELECT * FROM receipts WHERE policy_id = ?",
      [policyId],
      (err, row) => {
        if (err) reject(err);
        else resolve(row);
      },
    );
  });
};

module.exports = {
  createReceipt,
  getReceiptByPolicyId,
};
