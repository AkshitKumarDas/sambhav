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

exports.updateClaimStatus = async (req, res) => {
  try {
    const { claimId, status } = req.body;

    const allowedStatuses = [
      "submitted",
      "under_review",
      "approved",
      "rejected",
    ];

    if (!allowedStatuses.includes(status)) {
      return res.status(400).json({
        success: false,
        message: "Invalid claim status",
      });
    }

    const claims = await claimModel.getAllClaims();
    const claimExists = claims.find((c) => c.id === claimId);

    if (!claimExists) {
      return res.status(404).json({
        success: false,
        message: "Claim not found",
      });
    }

    const result = await claimModel.updateClaimStatus(claimId, status);

    res.json({
      success: true,
      data: result,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: "Failed to update claim",
    });
  }
};
