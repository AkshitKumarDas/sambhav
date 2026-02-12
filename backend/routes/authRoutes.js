const express = require("express");
const router = express.Router();

const authController = require("../controllers/authController");

// Signup
router.post("/signup", authController.signupUser);

// Login
router.post("/login", authController.loginUser);

module.exports = router;
