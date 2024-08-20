import React, { useState } from "react";
import StyledInput from "../common/StyledInput";
import StyledButton from "../common/StyledButton";
import { google } from "../../assets/images";
import { useNavigate } from "react-router-dom";
import { message } from "antd";
import { useSelector } from "react-redux";

const Login = () => {
  const [input, setInput] = useState({});
  const [messageApi, contextHolder] = message.useMessage();
  const [inputError, setInputError] = useState("");
  const { signupMock } = useSelector(({ user_auth }) => user_auth);
  const loginButtons = [
    {
      key: 1,
      text: "Email Address",
      regex: /^[a-z0-9.-]+@[a-z0-9.-]+\.[a-z]{2,}$/,
      type: "text",
      name: "email",
      icon: (
        <i
          className="fi fi-rr-envelope"
          style={{
            fontSize: "15px",
            fontWeight: "600",
            marginRight: "2px",
          }}
        ></i>
      ),
    },
    {
      key: 2,
      text: "Phone Number",
      regex: /^\+?\d{10,15}$/,
      type: "number",
      name: "phone_number",
      icon: (
        <i
          className="fi fi-rr-phone-flip"
          style={{
            fontSize: "15px",
            fontWeight: "600",
            marginRight: "2px",
            transform: "rotateY(180deg)",
          }}
        ></i>
      ),
    },
  ];
  const [selectedOption, setSelectedOption] = useState(loginButtons[0]);
  const navigate = useNavigate();
  const success = (content) => {
    messageApi.open({
      type: "success",
      content,
    });
  };

  const error = (content) => {
    messageApi.open({
      type: "error",
      content,
    });
  };
  return (
    <div className="login-card">
      {contextHolder}
      <h1>Log in to GBI FM</h1>
      <div className="inputs">
        <StyledInput
          label={selectedOption.text}
          prefix={selectedOption.icon}
          type={selectedOption.type}
          error={input[selectedOption.name] && !input[selectedOption.name] || inputError !== ""}
          errorMessage={`Enter valid ${selectedOption.text}*`}
          onChange={(value) => {
            setInput({ [selectedOption.name]: value });
            value !== "" && !selectedOption.regex.test(value)
              ? setInputError(`Enter valid ${selectedOption.text}*`)
              : setInputError("");
          }}
        />

        <StyledButton
          text={"Login"}
          btnClassName="login-btn"
          onClick={() => {
            if (!input[selectedOption.name]) {
              error("Enter Input");
            } else if ((!signupMock?.[selectedOption.name]) || (signupMock?.[selectedOption.name] !== input[selectedOption.name])) {
              error(`Invalid ${[selectedOption.text]}. User Not Found`);
            } else {
              success("Otp Sended Successfully");
              setTimeout(() => {
                navigate("/verify-otp", { state: { username: input[selectedOption.name], data: signupMock } });
              }, 500);
            }
          }}
        />
        <div className="login-options">
          <p>Or, Use one of the following options</p>
          <div className="option-btns">
            <StyledButton
              text={loginButtons.find((i) => i.key !== selectedOption.key).text}
              icon={loginButtons.find((i) => i.key !== selectedOption.key).icon}
              btnClassName="option-btn"
              onClick={() => {
                setSelectedOption(
                  loginButtons.find((i) => i.key !== selectedOption.key)
                );
                setInput({});
              }
              }
            />
            <StyledButton
              text={"Google"}
              icon={
                <img
                  src={google}
                  alt="google"
                  style={{ width: "20px", marginTop: "2px" }}
                />
              }
              btnClassName="option-btn"
            />
          </div>
        </div>
        <hr style={{ width: "100%", color: "#ccc" }} />
        <p className="dont-have-account">Don't have an account?</p>
        <StyledButton text={"Sign up"} onClick={() => navigate("/signup")} />
      </div>
    </div>
  );
};

export default Login;
