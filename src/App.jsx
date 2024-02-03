import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./Home";
import Success from "./Success";
import Error from "./Error";
import ProtectedRoute from "./components/ProtectedRoute";
import Login from "./Login";
import Signup from "./Signup";
import { Toaster } from "react-hot-toast";
import ResetPassword from "./ResetPassword";
import VerifyOtp from "./VerifyOtp";

export default function App() {
  return (
    <BrowserRouter>
      <Toaster />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route
          path="/success"
          element={<ProtectedRoute element={<Success />} />}
        />
        <Route path="/*" element={<Error />} />
        <Route path="/error" element={<Error />} />
        <Route path="/forgot-password" element={<ResetPassword />} />
        <Route path="/verify-otp" element={<VerifyOtp />} />
      </Routes>
    </BrowserRouter>
  );
}
