import React, { useState } from "react";
import StyledInput from "../common/StyledInput";
import StyledButton from "../common/StyledButton";
import { Input, message, notification } from "antd";
import { useLocation, useNavigate } from "react-router-dom";

const VerifyOtp = () => {
  const [otp, setOtp] = useState("");
  const location = useLocation();
  const { username = "" } = location.state;
  const [messageApi, contextHolder] = message.useMessage();
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
  const navigate = useNavigate();
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
          onClick={
            otp === "123456"
              ? () => {
                  success("Otp Verified Successfully");
                  setTimeout(() => {
                    navigate("/");
                  }, 500);
                }
              : error
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
