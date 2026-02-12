const express = require("express");
const router = express.Router();
const userController = require("../controllers/userController");
const authMiddleware = require("../middleware/authMiddleware");

router.get("/summary", authMiddleware, userController.getUserSummary);
router.get("/policies", authMiddleware, userController.getUserPolicies);
router.get("/claims", authMiddleware, userController.getUserClaims);

module.exports = router;
