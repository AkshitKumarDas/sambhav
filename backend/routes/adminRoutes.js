const express = require("express");
const router = express.Router();

const adminController = require("../controllers/adminController");
const authMiddleware = require("../middleware/authMiddleware");
const roleMiddleware = require("../middleware/roleMiddleware");

router.get(
  "/claims",
  authMiddleware,
  roleMiddleware("admin"),
  adminController.getAllClaims,
);

router.post(
  "/claim/update",
  authMiddleware,
  roleMiddleware("admin"),
  adminController.updateClaimStatus,
);

module.exports = router;
