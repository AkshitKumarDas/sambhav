const express = require("express");
const router = express.Router();
const userController = require("../controllers/userController");
const authMiddleware = require("../middleware/authMiddleware");

router.get("/summary", authMiddleware, userController.getSummary);
router.get("/policies", authMiddleware, userController.getPolicies);
router.get("/claims", authMiddleware, userController.getClaims);

module.exports = router;
