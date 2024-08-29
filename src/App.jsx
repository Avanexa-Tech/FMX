import "./App.css";
import WorkOrder from "./components/work-order/WorkOrder";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import AuthLayout from "./layouts/AuthLayout";
import Login from "./components/authentication/Login";
import BaseLayout from "./layouts/BaseLayout";
import VerifyOtp from "./components/authentication/VerifyOtp";
import Organization from "./components/authentication/Organization";
import SignUp from "./components/authentication/SignUp";
import { useSelector } from "react-redux";
import CreateProcedure from "./components/work-order/CreateProcedure";
import AssetManagement from "./components/asset-management/AssetManagement";

function App() {

  const { user } = useSelector(({ user_auth }) => user_auth);

  return (
    <BrowserRouter>
      <Routes>
        {user?.token ?
          <Route element={<BaseLayout />}>
            <Route index path="/work_order_management" element={<WorkOrder />} />
            <Route path="/create-procedure" element={<CreateProcedure/>} />
            <Route path="/assets_management" element={<AssetManagement/>} />
          </Route>
          :
          <Route element={<AuthLayout />}>
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<SignUp />} />
            <Route path="/verify-otp" element={<VerifyOtp />} />
            <Route path="/organization" element={<Organization />} />
            <Route path="/" element={<Navigate to="/login" />} />
          </Route>
        }
      </Routes>
    </BrowserRouter>
  );
}

export default App;
