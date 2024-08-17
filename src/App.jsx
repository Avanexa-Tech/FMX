import "./App.css";
import WorkOrder from "./components/work-order/WorkOrder";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import AuthLayout from "./layouts/AuthLayout";
import Login from "./components/authentication/Login";
import BaseLayout from "./layouts/BaseLayout";
import VerifyOtp from "./components/authentication/VerifyOtp";
import Organization from "./components/authentication/Organization";
import SignUp from "./components/authentication/SignUp";

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
          <Route path="organization" element={<Organization />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
