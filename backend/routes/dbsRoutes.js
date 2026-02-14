const express = require("express");
const router = express.Router();
const dbsController = require("../controllers/dbsController");
const authMiddleware = require("../middleware/authMiddleware");

router.post("/submit", authMiddleware, dbsController.submitDBS);
router.get("/latest", authMiddleware, dbsController.getLatestDBS);

module.exports = router;
