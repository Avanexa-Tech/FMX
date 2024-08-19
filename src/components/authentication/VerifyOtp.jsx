import React, { useState } from "react";
import StyledButton from "../common/StyledButton";
import { Input, message } from "antd";
import { useLocation, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { userData } from "../../redux/slice/userAuthSlice";

const VerifyOtp = () => {
  const [otp, setOtp] = useState("");
  const location = useLocation();
  const { data = {}, username = "", newUser = false } = location.state;
  const [messageApi, contextHolder] = message.useMessage();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const success = (content) => {
    messageApi.open({
      type: "success",
      content,
    });
  };

  const error = () => {
    messageApi.open({
      type: "error",
      content: "Enter Valid Otp",
    });
  };
  return (
    <div className="verify-otp-card">
      {contextHolder}
      <h1>Verify Your Login</h1>
      <div className="inputs">
        <p className="otp-send">
          OTP was sent to{" "}
          {username
            .split("")
            .map((i, index) => (index < username.length / 2 ? i : "*"))}
        </p>
        <Input.OTP count={6} value={otp} onChange={(e) => setOtp(e)} />
        <StyledButton
          text={"Verify Otp"}
          btnClassName="login-btn"
          onClick={() => {
            if (otp === "123456") {
              success("Otp Verified Successfully");
              !newUser && dispatch((userData({ ...data, token: "available" })))
              setTimeout(() => newUser ? navigate("/organization", { state: { data } }) : navigate("/"), 500);
            }
            else error();
          }
          }
        />

        <p className="dont-have-account">
          Don't have an account?{" "}
          <a
            className="resend-otp"
            onClick={() => success("Otp Sended Successfully")}
          >
            <b>Resend</b>
          </a>
        </p>
      </div>
    </div>
  );
};

export default VerifyOtp;
