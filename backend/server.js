const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const connectDB = require("./src/config/db");
const itemRoutes = require("./src/routes/item.routes");
const authRoutes = require("./src/routes/authRoutes");
const sgMail = require("@sendgrid/mail");

dotenv.config();
const app = express();

// Connect to DB
connectDB();

// Enable CORS (Allow frontend to access backend)
app.use(cors());
app.use(express.json());

// Routes
app.use("/api/items", itemRoutes);
app.use("/api/auth", authRoutes);

// SendGrid Configuration
sgMail.setApiKey(process.env.SENDGRID_API_KEY);

let otpStorage = {}; // Temporary OTP storage

//  Route: Send OTP via Email
app.post("/api/auth/send-otp", async (req, res) => {
  const { email } = req.body;
  if (!email) return res.status(400).json({ message: "Email is required" });

  // Generate a 6-digit OTP
  const otp = Math.floor(100000 + Math.random() * 900000);
  const otpExpirationTime = Date.now() + 5 * 60 * 1000; // OTP will expire in 5 minutes
  otpStorage[email] = { otp, expiration: otpExpirationTime };

  // Email content
  const msg = {
    to: email,
    from: process.env.SENDGRID_SENDER, // Your verified SendGrid sender email
    subject: "Your OTP Code",
    text: `Your OTP code is: ${otp}. It will expire in 5 minutes.`,
    html: `<h3>Your OTP Code: <strong>${otp}</strong></h3><p>Expires in 5 minutes.</p>`,
  };

  try {
    await sgMail.send(msg);
    console.log("✅ OTP Email Sent to:", email);
    res.json({ message: "OTP sent successfully" });
  } catch (error) {
    console.error(" SendGrid Error:", error.response ? error.response.body : error);
    res.status(500).json({ message: "Failed to send OTP. Try again." });
  }
});

//  Route: Verify OTP
app.post("/api/auth/verify-otp", (req, res) => {
  const { email, otp } = req.body;

  if (!otpStorage[email]) {
    return res.status(400).json({ message: "No OTP found for this email" });
  }

  const { otp: storedOtp, expiration } = otpStorage[email];

  // Check if OTP is expired
  if (Date.now() > expiration) {
    delete otpStorage[email]; // Remove OTP after expiry
    return res.status(400).json({ message: "OTP has expired" });
  }

  // Check if OTP matches
  if (storedOtp === otp) {
    delete otpStorage[email]; // Remove OTP after verification
    return res.json({ message: "OTP verified successfully" });
  }

  res.status(400).json({ message: "Invalid OTP" });
});

// Start Server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`✅ Server running on port ${PORT}`);
});