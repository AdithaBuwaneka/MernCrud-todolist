export const sendEmail = async (to, subject, text) => {
    const msg = {
      to,
      from: "your-email@example.com", // Replace with your verified sender email
      subject,
      text,
    };
  
    try {
      await sgMail.send(msg);
      console.log("Email sent successfully");
    } catch (error) {
      console.error("Error sending email:", error.response.body);
    }
  };