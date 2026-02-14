const express = require("express");
const router = express.Router();

const receiptController = require("../controllers/receiptController");
const authMiddleware = require("../middleware/authMiddleware");

router.get(
  "/:policyId",
  authMiddleware,
  receiptController.getReceiptByPolicyId,
);

module.exports = router;
