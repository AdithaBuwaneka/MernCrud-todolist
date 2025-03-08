import { useState } from "react";
import { resetPassword } from "../services/authService";
import { useNavigate, useLocation } from "react-router-dom";

const ResetPassword = () => {
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const navigate = useNavigate();
  const location = useLocation();
  const email = location.state?.email; // Get email from navigation state

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      alert("Passwords do not match!");
      return;
    }

    try {
      await resetPassword(email, password);
      alert("Password reset successful! You can now log in.");
      navigate("/login");
    } catch (err) {
      console.error("Error resetting password:", err.message || err);
      alert("Failed to reset password. Please try again.");
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>Reset Password</h2>
      <input 
        type="password" 
        placeholder="New Password" 
        value={password} 
        onChange={(e) => setPassword(e.target.value)} 
        required 
      />
      <input 
        type="password" 
        placeholder="Confirm New Password" 
        value={confirmPassword} 
        onChange={(e) => setConfirmPassword(e.target.value)} 
        required 
      />
      <button type="submit">Submit</button>
    </form>
  );
};

export default ResetPassword;