const express = require("express");
const router = express.Router();

const claimController = require("../controllers/claimController");
const authMiddleware = require("../middleware/authMiddleware");

router.post("/create", authMiddleware, claimController.createClaim);

module.exports = router;
