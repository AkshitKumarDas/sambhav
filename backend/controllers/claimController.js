const claimModel = require("../models/claimModel");
const policyModel = require("../models/policyModel");
const PLAN_MODULES = require("../utils/planModules");
const CLAIM_CATEGORIES = require("../utils/claimCategories");

exports.createClaim = async (req, res) => {
  try {
    const { policyId, incidentType, description, amount } = req.body;

    const claimCategory = CLAIM_CATEGORIES[incidentType] || "FIR_REQUIRED";

    if (!policyId || !incidentType || !amount) {
      return res.status(400).json({
        success: false,
        message: "Missing required fields",
      });
    }

    const policy = await policyModel.getPolicyById(policyId);

    if (!policy) {
      return res.status(404).json({
        success: false,
        message: "Policy not found",
      });
    }
    if (policy.user_id !== req.user.id) {
      return res.status(403).json({
        success: false,
        message: "Unauthorized policy access",
      });
    }

    const allowedModules = PLAN_MODULES[policy.plan_name]?.modules;

    if (!Array.isArray(allowedModules) || allowedModules.length === 0) {
      return res.status(400).json({
        success: false,
        message: "Invalid or Unsupported Plan",
      });
    }

    if (!allowedModules.includes(incidentType)) {
      return res.status(400).json({
        success: false,
        message: "Incident not covered in this plan",
      });
    }

    const claim = await claimModel.createClaim(
      policyId,
      req.user.id,
      incidentType,
      description,
      amount,
      claimCategory,
    );

    res.json({
      success: true,
      data: claim,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: "Failed to create claim",
    });
  }
};
