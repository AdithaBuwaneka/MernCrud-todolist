import { useState, useEffect } from "react";
import { verifyOtp } from "../services/authService"; // Ensure correct path
import { useNavigate, useLocation } from "react-router-dom";

const OtpVerification = () => {
  const [otp, setOtp] = useState("");
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  const location = useLocation();
  const email = location.state?.email || "";

  useEffect(() => {
    if (!email) {
      alert("No email provided. Redirecting...");
      navigate("/forgot-password"); // Redirect if email is missing
    }
  }, [email, navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);

    console.log("Email:", email);
    console.log("OTP:", otp.trim());

    if (!otp.trim()) {
      setError("OTP cannot be empty.");
      return;
    }

    try {
      await verifyOtp(email, otp.trim());
      navigate("/reset-password", { state: { email } });
    } catch (error) {
      console.error("Error verifying OTP:", error);
      setError("Invalid or expired OTP. Please try again.");
    }
  };

  return (
    <div>
      <h2>Enter OTP</h2>
      {error && <p style={{ color: "red" }}>{error}</p>}
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Enter OTP"
          value={otp}
          onChange={(e) => setOtp(e.target.value.replace(/\D/g, ""))} // Allow only numbers
          required
        />
        <button type="submit">Verify OTP</button>
      </form>
    </div>
  );
};

export default OtpVerification;
