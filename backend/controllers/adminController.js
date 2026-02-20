const db = require("../config/db");
const claimModel = require("../models/claimModel");

exports.getAllClaims = async (req, res) => {
  try {
    const claims = await claimModel.getAllClaims();

    res.json({
      success: true,
      data: claims,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: "Failed to fetch claims",
    });
  }
};

const readSingle = (sql, params = []) =>
  new Promise((resolve, reject) => {
    db.get(sql, params, (err, row) => {
      if (err) reject(err);
      else resolve(row || {});
    });
  });

exports.getAdminMetrics = async (req, res) => {
  try {
    const totalUsersRow = await readSingle("SELECT COUNT(*) as totalUsers FROM users");
    const totalPoliciesRow = await readSingle("SELECT COUNT(*) as totalPolicies FROM policies");
    const totalClaimsRow = await readSingle("SELECT COUNT(*) as totalClaims FROM claims");
    const approvedClaimsRow = await readSingle(
      "SELECT COUNT(*) as approvedClaims FROM claims WHERE status = 'approved'",
    );
    const rejectedClaimsRow = await readSingle(
      "SELECT COUNT(*) as rejectedClaims FROM claims WHERE status = 'rejected'",
    );
    const totalPayoutRow = await readSingle(
      "SELECT SUM(amount) as totalPayout FROM claims WHERE status = 'approved'",
    );
    const totalExposureRow = await readSingle(
      "SELECT SUM(amount) as totalExposure FROM claims WHERE status IN ('submitted', 'under_review')",
    );

    res.json({
      totalUsers: Number(totalUsersRow.totalUsers || 0),
      totalPolicies: Number(totalPoliciesRow.totalPolicies || 0),
      totalClaims: Number(totalClaimsRow.totalClaims || 0),
      approvedClaims: Number(approvedClaimsRow.approvedClaims || 0),
      rejectedClaims: Number(rejectedClaimsRow.rejectedClaims || 0),
      totalPayout: Number(totalPayoutRow.totalPayout || 0),
      totalExposure: Number(totalExposureRow.totalExposure || 0),
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "DB error" });
  }
};

const ALLOWED_STATUSES = [
  "submitted",
  "under_review",
  "approved",
  "rejected",
];

const resolveClaimId = (req) => {
  const rawId = req.params?.id || req.body?.claimId;
  const numericClaimId = Number(rawId);
  if (!Number.isInteger(numericClaimId) || numericClaimId <= 0) return null;
  return numericClaimId;
};

exports.updateClaimStatus = async (req, res) => {
  try {
    const numericClaimId = resolveClaimId(req);
    const { status, adminNote } = req.body;
    const adminId = req.user.id;

    if (!numericClaimId) {
      return res.status(400).json({
        success: false,
        message: "Invalid claim ID",
      });
    }

    if (!ALLOWED_STATUSES.includes(status)) {
      return res.status(400).json({
        success: false,
        message: "Invalid claim status",
      });
    }

    const claim = await claimModel.getClaimById(numericClaimId);
    if (!claim) {
      return res.status(404).json({
        success: false,
        message: "Claim not found",
      });
    }

    if (claim.status === "approved" || claim.status === "rejected") {
      return res.status(400).json({
        success: false,
        message: "Claim already finalized and cannot be updated.",
      });
    }

    await claimModel.updateClaimReview(
      numericClaimId,
      status,
      adminId,
      typeof adminNote === "string" ? adminNote.trim() : null,
    );

    await claimModel.createClaimStatusHistory(
      numericClaimId,
      claim.status,
      status,
      adminId,
    );

    res.json({
      success: true,
      message: "Claim status updated",
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: "Failed to update claim",
    });
  }
};

exports.getClaimHistory = async (req, res) => {
  try {
    const numericClaimId = resolveClaimId(req);
    if (!numericClaimId) {
      return res.status(400).json({
        success: false,
        message: "Invalid claim ID",
      });
    }

    const claim = await claimModel.getClaimById(numericClaimId);
    if (!claim) {
      return res.status(404).json({
        success: false,
        message: "Claim not found",
      });
    }

    const history = await claimModel.getClaimHistory(numericClaimId);
    res.json({
      success: true,
      data: history,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: "Failed to fetch claim history",
    });
  }
};
