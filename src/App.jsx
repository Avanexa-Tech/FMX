import "./App.css";
import WorkOrder from "./components/work-order/WorkOrder";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import AuthLayout from "./layouts/AuthLayout";
import Login from "./components/authentication/Login";
import BaseLayout from "./layouts/BaseLayout";
import SignUp from "./components/auth/SignUp";
import VerifyOtp from "./components/authentication/VerifyOtp";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<BaseLayout />}>
          <Route index element={<WorkOrder />} />
        </Route>

        <Route element={<AuthLayout />}>
          <Route path="login" element={<Login />} />
          <Route path="signup" element={<SignUp />} />
          <Route path="verify-otp" element={<VerifyOtp />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
