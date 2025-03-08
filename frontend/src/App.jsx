import { Routes, Route } from "react-router-dom";
// import Home from "./pages/Home";
// import CreateItem from "./pages/CreateItem";
// import EditItem from "./pages/EditItem";
import Navbar from "./components/Navbar";
import ForgotPassword from "./pages/ForgotPassword";  
import ResetPassword from "./pages/ResetPassword";
import OtpVerification from "./pages/OtpVerification";

const App = () => {
  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <Navbar />
      <Routes>
        {/* <Route path="/" element={<Home />} />
        <Route path="/create" element={<CreateItem />} />
        <Route path="/edit/:id" element={<EditItem />} /> Edit Route */}
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/otp-verification" element={<OtpVerification />} />
        <Route path="/reset-password" element={<ResetPassword
        />} />
      </Routes>
    </div>
  );
};

export default App;
