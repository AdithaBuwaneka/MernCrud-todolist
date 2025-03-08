const express = require("express");
const { forgotPassword, verifyOtp, resetPassword } = require("../controllers/authController.js");


const router = express.Router();

router.post("/forgot-password", forgotPassword);
router.post("/verify-otp", verifyOtp);
router.post("/reset-password", resetPassword);

module.exports = router;