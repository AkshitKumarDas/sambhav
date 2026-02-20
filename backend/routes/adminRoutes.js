const express = require("express");
const router = express.Router();

const adminController = require("../controllers/adminController");
const authMiddleware = require("../middleware/authMiddleware");
const roleMiddleware = require("../middleware/roleMiddleware");

router.get(
  "/metrics",
  authMiddleware,
  roleMiddleware("admin"),
  adminController.getAdminMetrics,
);

router.get(
  "/claims",
  authMiddleware,
  roleMiddleware("admin"),
  adminController.getAllClaims,
);

router.patch(
  "/claims/:id/status",
  authMiddleware,
  roleMiddleware("admin"),
  adminController.updateClaimStatus,
);

router.get(
  "/claims/:id/history",
  authMiddleware,
  roleMiddleware("admin"),
  adminController.getClaimHistory,
);

// Legacy endpoint retained for backward compatibility.
router.post(
  "/claim/update",
  authMiddleware,
  roleMiddleware("admin"),
  adminController.updateClaimStatus,
);

module.exports = router;
