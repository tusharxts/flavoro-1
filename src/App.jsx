import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./Home";
import Success from "./Success";
import Error from "./Error";
// import ProtectedRoute from "./components/ProtectedRoute";
import Login from "./Login";
import Signup from "./Signup";
import { Toaster } from "react-hot-toast";
import ResetPassword from "./ResetPassword";
import Landingpage from "./Landingpage";
import VerifyOtp from "./VerifyOtp";
import Navbar from "./components/Navbar";

export default function App() {
  return (
    <>
      <BrowserRouter>
        <Toaster />
        <Routes>
          <Route path="/" element={<Landingpage />} />
          <Route path="/Navbar" element={<Navbar />} />
          <Route path="/Login" element={<Login />} />
          <Route path="/Signup" element={<Signup />} />
          <Route path="/Home" element={<Home />} />
          <Route path="/Success" element={<Success />} />

          {/* <Route
          path="/success"
          element={<ProtectedRoute element={<Success />} />}
        /> */}
          <Route path="/*" element={<Error />} />
          <Route path="/error" element={<Error />} />
          <Route path="/forgot-password" element={<ResetPassword />} />
          <Route path="/verify-otp" element={<VerifyOtp />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}
