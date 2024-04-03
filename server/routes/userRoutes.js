const express = require("express");
const router = express.Router();
const authController = require("../controllers/authController");

// Route to Signup new users
router.post("/signup", authController.signup);

// Route to Login Users
router.post("/login", authController.login);

module.exports = router;
