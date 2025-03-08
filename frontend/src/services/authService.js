export const forgotPassword = async (email) => {
    const response = await fetch("/api/auth/forgot-password", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email }),
    });
  
    const data = await response.json();
    return data;
  };
  
  export const verifyOtp = async (email, otp) => {
    const response = await fetch("/api/auth/verify-otp", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, otp }),
    });
  
    const data = await response.json();
    return data;
  };
  
  export const resetPassword = async (email, newPassword) => {
    const response = await fetch("/api/auth/reset-password", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, newPassword }), // Removed confirmPassword
    });
  
    const data = await response.json();
    return data;
  };