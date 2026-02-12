const policyModel = require("../models/policyModel");
const claimModel = require("../models/claimModel");

const getUserPolicies = async (req, res) => {
  try {
    const policies = await policyModel.getPoliciesByUserId(req.user.id);

    res.json({
      success: true,
      data: policies,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to fetch policies",
    });
  }
};

const getUserClaims = async (req, res) => {
  try {
    const claims = await claimModel.getClaimsByUserId(req.user.id);

    res.json({
      success: true,
      data: claims,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to fetch claims",
    });
  }
};

const getUserSummary = async (req, res) => {
  try {
    const policies = await policyModel.getPoliciesByUserId(req.user.id);
    const claims = await claimModel.getClaimsByUserId(req.user.id);

    let dbs = 70;

    if (policies.length > 0) dbs += 5;
    if (claims.length > 0) dbs -= 10;

    if (dbs > 100) dbs = 100;
    if (dbs < 0) dbs = 0;

    res.json({
      success: true,
      data: {
        dbsScore: dbs,
        policyCount: policies.length,
        claimCount: claims.length,
      },
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to fetch summary",
    });
  }
};

module.exports = {
  getUserPolicies,
  getUserClaims,
  getUserSummary,
};
