const nodemailer = require("nodemailer");
const crypto = require("crypto");
const bcrypt = require("bcryptjs");

// This would be your temporary data for email, in real life, save it in a database
const users = []; // Mock user database

let tempOtp = "";

// Forgot Password Controller
const forgotPassword = async (req, res) => {
  const { email } = req.body;

  // Find user by email
  const user = users.find(user => user.email === email);
  if (!user) {
    return res.status(400).json({ error: "User not found" });
  }

  // Generate OTP (this is just for demo purposes)
  tempOtp = Math.floor(100000 + Math.random() * 900000).toString();

  // Send OTP to user's email using SendGrid or a mock SMTP service
  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: "your-email@gmail.com",
      pass: "your-email-password",
    },
  });

  const mailOptions = {
    from: "your-email@gmail.com",
    to: email,
    subject: "Password Reset OTP",
    text: `Your OTP code is ${tempOtp}`,
  };

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      return res.status(500).json({ error: "Failed to send OTP" });
    }
    return res.status(200).json({ message: "OTP sent to email" });
  });
};

// OTP Verification Controller
const verifyOtp = async (req, res) => {
  const { otp } = req.body;

  if (otp === tempOtp) {
    return res.status(200).json({ message: "OTP verified successfully" });
  } else {
    return res.status(400).json({ error: "Invalid OTP" });
  }
};

// Reset Password Controller
const resetPassword = async (req, res) => {
  const { email, newPassword, confirmPassword } = req.body;

  if (newPassword !== confirmPassword) {
    return res.status(400).json({ error: "Passwords do not match" });
  }

  // Find user by email and update password
  const user = users.find(user => user.email === email);
  if (!user) {
    return res.status(400).json({ error: "User not found" });
  }

  user.password = await bcrypt.hash(newPassword, 10);
  return res.status(200).json({ message: "Password reset successfully" });
};

module.exports = {
  forgotPassword,
  verifyOtp,
  resetPassword,
};