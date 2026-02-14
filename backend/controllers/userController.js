const policyModel = require("../models/policyModel");
const claimModel = require("../models/claimModel");
const dbsModel = require("../models/dbsModel");

const getUserPolicies = async (req, res) => {
  try {
    const policies = (await policyModel.getPoliciesByUserId(req.user.id)) || [];

    res.json({
      success: true,
      data: policies || [],
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
    const claims = (await claimModel.getClaimsByUserId(req.user.id)) || [];

    res.json({
      success: true,
      data: claims || [],
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
    const policies = (await policyModel.getPoliciesByUserId(req.user.id)) || [];
    const claims = (await claimModel.getClaimsByUserId(req.user.id)) || [];

    const dbsData = await dbsModel.getLatestScore(req.user.id);

    const dbs = dbsData ? dbsData.score : 70;

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
      message: error.message,
    });
  }
};

module.exports = {
  getUserPolicies,
  getUserClaims,
  getUserSummary,
};
