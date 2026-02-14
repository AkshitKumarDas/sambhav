const policyModel = require("../models/policyModel");
const receiptModel = require("../models/receiptModel");

exports.createPolicy = async (req, res) => {
  try {
    const { planName, endDate } = req.body;
    const allowedPlans = ["basic", "advanced"];
    if (!allowedPlans.includes(planName)) {
      return res.status(400).json({
        success: "false",
        message: "Invalid Plan Selected",
      });
    }

    if (!planName || !endDate) {
      return res.status(400).json({
        success: false,
        message: "Plan name and end date required",
      });
    }

    const policy = await policyModel.createPolicy(
      req.user.id,
      planName,
      endDate,
    );
    const receiptNumber = "RCPT-" + new Date().getFullYear() + "-" + Date.now();

    await receiptModel.createReceipt(
      receiptNumber,
      req.user.id,
      policy.id,
      planName,
      499,
    );

    res.json({
      success: true,
      data: policy,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: "Failed to create policy",
    });
  }
};
