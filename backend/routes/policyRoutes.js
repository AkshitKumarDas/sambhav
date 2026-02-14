const express = require("express");
const router = express.Router();

const policyController = require("../controllers/policyController");
const authMiddleware = require("../middleware/authMiddleware");

router.post("/create", authMiddleware, policyController.createPolicy);

module.exports = router;
