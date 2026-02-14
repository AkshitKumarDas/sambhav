const receiptModel = require("../models/receiptModel");

exports.getReceiptByPolicyId = async (req, res) => {
  try {
    const { policyId } = req.params;

    const receipt = await receiptModel.getReceiptByPolicyId(policyId);

    if (!receipt) {
      return res.status(404).json({
        success: false,
        message: "Receipt not found",
      });
    }

    res.json({
      success: true,
      data: receipt,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: "Failed to fetch receipt",
    });
  }
};
