const db = require("../config/db");

exports.getSummary = (req, res) => {
  const userId = req.user.id;

  db.get(
    `SELECT 
        (SELECT COUNT(*) FROM policies WHERE user_id = ?) AS activePolicies,
        (SELECT COUNT(*) FROM claims WHERE user_id = ?) AS totalClaims`,
    [userId, userId],
    (err, row) => {
      if (err) {
        return res.status(500).json({ success: false });
      }

      res.json({
        success: true,
        data: row,
      });
    },
  );
};

exports.getPolicies = (req, res) => {
  const userId = req.user.id;

  db.all(
    `SELECT id, plan_name, status, start_date, end_date
     FROM policies
     WHERE user_id = ?`,
    [userId],
    (err, rows) => {
      if (err) {
        return res.status(500).json({ success: false });
      }

      res.json({
        success: true,
        data: rows,
      });
    },
  );
};

exports.getClaims = (req, res) => {
  const userId = req.user.id;

  db.all(
    `SELECT id, incident_type, amount, status, created_at
     FROM claims
     WHERE user_id = ?`,
    [userId],
    (err, rows) => {
      if (err) {
        return res.status(500).json({ success: false });
      }

      res.json({
        success: true,
        data: rows,
      });
    },
  );
};
